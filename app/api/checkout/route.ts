import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!stripeKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is not configured. Set it in .env.local' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

    const body = await req.json();
    const amount = Number(body?.amount ?? 0);
    const currency = (body?.currency || 'usd').toLowerCase();
    const description = body?.description || 'Charity Donation';
    const email = body?.email;
    const name = body?.name;
    const message = body?.message;
    const user_id = body?.user_id;

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const baseUrl = appUrl || `http://localhost:3000`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: description },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      metadata: {
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
        ...(message ? { message } : {}),
        ...(user_id ? { user_id } : {}),
        amount: String(amount),
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout creation error', err?.message || err);
    return NextResponse.json(
      { error: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}
