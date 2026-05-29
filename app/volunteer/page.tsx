import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBriefcase, faEarthAmericas, faHeart, faUsers, faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Volunteer With Us | Project Water",
  description:
    "Join our mission and use your skills and passion to help bring clean water access to communities in sub-Saharan Africa.",
};

const volunteerRoles = [
  {
    title: "Professional skills volunteer",
    description: "Engineers, fundraisers, marketers, accountants, and other professionals who contribute expertise to strengthen our impact.",
    icon: faBriefcase,
  },
  {
    title: "Community organizer",
    description: "Help start campaigns in your community, organize fundraisers, and inspire others to support clean water access.",
    icon: faUsers,
  },
  {
    title: "Field supporter",
    description: "Travel to communities we serve to help with project implementation, assessment, or follow-up monitoring.",
    icon: faEarthAmericas,
  },
  {
    title: "Advocate & educator",
    description: "Share the water access mission through speaking, social media, events, and conversations that build awareness.",
    icon: faHeart,
  },
];

const volunteerBenefits = [
  "Direct impact: See how your contributions strengthen water access in real communities",
  "Growth opportunities: Learn, develop skills, and gain professional experience",
  "Community: Connect with others passionate about clean water and global service",
  "Flexibility: Volunteer opportunities designed to fit your schedule and skills",
  "Purpose: Work toward a meaningful goal backed by transparent, measurable results",
];

const volunteerOpportunities = [
  {
    title: "Remote collaboration",
    description: "Contribute specialized skills from home through consulting, content creation, or technical support.",
    duration: "Flexible timing",
  },
  {
    title: "Local organizing",
    description: "Build grassroots momentum in your community through events, fundraisers, and awareness campaigns.",
    duration: "Ongoing or seasonal",
  },
  {
    title: "Field experience",
    description: "Spend time in communities we serve, working alongside local teams on projects and assessments.",
    duration: "Weeks to months",
  },
  {
    title: "Board or committee participation",
    description: "Provide strategic guidance and governance support at the organizational level.",
    duration: "Ongoing commitment",
  },
];

export default function VolunteerPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/water.webp"
            alt="Volunteers working in communities"
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
              Volunteer with us
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your skills, your passion, lasting impact.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              We welcome volunteers—professionals, students, community leaders, and passionate individuals—who want to contribute their time and talents toward bringing clean water access to communities that need it most.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#roles"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Explore volunteer roles
              </a>
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section id="roles" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Ways to contribute</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find the volunteer role that fits you.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            We have opportunities for every skill set, experience level, and availability.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {volunteerRoles.map((role) => {
            
            return (
              <article key={role.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <div className="inline-flex rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                  <FontAwesomeIcon icon={role.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{role.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{role.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem]">
            <Image
              src="/home1.jpg"
              alt="Volunteers working with communities"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Why volunteer</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Be part of something meaningful.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Volunteering with Project Water connects you to real communities, meaningful work, and a global movement for clean water access. Whether you have professional expertise, community passion, or just a heart to help, there's a place for you.
            </p>

            <ul className="mt-8 space-y-4">
              {volunteerBenefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-3 text-base text-slate-700">
                  <FontAwesomeIcon icon={faBolt} className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Get started
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Flexible commitments</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Volunteer in a way that works for you.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            From remote contributions to intensive field experiences, find opportunities that match your availability and passion.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {volunteerOpportunities.map((opp) => (
            <div key={opp.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold text-slate-900">{opp.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{opp.description}</p>
              <p className="mt-6 inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                {opp.duration}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-16 sm:px-12 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to volunteer?
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              Reach out to us to learn more about available opportunities and how you can contribute your talents to the mission.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Get in touch
              </Link>
              <Link
                href="/take-action/donate"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Support our mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
