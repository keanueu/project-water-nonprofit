import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  title: 'Impact Reports | Project Water',
  description:
    'Read how Project Water delivers transparent impact through community-led water projects, funding reports, and long-term maintenance results.',
};

const highlights = [
  {
    title: 'Transparency first',
    description:
      'We publish project updates, repair records, and financial summaries so supporters can see how water solutions perform over time.',
  },
  {
    title: 'Community impact',
    description:
      'Reports highlight the health, education, and economic benefits communities gain when water systems are built and maintained properly.',
  },
  {
    title: 'Sustainable results',
    description:
      'We document not only installations but also ongoing maintenance, training, and follow-up work that keeps water systems reliable.',
  },
];

const reportItems = [
  {
    title: 'Annual impact report',
    description:
      'A high-level summary of our reach, community outcomes, and financial stewardship during the year.',
  },
  {
    title: 'Project spotlight',
    description:
      'Detailed stories from selected water projects that show the process, people, and measurable change on the ground.',
  },
  {
    title: 'Repair & maintenance review',
    description:
      'Updates that explain how we keep systems working and what it takes to protect communities from water insecurity after the first build.',
  },
];

export default function ImpactReportsPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <HeroSection
        headline="Impact Reports"
        subheadline="See the real results of clean water projects through transparent reporting, stories from the field, and long-term maintenance updates."
        backgroundImage="/home4.jpg"
        primaryButtonText="View Water Impact"
        primaryButtonHref="/projects/water/impact"
        secondaryButtonText="Donate Today"
        secondaryButtonHref="/take-action/donate"
      />

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#0369a1]">
            Proof that generosity works
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            Our reports make it easy to understand how every gift supports clean water access.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            From construction milestones to maintenance updates, these reports show how we follow through and keep communities supplied with safe water.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#091c37]">{item.title}</h3>
              <p className="mt-4 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
              What you can expect in our reports
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Each report is designed to give supporters confidence with clear metrics, photo updates, and honest insights about where work is happening and why it matters.
            </p>

            <div className="mt-10 space-y-4">
              {reportItems.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#091c37]">{item.title}</h3>
                  <p className="mt-3 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <Image
              src="/water.webp"
              alt="Clean water infrastructure benefiting a community"
              width={1100}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0369a1]">
                Stay connected
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
                See how your support creates durable water systems.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                We update these reports throughout the year to show progress, highlight key milestones, and share lessons learned from every project.
              </p>
            </div>
            <div className="space-y-4">
              <Link
                href="/projects/water/impact"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#0369a1] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0c4a6e]"
              >
                Read water impact
              </Link>
              <Link
                href="/take-action/donate"
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-[#091c37] transition hover:border-[#0369a1] hover:text-[#0369a1]"
              >
                Support a project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Stay updated on meaningful results"
        description="Explore reports, project stories, and impact summaries that show how donations turn into sustainable water systems and stronger communities."
        buttonText="View reports"
        buttonHref="/projects/water/impact"
      />
    </main>
  );
}
