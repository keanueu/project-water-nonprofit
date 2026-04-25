import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ImpactStats from '@/components/ImpactStats';
import ValueProposition from '@/components/ValueProposition';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Project Water | Public, Proven, Reliable',
  description:
    'Project Water delivers measurable water access with public reporting, field monitoring, and long-term repair commitments.',
};

const actionCards = [
  {
    title: 'Start a Campaign',
    description:
      'Turn your birthday, school, company, or church into a clean water fundraiser with tools that make it easy to invite others in.',
    href: '/take-action/campaign',
  },
  {
    title: 'Explore Water Solutions',
    description:
      'See how wells, spring protections, rainwater catchment systems, and repair programs are matched to each community.',
    href: '/projects/water/solutions',
  },
  {
    title: 'Follow the Impact',
    description:
      'Read stories, view project regions, and understand how reliable water access changes health, education, and opportunity.',
    href: '/our-work/stories',
  },
];

export default function HomePage() {
  return (
    <div className="font-brand-sans bg-white text-[#091c37]">
      <HeroSection
        headline="Water Access Should Be Public, Proven, and Reliable"
        subheadline="Project Water helps communities across sub-Saharan Africa access safe water through locally led construction, transparent reporting, and long-term repair commitments."
        backgroundImage="/water.webp"
        primaryButtonText="Donate Now"
        primaryButtonHref="/take-action/donate"
        secondaryButtonText="Learn More"
        secondaryButtonHref="/projects/water/overview"
      />

      <section className="bg-[#091c37] px-6 py-14 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[240px_1fr]">
          <div className="relative mx-auto h-20 w-52 lg:mx-0">
            <Image
              src="/white logo.webp"
              alt="Project Water mark"
              fill
              className="object-contain"
              sizes="208px"
            />
          </div>
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7dd3fc]">
              One community at a time
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/90 sm:text-xl">
              You can help end the water crisis and restore hope. Together we fund clean, safe,
              and reliable water systems that keep working year after year.
            </p>
          </div>
        </div>
      </section>

      <ImpactStats />
      <ValueProposition />

      <section className="px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-sky-100">
            <Image
              src="/home1.jpg"
              alt="Family members benefiting from clean water access"
              width={900}
              height={700}
              className="h-[420px] w-full object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0369a1]">
              Clean water is a family concern
            </p>
            <h2 className="mb-6 font-serif text-4xl font-bold leading-tight text-[#091c37] sm:text-5xl">
              When water comes closer, opportunity comes back.
            </h2>
            <p className="mb-5 text-lg leading-relaxed text-slate-600">
              Finding water is often a daily burden carried by girls, mothers, and children.
              Reliable nearby water returns time for school, work, rest, and imagination.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Clean water improves health, reduces the danger of unsafe collection journeys, and
              gives families room to build a more stable future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/our-mission"
                className="rounded-lg bg-[#0369a1] px-6 py-3 font-semibold text-white transition hover:bg-[#0c4a6e]"
              >
                Read Our Mission
              </Link>
              <Link
                href="/our-work/where-we-work"
                className="rounded-lg border border-slate-200 px-6 py-3 font-semibold text-[#091c37] transition hover:border-[#0369a1] hover:text-[#0369a1]"
              >
                Where We Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0d9488]">
              A gift of lasting opportunity
            </p>
            <h2 className="mb-6 font-serif text-4xl font-bold leading-tight text-[#091c37] sm:text-5xl">
              We fund the right water solution, then keep it working.
            </h2>
            <p className="mb-5 text-lg leading-relaxed text-slate-600">
              Our local teams build water wells, protect springs, support small dams, and install
              rainwater systems based on what each location actually needs.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Just as important, we reserve resources for maintenance, reporting, and follow-up so
              the promise of water does not disappear after installation.
            </p>
            <Link
              href="/projects/water/solutions"
              className="inline-flex rounded-lg bg-[#091c37] px-6 py-3 font-semibold text-white transition hover:bg-[#0c4a6e]"
            >
              See Water Solutions
            </Link>
          </div>
          <div className="order-1 relative overflow-hidden rounded-3xl shadow-2xl shadow-slate-200 lg:order-2">
            <Image
              src="/home2.webp"
              alt="Community water project in action"
              width={900}
              height={700}
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0369a1]">
              Why supporters stay engaged
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#091c37] sm:text-5xl">
              Never wonder whether your generosity matters
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              Seeing is believing. We pair stories, photos, maps, and field updates with the
              projects you support so you can follow the change your giving makes over time.
            </p>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-sky-100">
              <Image
                src="/home3.webp"
                alt="Updates and stories from field projects"
                width={1100}
                height={700}
                className="h-[380px] w-full object-cover"
              />
            </div>

            <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="font-serif text-3xl font-bold text-[#091c37]">
                Scope, transparency, and proof
              </h3>
              <p className="text-base leading-relaxed text-slate-600">
                Choose a community, give to a campaign, or support our broader mission and you’ll
                be connected to real outcomes — not vague promises.
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="rounded-xl bg-slate-50 px-4 py-3">
                  Project stories and milestone updates from the field
                </li>
                <li className="rounded-xl bg-slate-50 px-4 py-3">
                  Region-by-region visibility into where the work happens
                </li>
                <li className="rounded-xl bg-slate-50 px-4 py-3">
                  Long-term emphasis on maintenance, repair, and accountability
                </li>
              </ul>
              <Link
                href="/projects/water/impact"
                className="inline-flex rounded-lg border border-[#0369a1] px-6 py-3 font-semibold text-[#0369a1] transition hover:bg-[#0369a1] hover:text-white"
              >
                Explore Our Impact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/home4.jpg"
            alt="Supporters and communities impacted by clean water access"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#091c37]/75" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center text-white sm:px-8 lg:px-12">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-[#7dd3fc]">
            Trusted Giving
          </p>
          <blockquote className="font-serif text-3xl font-bold leading-tight sm:text-4xl">
            “I have never in my life witnessed a charitable organization deliver more per dollar
            than The Water Project does on a regular basis.”
          </blockquote>
          <p className="mt-6 text-base text-white/80">
            Supporters stay because the work is visible, accountable, and built for long-term
            impact.
          </p>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0369a1]">
              More ways to engage
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#091c37] sm:text-5xl">
              Explore more of the mission
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {actionCards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-4 text-2xl font-semibold text-[#091c37]">{card.title}</h3>
                <p className="mb-6 text-slate-600 leading-relaxed">{card.description}</p>
                <Link
                  href={card.href}
                  className="font-semibold text-[#0369a1] transition hover:text-[#0c4a6e]"
                >
                  Visit page →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Make Water Access a Reality"
        description="Every contribution helps fund water systems that are visible, monitored, maintained, and proven to work. Join the movement for reliable water access."
        buttonText="Support Water Access"
        buttonHref="/take-action/donate"
      />
    </div>
  );
}
