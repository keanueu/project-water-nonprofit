import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeartPulse, faShieldHalved, faSyringe, faShield, faHeart } from '@fortawesome/free-solid-svg-icons';
﻿import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Health and Water Access | Project Water',
  description: 'How clean water reliability reduces preventable disease risk and strengthens household and community health stability.',
};

const healthDrivers = [
  {
    title: 'Lower exposure risk',
    description: 'Protected sources reduce contact with contamination pathways common in open water collection.',
    icon: faShieldHalved,
  },
  {
    title: 'Better household resilience',
    description: 'Fewer water-related illnesses improve family stability and reduce repeated treatment burden.',
    icon: faHeartPulse,
  },
  {
    title: 'Stronger public health routines',
    description: 'Reliable water supports hygiene, sanitation practice, and school/clinic continuity.',
    icon: faSyringe,
  },
];

export default function HealthPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/healthtopbg.jpg" alt="Community health context tied to water access" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#091c37]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 to-[#0ea5e9]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Issue Deep Dive</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Clean water is one of the most practical public health interventions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Reliable access to safe water reduces preventable disease pressure and helps families and clinics sustain healthier daily systems.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 sm:px-8 lg:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          {healthDrivers.map((item) => {
            
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
              <Image src="/health2.webp" alt="Community members at a water source" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#091c37]">Reliable sources reduce repeated health shocks.</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Households with safer nearby water are better positioned to manage health, education, and work routines consistently.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-64">
              <Image src="/healthbot.webp" alt="Children and caregivers benefiting from clean water" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#091c37]">Health outcomes improve when service continuity is protected.</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Monitoring and maintenance planning are as important as installation for preserving long-term impact.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[280px]">
            <Image src="/heathpic.png" alt="Healthcare and clean water connection" fill className="object-cover" />
          </div>
          <div className="p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Health continuity</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37]">Why long-term reliability matters for public health.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Sustained water access supports hygiene practice, clinic operations, and household resilience in ways that compound over time.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/take-action/learn" className="inline-flex items-center gap-2 rounded-full bg-[#0369a1] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0c4a6e]">
                Back to learning hub
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
              <Link href="/take-action/donate" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-slate-50">
                Support health outcomes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
