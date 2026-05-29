import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faKitchenSet, faDroplet, faSeedling } from '@fortawesome/free-solid-svg-icons';
﻿import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Hunger and Water Access | Project Water',
  description: 'How reliable water systems support food preparation, household nutrition, and local livelihood resilience.',
};

const hungerLinks = [
  {
    title: 'Food preparation reliability',
    description: 'Safe nearby water helps households cook consistently and safely.',
    icon: faKitchenSet,
  },
  {
    title: 'Household nutrition stability',
    description: 'Lower water stress supports healthier daily routines for children and caregivers.',
    icon: faDroplet,
  },
  {
    title: 'Livelihood support',
    description: 'Water reliability can strengthen small-scale food production and local resilience.',
    icon: faSeedling,
  },
];

export default function HungerPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hungertop.webp" alt="Family food and water context" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#091c37]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 to-[#0ea5e9]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Issue Deep Dive</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Hunger and water insecurity are tightly connected.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Reliable clean water supports nutrition, food preparation, and household resilience across everyday life.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 sm:px-8 lg:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          {hungerLinks.map((item) => {
            
            return (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <span className="inline-flex rounded-2xl bg-sky-100 p-3 text-[#0369a1]">
                  <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-xl font-semibold text-[#091c37]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-18 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-64">
              <Image src="/hungerbot.webp" alt="Household context affected by water and hunger challenges" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#091c37]">When water is scarce, household nutrition suffers.</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Water insecurity affects food preparation, meal frequency, and family health in interconnected ways.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-64">
              <Image src="/hungerpic.png" alt="Community livelihoods linked to water access" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#091c37]">Reliable water can strengthen local food resilience.</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Consistent access supports healthier routines for caregiving, nutrition, and small-scale production.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          <Link href="/take-action/learn" className="inline-flex items-center gap-2 rounded-full bg-[#0369a1] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0c4a6e]">
            Back to learning hub
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </Link>
          <Link href="/take-action/donate" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-slate-50">
            Support food and water security
          </Link>
        </div>
      </section>
    </main>
  );
}
