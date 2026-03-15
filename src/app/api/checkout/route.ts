import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import type { CartItem } from '@/lib/types';

/* ─────────────────────────────────────────────
   Stripe Checkout API Route
   ───────────────────────────────────────────── */

// Initialize Stripe. In dev without a key, we'll return a mock URL.
const stripeKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeKey ? new Stripe(stripeKey) : null;

export async function POST(request: Request) {
  try {
    const { items, baseUrl } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!stripe) {
      // Mock successful checkout redirection for development without keys
      return NextResponse.json({ url: `${baseUrl}/success?mock=true` });
    }

    // Map CartItems to Stripe Line Items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: CartItem) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.product.brand} ${item.product.model}`,
            description: `Size: US ${item.size} | Colorway: ${item.product.colorway}`,
            images: item.product.images[0] ? [item.product.images[0].url] : [],
          },
          // Stripe requires amounts in cents
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      })
    );

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart-cancelled`,
      // Collect shipping info for physical goods
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'IT', 'ES'], 
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
