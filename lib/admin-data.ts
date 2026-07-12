import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type DonationStatus = 'succeeded' | 'pending' | 'failed' | 'unknown';

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  campaignId: string | null;
  campaignName: string;
  method: string;
  status: DonationStatus;
  createdAt: string;
  message: string;
  stripeSessionId: string | null;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  progress: number;
  status: 'active' | 'completed' | 'draft';
  ends_at?: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface OperationsAlert {
  id: string;
  title: string;
  detail: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
}

type Row = Record<string, unknown>;

const fallbackCampaigns: Campaign[] = [
  {
    id: 'clean-water',
    title: 'Clean Water Initiative',
    description: 'Building sustainable water wells in remote villages to provide clean drinking water.',
    raised: 45000,
    goal: 60000,
    donors: 342,
    daysLeft: 12,
    progress: 75,
    status: 'active',
  },
  {
    id: 'education',
    title: 'Education for All',
    description: 'Providing school supplies, books, and uniforms to under-resourced children.',
    raised: 12400,
    goal: 25000,
    donors: 156,
    daysLeft: 24,
    progress: 49.6,
    status: 'active',
  },
  {
    id: 'emergency-food',
    title: 'Emergency Food Relief',
    description: 'Delivering urgent food assistance to families affected by a recent disaster.',
    raised: 85000,
    goal: 100000,
    donors: 892,
    daysLeft: 5,
    progress: 85,
    status: 'active',
  },
];

export function createAdminClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !key) {
    return null;
  }

  return createClient(supabaseUrl, key);
}

export async function readDonations(): Promise<Donation[]> {
  const supabase = createAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error || !data) {
    return [];
  }

  return data.map((row, index) => normalizeDonation(row as Row, index));
}

export async function readCampaigns(donations: Donation[] = []): Promise<Campaign[]> {
  const supabase = createAdminClient();

  if (supabase) {
    const { data, error } = await supabase.from('campaigns').select('*').limit(100);

    if (!error && data?.length) {
      return data.map((row, index) => normalizeCampaign(row as Row, index));
    }
  }

  const byCampaign = donations.reduce<Map<string, { raised: number; donors: Set<string>; name: string }>>((map, donation) => {
    const key = donation.campaignId || donation.campaignName || 'General Fund';
    const current = map.get(key) || { raised: 0, donors: new Set<string>(), name: donation.campaignName || 'General Fund' };
    current.raised += donation.status === 'failed' ? 0 : donation.amount;
    current.donors.add(donation.donorEmail || donation.donorName || donation.id);
    map.set(key, current);
    return map;
  }, new Map());

  if (!byCampaign.size) {
    return fallbackCampaigns;
  }

  return Array.from(byCampaign.entries()).map(([id, summary], index) => {
    const goal = Math.max(Math.ceil(summary.raised * 1.35), 10000);
    const progress = goal ? Math.min((summary.raised / goal) * 100, 100) : 0;

    return {
      id: id === 'General Fund' ? `campaign-${index + 1}` : slugify(id) || `campaign-${index + 1}`,
      title: summary.name,
      description: 'Campaign summary is generated from donation activity until campaign records are configured.',
      raised: summary.raised,
      goal,
      donors: summary.donors.size,
      daysLeft: 30,
      progress,
      status: progress >= 100 ? 'completed' : 'active',
    };
  });
}

export function filterDonations(
  donations: Donation[],
  params: URLSearchParams
): { donations: Donation[]; total: number; page: number; pageSize: number } {
  const query = (params.get('q') || '').trim().toLowerCase();
  const status = (params.get('status') || 'all').toLowerCase();
  const range = params.get('range') || 'all';
  const page = Math.max(Number(params.get('page') || 1), 1);
  const pageSize = Math.min(Math.max(Number(params.get('pageSize') || 8), 1), 50);
  const since = getRangeStart(range);

  const filtered = donations.filter((donation) => {
    const matchesQuery =
      !query ||
      donation.id.toLowerCase().includes(query) ||
      donation.donorName.toLowerCase().includes(query) ||
      donation.donorEmail.toLowerCase().includes(query) ||
      donation.campaignName.toLowerCase().includes(query);
    const matchesStatus = status === 'all' || donation.status === status;
    const created = new Date(donation.createdAt).getTime();
    const matchesRange = !since || created >= since.getTime();

    return matchesQuery && matchesStatus && matchesRange;
  });

  const start = (page - 1) * pageSize;

  return {
    donations: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  };
}

export function buildDashboard(donations: Donation[], campaigns: Campaign[]) {
  const succeeded = donations.filter((donation) => donation.status !== 'failed');
  const total = succeeded.reduce((sum, donation) => sum + donation.amount, 0);
  const avg = succeeded.length ? total / succeeded.length : 0;
  const activeCampaigns = campaigns.filter((campaign) => campaign.status === 'active').length;
  const donors = new Set(succeeded.map((donation) => donation.donorEmail || donation.donorName)).size;

  const metrics: DashboardMetric[] = [
    { label: 'Total Donations', value: formatCurrency(total), change: `${succeeded.length} gifts`, positive: true },
    { label: 'Active Campaigns', value: String(activeCampaigns), change: `${campaigns.length} total`, positive: true },
    { label: 'Total Donors', value: String(donors), change: 'tracked', positive: true },
    { label: 'Avg. Donation', value: formatCurrency(avg), change: avg >= 100 ? 'strong' : 'watch', positive: avg >= 100 },
  ];

  return {
    metrics,
    recentDonations: donations.slice(0, 6),
    alerts: buildAlerts(donations, campaigns),
  };
}

export function donationsToCsv(donations: Donation[]) {
  const rows = [
    ['Transaction ID', 'Donor', 'Email', 'Campaign', 'Amount', 'Status', 'Method', 'Date', 'Stripe Session', 'Message'],
    ...donations.map((donation) => [
      donation.id,
      donation.donorName,
      donation.donorEmail,
      donation.campaignName,
      String(donation.amount),
      donation.status,
      donation.method,
      donation.createdAt,
      donation.stripeSessionId || '',
      donation.message,
    ]),
  ];

  return rows.map((row) => row.map(csvCell).join(',')).join('\n');
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value || 0);
}

function normalizeDonation(row: Row, index: number): Donation {
  const createdAt = stringValue(row.created_at) || stringValue(row.createdAt) || new Date().toISOString();
  const id = stringValue(row.id) || stringValue(row.transaction_id) || `DON-${index + 1}`;
  const amount = numberValue(row.amount) || numberValue(row.total) || 0;

  return {
    id,
    donorName: stringValue(row.name) || stringValue(row.donor_name) || stringValue(row.donorName) || 'Anonymous donor',
    donorEmail: stringValue(row.email) || stringValue(row.donor_email) || '',
    amount,
    campaignId: stringValue(row.campaign_id) || null,
    campaignName:
      stringValue(row.campaign_name) ||
      stringValue(row.campaign) ||
      stringValue(row.description) ||
      'General Fund',
    method: stringValue(row.method) || stringValue(row.payment_method) || 'Card',
    status: normalizeStatus(row.status),
    createdAt,
    message: stringValue(row.message),
    stripeSessionId: stringValue(row.stripe_session_id) || stringValue(row.session_id) || null,
  };
}

function normalizeCampaign(row: Row, index: number): Campaign {
  const raised = numberValue(row.raised) || numberValue(row.amount_raised) || 0;
  const goal = numberValue(row.goal) || numberValue(row.target_amount) || 10000;
  const progress = goal ? Math.min((raised / goal) * 100, 100) : 0;
  const endsAt = stringValue(row.ends_at) || stringValue(row.end_date);

  return {
    id: stringValue(row.id) || `campaign-${index + 1}`,
    title: stringValue(row.title) || stringValue(row.name) || `Campaign ${index + 1}`,
    description: stringValue(row.description) || 'No campaign description has been added yet.',
    raised,
    goal,
    donors: numberValue(row.donors) || numberValue(row.donor_count) || 0,
    daysLeft: daysUntil(endsAt),
    progress,
    status: normalizeCampaignStatus(row.status, progress),
    ends_at: endsAt || undefined,
  };
}

function buildAlerts(donations: Donation[], campaigns: Campaign[]): OperationsAlert[] {
  const alerts: OperationsAlert[] = [];
  const failedCount = donations.filter((donation) => donation.status === 'failed').length;
  const pendingCount = donations.filter((donation) => donation.status === 'pending').length;
  const highValue = donations.find((donation) => donation.amount >= 1000 && donation.status !== 'failed');
  const urgentCampaign = campaigns.find((campaign) => campaign.status === 'active' && campaign.daysLeft <= 7);
  const underTarget = campaigns.find(
    (campaign) => campaign.status === 'active' && campaign.daysLeft <= 14 && campaign.progress < 50
  );

  if (failedCount) {
    alerts.push({
      id: 'failed-donations',
      title: 'Failed donation follow-up',
      detail: `${failedCount} failed donation${failedCount === 1 ? '' : 's'} need review.`,
      severity: 'critical',
    });
  }

  if (pendingCount) {
    alerts.push({
      id: 'pending-donations',
      title: 'Pending donations',
      detail: `${pendingCount} donation${pendingCount === 1 ? '' : 's'} are waiting for confirmation.`,
      severity: 'warning',
    });
  }

  if (urgentCampaign) {
    alerts.push({
      id: `urgent-${urgentCampaign.id}`,
      title: 'Campaign deadline approaching',
      detail: `${urgentCampaign.title} has ${urgentCampaign.daysLeft} day${urgentCampaign.daysLeft === 1 ? '' : 's'} left.`,
      severity: 'warning',
    });
  }

  if (underTarget) {
    alerts.push({
      id: `under-target-${underTarget.id}`,
      title: 'Campaign below expected progress',
      detail: `${underTarget.title} is at ${Math.round(underTarget.progress)}% with the deadline close.`,
      severity: 'info',
    });
  }

  if (highValue) {
    alerts.push({
      id: `high-value-${highValue.id}`,
      title: 'High-value gift received',
      detail: `${highValue.donorName} gave ${formatCurrency(highValue.amount)}.`,
      severity: 'success',
    });
  }

  if (!alerts.length) {
    alerts.push({
      id: 'all-clear',
      title: 'No urgent follow-up',
      detail: 'Donation and campaign activity looks steady right now.',
      severity: 'success',
    });
  }

  return alerts.slice(0, 5);
}

function getRangeStart(range: string) {
  const now = new Date();
  const days = range === '30d' ? 30 : range === '6m' ? 182 : range === '1y' ? 365 : 0;

  if (!days) {
    return null;
  }

  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
}

function normalizeStatus(value: unknown): DonationStatus {
  const status = String(value || 'succeeded').toLowerCase();

  if (['succeeded', 'success', 'completed', 'paid'].includes(status)) {
    return 'succeeded';
  }

  if (['pending', 'processing', 'open'].includes(status)) {
    return 'pending';
  }

  if (['failed', 'canceled', 'cancelled', 'declined'].includes(status)) {
    return 'failed';
  }

  return 'unknown';
}

function normalizeCampaignStatus(value: unknown, progress: number): Campaign['status'] {
  const status = String(value || '').toLowerCase();

  if (status === 'draft') {
    return 'draft';
  }

  if (status === 'completed' || progress >= 100) {
    return 'completed';
  }

  return 'active';
}

function daysUntil(value: string) {
  if (!value) {
    return 30;
  }

  const diff = new Date(value).getTime() - Date.now();
  return Math.max(Math.ceil(diff / (24 * 60 * 60 * 1000)), 0);
}

function stringValue(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function numberValue(value: unknown) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[$,]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function csvCell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}
