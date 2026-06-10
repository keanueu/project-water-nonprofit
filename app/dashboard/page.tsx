'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHandHoldingHeart, 
  faDroplet, 
  faGlobe, 
  faSpinner, 
  faArrowRight, 
  faUser, 
  faEnvelope, 
  faCalendarDays,
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/lib/auth-context';
import TextWithNumbers from '../../components/TextWithNumbers';
import { supabase } from '@/lib/supabase';

interface DonationRecord {
  id: string;
  name: string;
  email: string;
  amount: number;
  message?: string;
  created_at: string;
}

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchDonations = async () => {
      try {
        const { data, error } = await supabase
          .from('donations')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setDonations(data);
        }
      } catch (err) {
        console.error('Error fetching donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user]);

  const totalDonated = donations.reduce((sum, item) => sum + item.amount, 0);
  const estimatedImpact = Math.max(Math.floor(totalDonated / 34), 0);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white text-slate-900">
        <div className="text-center space-y-4">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sky-600 h-8 w-8" />
          <p className="text-sm font-semibold tracking-wider text-slate-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50/50 text-[#091c37] py-12 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Welcome Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-[#0c4a6e] p-8 text-white shadow-md">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex rounded-full bg-sky-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300">
              Donor Portal
            </span>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome back, {user.firstName || user.email.split('@')[0]}!
            </h1>
            <p className="text-slate-300 leading-relaxed max-w-2xl">
              Thank you for partnering with us to deliver durable, sustainable clean water systems. 
              Here is your personal impact and giving snapshot.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <FontAwesomeIcon icon={faHandHoldingHeart} className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Contribution</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 numbers">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalDonated)}
              </p>
              <p className="mt-1 text-xs text-slate-500">Across <span className="numbers">{donations.length}</span> {donations.length === 1 ? 'gift' : 'gifts'}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <FontAwesomeIcon icon={faDroplet} className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Reach</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">~<span className="numbers">{estimatedImpact}</span> People</p>
              <p className="mt-1 text-xs text-slate-500">Supported with reliable water access</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <FontAwesomeIcon icon={faGlobe} className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Account Role</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 capitalize">{user.role}</p>
              <p className="mt-1 text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Donation list */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* History List */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#091c37]">My Donations</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                <span className="numbers">{donations.length}</span> records
              </span>
            </div>

            {donations.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-slate-500">You haven&apos;t made any donations with this email address yet.</p>
                <Link
                  href="/take-action/donate"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  Make your first donation
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto pr-2">
                {donations.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-slate-900 numbers">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.amount)}
                      </p>
                      {item.message && (
                        <p className="text-sm italic text-slate-500 font-medium">
                          &ldquo;{item.message}&rdquo;
                        </p>
                      )}
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                        <FontAwesomeIcon icon={faCalendarDays} className="h-3 w-3" />
                        <TextWithNumbers>{new Date(item.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</TextWithNumbers>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4" />
                      Succeeded
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#091c37] border-b border-slate-100 pb-4">Profile & Support</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <FontAwesomeIcon icon={faUser} className="text-slate-400 h-5 w-5" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Name</p>
                  <p className="text-sm font-semibold">{user.firstName || ''} {user.lastName || ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <FontAwesomeIcon icon={faEnvelope} className="text-slate-400 h-5 w-5" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Email</p>
                  <p className="text-sm font-semibold truncate max-w-[190px]">{user.email}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-2 space-y-3">
              <Link
                href="/dashboard/profile"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#0369a1] py-3 text-sm font-semibold text-[#0369a1] transition hover:bg-[#0369a1] hover:text-white"
              >
                <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                Edit Profile
              </Link>
              <Link
                href="/dashboard/impact"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-600 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-600 hover:text-white"
              >
                <FontAwesomeIcon icon={faDroplet} className="h-4 w-4" />
                View Impact
              </Link>
              <Link
                href="/dashboard/recurring"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-purple-600 py-3 text-sm font-semibold text-purple-600 transition hover:bg-purple-600 hover:text-white"
              >
                <FontAwesomeIcon icon={faCalendarDays} className="h-4 w-4" />
                Recurring Gifts
              </Link>
              <Link
                href="/take-action/donate"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0369a1] py-3 text-sm font-semibold text-white transition hover:bg-[#0c4a6e]"
              >
                Make a donation
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
