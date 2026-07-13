import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';

const DEFAULTS: Record<string, any> = {
  organization: {
    name: 'Project Water',
    ein: '26-1455510',
    email: 'contact@projectwater.org',
    phone: '+1 (603) 555-0123',
    address: '17 Depot Street, 2nd Floor\nConcord, NH 03301\nUnited States',
  },
  notifications: {
    newDonations: true,
    failedPayments: true,
    campaignMilestones: true,
    weeklyReports: true,
  },
};

export async function GET() {
  try {
    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json({ settings: DEFAULTS });
    }

    const { data, error } = await supabase
      .from('settings')
      .select('key, value');

    if (error) {
      // Table may not exist yet — return defaults
      return NextResponse.json({ settings: DEFAULTS });
    }

    const settings: Record<string, any> = { ...DEFAULTS };
    for (const row of data || []) {
      settings[row.key] = row.value;
    }

    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ settings: DEFAULTS });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const body = await request.json();
    const updates: { key: string; value: any }[] = [];

    for (const [key, value] of Object.entries(body)) {
      updates.push({ key, value });
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No settings provided' }, { status: 400 });
    }

    const { error } = await supabase
      .from('settings')
      .upsert(updates, { onConflict: 'key' });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
