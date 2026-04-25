import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  Handshake,
  LineChart,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How We Work | Project Water',
  description:
    'Learn how Project Water delivers reliable water systems through local partnerships, practical implementation, and transparent stewardship.',
};

const operatingModel = [
  {
    title: 'Local partnership and listening',
    description:
      'We co-design programs with local organizations that know the geography, governance dynamics, and social context best.',
    icon: Handshake,
  },
  {
    title: 'Context-fit solution planning',
    description:
      'Technology is selected based on hydrogeology, population demand, and maintenance feasibility instead of one-size-fits-all assumptions.',
    icon: Sparkles,
  },
  {
    title: 'Implementation with community ownership',
    description:
      'Construction is paired with training for local committees and practical responsibility for long-term system care.',
    icon: Users,
  },
  {
    title: 'Monitoring and continuous repair',
    description:
      'Functionality checks and repair workflows keep water points operational well beyond initial commissioning.',
    icon: Wrench,
  },
];

const integrityPoints = [
  {
    title: 'Full-cost stewardship',
    body: 'Budgets account for design, implementation, training, monitoring, and repair response.',
  },
  {
    title: 'Evidence-driven reporting',
    body: 'Field updates, photos, and performance data help supporters verify progress over time.',
  },
  {
    title: 'Long-term reliability focus',
    body: 'Success is measured by continuing service, not launch-day visibility.',
  },
];

const capabilityAreas = [
  {
    title: 'Training and local capacity',
    description:
      'We invest in practical training that helps local teams maintain systems, manage decisions, and respond to issues quickly.',
    icon: BookOpenCheck,
  },
  {
    title: 'Program performance management',
    description:
      'Monitoring structures support better prioritization, clearer accountability, and stronger continuity in service delivery.',
    icon: LineChart,
  },
  {
    title: 'Transparent governance habits',
    description:
      'Clear process and visible reporting help preserve trust between communities, local partners, and supporters.',
    icon: ShieldCheck,
  },
];

export default function HowWeWorkPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/how1.jpg"
            alt="Project team working with community members on a water system"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#091c37]/68" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 to-[#0369a1]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">How We Work</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Reliable water systems require leadership, trust, and disciplined follow-through.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Our model combines local partnership, practical design, and transparent stewardship so projects can continue delivering value long after construction is complete.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Operating model</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            Four delivery commitments behind every program.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {operatingModel.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
                <span className="inline-flex rounded-2xl bg-sky-100 p-3 text-[#0369a1]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[#091c37]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-18 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Capability building</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
              People are at the center of sustained water access.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              We equip local teams with tools, training, and governance support so they can operate systems with confidence and respond quickly when service risks appear.
            </p>

            <div className="mt-7 space-y-4">
              {capabilityAreas.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex rounded-xl bg-slate-100 p-2 text-[#0c4a6e]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-[#091c37]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <Image
                src="/howwe1.jpg"
                alt="Community leaders and field teams reviewing maintenance plans"
                width={1000}
                height={820}
                className="h-[320px] w-full object-cover"
              />
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Integrity and transparency</p>
              <h3 className="mt-2 text-xl font-semibold text-[#091c37]">Counting full project reality</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                We do not frame low-cost installs as complete solutions. Responsible delivery includes total life-cycle cost, maintenance pathways, and verified reporting.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {integrityPoints.map((item) => (
                  <li key={item.title} className="rounded-xl bg-slate-50 px-4 py-3">
                    <span className="font-semibold text-slate-700">{item.title}:</span> {item.body}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#091c37] px-6 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">What this enables</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Better local systems. Stronger accountability. Longer-lasting outcomes.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects/water/solutions"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-slate-100"
            >
              Explore solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/take-action/donate"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Support the mission
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
