import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import websiteRoutes from './routes/website.routes';
import postRoutes from './routes/post.routes';
import keywordRoutes from './routes/keyword.routes';
import backlinkRoutes from './routes/backlink.routes';
import knowledgeBaseRoutes from './routes/knowledgeBase.routes';
import integrationRoutes from './routes/integration.routes';
import chatRoutes from './routes/chat.routes';
import stripeRoutes from './routes/stripe.routes';
import webhookRoutes from './routes/webhook.routes';

const app: Express = express();
const PORT = process.env.BACKEND_PORT || process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================

// Security
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing
app.use(cookieParser());

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
app.use(rateLimiter);

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/backlinks', backlinkRoutes);
app.use('/api/knowledge-base', knowledgeBaseRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/webhooks', webhookRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║                                       ║
  ║     ContentFlow AI Backend API        ║
  ║                                       ║
  ╚═══════════════════════════════════════╝

  Server running on port: ${PORT}
  Environment: ${process.env.NODE_ENV}
  API URL: ${process.env.API_URL || `http://localhost:${PORT}`}

  Ready to accept connections! 🚀
  `);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

export default app;
