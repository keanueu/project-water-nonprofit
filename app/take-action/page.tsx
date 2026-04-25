import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Take Action | Project Water',
  description:
    'Discover how to support Project Water through donations, sponsorships, campaigns, volunteering, and learning opportunities.',
};

const actionCards = [
  {
    title: 'Donate to a project',
    description:
      'Give today to fund water systems, repairs, and long-term maintenance in communities that need reliable access.',
    href: '/take-action/donate',
  },
  {
    title: 'Sponsor a community',
    description:
      'Choose a community to support with ongoing funding that helps water systems stay healthy and operational.',
    href: '/take-action/sponsor',
  },
  {
    title: 'Start a campaign',
    description:
      'Mobilize friends, family, or coworkers with a fundraiser that brings clean water to a community.',
    href: '/take-action/campaign',
  },
  {
    title: 'Learn about the crisis',
    description:
      'Build your knowledge with clear, actionable information about water scarcity, poverty, and the solutions that work.',
    href: '/take-action/learn',
  },
];

const waysToGive = [
  {
    label: 'One-time gift',
    text: 'Make an immediate impact with a single donation that supports urgent water needs.',
  },
  {
    label: 'Monthly support',
    text: 'Provide reliable funding that helps sustain systems, repairs, and community training over time.',
  },
  {
    label: 'Sponsor a community',
    text: 'Commit to long-term water access by backing a community with ongoing resources.',
  },
  {
    label: 'Fundraising campaigns',
    text: 'Create a campaign for a birthday, event, or team that drives community funding and awareness.',
  },
];

export default function TakeActionPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <HeroSection
        headline="Take Action for Reliable Water Access"
        subheadline="Your support helps build, maintain, and sustain clean water systems across vulnerable communities. Choose a way to make a meaningful difference today."
        backgroundImage="/water.webp"
        primaryButtonText="Donate Now"
        primaryButtonHref="/take-action/donate"
        secondaryButtonText="Learn More"
        secondaryButtonHref="/take-action/learn"
      />

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#0369a1]">
            Take action today
          </p>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            Support water access in the way that fits you best.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Every action makes a difference — whether you give, sponsor, fundraise, volunteer,
            or simply learn and share what you know. Our most effective work is connected to
            people who care enough to step forward.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {actionCards.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg"
            >
              <h3 className="mb-3 text-xl font-semibold text-[#091c37]">
                {item.title}
              </h3>
              <p className="mb-6 text-slate-600">{item.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0369a1] transition group-hover:text-[#0c4a6e]">
                Explore <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0d9488]">
              Ways to give
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
              Flexible support, focused on what communities need most.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We offer multiple ways to contribute so you can choose what fits your values and budget.
              All pathways are designed to help communities access safe drinking water and maintain it over time.
            </p>

            <div className="mt-10 space-y-4">
              {waysToGive.map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#091c37]">{item.label}</h3>
                  <p className="mt-2 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <Image
              src="/home4.jpg"
              alt="Volunteers and supporters working on a water project"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0369a1]">
                Why your action matters
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
                Meaningful giving is measurable and sustained.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Every contribution unlocks more than water. It creates better health, schooling,
                market access, and safety. Our work is designed to make that impact visible and
                ongoing.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Reliable repairs</p>
                <p className="mt-3 text-lg font-semibold text-[#091c37]">Sustainability built in</p>
                <p className="mt-2 text-slate-600">
                  We keep water systems running by funding maintenance and training beyond the first build.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Transparency</p>
                <p className="mt-3 text-lg font-semibold text-[#091c37]">Know where your gift goes</p>
                <p className="mt-2 text-slate-600">
                  Donor updates, project reports, and clear impact stories keep every supporter informed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Take the next step"
        description="Choose how you want to support water access, whether through donating, sponsoring, campaigning, or learning more about the crisis." 
        buttonText="Explore actions"
        buttonHref="/take-action/learn"
      />
    </main>
  );
}
