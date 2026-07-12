import { NextResponse } from 'next/server';
import { readDonations, readCampaigns } from '@/lib/admin-data';

export async function GET() {
  try {
    const donations = await readDonations();
    const campaigns = await readCampaigns(donations);
    return NextResponse.json({ campaigns });
  } catch {
    return NextResponse.json({ error: 'Failed to load campaigns' }, { status: 500 });
  }
}
