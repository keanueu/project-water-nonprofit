import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBriefcase, faClock, faEarthAmericas, faHeartPulse, faShieldHalved, faWrench, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Water Crisis Overview | Project Water',
  description:
    'Understand the scope of the water crisis, where Project Water works, and how transparent long-term solutions create durable change.',
};

const headlineStats = [
  {
    value: '785M',
    label: 'People still lack safe drinking water',
    detail: 'Reliable water access remains one of the most urgent global equity gaps.',
    icon: faEarthAmericas,
  },
  {
    value: '6 HRS',
    label: 'Average collection burden each day',
    detail: 'Long walks for water remove time from school, work, and family care.',
    icon: faClock,
  },
  {
    value: '80%',
    label: 'Water-related illness in vulnerable settings',
    detail: 'Unsafe sources increase preventable disease and long-term health costs.',
    icon: faHeartPulse,
  },
  {
    value: '95%',
    label: 'Target functionality through repair planning',
    detail: 'Maintenance strategy is designed as part of each project, not after.',
    icon: faWrench,
  },
];

const crisisImpacts = [
  {
    title: 'Education and childhood',
    description:
      'When children spend hours collecting water, attendance and classroom focus drop. Nearby safe water returns time to learning and rest.',
    proof: 'Schools with reliable sources report stronger attendance retention year-round.',
    icon: faGraduationCap,
  },
  {
    title: 'Family health outcomes',
    description:
      'Unsafe sources increase exposure to pathogens and recurring illness. Clean water reduces preventable disease and clinic burden.',
    proof: 'Safe-point access lowers household illness risk and improves daily resilience.',
    icon: faShieldHalved,
  },
  {
    title: 'Economic opportunity',
    description:
      'Lost time and health costs reduce household income capacity. Reliable water supports productivity, small business, and local agriculture.',
    proof: 'Communities report more hours available for work and income-generating activity.',
    icon: faBriefcase,
  },
];

const regionalFocus = [
  {
    region: 'Western Kenya',
    challenge: 'Seasonal source instability and unsafe collection points near schools and households.',
    response: 'Spring protection, shallow wells, and community governance for long-term ownership.',
  },
  {
    region: 'Southeastern Kenya',
    challenge: 'Semi-arid conditions and long dry periods that stress household access.',
    response: 'Sand dams, rainwater catchment, and context-specific storage planning.',
  },
  {
    region: 'Western Uganda',
    challenge: 'Distance, source contamination risk, and service reliability during peak demand.',
    response: 'Protected points, local repair pathways, and village-level maintenance training.',
  },
  {
    region: 'Port Loko, Sierra Leone',
    challenge: 'Legacy infrastructure and recurring breakdowns without clear repair accountability.',
    response: 'Rehabilitation, monitoring cadence, and practical maintenance follow-through.',
  },
];

const fundAllocation = [
  {
    label: 'Water point construction and rehabilitation',
    percent: 54,
  },
  {
    label: 'Training, maintenance, and local operations',
    percent: 24,
  },
  {
    label: 'Monitoring, field reporting, and transparency',
    percent: 14,
  },
  {
    label: 'Program support and stewardship',
    percent: 8,
  },
];

const reliabilityLoop = [
  {
    title: 'Assess with local partners',
    body: 'Each project starts with local context, not generic templates.',
  },
  {
    title: 'Build the right solution',
    body: 'Technology is matched to geography, population, and maintenance reality.',
  },
  {
    title: 'Train and hand over responsibly',
    body: 'Communities receive practical governance and maintenance support.',
  },
  {
    title: 'Monitor and repair',
    body: 'Performance data and field follow-up keep water systems functional over time.',
  },
];

export default function WaterOverviewPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/water.webp"
            alt="Women and children collecting clean water from a community source"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#091c37]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 via-[#0c4a6e]/70 to-[#0369a1]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Water Project Overview</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The water crisis is massive, but the path to durable progress is clear.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Project Water focuses on practical, verifiable solutions with local partners. We prioritize technologies that can be maintained and reporting that can be trusted.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects/water/solutions"
              className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-[#08203d] transition hover:bg-sky-300"
            >
              Explore solutions
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </Link>
            <Link
              href="/take-action/donate"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Donate now
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {headlineStats.map((stat) => {
            return (
              <article key={stat.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="inline-flex rounded-2xl bg-sky-100 p-2.5 text-[#0369a1]">
                  <FontAwesomeIcon icon={stat.icon} className="h-5 w-5" />
                </div>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[#091c37]"><span className="numbers">{stat.value}</span></p>
                <h2 className="mt-2 text-lg font-semibold text-[#091c37]">{stat.label}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{stat.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-18 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">What is at stake</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
              Access to clean water shapes health, education, and economic stability.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {crisisImpacts.map((item) => {
              return (
                <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="inline-flex rounded-2xl bg-slate-100 p-3 text-[#0c4a6e]">
                    <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[#091c37]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <p className="mt-4 rounded-xl bg-sky-50 px-4 py-3 text-sm font-medium text-[#0c4a6e]">{item.proof}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Regional focus</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            Concentrated geography, deeper long-term partnership.
          </h2>
          <div className="mt-8 space-y-4">
            {regionalFocus.map((item) => (
              <article key={item.region} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-[#091c37]">{item.region}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  <span className="font-semibold text-slate-700">Challenge:</span> {item.challenge}
                </p>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  <span className="font-semibold text-slate-700">Response:</span> {item.response}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <Image
              src="/where1.webp"
              alt="Community members at a clean water point"
              width={1000}
              height={760}
              className="h-[280px] w-full object-cover"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Gift allocation model</p>
            <h3 className="mt-2 text-xl font-semibold text-[#091c37]">How support is applied</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              We budget for complete life-cycle impact: build quality, training, monitoring, and repair readiness.
            </p>
            <div className="mt-5 space-y-4">
              {fundAllocation.map((item) => (
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
      </section>

      <section className="bg-[#091c37] px-6 py-18 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Reliability loop</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              We are not just funding installations. We are funding functionality.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reliabilityLoop.map((item, index) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-sky-200">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-200">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects/water/impact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-slate-100"
            >
              See measured impact
              <FontAwesomeIcon icon={faShieldHalved} className="h-4 w-4" />
            </Link>
            <Link
              href="/take-action/donate"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Support this work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
