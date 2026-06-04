'use client';

import { faCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeAngle, faShieldHalved, faWallet, faShield, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type Frequency = 'once' | 'monthly';

const amountPresets: Record<Frequency, number[]> = {
  once: [25, 50, 100, 250, 500],
  monthly: [15, 30, 60, 120, 240],
};

const allocations = [
  { label: 'Construction and rehabilitation', percent: 54 },
  { label: 'Training and local operations', percent: 24 },
  { label: 'Monitoring and reporting', percent: 14 },
  { label: 'Program stewardship', percent: 8 },
];

const trustHighlights = [
  {
    title: 'Transparent project reporting',
    detail: 'Field updates and location-backed records support donor visibility.',
    icon: faShieldHalved,
  },
  {
    title: 'Lifecycle reliability approach',
    detail: 'Budgets include monitoring and repair pathways, not only installation.',
    icon: faWallet,
  },
  {
    title: 'Community-led implementation',
    detail: 'Local teams shape project delivery and long-term maintenance ownership.',
    icon: faHandshakeAngle,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function getImpactSummary(amount: number, frequency: Frequency) {
  if (amount <= 0) {
    return {
      headline: 'Choose an amount to preview estimated impact.',
      body: 'Your gift supports reliable water access through implementation, local training, and repair continuity.',
    };
  }

  const annualizedAmount = frequency === 'monthly' ? amount * 12 : amount;

  if (annualizedAmount < 150) {
    return {
      headline: 'Your support helps fund high-need essentials.',
      body: 'Smaller gifts contribute to construction materials, hygiene supplies, and reliable service continuity.',
    };
  }

  if (annualizedAmount < 600) {
    return {
      headline: 'Your support helps strengthen a community water point.',
      body: 'Mid-range support helps cover implementation tasks and local maintenance readiness.',
    };
  }

  if (annualizedAmount < 2000) {
    return {
      headline: 'Your support helps scale durable reliability.',
      body: 'This level can support project phases such as field coordination, monitoring, and repair preparation.',
    };
  }

  return {
    headline: 'Your support can anchor a major program milestone.',
    body: 'Higher contributions help unlock construction, training, and reporting capacity at meaningful scale.',
  };
}

export default function DonatePage() {
  const { user } = useAuth();
  const [frequency, setFrequency] = useState<Frequency>('once');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  // Database insertion states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dbError, setDbError] = useState('');

  const activeAmount = selectedAmount ?? (customAmount ? Number(customAmount) : 0);
  const impactSummary = useMemo(() => getImpactSummary(activeAmount, frequency), [activeAmount, frequency]);

  useEffect(() => {
    if (user) {
      setName(`${user.firstName || ''} ${user.lastName || ''}`.trim());
      setEmail(user.email || '');
    }
  }, [user]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Restore donation selection when redirected back via `next` query params
  useEffect(() => {
    try {
      const amount = searchParams?.get('amount');
      const custom = searchParams?.get('custom');
      const freq = searchParams?.get('frequency');
      const show = searchParams?.get('showPreview');

      if (freq === 'monthly' || freq === 'once') setFrequency(freq as Frequency);
      if (amount) setSelectedAmount(Number(amount));
      if (custom) setCustomAmount(custom);
      if (show === '1') setShowPreview(true);
    } catch (e) {
      // noop
    }
  }, [searchParams]);

  const estimatedPeople = useMemo(() => {
    if (activeAmount <= 0) {
      return 0;
    }

    const annualizedAmount = frequency === 'monthly' ? activeAmount * 12 : activeAmount;
    return Math.max(Math.floor(annualizedAmount / 34), 1);
  }, [activeAmount, frequency]);

  const submitDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbError('');
    setSubmitting(true);

    // Require authentication before attempting to save or create a checkout session
    if (!user) {
      setSubmitting(false);
      const target = `${pathname}?amount=${selectedAmount ?? ''}&custom=${encodeURIComponent(customAmount)}&frequency=${frequency}&showPreview=1`;
      router.push(`/login?next=${encodeURIComponent(target)}`);
      return;
    }

    try {
      // Attach authenticated user's id when available so RLS policies
      // that require ownership (e.g. new.user_id = auth.uid()) pass.
      const { data: sbUserData } = await supabase.auth.getUser();
      const sbUser = sbUserData?.user;

      const insertPayload: any = {
        name,
        email,
        amount: activeAmount,
        message,
      };

      if (sbUser?.id) insertPayload.user_id = sbUser.id;

      // Helper to safely parse JSON responses and fall back to text on HTML errors
      const parseApiResponse = async (res: Response) => {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          return res.json();
        }
        // Return text for non-JSON responses so we can show a helpful error
        const txt = await res.text();
        throw new Error(`Unexpected non-JSON response: ${txt.slice(0, 200)}`);
      };

      // Use server-side endpoint to perform the insert with the service role key
      // so Row Level Security (RLS) policies don't block the operation.
      const insertRes = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(insertPayload),
      });

      let insertJson: any = null;
      try {
        insertJson = await parseApiResponse(insertRes);
      } catch (parseErr: any) {
        // Network or non-JSON body (likely HTML error page). Surface helpful error.
        setDbError(parseErr?.message || 'Failed to parse donation API response');
        setSubmitting(false);
        return;
      }

      let error = insertJson?.error ? { message: insertJson.error } : null;

      // If the insert failed because the `user_id` column doesn't exist in the
      // database schema, retry the insert without that field so anonymous
      // donations still work until the schema is updated.

      if (error) {
        const msg = String(error.message || '').toLowerCase();
        const isMissingUserId = msg.includes('user_id') && (msg.includes('schema') || msg.includes('does not exist') || msg.includes('could not find'));
        if (isMissingUserId) {
          console.warn('donations.user_id column missing; retrying insert without user_id via server endpoint');
          const retryRes = await fetch('/api/donations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, amount: activeAmount, message }),
          });
          const retryJson = await retryRes.json();
          error = retryJson?.error ? { message: retryJson.error } : null;
        }
      }

      if (error) {
        setDbError(error.message);
      } else {
        // Create Stripe Checkout session and redirect
        try {
          const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: activeAmount,
              description: `Donation by ${name || email}`,
              email,
              name,
              message,
              user_id: insertPayload?.user_id,
            }),
          });

          let data: any = null;
          try {
            data = await parseApiResponse(res);
          } catch (parseErr: any) {
            setDbError(parseErr?.message || 'Failed to parse checkout response');
            setIsSubmitted(true);
            return;
          }

          if (data?.url) {
            // redirect to Stripe Checkout
            window.location.href = data.url;
            return; // stop further processing — user is leaving page
          } else {
            setDbError(data?.error || 'Failed to create checkout session.');
            setIsSubmitted(true);
          }
        } catch (err: any) {
          setDbError(err?.message || 'Checkout error');
          setIsSubmitted(true);
        }
      }
    } catch (err: any) {
      setDbError(err?.message || 'Failed to save donation to database.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/formtop.avif"
            alt="Community members celebrating clean water access"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#091c37]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 to-[#0369a1]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Donate</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Fund clean water systems that stay reliable over time.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Your contribution supports complete delivery: construction, local training, monitoring, and repair continuity.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-18 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Why giving here is different</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            We prioritize proven delivery and transparent follow-through.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Water access should not stop at construction day. We invest in the systems and local capabilities needed to keep water flowing consistently for the communities served.
          </p>

          <div className="mt-8 space-y-4">
            {trustHighlights.map((item) => {
              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex rounded-xl bg-sky-100 p-2 text-[#0369a1]">
                      <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-[#091c37]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Allocation transparency</p>
            <h3 className="mt-2 text-xl font-semibold text-[#091c37]">How gifts are applied</h3>
            <div className="mt-5 space-y-4">
              {allocations.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="font-semibold text-[#0c4a6e]">{item.percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-gradient-to-r from-[#0369a1] to-[#0ea5e9]" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-[#091c37] p-6 text-white shadow-xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Gift builder</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Choose your support level</h2>

          <div className="mt-6 inline-flex rounded-full border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => {
                setFrequency('once');
                setSelectedAmount(100);
                setCustomAmount('');
                setShowPreview(false);
                setIsSubmitted(false);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                frequency === 'once' ? 'bg-white text-[#091c37]' : 'text-slate-200 hover:text-white'
              }`}
            >
              One-time
            </button>
            <button
              type="button"
              onClick={() => {
                setFrequency('monthly');
                setSelectedAmount(60);
                setCustomAmount('');
                setShowPreview(false);
                setIsSubmitted(false);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                frequency === 'monthly' ? 'bg-white text-[#091c37]' : 'text-slate-200 hover:text-white'
              }`}
            >
              Monthly
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {amountPresets[frequency].map((amount) => (
              <button
                key={`${frequency}-${amount}`}
                type="button"
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                  setShowPreview(false);
                  setIsSubmitted(false);
                }}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  selectedAmount === amount
                    ? 'border-sky-300 bg-sky-400 text-[#08203d]'
                    : 'border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10'
                }`}
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <label htmlFor="custom-amount" className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">
              Custom amount
            </label>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold">$</span>
              <input
                id="custom-amount"
                type="text"
                inputMode="numeric"
                value={customAmount}
                onChange={(event) => {
                  const sanitized = event.target.value.replace(/[^0-9]/g, '');
                  setCustomAmount(sanitized);
                  setSelectedAmount(null);
                  setShowPreview(false);
                  setIsSubmitted(false);
                }}
                placeholder="Enter amount"
                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-300 focus:border-sky-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">Estimated impact</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{impactSummary.headline}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-200">{impactSummary.body}</p>
            {activeAmount > 0 && (
              <p className="mt-3 text-sm font-medium text-sky-100">
                Estimated reach: about {estimatedPeople} {estimatedPeople === 1 ? 'person' : 'people'} supported through annualized giving assumptions.
              </p>
            )}
          </div>

          {!showPreview && (
            <button
              type="button"
              disabled={activeAmount <= 0}
              onClick={() => {
                if (!user) {
                  // preserve current selection in the `next` URL so we can restore after sign-in
                  const target = `${pathname}?amount=${selectedAmount ?? ''}&custom=${encodeURIComponent(customAmount)}&frequency=${frequency}&showPreview=1`;
                  router.push(`/login?next=${encodeURIComponent(target)}`);
                  return;
                }
                setShowPreview(true);
              }}
              className="mt-6 w-full rounded-xl bg-sky-400 px-4 py-3 text-sm font-semibold text-[#08203d] transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {activeAmount > 0
                ? `Continue with ${frequency === 'monthly' ? `${formatCurrency(activeAmount)}/month` : formatCurrency(activeAmount)}`
                : 'Select an amount to continue'}
            </button>
          )}

          {showPreview && activeAmount > 0 && !isSubmitted && (
            <form onSubmit={submitDonation} className="mt-6 space-y-4 border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white">Complete your donation</h3>
              
              {dbError && (
                <div className="rounded-xl border border-red-300/30 bg-red-400/10 p-3 text-sm text-red-200">
                  {dbError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-sky-200 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ken"
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-sky-200 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ken@gmail.com"
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-sky-200 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hope this helps!"
                  rows={2}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:border-sky-200 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-4 py-3 text-sm font-semibold text-[#08203d] transition hover:bg-sky-300 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  `Donate ${formatCurrency(activeAmount)}`
                )}
              </button>
            </form>
          )}

          {isSubmitted && (
            <div className="mt-6 rounded-2xl border border-emerald-300/40 bg-emerald-400/10 p-5 text-sm text-emerald-100 space-y-3">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-emerald-300" />
                <p className="font-semibold text-base text-emerald-300">Donation saved!</p>
              </div>
              <p className="text-emerald-50">
                Thank you, <span className="font-semibold">{name}</span>! Your {frequency === 'monthly' ? 'Monthly' : 'One-time'} gift of{' '}
                <span className="font-semibold">{formatCurrency(activeAmount)}</span> has been successfully logged to our Supabase database.
              </p>
              <p className="text-xs text-emerald-200">
                Your generosity directly supports sustainable clean water infrastructure and community empowerment.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setShowPreview(false);
                  setSelectedAmount(100);
                  setCustomAmount('');
                  setMessage('');
                }}
                className="mt-2 w-full rounded-xl border border-emerald-300/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-50 hover:bg-emerald-300/10 transition"
              >
                Make another gift
              </button>
            </div>
          )}

          <p className="mt-5 text-center text-xs text-slate-300">
            Project Water is a registered 501(c)(3) nonprofit. Gifts are tax-deductible to the extent allowed by law.
          </p>
        </div>
      </section>
    </main>
  );
}
