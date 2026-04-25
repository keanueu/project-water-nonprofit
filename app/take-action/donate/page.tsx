'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, HeartHandshake, ShieldCheck, Wallet } from 'lucide-react';

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
    icon: ShieldCheck,
  },
  {
    title: 'Lifecycle reliability approach',
    detail: 'Budgets include monitoring and repair pathways, not only installation.',
    icon: Wallet,
  },
  {
    title: 'Community-led implementation',
    detail: 'Local teams shape project delivery and long-term maintenance ownership.',
    icon: HeartHandshake,
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
  const [frequency, setFrequency] = useState<Frequency>('once');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const activeAmount = selectedAmount ?? (customAmount ? Number(customAmount) : 0);
  const impactSummary = useMemo(() => getImpactSummary(activeAmount, frequency), [activeAmount, frequency]);

  const estimatedPeople = useMemo(() => {
    if (activeAmount <= 0) {
      return 0;
    }

    const annualizedAmount = frequency === 'monthly' ? activeAmount * 12 : activeAmount;
    return Math.max(Math.floor(annualizedAmount / 34), 1);
  }, [activeAmount, frequency]);

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
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex rounded-xl bg-sky-100 p-2 text-[#0369a1]">
                      <Icon className="h-4 w-4" />
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

          <button
            type="button"
            disabled={activeAmount <= 0}
            onClick={() => setShowPreview(true)}
            className="mt-6 w-full rounded-xl bg-sky-400 px-4 py-3 text-sm font-semibold text-[#08203d] transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {activeAmount > 0
              ? `Continue with ${frequency === 'monthly' ? `${formatCurrency(activeAmount)}/month` : formatCurrency(activeAmount)}`
              : 'Select an amount to continue'}
          </button>

          {showPreview && activeAmount > 0 && (
            <div className="mt-5 rounded-2xl border border-emerald-300/40 bg-emerald-400/10 p-4 text-sm text-emerald-100">
              <p className="font-semibold">Selection saved</p>
              <p className="mt-1">
                {frequency === 'monthly' ? 'Monthly' : 'One-time'} gift of{' '}
                <span className="font-semibold">
                  {frequency === 'monthly' ? `${formatCurrency(activeAmount)}/month` : formatCurrency(activeAmount)}
                </span>{' '}
                is ready.
              </p>
              <p className="mt-2 text-emerald-50">In a production flow, this is where secure payment checkout would start.</p>
              <div className="mt-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-50 transition hover:bg-emerald-200/15"
                >
                  Share giving intent
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </Link>
              </div>
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
