import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Home, Wallet } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Poverty and Water Access | Project Water',
  description: 'How water reliability supports household stability, economic participation, and long-term poverty reduction pathways.',
};

const povertyMechanisms = [
  {
    title: 'Time to income',
    description: 'Reduced collection burden can return hours to work and caregiving.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Lower recurring costs',
    description: 'Safer water helps reduce avoidable health disruptions and related household strain.',
    icon: Wallet,
  },
  {
    title: 'Stronger household routines',
    description: 'Reliable services support more stable daily planning and long-term resilience.',
    icon: Home,
  },
];

export default function PovertyPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/povertytop.webp" alt="Community livelihoods and water access context" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#091c37]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 to-[#0ea5e9]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Issue Deep Dive</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Water reliability and poverty reduction move together.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Families facing water insecurity often face compounding constraints in health, productivity, and household planning.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-18 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Economic pathway</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            Reliable water can unlock practical household stability.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Water reliability supports better use of time, stronger routines, and improved resilience in communities managing constrained resources.
          </p>

          <div className="mt-7 space-y-4">
            {povertyMechanisms.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex rounded-xl bg-sky-100 p-2 text-[#0369a1]">
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

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-[360px]">
            <Image src="/povertypic.png" alt="Families and livelihoods influenced by water access" fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#091c37]">Water access can be a foundational economic lever.</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Stability improves when households can plan around dependable service rather than daily scarcity and uncertainty.
            </p>
          </div>
        </article>
      </section>

      <section className="bg-slate-50 px-6 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          <Link href="/take-action/learn" className="inline-flex items-center gap-2 rounded-full bg-[#0369a1] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0c4a6e]">
            Back to learning hub
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/take-action/donate" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-white">
            Support economic resilience
          </Link>
        </div>
      </section>
    </main>
  );
}
