import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { email, userId, plan } = await req.json();

  const priceMap: Record<string, string> = {
    founding_monthly: process.env.STRIPE_FOUNDING_MONTHLY_PRICE_ID!,
    founding_annual: process.env.STRIPE_FOUNDING_ANNUAL_PRICE_ID!,
    monthly: process.env.STRIPE_PRICE_ID!,
  };

  const priceId = priceMap[plan] ?? process.env.STRIPE_FOUNDING_MONTHLY_PRICE_ID!;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/signup?checkout=cancelled`,
    metadata: { userId },
  });

  return NextResponse.json({ url: session.url });
}
