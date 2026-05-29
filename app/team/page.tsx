import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLightbulb, faUsers, faEarthAmericas, faAward, faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Our Team | Project Water",
  description:
    "Meet the dedicated team members who work across the globe to bring reliable clean water access to communities in sub-Saharan Africa.",
};

const teamValues = [
  {
    title: "Local leadership",
    description: "We trust and empower teams on the ground who understand community needs and sustainable solutions.",
    icon: faEarthAmericas,
  },
  {
    title: "Collaborative approach",
    description: "Our work succeeds because diverse perspectives and shared commitment create stronger outcomes.",
    icon: faUsers,
  },
  {
    title: "Continuous learning",
    description: "We stay humble, measure results, and adapt our methods based on what communities teach us.",
    icon: faLightbulb,
  },
  {
    title: "Excellence and integrity",
    description: "Every team member upholds the highest standards of stewardship and transparent reporting.",
    icon: faAward,
  },
];

const teamCategories = [
  {
    title: "Field Teams",
    description: "Local engineers, community organizers, and project managers who work directly with communities to assess needs, design solutions, and ensure quality implementation.",
  },
  {
    title: "Technical & Operations",
    description: "Water engineers, program managers, and monitoring specialists who ensure projects meet our standards for durability, sustainability, and measurable impact.",
  },
  {
    title: "Fundraising & Development",
    description: "Specialists who connect generosity from supporters worldwide to communities that need clean water access, with transparent communication about impact.",
  },
  {
    title: "Finance & Accountability",
    description: "Experts who manage resources responsibly, conduct regular audits, and maintain the transparent reporting that builds trust in our work.",
  },
];

export default function TeamPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/water.webp"
            alt="Team members collaborating in the field"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/68" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/45" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-cyan-100 backdrop-blur">
              Meet the team
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Talented people working for lasting change.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Our team spans continents and disciplines, united by the belief that every community deserves access to clean, reliable water. Together, we turn generosity into infrastructure that lasts.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#values"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Learn our approach
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Join our mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section id="values" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">How we work together</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Core values that guide our team.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Our team operates with shared principles that ensure our work strengthens communities and builds trust.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {teamValues.map((value) => {
            
            return (
              <article key={value.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <div className="inline-flex rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                  <FontAwesomeIcon icon={value.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{value.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Team Categories */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Diverse expertise</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Different roles, shared commitment.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Every role on our team contributes to the mission of bringing clean water access to communities.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {teamCategories.map((category) => (
              <div key={category.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-slate-900">{category.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-16 sm:px-12 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-200 backdrop-blur">
              Get involved
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Support the team making water access real.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              Whether through donations, volunteering, or partnerships, you can help our team continue bringing clean water to communities that need it most.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/take-action/donate"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Support our work
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Volunteer with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
