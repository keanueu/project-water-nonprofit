import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChartColumn, faFileLines, faShield, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Transparency & Reports | Project Water",
  description:
    "Our commitment to transparency through annual reports, financial statements, impact metrics, and detailed project documentation.",
};

const transparencyPrinciples = [
  {
    title: "Open reporting",
    description: "We publish detailed annual reports showing how funds are used, where projects are implemented, and what results have been achieved.",
    icon: faFileLines,
  },
  {
    title: "Financial accountability",
    description: "Independent audits, clear financial statements, and third-party evaluations ensure responsible stewardship of every donation.",
    icon: faChartColumn,
  },
  {
    title: "Impact measurement",
    description: "We track and report on the metrics that matter: communities served, water systems installed, people affected, and long-term outcomes.",
    icon: faArrowTrendUp,
  },
  {
    title: "Data security",
    description: "Community information is protected with the highest privacy and security standards, handled with respect and dignity.",
    icon: faShield,
  },
];

const reportTypes = [
  {
    title: "Annual Reports",
    description: "Comprehensive yearly reviews of our work, financial performance, outcomes achieved, and priorities for the coming year.",
    year: "2023-2024",
  },
  {
    title: "Financial Statements",
    description: "Detailed accounting of revenues, expenditures, and allocation of resources across programs and operations.",
    year: "2023-2024",
  },
  {
    title: "Impact Reports",
    description: "In-depth analysis of communities served, water systems installed, health outcomes, and long-term sustainability metrics.",
    year: "2023-2024",
  },
  {
    title: "Project Documentation",
    description: "Detailed records of individual water projects including assessments, designs, implementation photos, and follow-up results.",
    year: "Available by request",
  },
];

const certifications = [
  {
    title: "501(c)(3) Status",
    description: "Certified non-profit organization registered with the U.S. Internal Revenue Service, eligible for tax-deductible donations.",
  },
  {
    title: "GiveWell Evaluation",
    description: "Reviewed and rated by GiveWell as a highly effective charity focused on global poverty reduction and health impact.",
  },
  {
    title: "Charity Navigator Rating",
    description: "Rated on financial health, accountability, and transparency by one of the leading charity evaluation platforms.",
  },
];

export default function TransparencyPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/water.webp"
            alt="Transparent water"
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
              Transparency matters
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              We believe in open, honest reporting.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Your gift deserves to be tracked, measured, and reported with complete honesty. We publish annual reports, financial statements, and detailed impact metrics so you can see exactly how your support transforms lives.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#principles"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Learn our commitment
              </a>
              <a
                href="#reports"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View reports
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Principles */}
      <section id="principles" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Our commitment</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How we maintain accountability and trust.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            These principles guide how we report our work and steward your donations.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {transparencyPrinciples.map((principle) => {
            
            return (
              <article key={principle.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <div className="inline-flex rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                  <FontAwesomeIcon icon={principle.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{principle.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{principle.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Reports Section */}
      <section id="reports" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Available documents</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Our reports and documentation.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Download our annual reports, financial statements, and impact data to see the full picture of our work.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {reportTypes.map((report) => (
              <div key={report.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-slate-900">{report.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{report.description}</p>
                  </div>
                  <span className="ml-4 inline-flex rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 flex-shrink-0">
                    {report.year}
                  </span>
                </div>
                <button className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-600 transition hover:text-cyan-700">
                  Download report
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">External validation</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Independent evaluations and ratings.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Third-party organizations verify our impact and accountability.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {certifications.map((cert) => (
            <div key={cert.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{cert.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{cert.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Questions about our transparency?
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We're happy to answer questions about our reporting, methodology, or specific projects.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-16 sm:px-12 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Give with confidence.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              Your support makes a real difference. See the impact, understand the work, and join a movement for lasting water access.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/take-action/donate"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Support our mission
              </Link>
              <Link
                href="/take-action/learn"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
