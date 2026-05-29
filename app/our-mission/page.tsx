import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChartColumn, faDroplet, faHandshakeAngle, faShieldHalved, faUsers, faWrench, faShield, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Our Mission | The Water Project",
  description:
    "Discover The Water Project's mission to expand reliable access to clean water through community partnership, durable solutions, and long-term accountability.",
};

const missionPillars = [
  {
    title: "Safe water access",
    description:
      "We support solutions that help families spend less time searching for water and more time on health, learning, work, and daily life.",
    image: "/mission1.webp",
  },
  {
    title: "Community partnership",
    description:
      "Our approach centers the knowledge and participation of local communities, leaders, and field partners from planning through implementation.",
    image: "/mission2.webp",
  },
  {
    title: "Sustainability and maintenance",
    description:
      "Water systems serve people best when maintenance, oversight, and practical long-term planning are part of the work from the beginning.",
    image: "/mission3.webp",
  },
  {
    title: "Clear impact reporting",
    description:
      "Supporters should be able to see how generosity translates into tangible progress, stronger communities, and meaningful change.",
    image: "/mission4.webp",
  },
];

const accountabilityItems = [
  {
    title: "Thoughtful project selection",
    description:
      "Different communities need different solutions. We prioritize context-aware choices over one-size-fits-all responses.",
    icon: faDroplet,
  },
  {
    title: "Steady communication",
    description:
      "We believe in helping donors understand what their gifts support, where work is happening, and why it matters.",
    icon: faChartColumn,
  },
  {
    title: "Respect for local ownership",
    description:
      "Solutions are stronger when local leadership, training, and responsibility are built into the process.",
    icon: faUsers,
  },
];

const donorImpact = [
  {
    title: "Health and dignity",
    description:
      "Reliable clean water helps reduce water-related illness and gives families greater safety and dignity in everyday life.",
    icon: faHandshakeAngle,
  },
  {
    title: "Time returned to communities",
    description:
      "When water sources are closer and safer, time spent walking and waiting can be redirected toward school, work, caregiving, and rest.",
    icon: faShieldHalved,
  },
  {
    title: "Systems that last",
    description:
      "Donor support makes it possible to invest in solutions with sustainability in view, including upkeep, local management, and practical resilience.",
    icon: faWrench,
  },
];

export default function OurMissionPage() {
  return (
    <main className="bg-white text-slate-900">
      <HeroSection
        headline="Our Mission"
        subheadline="We partner with communities to deliver clean water systems that improve health, learning, and resilience — with accountability and long-term support built in."
        backgroundImage="/missiontop.webp"
        primaryButtonText="Donate Now"
        primaryButtonHref="/take-action/donate"
        secondaryButtonText="Our Work"
        secondaryButtonHref="/our-work/where-we-work"
      />

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
              Why the mission matters
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Clean water changes far more than one moment in a day
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Water access influences health, education, food preparation, local
              livelihoods, and the daily burdens carried by women and children. Our
              mission is shaped by the belief that reliable water access can unlock
              healthier and more hopeful futures.
            </p>
            <p className="text-lg leading-8 text-slate-600">
              That is why we focus on solutions that are practical, accountable, and
              rooted in partnership rather than short-lived visibility.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/our-work"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                See our work
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
              <Link
                href="/take-action/solve-water-crisis"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
              >
                Help solve the crisis
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm">
            <Image
              src="/missiontop.webp"
              alt="Children gathering around a clean water source"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Mission pillars
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              The commitments behind every project
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Our mission is expressed through durable priorities: reliable water,
              community partnership, sustainability, and transparency.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {missionPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative h-64">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
              Field commitment
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              We care about what happens after installation day
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              The strongest water solutions are supported by local ownership,
              appropriate design, and realistic maintenance planning. Long-term
              reliability matters because the people depending on a water point need
              more than a short-lived improvement.
            </p>
            <p className="text-lg leading-8 text-slate-600">
              Our mission therefore includes the systems around a project: training,
              governance, upkeep, and communication. Those details are not secondary.
              They are part of what makes clean water access meaningful and lasting.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-5">
              {accountabilityItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex rounded-2xl bg-white p-3 text-cyan-700 shadow-sm">
                      <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-200">
              What donors make possible
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Generosity helps turn mission into measurable progress
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Donor support helps fund solutions that strengthen health, restore
              time, and create a stronger foundation for community life.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {donorImpact.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="inline-flex rounded-2xl bg-cyan-500/15 p-3 text-cyan-200">
                  <FontAwesomeIcon icon={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Help move the mission forward"
        description="Give toward durable water solutions, or invite others to join you in supporting communities with reliable access to safe water."
        buttonText="Donate now"
        buttonHref="/take-action/donate"
      />
    </main>
  );
}