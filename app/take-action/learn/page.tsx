import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBookOpen, faCompass, faDroplet, faMagnifyingGlass, faEarthAmericas, faHandshakeAngle, faLightbulb, faHeart, faGlobe } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Learn About the Water Crisis | Every Drop Counts",
  description:
    "Explore educational resources, water access fundamentals, field stories, and mission-centered guides that help supporters understand the work before they act.",
};

const learningPillars = [
  {
    title: "Understand the challenge",
    description:
      "Learn how water access affects health, education, dignity, and time across entire communities.",
    icon: faDroplet,
  },
  {
    title: "See the field context",
    description:
      "Explore stories and examples that show why local leadership and maintenance planning matter so much.",
    icon: faEarthAmericas,
  },
  {
    title: "Follow practical solutions",
    description:
      "Understand how water projects move from assessment and design to installation, stewardship, and reporting.",
    icon: faCompass,
  },
  {
    title: "Act with confidence",
    description:
      "Use what you learn to donate, sponsor, advocate, or launch a campaign rooted in real understanding.",
    icon: faHandshakeAngle,
  },
];

const featuredResources = [
  {
    title: "Water overview",
    description: "A stronger look at how our water work is structured and why sustainable systems matter.",
    href: "/projects/water/overview",
    icon: faMagnifyingGlass,
  },
  {
    title: "Field stories",
    description: "Read community-centered stories that help put the mission into human context.",
    href: "/our-work",
    icon: faBookOpen,
  },
  {
    title: "Our mission",
    description: "See the values, commitments, and operating principles that guide the work.",
    href: "/our-mission",
    icon: faLightbulb,
  },
  {
    title: "Brand and visual assets",
    description: "Reference logos and visual assets used for consistent content building across the site.",
    href: "/brand-assets",
    icon: faCompass,
  },
];

const quickGuides = [
  "Why distance to water affects school attendance and family income",
  "How maintenance planning strengthens the life of a water system",
  "What donors should look for when evaluating lasting impact",
  "Why community partnership is essential to responsible implementation",
];

const issueDeepDives = [
  {
    title: "Water Crisis",
    href: "/take-action/learn/water-crisis",
    image: "/crisistop.webp",
    description: "See how health, time burden, and reliability gaps connect across communities.",
  },
  {
    title: "Education",
    href: "/take-action/learn/education",
    image: "/education1.jpg",
    description: "Understand how reliable water access supports attendance and learning continuity.",
  },
  {
    title: "Health",
    href: "/take-action/learn/health",
    image: "/healthtopbg.jpg",
    description: "Explore the link between clean water and lower preventable disease exposure.",
  },
  {
    title: "Hunger",
    href: "/take-action/learn/hunger",
    image: "/hungertop.webp",
    description: "Learn how water reliability affects food preparation and household nutrition.",
  },
  {
    title: "Poverty",
    href: "/take-action/learn/poverty",
    image: "/povertytop.webp",
    description: "Follow the economic pathway from water reliability to greater household stability.",
  },
];

export default function LearnPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/learntop.jpg"
            alt="Children learning together in a community connected to clean water access"
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
              Learn before you act
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Better understanding leads to more thoughtful action.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              If you want to give, advocate, or invite others into the mission, start here. These resources are
              designed to help you understand the water crisis, the people affected by it, and the kinds of solutions
              that can truly last.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#resources"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Explore resources
              </Link>
              <Link
                href="/take-action/donate"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Give while you learn
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Learning pillars</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Four ways to build a grounded understanding of water access work.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Good learning resources do more than explain the problem. They help people connect need, context,
            responsibility, and action.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {learningPillars.map((pillar) => {
            

            return (
              <article
                key={pillar.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm shadow-slate-200/60"
              >
                <div className="inline-flex rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                  <FontAwesomeIcon icon={pillar.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{pillar.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Resource ideas</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Start with the questions that shape wise support.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Learning is most helpful when it answers the practical questions supporters already carry. These are a
              few of the topics we encourage people to explore first.
            </p>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/60">
              <ul className="space-y-4">
                {quickGuides.map((guide) => (
                  <li key={guide} className="flex gap-3 text-sm leading-7 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    <span>{guide}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-[2rem]">
            <Image
              src="/learnbot.webp"
              alt="Children and families benefiting from improved water access"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Issue deep-dives</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explore focused pages on the issues connected to water access.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            These pages break down specific impact areas so supporters can build a deeper, systems-level understanding.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {issueDeepDives.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-40">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <h3 className="absolute bottom-3 left-3 text-lg font-semibold text-white">{item.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                <span className="mt-3 inline-flex items-center text-sm font-semibold text-cyan-700">
                  Open guide
                  <FontAwesomeIcon icon={faArrowRight} className="ml-1.5 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="resources" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Featured links</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Explore stories, overview, and mission-centered context.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              These pages work well together: one explains the model, one shows the human stories, and one clarifies
              the values that guide the work.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredResources.map((resource) => {
              

              return (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="inline-flex rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
                    <FontAwesomeIcon icon={resource.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{resource.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-300">{resource.description}</p>
                  <span className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-300">
                    Visit page
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Video resources</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Watch and learn from our community impact stories.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Our video series brings you directly into the lives and communities transformed by access to clean, reliable water.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-1">
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-200/60">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/1aW7fpd4GdY?list=PLDZXcv-5kqbcQieIrIaqkcwG1PXq3NSn1"
                  title="Empowering the Girl Child"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900">Empowering the Girl Child</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Discover how access to clean water transforms education, health, and opportunity for girls and women across communities we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem]">
            <Image
              src="/learnbottom.jpg"
              alt="Community members gathered outdoors in support of clean water education"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Next action</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              When you understand the work, it becomes easier to invite others into it.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Use what you learn to make a gift, start a campaign, or simply continue exploring how clean water access
              transforms daily life for families and communities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/take-action/campaign"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Start a campaign
              </Link>
              <Link
                href="/take-action/solve-water-crisis"
                className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                How we solve the crisis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
