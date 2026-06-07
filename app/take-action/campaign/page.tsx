import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarDays, faDroplet, faHandshakeAngle, faBullhorn, faSchool, faWandMagicSparkles, faUsers, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Start a Campaign | Every Drop Counts",
  description:
    "Launch a birthday fundraiser, school challenge, workplace campaign, or community drive that helps bring clean water systems to communities that need them most.",
};

const campaignSteps = [
  {
    title: "Choose your moment",
    description:
      "Turn a birthday, classroom project, team event, memorial gift, or neighborhood challenge into a clear fundraising goal with a meaningful story behind it.",
    icon: faCalendarDays,
  },
  {
    title: "Share why it matters",
    description:
      "We give you a simple message framework, water facts, and campaign inspiration so your supporters understand exactly how their gifts help fund lasting access.",
    icon: faBullhorn,
  },
  {
    title: "Celebrate the impact",
    description:
      "As your campaign grows, you can thank donors, post updates, and show how collective action helps move a water project from need to completion.",
    icon: faHandshakeAngle,
  },
];

const campaignIdeas = [
  {
    title: "Birthday or milestone fundraiser",
    description: "Invite friends and family to mark a personal milestone by giving clean water instead of gifts.",
    icon: faWandMagicSparkles,
  },
  {
    title: "School or campus challenge",
    description: "Help students connect learning with action through a service campaign tied to global water access.",
    icon: faSchool,
  },
  {
    title: "Workplace giving drive",
    description: "Bring your team together around a practical, high-trust cause with a shared fundraising target.",
    icon: faUsers,
  },
  {
    title: "Faith or community group effort",
    description: "Mobilize your congregation, club, or neighborhood to support a specific season of generosity.",
    icon: faDroplet,
  },
];

const supporterTools = [
  "A ready-to-use campaign checklist for planning and launch",
  "Suggested social copy and email prompts to help you share confidently",
  "Simple messaging on water access, health, and long-term maintenance",
  "A mission-aligned page structure you can tailor to your event or audience",
];

export default function CampaignPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/formtop.avif"
            alt="Community members gathered around a clean water access point"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-900/40" />
        </div>

        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-cyan-100 backdrop-blur">
              Take action with your community
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Start a campaign that turns everyday generosity into clean water access.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Whether you are celebrating a birthday, rallying your classroom, or organizing a workplace drive, a
              campaign gives people a clear way to act together for lasting impact.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#campaign-form"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Start your campaign
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/take-action/donate"
                className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Prefer to donate today?
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Flexible goals", value: "Personal, team, or community-led" },
                { label: "Built for sharing", value: "Email, events, and social outreach" },
                { label: "Real impact", value: "Support for sustainable water projects" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm font-semibold text-cyan-100">{item.label}</p>
                  <p className="mt-2 text-sm text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">How it works</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A strong campaign starts with a simple, credible invitation.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The best campaigns make it easy for people to understand the need, trust the organization, and see how
            even modest gifts combine into something durable.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {campaignSteps.map((step) => {
            

            return (
              <article
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm shadow-slate-200/60"
              >
                <div className="inline-flex rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                  <FontAwesomeIcon icon={step.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{step.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem]">
            <Image
              src="/formtop.avif"
              alt="Volunteers and supporters participating in a clean water campaign"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Campaign ideas</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Use moments people already care about to inspire practical generosity.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              The most effective campaigns feel personal, timely, and easy to join. Here are a few ways supporters
              often bring others into the mission.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {campaignIdeas.map((idea) => {
                

                return (
                  <div key={idea.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="inline-flex rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
                      <FontAwesomeIcon icon={idea.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{idea.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{idea.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="campaign-form" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Get started</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tell us about the campaign you want to launch.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              This planning form helps us understand your idea, timeline, and audience. It is a styled request form
              for now, but it shows the information we would need to help you move forward well.
            </p>

            <div className="mt-8 rounded-[2rem] border border-cyan-100 bg-cyan-50 p-8">
              <h3 className="text-lg font-semibold text-slate-900">What we help you prepare</h3>
              <ul className="mt-4 space-y-4">
                {supporterTools.map((tool) => (
                  <li key={tool} className="flex gap-3 text-sm leading-7 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Full name</span>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Email address</span>
                  <input
                    type="email"
                    placeholder="you@example.org"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Organization or group</span>
                  <input
                    type="text"
                    placeholder="Optional"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Campaign type</span>
                  <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100">
                    <option>Birthday or milestone</option>
                    <option>School or student-led</option>
                    <option>Workplace giving</option>
                    <option>Faith or community group</option>
                    <option>Seasonal fundraising event</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Target launch date</span>
                  <input
                    type="date"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Fundraising goal</span>
                  <input
                    type="text"
                    placeholder="$2,500"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 numbers"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Why this campaign matters to you</span>
                <textarea
                  rows={5}
                  placeholder="Share the story, event, or reason you want to rally people around clean water."
                  className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
              </label>

              <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600" />
                <span className="text-sm leading-6 text-slate-600">
                  I understand this is a planning form preview and that a team member may follow up with next steps,
                  timelines, and campaign guidance.
                </span>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Submit campaign request
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/60 sm:p-10 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Next step</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Want to build momentum before your campaign launches?
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Explore how our water work is structured, make a direct gift today, or learn more about the long-term
                systems your campaign will help sustain.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 lg:mt-0 lg:justify-end">
              <Link
                href="/take-action/donate"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Donate now
              </Link>
              <Link
                href="/projects/water/overview"
                className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore water solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}