import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faDroplet, faShieldHalved, faShield } from '@fortawesome/free-solid-svg-icons';
﻿import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Water Crisis Deep Dive | Project Water',
  description:
    'A focused look at how unsafe water access affects health, time, and community stability, and what durable response looks like.',
};

const crisisDimensions = [
  {
    title: 'Health exposure',
    description:
      'Unsafe sources raise preventable disease risk and pressure local clinics and households.',
    icon: faShieldHalved,
  },
  {
    title: 'Time burden',
    description:
      'Long collection trips remove hours from school, work, and caregiving.',
    icon: faClock,
  },
  {
    title: 'Service instability',
    description:
      'Short-term fixes without maintenance pathways often fail communities over time.',
    icon: faDroplet,
  },
];

const fieldSnapshots = [
  {
    title: 'Collection distance and risk',
    image: '/top.jpg',
    summary: 'Daily travel to water sources increases safety and health vulnerability, especially for women and children.',
  },
  {
    title: 'Infrastructure gaps',
    image: '/project.jpg',
    summary: 'Communities can remain underserved when systems are installed without long-term repair readiness.',
  },
  {
    title: 'Opportunity loss',
    image: '/img1home.webp',
    summary: 'Time spent searching for water often replaces time for school attendance and stable livelihoods.',
  },
];

export default function WaterCrisisPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/crisistop.webp" alt="Community collecting water in difficult conditions" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#091c37]/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 to-[#0369a1]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Issue Deep Dive</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The water crisis is not one problem. It is a chain of interconnected burdens.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Health, time, education, and economic stability are tightly linked to whether clean water is nearby and reliable.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-18 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">What communities face</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            Unsafe access affects daily life long before and long after collection.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Water insecurity is a systemic condition. The strongest responses combine infrastructure with community ownership, maintenance, and follow-up visibility.
          </p>

          <div className="mt-7 space-y-4">
            {crisisDimensions.map((item) => {
              
              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex rounded-xl bg-sky-100 p-2 text-[#0369a1]">
                      <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
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

        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <Image
            src="/crisis2.jpg"
            alt="Children and families navigating difficult water collection conditions"
            width={1200}
            height={900}
            className="h-[420px] w-full object-cover"
          />
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-18 sm:px-8 lg:px-12">
        <Image src="/bghead.jpg" alt="Textured water-themed background" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#091c37]/78" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Field snapshots</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Three visible patterns where systems need to improve.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {fieldSnapshots.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="relative h-48">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects/water/overview"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-slate-100"
            >
              Explore the response model
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </Link>
            <Link
              href="/take-action/donate"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Donate now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
