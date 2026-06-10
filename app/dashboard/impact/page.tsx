'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDroplet,
  faGlobe,
  faUsers,
  faSpinner,
  faMapMarkerAlt,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import TextWithNumbers from '../../../components/TextWithNumbers';

interface DonationRecord {
  id: string;
  amount: number;
  created_at: string;
}

export default function ImpactPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

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
  }, [user, router]);

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
  const peopleReached = Math.max(Math.floor(totalDonated / 34), 0);
  const communitiesImpacted = Math.max(Math.floor(donations.length / 3), 1);
  const waterPointsFunded = Math.max(Math.floor(totalDonated / 5000), 0);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sky-600 h-8 w-8" />
          <p className="text-sm font-semibold text-slate-500">Loading your impact...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#091c37]">Your Impact</h1>
            <p className="text-slate-600 mt-2">See the real-world change your generosity is creating</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Impact Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">People Reached</p>
                <p className="mt-1 text-3xl font-bold text-slate-900 numbers">~{peopleReached}</p>
                <p className="mt-1 text-xs text-slate-500">With clean water access</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <FontAwesomeIcon icon={faGlobe} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Communities</p>
                <p className="mt-1 text-3xl font-bold text-slate-900 numbers">{communitiesImpacted}</p>
                <p className="mt-1 text-xs text-slate-500">Impacted by your support</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                <FontAwesomeIcon icon={faDroplet} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Water Points</p>
                <p className="mt-1 text-3xl font-bold text-slate-900 numbers">{waterPointsFunded}</p>
                <p className="mt-1 text-xs text-slate-500">Funded or co-funded</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Countries</p>
                <p className="mt-1 text-3xl font-bold text-slate-900 numbers">3</p>
                <p className="mt-1 text-xs text-slate-500">Where your support works</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Map Placeholder */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#091c37] mb-4">Geographic Impact</h2>
          <div className="aspect-[16/9] bg-slate-100 rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-3">
              <FontAwesomeIcon icon={faGlobe} className="h-12 w-12 text-slate-300" />
              <p className="text-slate-500 font-medium">Interactive map coming soon</p>
              <p className="text-sm text-slate-400">Track projects by location</p>
            </div>
          </div>
        </div>

        {/* Project Updates */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#091c37] mb-4">Recent Project Updates</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'New Well Completed in Mwanza',
                  date: '2 days ago',
                  description: 'Clean water is now flowing for 450 community members.',
                },
                {
                  title: 'Spring Protection in Kakamega',
                  date: '1 week ago',
                  description: 'Protected spring now serving 280 people daily.',
                },
                {
                  title: 'Rainwater System Installed',
                  date: '2 weeks ago',
                  description: 'School of 350 students now has reliable water access.',
                },
              ].map((update, i) => (
                <div key={i} className="border-l-4 border-sky-500 pl-4 py-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[#091c37]">{update.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{update.description}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{update.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#091c37] mb-4">Field Photos</h2>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faImage} className="h-8 w-8 text-slate-300" />
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center">
              Photos from supported projects will appear here
            </p>
          </div>
        </div>

        {/* Impact Timeline */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#091c37] mb-6">Your Giving Timeline</h2>
          <div className="space-y-6">
            {donations.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No donations yet</p>
            ) : (
              donations.slice(0, 5).map((donation, i) => (
                <div key={donation.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[#091c37]">
                        <span className="numbers">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(donation.amount)}
                        </span> donation
                      </p>
                      <p className="text-sm text-slate-500">
                        <TextWithNumbers>{new Date(donation.created_at).toLocaleDateString()}</TextWithNumbers>
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">Supporting clean water initiatives</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
