import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit(`donations:${ip}`, 20, 60_000);
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Service is temporarily unavailable.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();
    const name = body.name ? String(body.name).slice(0, 200) : null;
    const email = body.email ? String(body.email).slice(0, 254) : null;
    const amount = Number(body.amount);
    const message = body.message ? String(body.message).slice(0, 1000) : null;
    const user_id = body.user_id ? String(body.user_id).slice(0, 100) : null;

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid donation amount.' }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const insertPayload: Record<string, unknown> = { name, email, amount, message };
    if (user_id) insertPayload.user_id = user_id;

    const { data, error } = await supabaseAdmin.from('donations').insert([insertPayload]).select().single();

    if (error) {
      return NextResponse.json({ error: 'Failed to save donation.' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
