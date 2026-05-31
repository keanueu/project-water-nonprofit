import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_SUPABASE_URL is not configured' },
        { status: 500 }
      );
    }

    if (!serviceRoleKey) {
      return NextResponse.json(
        { error: 'SUPABASE_SERVICE_ROLE_KEY is not configured. Set it in .env.local' },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();
    const { name, email, amount, message, user_id } = body;

    if (!amount) {
      return NextResponse.json({ error: 'Missing amount' }, { status: 400 });
    }

    const insertPayload: any = { name, email, amount, message };
    if (user_id) insertPayload.user_id = user_id;

    const { data, error } = await supabaseAdmin.from('donations').insert([insertPayload]).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
