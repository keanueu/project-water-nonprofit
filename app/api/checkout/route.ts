import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const MAX_DONATION_AMOUNT = 100000;
const MIN_DONATION_AMOUNT = 1;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit(`checkout:${ip}`, 10, 60_000);
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!stripeKey) {
      return NextResponse.json({ error: 'Payment service is temporarily unavailable.' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey);

    const body = await req.json();
    const amount = Number(body?.amount ?? 0);
    const currency = (body?.currency || 'usd').toLowerCase();
    const description = String(body?.description || 'Charity Donation').slice(0, 500);
    const email = body?.email ? String(body.email).slice(0, 254) : undefined;
    const name = body?.name ? String(body.name).slice(0, 200) : undefined;
    const message = body?.message ? String(body.message).slice(0, 1000) : undefined;
    const user_id = body?.user_id ? String(body.user_id).slice(0, 100) : undefined;

    if (!amount || isNaN(amount) || amount < MIN_DONATION_AMOUNT || amount > MAX_DONATION_AMOUNT) {
      return NextResponse.json({ error: 'Invalid donation amount.' }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
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
  } catch {
    return NextResponse.json(
      { error: 'Unable to process payment. Please try again.' },
      { status: 500 }
    );
  }
}
