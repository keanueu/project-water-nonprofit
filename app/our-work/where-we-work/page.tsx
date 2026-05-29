import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMapLocationDot, faShieldHalved, faUsers, faWrench, faShield, faUser, faLocationDot } from '@fortawesome/free-solid-svg-icons';
﻿import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Where We Work | Project Water',
  description:
    'See the regions where Project Water partners with communities and local teams to deliver reliable, maintainable clean water access.',
};

const regions = [
  {
    name: 'Western Kenya',
    image: '/where2.webp',
    focus:
      'Seasonal rains and diverse terrain require solutions that protect springs, improve school access, and support long-term hygiene behavior change.',
    priorities: ['Spring protection and shallow wells', 'School and clinic water reliability', 'Local maintenance ownership'],
  },
  {
    name: 'Southeastern Kenya',
    image: '/where3.webp',
    focus:
      'Semi-arid conditions demand resilient systems such as sand dams and catchment infrastructure that can bridge dry-season stress.',
    priorities: ['Sand dams and rainwater storage', 'Water security in drought-prone settings', 'Community-led operations planning'],
  },
  {
    name: 'Western Uganda',
    image: '/where4.webp',
    focus:
      'Programs emphasize reliable access close to households while strengthening governance structures that support maintenance and accountability.',
    priorities: ['Protected points near communities', 'Village savings and repair readiness', 'Shared governance and training'],
  },
  {
    name: 'Port Loko, Sierra Leone',
    image: '/where5.webp',
    focus:
      'A concentrated network model supports rehabilitation, follow-up, and high functionality through local teams and transparent field workflows.',
    priorities: ['Well rehabilitation and reliability', 'Routine performance checks', 'Repair closure with follow-through'],
  },
];

const operatingPrinciples = [
  {
    title: 'Concentrated geography',
    description:
      'Working deeply in defined regions strengthens partner relationships and improves long-term reliability.',
    icon: faMapLocationDot,
  },
  {
    title: 'Local leadership first',
    description:
      'Programs are shaped by local teams, community voices, and practical implementation realities.',
    icon: faUsers,
  },
  {
    title: 'Stewardship after construction',
    description: 'Repair planning and monitoring are treated as core delivery commitments, not optional extras.',
    icon: faWrench,
  },
];

export default function WhereWeWorkPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/where1.webp"
            alt="Map-inspired view of regions where Project Water operates"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#091c37]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 to-[#0369a1]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Where We Work</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Focused regions. Deeper partnership. More durable results.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Project Water works across four regional programs in Kenya, Uganda, and Sierra Leone, where long-term local partnerships support reliable service over time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Regional programs</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            The Water Project is active in four geographic focus areas.
          </h2>
        </div>

        <div className="mt-10 space-y-7">
          {regions.map((region, index) => (
            <article key={region.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className={`grid gap-0 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div className="relative min-h-[270px]">
                  <Image src={region.image} alt={region.name} fill className="object-cover" />
                </div>
                <div className="p-7 sm:p-8">
                  <h3 className="text-2xl font-semibold text-[#091c37]">{region.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{region.focus}</p>
                  <ul className="mt-5 space-y-2">
                    {region.priorities.map((priority) => (
                      <li key={priority} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                        {priority}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-18 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Why this model works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
              Consistency in region builds consistency in outcomes.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {operatingPrinciples.map((item) => {
              
              return (
                <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="inline-flex rounded-2xl bg-sky-100 p-3 text-[#0369a1]">
                    <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-[#091c37]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#091c37] px-6 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Ready to explore more</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              See how these regional programs translate into measurable outcomes.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects/water/impact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-slate-100"
            >
              View impact
              <FontAwesomeIcon icon={faShieldHalved} className="h-4 w-4" />
            </Link>
            <Link
              href="/take-action/donate"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Donate now
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
