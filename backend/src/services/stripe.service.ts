import Stripe from 'stripe';
import prisma from '../config/database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-10-28.acacia',
});

export interface CreateSubscriptionData {
  userId: string;
  priceId: string;
  paymentMethodId: string;
}

export class StripeService {
  /**
   * Create customer and subscription with 7-day free trial
   */
  async createSubscription(data: CreateSubscriptionData): Promise<{
    subscriptionId: string;
    clientSecret?: string;
    status: string;
  }> {
    const { userId, priceId, paymentMethodId } = data;

    try {
      // Get user
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      let customerId = user.stripeCustomerId;

      // Create customer if doesn't exist
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name || undefined,
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });

        customerId = customer.id;

        // Save customer ID
        await prisma.user.update({
          where: { id: userId },
          data: { stripeCustomerId: customerId }
        });
      }

      // Create subscription with 7-day trial
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        trial_period_days: 7,
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
      });

      // Calculate trial end date
      const trialEndsAt = new Date(subscription.trial_end! * 1000);

      // Determine plan from price ID
      const plan = this.getPlanFromPriceId(priceId);

      // Update user subscription info
      await prisma.user.update({
        where: { id: userId },
        data: {
          stripeSubscriptionId: subscription.id,
          subscriptionStatus: subscription.status,
          subscriptionPlan: plan,
          trialEndsAt,
        }
      });

      // Get client secret for payment confirmation if needed
      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice?.payment_intent as Stripe.PaymentIntent;

      return {
        subscriptionId: subscription.id,
        clientSecret: paymentIntent?.client_secret || undefined,
        status: subscription.status,
      };
    } catch (error: any) {
      console.error('Stripe subscription error:', error);
      throw new Error(error.message);
    }
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(userId: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user || !user.stripeSubscriptionId) {
        throw new Error('No active subscription found');
      }

      // Cancel at period end (don't delete immediately)
      await stripe.subscriptions.update(user.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });

      // Update user status
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionStatus: 'canceled',
        }
      });
    } catch (error: any) {
      console.error('Cancel subscription error:', error);
      throw new Error(error.message);
    }
  }

  /**
   * Reactivate canceled subscription
   */
  async reactivateSubscription(userId: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user || !user.stripeSubscriptionId) {
        throw new Error('No subscription found');
      }

      // Reactivate subscription
      await stripe.subscriptions.update(user.stripeSubscriptionId, {
        cancel_at_period_end: false,
      });

      // Update user status
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionStatus: 'active',
        }
      });
    } catch (error: any) {
      console.error('Reactivate subscription error:', error);
      throw new Error(error.message);
    }
  }

  /**
   * Change subscription plan
   */
  async changePlan(userId: string, newPriceId: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user || !user.stripeSubscriptionId) {
        throw new Error('No active subscription found');
      }

      // Get current subscription
      const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);

      // Update subscription
      await stripe.subscriptions.update(user.stripeSubscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: newPriceId,
        }],
        proration_behavior: 'always_invoice', // Charge/credit immediately
      });

      // Determine new plan
      const newPlan = this.getPlanFromPriceId(newPriceId);

      // Update user plan
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionPlan: newPlan,
        }
      });
    } catch (error: any) {
      console.error('Change plan error:', error);
      throw new Error(error.message);
    }
  }

  /**
   * Handle webhook events
   */
  async handleWebhook(event: Stripe.Event): Promise<void> {
    try {
      switch (event.type) {
        case 'customer.subscription.created':
          await this.handleSubscriptionCreated(event.data.object as Stripe.Subscription);
          break;

        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;

        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;

        case 'customer.subscription.trial_will_end':
          await this.handleTrialWillEnd(event.data.object as Stripe.Subscription);
          break;

        case 'invoice.payment_succeeded':
          await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;

        case 'invoice.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.error('Webhook handling error:', error);
      throw error;
    }
  }

  /**
   * Handle subscription created
   */
  private async handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<void> {
    const customerId = subscription.customer as string;

    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId }
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus: subscription.status,
          trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
        }
      });
    }
  }

  /**
   * Handle subscription updated
   */
  private async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
    const customerId = subscription.customer as string;

    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId }
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus: subscription.status,
          subscriptionEndsAt: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
        }
      });
    }
  }

  /**
   * Handle subscription deleted
   */
  private async handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
    const customerId = subscription.customer as string;

    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId }
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus: 'canceled',
          subscriptionPlan: null,
        }
      });
    }
  }

  /**
   * Handle trial ending soon (send reminder email)
   */
  private async handleTrialWillEnd(subscription: Stripe.Subscription): Promise<void> {
    // TODO: Send email reminder
    console.log(`Trial ending soon for subscription ${subscription.id}`);
  }

  /**
   * Handle payment succeeded
   */
  private async handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
    const customerId = invoice.customer as string;

    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId }
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus: 'active',
        }
      });
    }
  }

  /**
   * Handle payment failed
   */
  private async handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
    const customerId = invoice.customer as string;

    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId }
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus: 'past_due',
        }
      });

      // TODO: Send payment failed email
    }
  }

  /**
   * Get plan name from price ID
   */
  private getPlanFromPriceId(priceId: string): string {
    if (priceId === process.env.STRIPE_PRICE_STARTER) return 'starter';
    if (priceId === process.env.STRIPE_PRICE_PROFESSIONAL) return 'professional';
    if (priceId === process.env.STRIPE_PRICE_AGENCY) return 'agency';
    return 'starter';
  }

  /**
   * Get billing portal URL
   */
  async createBillingPortalSession(userId: string, returnUrl: string): Promise<string> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user || !user.stripeCustomerId) {
        throw new Error('No customer found');
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: returnUrl,
      });

      return session.url;
    } catch (error: any) {
      console.error('Billing portal error:', error);
      throw new Error(error.message);
    }
  }
}

export default StripeService;
