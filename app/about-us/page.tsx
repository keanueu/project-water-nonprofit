import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChartColumn, faDroplet, faHandHoldingHeart, faShieldHalved, faUsers, faWrench, faHandshake } from '@fortawesome/free-solid-svg-icons';

import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "About Us | The Water Project",
  description:
    "Learn how The Water Project partners with communities, funds durable water solutions, and stays accountable from installation through long-term impact.",
};

const values = [
  {
    title: "Community-led partnership",
    description:
      "We work with local leaders, schools, health clinics, and water committees so projects reflect each community's priorities and daily realities.",
    icon: faHandshake,
  },
  {
    title: "Durable water access",
    description:
      "Our focus is not just installation. We support solutions designed for maintenance, training, and long-term reliability.",
    icon: faWrench,
  },
  {
    title: "Transparent stewardship",
    description:
      "Donors deserve clarity. We share what gifts fund, how projects progress, and why measured impact matters.",
    icon: faShieldHalved,
  },
];

const stats = [
  { value: "20+", label: "Years advancing access to clean water" },
  { value: "100%", label: "Mission-centered focus on water, health, and dignity" },
  { value: "Local", label: "Partnership model rooted in field relationships" },
  { value: "Long-term", label: "Commitment beyond groundbreaking day" },
];

const principles = [
  {
    title: "We start with listening",
    description:
      "Every region has its own geography, infrastructure constraints, and social context. Listening first leads to solutions people can trust and use.",
  },
  {
    title: "We prioritize the full system",
    description:
      "Safe water depends on more than a single build. Training, governance, maintenance planning, and community ownership all matter.",
  },
  {
    title: "We believe trust is earned",
    description:
      "Clear reporting, responsible financial stewardship, and honest communication are essential parts of our work—not optional extras.",
  },
];

const operatingModel = [
  {
    title: "Identify the right solution",
    description:
      "We assess local conditions and work with field partners to determine whether a well rehabilitation, spring protection, rainwater catchment system, or another approach will serve people best.",
    icon: faDroplet,
  },
  {
    title: "Equip communities for sustainability",
    description:
      "Training and local oversight help ensure a project can be managed well after construction crews leave the site.",
    icon: faUsers,
  },
  {
    title: "Track progress and share impact",
    description:
      "We communicate what was built, why it matters, and how donor support is turning into healthier, more resilient communities.",
    icon: faChartColumn,
  },
];

export default function AboutUsPage() {
  return (
    <main className="bg-white text-slate-900">
      <HeroSection
        headline="About The Water Project"
        subheadline="We empower communities to build safe, sustainable water systems through practical solutions, trusted partnerships, and long-term commitment."
        backgroundImage="/aboutus.top.webp"
        primaryButtonText="Learn More"
        primaryButtonHref="/our-mission"
        secondaryButtonText="Get Involved"
        secondaryButtonHref="/take-action/donate"
      />

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
              Who we are
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A nonprofit built around practical compassion
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              The water crisis is deeply human. It affects health, education,
              economic opportunity, and dignity every single day. Our role is to
              help close that gap by funding solutions that communities can rely on
              and by supporting the partnerships that make those solutions last.
            </p>
            <p className="text-lg leading-8 text-slate-600">
              We are motivated by a simple conviction: access to clean water should
              not depend on where someone is born. That belief shapes how we serve,
              how we communicate, and how we measure success.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/our-mission"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                Explore our mission
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
              <Link
                href="/our-work"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
              >
                See our work
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm">
            <Image
              src="/aboutus.top.webp"
              alt="Community members gathered near a water point"
              width={900}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              The values that guide our work
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Every project, update, and partnership is shaped by the same
              commitments: respect for communities, responsible stewardship, and a
              focus on sustainable impact.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map(({ title, description, icon }) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="inline-flex rounded-2xl bg-cyan-50 p-3 text-cyan-700">
                  <FontAwesomeIcon icon={icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm"
              >
                <div className="text-3xl font-semibold tracking-tight text-cyan-700">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm">
            <Image
              src="/mission2.webp"
              alt="Field partner with a community water installation"
              width={1000}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              How we operate
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A model designed for trust and durability
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Meaningful water access requires more than a one-time intervention.
              Our work centers on selecting the right approach, equipping people to
              maintain it, and communicating clearly about the outcomes supporters
              make possible.
            </p>

            <div className="grid gap-4">
              {operatingModel.map(({ title, description, icon }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 inline-flex rounded-2xl bg-slate-100 p-3 text-slate-700">
                      <FontAwesomeIcon icon={icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-600">
                        {description}
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
              Accountability in practice
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The principles we return to again and again
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Our team is committed to thoughtful action, honest reporting, and a
              steady focus on the people behind every project.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="inline-flex rounded-2xl bg-cyan-500/15 p-3 text-cyan-200">
                  <FontAwesomeIcon icon={faHandHoldingHeart} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{principle.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Be part of lasting change"
        description="Support community-led water solutions and help families move toward healthier, more hopeful futures."
        buttonText="Donate today"
        buttonHref="/take-action/donate"
      />
    </main>
  );
}