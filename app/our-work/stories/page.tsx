import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBookOpen, faHeartPulse, faSchool, faShieldHalved, faShield, faHeart } from '@fortawesome/free-solid-svg-icons';
﻿import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Stories | Project Water',
  description:
    'Read community stories that show how reliable clean water improves safety, health, education, and long-term opportunity.',
};

const stories = [
  {
    image: '/stories.jpg',
    title: 'Safer water access for children in Rwebigwara',
    person: 'Marvin, age 12',
    location: 'Rwebigwara Community, Uganda',
    summary:
      'Before installation, children often collected water from unsafe locations. The protected source reduced risk and improved day-to-day confidence for families.',
    outcome: 'Improved child safety and reduced exposure to contaminated collection points.',
  },
  {
    image: '/stories1.webp',
    title: 'School-day stability in Western Kenya',
    person: 'Gisambai Primary School community',
    location: 'Western Kenya',
    summary:
      'Reliable school water access reduced disruptions that previously interrupted lessons, hygiene routines, and attendance consistency.',
    outcome: 'Stronger learning continuity and healthier school routines.',
  },
  {
    image: '/stories2.jpg',
    title: 'Less collection burden, more productive time',
    person: 'Godfrey',
    location: 'Miramura Community, Uganda',
    summary:
      'Long-distance collection consumed hours and created avoidable transport risk. Nearby access changed the rhythm of daily life for many households.',
    outcome: 'More time retained for work, family care, and educational support.',
  },
  {
    image: '/stories3.jpg',
    title: 'Dignity for older residents in Kiyonza-Kyamukudumi',
    person: 'Catherine, age 74',
    location: 'Kiyonza-Kyamukudumi Community, Uganda',
    summary:
      'For elderly community members, shorter distance and safer access can be life-changing. Local water reliability eased a major physical burden.',
    outcome: 'Reduced strain and increased independence for older adults.',
  },
];

const themes = [
  {
    title: 'Health and safety',
    detail: 'Protected sources reduce contamination risk and unsafe collection journeys.',
    icon: faHeartPulse,
  },
  {
    title: 'Education continuity',
    detail: 'Nearby reliable water helps schools maintain attendance and classroom focus.',
    icon: faSchool,
  },
  {
    title: 'Transparent follow-through',
    detail: 'Field updates and project visibility help supporters see sustained outcomes.',
    icon: faShieldHalved,
  },
];

export default function StoriesPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/storiestop.webp"
            alt="People gathered around a community water point"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#091c37]/68" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 to-[#0369a1]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Stories from the field</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Water systems matter because people and families matter.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            These stories show what reliable water access looks like in daily life: safer routines, stronger school participation, and renewed household stability.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Community voices</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            Real outcomes from local partnerships and reliable service delivery.
          </h2>
        </div>

        <div className="mt-10 space-y-7">
          {stories.map((story, index) => (
            <article key={story.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className={`grid gap-0 lg:grid-cols-[0.95fr_1.05fr] ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div className="relative min-h-[260px]">
                  <Image src={story.image} alt={story.title} fill className="object-cover" />
                </div>
                <div className="p-7 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-700">{story.location}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#091c37]">{story.title}</h3>
                  <p className="mt-2 text-sm font-medium text-slate-500">{story.person}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{story.summary}</p>
                  <p className="mt-4 rounded-xl bg-sky-50 px-4 py-3 text-sm font-medium text-[#0c4a6e]">{story.outcome}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-18 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Common themes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
              The same priorities appear across regions and communities.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {themes.map((theme) => {
              
              return (
                <article key={theme.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="inline-flex rounded-2xl bg-sky-100 p-3 text-[#0369a1]">
                    <FontAwesomeIcon icon={theme.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-[#091c37]">{theme.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{theme.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#091c37] px-6 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Keep the stories moving</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Help fund the next chapter of reliable water access.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/take-action/donate"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-slate-100"
            >
              Donate now
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </Link>
            <Link
              href="/projects/water/impact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Impact dashboard
              <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
