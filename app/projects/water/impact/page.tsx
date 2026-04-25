'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarClock, CheckCircle2, FileSearch, HeartPulse, ShieldCheck, Wrench } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type StoryCard = {
  image: string;
  person: string;
  location: string;
  headline: string;
  quote: string;
  result: string;
};

const outcomeStats = [
  {
    value: '95%+',
    label: 'Target water-point functionality',
    detail: 'Performance is tracked and repair response is planned in advance.',
    icon: Wrench,
  },
  {
    value: '100%',
    label: 'Project-level reporting commitment',
    detail: 'Donors can follow where support goes and what outcomes are delivered.',
    icon: FileSearch,
  },
  {
    value: '600+',
    label: 'Communities reached across focus regions',
    detail: 'Long-term partnership enables deeper support over time.',
    icon: HeartPulse,
  },
  {
    value: '5+ years',
    label: 'Repair and continuity planning horizon',
    detail: 'Reliability is designed into project stewardship from the start.',
    icon: ShieldCheck,
  },
];

const stories: StoryCard[] = [
  {
    image: '/stories.jpg',
    person: 'Marvin',
    location: 'Rwebigwara Community, Uganda',
    headline: 'Safer collection for children',
    quote:
      'Before the project, children collected water from unsafe sources. The new water point reduced fear and daily health risk for families.',
    result: 'Nearby protected access has improved routine safety for school-age children.',
  },
  {
    image: '/stories1.webp',
    person: 'School staff and students',
    location: 'Gisambai Primary School, Kenya',
    headline: 'Water access that supports learning',
    quote:
      'Reliable water at school reduced disruption and helped students focus on attendance and classroom activity.',
    result: 'Improved source reliability supports school operations throughout the year.',
  },
  {
    image: '/stories2.jpg',
    person: 'Godfrey',
    location: 'Miramura Community, Uganda',
    headline: 'Less burden, more productive time',
    quote:
      'Long-distance collection used to absorb valuable hours and create avoidable risk. Local access changed that daily reality.',
    result: 'Families now retain more time for work, caregiving, and school support.',
  },
  {
    image: '/stories3.jpg',
    person: 'Catherine',
    location: 'Kiyonza-Kyamukudumi, Uganda',
    headline: 'Dignity restored for older residents',
    quote:
      'For older adults, reduced travel distance can be the difference between dependence and dignity.',
    result: 'Improved source proximity has reduced physical burden for elderly residents.',
  },
];

const reportingCadence = [
  {
    title: 'Field status updates',
    body: 'Teams log functionality, observations, and maintenance needs through routine checks.',
  },
  {
    title: 'Photo and location verification',
    body: 'Progress is documented with visual and location evidence tied to each project record.',
  },
  {
    title: 'Repair tracking and closure',
    body: 'When issues are detected, response workflows track repair completion and follow-up.',
  },
  {
    title: 'Donor-facing reporting',
    body: 'Supporters receive outcome visibility focused on functionality, stewardship, and continuity.',
  },
];

export default function WaterImpactPage() {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/storiestop.webp"
            alt="Community members standing near a clean water source"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#091c37]/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 via-[#0c4a6e]/65 to-[#0369a1]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Water Impact</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Impact is more than installation numbers. It is reliable service over time.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            We track whether systems keep working, whether communities can maintain them, and whether donors can verify outcomes with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/take-action/donate"
              className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-[#08203d] transition hover:bg-sky-300"
            >
              Support this impact
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/our-work/stories"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Read more stories
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {outcomeStats.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <span className="inline-flex rounded-2xl bg-sky-100 p-2.5 text-[#0369a1]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[#091c37]">{item.value}</p>
                <h2 className="mt-2 text-lg font-semibold text-[#091c37]">{item.label}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-18 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Before and after</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
              Transformation is visible when reliability becomes part of daily life.
            </h2>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={showAfter ? 'after' : 'before'}
                    initial={{ opacity: 0.2, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.15, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={showAfter ? '/home1.jpg' : '/crisis1.jpg'}
                      alt={showAfter ? 'Clean protected water point after project completion' : 'Unsafe open water source before project completion'}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                    showAfter ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}
                >
                  {showAfter ? 'After' : 'Before'}
                </span>

                <p className="absolute bottom-4 left-4 text-sm font-semibold text-white">Rwebigwara Community, Uganda</p>
              </div>

              <div className="flex items-center justify-between gap-4 p-4">
                <p className="text-sm text-slate-600">
                  {showAfter
                    ? 'Reliable nearby access reduces collection risk and improves daily continuity.'
                    : 'Unprotected sources increase health risk and consume significant household time.'}
                </p>
                <button
                  type="button"
                  onClick={() => setShowAfter((value) => !value)}
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0c4a6e] transition hover:border-sky-200 hover:bg-sky-50"
                >
                  {showAfter ? 'Show before' : 'Show after'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {reportingCadence.map((item, index) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-sky-700">Step {index + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold text-[#091c37]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">From communities</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            Stories that show what service continuity means in real life.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <article key={story.person + story.location} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-56">
                <Image src={story.image} alt={story.headline} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-3 left-4 text-sm font-semibold text-white">{story.location}</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#091c37]">{story.headline}</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">{story.person}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{story.quote}</p>
                <p className="mt-4 rounded-xl bg-sky-50 px-4 py-3 text-sm font-medium text-[#0c4a6e]">{story.result}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#091c37] px-6 py-18 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Accountable progress</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Supporters deserve evidence, not assumptions.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            Our reporting model is built to connect giving with outcomes. We prioritize transparent stewardship, functional performance, and real-world continuity.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/take-action/donate"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-slate-100"
            >
              Donate now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/our-work/stories"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Read field stories
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-200">
            <CalendarClock className="h-4 w-4 text-sky-200" />
            <span>Field reporting cadence is maintained to protect long-term functionality.</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-sky-200" />
            <span>Repair closure tracking helps ensure infrastructure stays operational.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
