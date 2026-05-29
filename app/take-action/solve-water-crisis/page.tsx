import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faDroplet, faCoins, faHandshakeAngle, faShieldHalved, faBullseye, faWrench, faShield, faHeart } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Help Solve the Water Crisis | Every Drop Counts",
  description:
    "Learn how local leadership, durable water systems, maintenance planning, and sustained generosity work together to solve the water crisis over the long term.",
};

const coreChallenges = [
  {
    title: "Infrastructure gaps",
    description:
      "Communities are too often asked to rely on distant, unsafe, or unreliable water sources because core infrastructure has never been built or maintained.",
    icon: faDroplet,
  },
  {
    title: "Health and time burdens",
    description:
      "When water is scarce, families lose time, schools lose attendance, and health outcomes suffer in ways that affect every part of community life.",
    icon: faShieldHalved,
  },
  {
    title: "Short-term solutions",
    description:
      "Temporary fixes can create initial hope, but without maintenance systems, local ownership, and follow-through, progress rarely lasts.",
    icon: faWrench,
  },
];

const solutionPillars = [
  {
    title: "Start with the right source",
    description:
      "Effective projects begin with assessment, local insight, and a practical understanding of what type of water system can be sustained in the real context.",
  },
  {
    title: "Design for durability",
    description:
      "We prioritize solutions that communities can maintain with training, monitoring, and realistic support after installation, not just at launch.",
  },
  {
    title: "Invest in people, not only hardware",
    description:
      "Training local leaders, caretakers, and community partners is essential because water access succeeds when responsibility is shared and understood.",
  },
  {
    title: "Measure what happens next",
    description:
      "Accountability means tracking reliability, usage, and community outcomes over time so donors can trust that systems remain useful long after ribbon cutting.",
  },
];

const actionPaths = [
  {
    title: "Donate now",
    description: "Support active water access work with an immediate gift that helps fund practical implementation.",
    href: "/take-action/donate",
    icon: faCoins,
  },
  {
    title: "Launch a campaign",
    description: "Mobilize friends, students, coworkers, or your community around a shared fundraising goal.",
    href: "/take-action/campaign",
    icon: faHandshakeAngle,
  },
  {
    title: "Explore water solutions",
    description: "See how our water work is structured from planning and implementation through long-term stewardship.",
    href: "/projects/water/overview",
    icon: faBullseye,
  },
];

export default function SolveWaterCrisisPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/howwecansolvetop.webp"
            alt="Women and children gathered with water containers in a rural community"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/45" />
        </div>

        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-cyan-100 backdrop-blur">
              How we can solve the water crisis
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Solving the water crisis takes more than installation. It takes commitment.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Sustainable water access comes from pairing practical infrastructure with local leadership, long-term
              care, and donors who believe communities deserve solutions that keep working.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/take-action/donate"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Give toward water access
              </Link>
              <Link
                href="/take-action/campaign"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Start a campaign
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Why the challenge persists</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Water insecurity is a systems problem that touches health, education, and economic stability.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The water crisis is not only about scarcity. It is about distance, breakdowns, affordability, maintenance,
            and whether communities are resourced to keep essential services running.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {coreChallenges.map((challenge) => {
            

            return (
              <article
                key={challenge.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm shadow-slate-200/60"
              >
                <div className="inline-flex rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                  <FontAwesomeIcon icon={challenge.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{challenge.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{challenge.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div className="relative min-h-[340px] overflow-hidden rounded-[2rem]">
            <Image
              src="/how1.webp"
              alt="Community members collecting water near a restored water point"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">What real progress requires</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Lasting solutions come from integrated planning, trusted partners, and follow-through.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              A healthy water project is more than a one-time install. It is a combination of community engagement,
              technical choices, maintenance preparation, and accountability after implementation.
            </p>

            <div className="mt-8 space-y-4">
              {solutionPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-3xl border border-white bg-white p-6 shadow-sm shadow-slate-200/60">
                  <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Long-term maintenance matters</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              The question is not only whether a project gets built. It is whether it keeps serving people.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Communities need systems that are designed with maintenance in mind from day one. That means realistic
              repair plans, local ownership, and ongoing visibility into what is working and what needs reinforcement.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">Accountability for donors</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Supporters deserve to know their gifts help build systems with a path to reliability, not one-time
                  headlines without staying power.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">Confidence for communities</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Families, schools, and clinics need water points they can depend on consistently, especially when
                  daily routines and public health depend on them.
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-[2rem]">
            <Image
              src="/how2.webp"
              alt="Children smiling near a community water access project"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Choose your action</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            There are several meaningful ways to help move solutions forward.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Some people give immediately. Some bring others into the mission. Some want to understand the full water
            systems model first. Each path helps strengthen the work.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {actionPaths.map((path) => {
            

            return (
              <Link
                key={path.title}
                href={path.href}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-100/80"
              >
                <div className="inline-flex rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                  <FontAwesomeIcon icon={path.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{path.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{path.description}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-700">
                  Explore this path
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-cyan-50 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-sm shadow-cyan-100/60 sm:p-10 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Keep learning</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                See how the mission, the model, and the action steps connect.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Explore our water overview, learn about our mission, or take the next practical step toward helping
                communities gain reliable access to clean water.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 lg:mt-0 lg:justify-end">
              <Link
                href="/projects/water/overview"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Water overview
              </Link>
              <Link
                href="/our-mission"
                className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Our mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}