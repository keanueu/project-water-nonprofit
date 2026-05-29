import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBookOpenReader, faClock, faSchool, faBookOpen } from '@fortawesome/free-solid-svg-icons';
﻿import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Education and Water Access | Project Water',
  description: 'How reliable clean water strengthens school attendance, concentration, and long-term learning outcomes.',
};

const educationEffects = [
  {
    title: 'Attendance gains',
    description: 'When water is closer and safer, fewer school days are lost to long collection routines.',
    icon: faSchool,
  },
  {
    title: 'Learning continuity',
    description: 'Reliable school water supports hygiene and classroom consistency throughout the year.',
    icon: faBookOpenReader,
  },
  {
    title: 'Recovered time',
    description: 'Students and caregivers regain hours that can be redirected to study and family stability.',
    icon: faClock,
  },
];

export default function EducationPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/education1.jpg" alt="Students in class after improved water access" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#091c37]/68" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#091c37]/90 to-[#0ea5e9]/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Issue Deep Dive</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Education outcomes rise when water access becomes reliable.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Clean water in and near schools helps protect attendance, classroom focus, and long-term student opportunity.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-18 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Why it matters</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#091c37] sm:text-4xl">
            Water access is education infrastructure.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            School systems cannot deliver consistently when students and staff are pulled into daily water insecurity. Reliable sources create conditions for learning, hygiene, and retention.
          </p>

          <div className="mt-7 space-y-4">
            {educationEffects.map((item) => {
              
              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex rounded-xl bg-sky-100 p-2 text-[#0369a1]">
                      <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-[#091c37]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-[340px]">
            <Image src="/edupic.png" alt="Children participating in school activities" fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#091c37]">Learning can accelerate when water burden falls.</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Integrated water programming helps schools maintain healthier daily routines and better educational continuity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          <Link href="/take-action/learn" className="inline-flex items-center gap-2 rounded-full bg-[#0369a1] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0c4a6e]">
            Back to learning hub
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </Link>
          <Link href="/take-action/donate" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-white">
            Support education impact
          </Link>
        </div>
      </section>
    </main>
  );
}
