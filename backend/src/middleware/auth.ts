import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import prisma from '../config/database';

export interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default-secret'
    ) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        subscriptionPlan: true,
        subscriptionStatus: true,
        trialEndsAt: true,
      }
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    req.userId = user.id;
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401));
    } else {
      next(error);
    }
  }
};

// Middleware to check subscription status
export const requireActiveSubscription = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      throw new AppError('Authentication required', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        subscriptionStatus: true,
        trialEndsAt: true,
      }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const hasActiveSub = user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trialing';
    const trialValid = user.trialEndsAt && new Date(user.trialEndsAt) > new Date();

    if (!hasActiveSub && !trialValid) {
      throw new AppError('Active subscription required', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check plan-specific features
export const requirePlan = (allowedPlans: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.userId) {
        throw new AppError('Authentication required', 401);
      }

      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { subscriptionPlan: true }
      });

      if (!user || !user.subscriptionPlan) {
        throw new AppError('Subscription required', 403);
      }

      if (!allowedPlans.includes(user.subscriptionPlan)) {
        throw new AppError(`This feature requires ${allowedPlans.join(' or ')} plan`, 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authenticate;
