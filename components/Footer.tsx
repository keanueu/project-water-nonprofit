import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faXTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const footerLinks = {
  explore: [
    { label: 'Home', href: '/' },
    { label: 'Our Mission', href: '/our-mission' },
    { label: 'Impact Reports', href: '/impact-reports' },
    { label: 'Where We Work', href: '/our-work/where-we-work' },
    { label: 'How We Work', href: '/our-work/how-we-work' },
    { label: 'Stories', href: '/our-work/stories' },
  ],
  projects: [
    { label: 'Water Overview', href: '/projects/water/overview' },
    { label: 'Water Solutions', href: '/projects/water/solutions' },
    { label: 'Water Impact', href: '/projects/water/impact' },
    { label: 'Campaigns', href: '/take-action/campaign' },
    { label: 'Sponsor a Community', href: '/take-action/sponsor' },
  ],
  actions: [
    { label: 'Donate', href: '/take-action/donate' },
    { label: 'Learn', href: '/take-action/learn' },
    { label: 'Volunteer', href: '/volunteer' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'FAQ', href: '/faq' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#0f2748] bg-[#091c37] text-white">
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="mb-12 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Project Water</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Keep clean water flowing where it is needed most.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200">
              Every contribution supports field-tested water solutions, transparent reporting, and long-term maintenance planning.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href="/take-action/donate"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Donate now
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/projects/water/impact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View impact
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Updated to xl:grid-cols-5 to ensure uniform spacing for all 5 sections */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-5 xl:gap-14">
          <div className="space-y-5">
            <Image
              src="/footer-logo.png"
              alt="Project Water logo"
              width={192}
              height={96}
              className="h-24 w-48 object-contain"
            />
            <p className="text-sm leading-relaxed text-slate-300">
              We build and maintain reliable water systems with local partners across sub-Saharan Africa.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              501(c)(3) nonprofit | EIN 26-1455510
            </p>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Explore</h3>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-300 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects and Actions are now direct children for consistent layout */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Projects</h3>
            <ul className="space-y-2.5">
              {footerLinks.projects.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-300 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Take Action</h3>
            <ul className="space-y-2.5">
              {footerLinks.actions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-300 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Connect</h3>
            {/* Wrapper div removed here as requested */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-200" />
                <address className="not-italic text-sm leading-relaxed text-slate-300">
                  17 Depot Street, 2nd Floor
                  <br />
                  Concord, NH 03301
                  <br />
                  United States
                </address>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 flex-shrink-0 text-sky-200" />
                <a href="mailto:contact@projectwater.org" className="text-sm text-slate-300 transition hover:text-white">
                  contact@projectwater.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4 flex-shrink-0 text-sky-200" />
                <a href="tel:+16035550123" className="text-sm text-slate-300 transition hover:text-white">
                  +1 (603) 555-0123
                </a>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.youtube.com/"
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                <FontAwesomeIcon icon={faYoutube} className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/"
                aria-label="Twitter"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright {new Date().getFullYear()} Project Water. All rights reserved.</p>
            <div className="flex flex-wrap gap-6">
              <Link href="/transparency" className="transition hover:text-white">
                Transparency
              </Link>
              <Link href="/faq" className="transition hover:text-white">
                Policies
              </Link>
              <Link href="/contact-us" className="transition hover:text-white">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}