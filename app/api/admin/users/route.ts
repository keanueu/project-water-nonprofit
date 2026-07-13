import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;

    return NextResponse.json({ users: data?.users || [] });
  } catch {
    return NextResponse.json({ error: 'Failed to load users' }, { status: 500 });
  }
}
