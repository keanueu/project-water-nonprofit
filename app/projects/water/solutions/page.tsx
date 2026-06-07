import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleCheck, faCoins, faShieldHalved, faWrench, faClipboardCheck, faCompassDrafting, faScrewdriverWrench, faGauge } from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Water Solutions | Project Water',
  description:
    'Explore the technologies and operating model Project Water uses to deliver reliable clean water systems that stay functional over time.',
};

const solutionTypes = [
  {
    title: 'Drilled wells',
    useCase: 'Deep aquifer access where groundwater quality and yield are dependable.',
    lifespan: '15-30 years',
    peopleServed: '250-500 people',
    image: '/how1.webp',
    highlights: [
      'Supports year-round access in high-demand communities',
      'Can be paired with hand pumps or motorized upgrades',
      'Best when geology and long-term servicing capacity align',
    ],
  },
  {
    title: 'Spring protection',
    useCase: 'Natural springs requiring contamination control and clean collection points.',
    lifespan: '10-20 years',
    peopleServed: '100-300 people',
    image: '/how2.webp',
    highlights: [
      'Low operating cost and strong reliability when protected correctly',
      'Gravity-fed collection can reduce queue and collection time',
      'Excellent option in hilly areas with stable spring output',
    ],
  },
  {
    title: 'Rainwater catchment',
    useCase: 'Schools and clinics in semi-arid zones with predictable rainy seasons.',
    lifespan: '15+ years',
    peopleServed: '200-800 students and staff',
    image: '/home2.webp',
    highlights: [
      'Large storage systems support dry-season continuity',
      'Particularly useful for institutional settings',
      'Works best with maintenance schedules and water-use planning',
    ],
  },
  {
    title: 'Sand dams and shallow systems',
    useCase: 'Seasonal riverbeds where natural recharge can be retained locally.',
    lifespan: '20+ years',
    peopleServed: 'Multiple nearby villages',
    image: '/where3.webp',
    highlights: [
      'Builds local water security in drought-prone contexts',
      'Can support both household and livelihood stability',
      'Requires strong site selection and community governance',
    ],
  },
];

const framework = [
  {
    criteria: 'Hydrogeology',
    why: 'Determines whether a source can produce enough water sustainably.',
  },
  {
    criteria: 'Population and demand profile',
    why: 'Ensures system size and flow match household, school, and clinic needs.',
  },
  {
    criteria: 'Maintenance reality',
    why: 'Aligns technology with local parts access, training, and repair pathways.',
  },
  {
    criteria: 'Cost of full life cycle',
    why: 'Includes construction, training, monitoring, and long-term functionality.',
  },
];

const implementationSteps = [
  {
    title: 'Context survey and baseline',
    description: 'Field teams validate source conditions, demand, and risk factors before design approval.',
    icon: faClipboardCheck,
  },
  {
    title: 'Solution design and budgeting',
    description: 'Engineers and local leaders align on technology, timeline, and full-cost stewardship plan.',
    icon: faCompassDrafting,
  },
  {
    title: 'Construction and commissioning',
    description: 'Local crews deliver the build while community members are trained in practical system care.',
    icon: faScrewdriverWrench,
  },
  {
    title: 'Monitoring and repair response',
    description: 'Performance checks and maintenance workflows protect continuity beyond launch day.',
    icon: faWrench,
  },
];

const qualitySignals = [
  {
    label: 'Functional uptime target',
    value: '95%+',
    icon: faGauge,
  },
  {
    label: 'Lifecycle budgeting commitment',
    value: 'End-to-end',
    icon: faCoins,
  },
  {
    label: 'Community maintenance readiness',
    value: 'Required',
    icon: faShieldHalved,
  },
];

export default function WaterSolutionsPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/how1.jpg"
            alt="Water infrastructure construction in a partner community"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#091c37]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 to-[#0369a1]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Water Solutions</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            We match each community with the right technology, not the easiest one to install.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Reliability is designed from day one through context fit, local ownership, and repair planning.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects/water/impact"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#08203d] transition hover:bg-cyan-300"
            >
              See outcomes
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </Link>
            <Link
              href="/take-action/donate"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Fund a project
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Technology portfolio</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            Four proven solution types, each used where it performs best.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {solutionTypes.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-56">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-[#0c4a6e] backdrop-blur">
                  <span><span className="numbers">{item.lifespan}</span> expected life</span>
                  <span><span className="numbers">{item.peopleServed}</span></span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#091c37]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.useCase}</p>
                <ul className="mt-4 space-y-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                      <FontAwesomeIcon icon={faCircleCheck} className="mt-1 h-4 w-4 flex-shrink-0 text-cyan-600" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-18 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Selection framework</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
              How we decide what to build
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Solution choice is made through field data and local expertise. We avoid shortcuts that produce short-lived infrastructure.
            </p>

            <div className="mt-7 space-y-3">
              {framework.map((item) => (
                <article key={item.criteria} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#091c37]">{item.criteria}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.why}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <Image
                src="/howwe1.jpg"
                alt="Field team reviewing water system conditions"
                width={1000}
                height={820}
                className="h-[320px] w-full object-cover"
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Quality signals</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {qualitySignals.map((item) => {
                  return (
                    <div key={item.label} className="rounded-2xl bg-slate-50 p-4 text-center">
                      <span className="mx-auto inline-flex rounded-full bg-sky-100 p-2 text-[#0c4a6e]">
                        <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                      </span>
                      <p className="mt-2 text-lg font-semibold text-[#091c37]">{item.value}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#091c37] px-6 py-18 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Implementation model</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Delivery only counts when functionality remains strong after handover.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {implementationSteps.map((item, index) => {
              return (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-cyan-200">Phase {index + 1}</p>
                  <span className="mt-3 inline-flex rounded-2xl bg-white/10 p-3 text-cyan-100">
                    <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects/water/impact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-slate-100"
            >
              Read impact stories
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </Link>
            <Link
              href="/take-action/donate"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Help fund reliability
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
