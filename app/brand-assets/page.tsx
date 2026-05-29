import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faDownload, faImage } from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Brand and Visual Assets | Project Water',
  description: 'A visual reference page for logos, identity variants, and supporting graphics used across the Project Water site.',
};

const heroVisuals = [
  {
    title: 'About hero alternative',
    src: '/aboutus.2top.webp',
  },
  {
    title: 'Join-focused visual',
    src: '/aboutusjoin.webp',
  },
  {
    title: 'Mission legacy visual',
    src: '/our mission.jpg',
  },
];

const logoVariants = [
  {
    title: 'Responsive logo mark',
    src: '/twp-resp-logo.png',
  },
  {
    title: 'White logo (variant A)',
    src: '/white logo.webp',
  },
  {
    title: 'White logo (variant B)',
    src: '/whitelogo.png',
  },
];

const graphicAssets = [
  { title: 'File icon graphic', src: '/file.svg' },
  { title: 'Globe icon graphic', src: '/globe.svg' },
  { title: 'Window icon graphic', src: '/window.svg' },
  { title: 'Next graphic', src: '/next.svg' },
  { title: 'Vercel graphic', src: '/vercel.svg' },
];

export default function BrandAssetsPage() {
  return (
    <main className="bg-white text-[#091c37]">
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Asset Library</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#091c37] sm:text-5xl">
          Brand and visual asset reference
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          This page documents available visual assets for consistent page and content building across the refactored website.
        </p>
      </section>

      <section className="bg-slate-50 px-6 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faImage} className="h-5 w-5 text-sky-700" />
            <h2 className="text-2xl font-semibold text-[#091c37]">Hero and campaign visuals</h2>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {heroVisuals.map((item) => (
              <article key={item.src} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-52">
                  <Image src={item.src} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-[#091c37]">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{item.src}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <h2 className="text-2xl font-semibold text-[#091c37]">Logo variants</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {logoVariants.map((item) => (
            <article key={item.src} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="relative flex h-28 items-center justify-center rounded-2xl bg-[#091c37] px-4">
                <Image src={item.src} alt={item.title} fill className="object-contain p-4" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#091c37]">{item.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{item.src}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold text-[#091c37]">Supporting graphics</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {graphicAssets.map((item) => (
              <article key={item.src} className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <div className="relative mx-auto h-20 w-20">
                  <Image src={item.src} alt={item.title} fill className="object-contain" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-[#091c37]">{item.title}</h3>
                <p className="mt-1 text-[11px] text-slate-500">{item.src}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-wrap gap-3">
          <Link href="/take-action/learn" className="inline-flex items-center gap-2 rounded-full bg-[#0369a1] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0c4a6e]">
            Back to learning hub
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </Link>
          <Link href="/contact-us" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-[#091c37] transition hover:bg-slate-50">
            Request media pack
            <FontAwesomeIcon icon={faDownload} className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
