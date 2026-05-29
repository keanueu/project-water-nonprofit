import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBookOpen, faBuilding, faDroplet, faFileLines, faHandHoldingHeart, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Sponsor a Community | Every Drop Counts",
  description:
    "Support a community or water project through sponsorship that helps fund implementation, training, stewardship, and transparent impact updates.",
};

const sponsorshipSupports = [
  {
    title: "Water infrastructure",
    description:
      "Sponsorship helps fund practical systems that improve reliable access to clean water where need is highest.",
    icon: faDroplet,
  },
  {
    title: "Local training and care",
    description:
      "Strong projects include orientation, ownership, and the skills needed to monitor and care for systems over time.",
    icon: faUsers,
  },
  {
    title: "Reporting and stewardship",
    description:
      "Transparent updates help supporters understand what is being built, who is being served, and how the work is progressing.",
    icon: faFileLines,
  },
];

const sponsorBenefits = [
  "Mission-aligned updates about the community or project you support",
  "Clear reporting that shows how your sponsorship contributes to practical outcomes",
  "Photos and stories that help your team, family, or organization stay connected to the mission",
  "A stewardship experience designed for long-term partnership, not one-time recognition",
];

const sponsorPaths = [
  {
    title: "Family or individual sponsorship",
    description: "Create a personal giving commitment that supports a community with meaningful consistency.",
    icon: faHandHoldingHeart,
  },
  {
    title: "School, church, or civic partnership",
    description: "Invite a wider community to support a shared sponsorship goal and follow the story together.",
    icon: faBookOpen,
  },
  {
    title: "Business or corporate support",
    description: "Align your organization with practical, high-trust impact that employees and customers can understand.",
    icon: faBuilding,
  },
];

export default function SponsorPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sponsorbg.jpg"
            alt="Children gathered outside near a supported community water point"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/40" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-cyan-100 backdrop-blur">
              Sponsor a community or project
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Sponsorship helps move water access work from intention to steady, accountable support.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              For many supporters, sponsorship is a meaningful way to stay connected to a community's progress while
              helping fund the infrastructure, training, and stewardship that make clean water last.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#sponsorship-options"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Explore sponsorship
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Talk with our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Overview</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Sponsorship is about partnership, not distance.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Sponsors often want a structured way to help beyond a single transaction. This path is designed for
              supporters who value consistency, visible progress, and a relationship to the mission that deepens over
              time.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Whether you are giving as a family, a school, a church, or a business, sponsorship creates a way to stay
              engaged with work that is practical, community-centered, and built for long-term reliability.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {sponsorshipSupports.map((item) => {
              

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/60"
                >
                  <div className="inline-flex rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                    <FontAwesomeIcon icon={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:px-12">
          <div className="relative min-h-[340px] overflow-hidden rounded-[2rem]">
            <Image
              src="/sponsorbg.jpg"
              alt="Smiling children in a community supported through sponsorship"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">What sponsorship supports</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Your support helps carry the full picture, not just the visible milestone.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
              <p>
                Sponsorship can help underwrite the parts of a water project that make long-term success possible:
                infrastructure, coordination, local engagement, training, and the follow-up that keeps systems useful.
              </p>
              <p>
                It also helps create room for thoughtful implementation rather than rushed action. Communities deserve
                solutions shaped by context, not shortcuts.
              </p>
              <p>
                For supporters, this means your commitment helps strengthen both the visible outcome and the quieter
                systems of care behind it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="sponsorship-options" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Supporters receive</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A sponsorship experience built on clarity, trust, and connection.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              We want sponsors to understand the work they are supporting and feel confident that their commitment is
              being honored with care.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <ul className="space-y-5">
                {sponsorBenefits.map((benefit) => (
                  <li key={benefit} className="flex gap-4 text-sm leading-7 text-slate-200">
                    <div className="mt-1 rounded-full bg-cyan-500/20 p-1.5 text-cyan-300">
                      <FontAwesomeIcon icon={faCertificate} className="h-4 w-4" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4">
              {sponsorPaths.map((path) => {
                

                return (
                  <article key={path.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="inline-flex rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
                      <FontAwesomeIcon icon={path.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{path.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{path.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-[2rem] border border-slate-200 bg-cyan-50 p-8 shadow-sm shadow-cyan-100/70 sm:p-10 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Take the next step</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Ready to explore a sponsorship commitment that fits your capacity?
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                We would love to help you understand current needs, sponsorship pathways, and how your support can
                strengthen water access work over time.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 lg:mt-0 lg:justify-end">
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Contact our team
              </Link>
              <Link
                href="/take-action/donate"
                className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                Make a gift today
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}