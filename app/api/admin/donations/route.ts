import { NextResponse } from 'next/server';
import { readDonations, filterDonations, donationsToCsv } from '@/lib/admin-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    const donations = await readDonations();

    if (format === 'csv') {
      const csv = donationsToCsv(donations);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="donations-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    const hasFilters = searchParams.has('q') || searchParams.has('status') || searchParams.has('range');
    if (!hasFilters) {
      return NextResponse.json({ donations });
    }

    const result = filterDonations(donations, searchParams);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Failed to load donations' }, { status: 500 });
  }
}
