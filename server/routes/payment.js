import express from 'express';
import { query } from '../db/index.js';
import Stripe from 'stripe';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
// Lazy initialize Stripe instance with secret key fallback to prevent crash if not yet supplied
const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
  return new Stripe(secretKey);
};

// Webhook endpoint (expects raw body buffer for signature verification)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  const stripe = getStripeInstance();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;

    console.log(`Payment successful for user ${userId}. Session ID: ${session.id}`);

    try {
      // Grant 1 year subscription to user
      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      await query(
        `UPDATE users 
         SET subscription_expires_at = $1 
         WHERE uid = $2`,
        [expiresAt, userId]
      );
      console.log(`Successfully upgraded user ${userId} to premium subscription.`);
    } catch (dbErr) {
      console.error('Failed to update user subscription in webhook:', dbErr);
      return res.status(500).send('Database update failed');
    }
  }

  res.json({ received: true });
});

// Create Stripe checkout session
router.post('/create-checkout-session', express.json(), authenticate, async (req, res) => {
  const { uid } = req.user;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const stripe = getStripeInstance();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['promptpay'],
      line_items: [{
        price_data: {
          currency: 'thb',
          product_data: {
            name: 'Gogram Premium (Infinity Hearts)',
            description: 'Perpetual premium access with infinite hearts',
          },
          unit_amount: 2900, // 29 THB
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${frontendUrl}/shop?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/shop?canceled=true`,
      metadata: {
        userId: uid,
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe Checkout Session:', error);
    res.status(500).json({ error: 'Failed to create payment session.' });
  }
});

export default router;
