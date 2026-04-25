'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Mission', href: '/our-mission' },
  {
    label: 'Our Work',
    children: [
      { label: 'Where We Work', href: '/our-work/where-we-work' },
      { label: 'How We Work', href: '/our-work/how-we-work' },
      { label: 'Stories', href: '/our-work/stories' },
    ],
  },
  {
    label: 'Take Action',
    children: [
      { label: 'Campaign', href: '/take-action/campaign' },
      { label: 'The Water Crisis', href: '/take-action/solve-water-crisis' },
      { label: 'Sponsor A Community', href: '/take-action/sponsor' },
      { label: 'Learn', href: '/take-action/learn' },
    ],
  },
  { label: 'Volunteer', href: '/volunteer' },
  {
    label: 'About',
    children: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Team', href: '/team' },
      { label: 'Transparency', href: '/transparency' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact-us' },
    ],
  },
];

function isLinkActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isItemActive(pathname: string, item: NavItem) {
  if (item.children) {
    return item.children.some((child) => isLinkActive(pathname, child.href));
  }
  return item.href ? isLinkActive(pathname, item.href) : false;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>(null);
  const [desktopGroupOpen, setDesktopGroupOpen] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
    setMobileGroupOpen(null);
    setDesktopGroupOpen(null);
  }, [pathname]);

  const openDesktopMenu = (label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDesktopGroupOpen(label);
  };

  const scheduleDesktopMenuClose = () => {
    closeTimerRef.current = setTimeout(() => setDesktopGroupOpen(null), 140);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          isScrolled
            ? 'border-slate-200 bg-white shadow-sm'
            : 'border-slate-100 bg-white/85 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* Desktop Layout */}
          <div className="flex h-[80px] items-center justify-between gap-8">
            <Link href="/" className="flex min-w-max flex-col items-start">
              <Image
                src="/logo-2016.png"
                alt="Project Water"
                width={270}
                height={42}
                className="h-9 w-auto object-contain lg:h-10"
                priority
              />
              <span className="hidden text-sm font-semibold tracking-tight text-[#0369a1] lg:block">
                Public. Proven. Reliable.
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => {
                const isActive = isItemActive(pathname, item);
                if (item.children) {
                  const expanded = desktopGroupOpen === item.label;
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => openDesktopMenu(item.label)}
                      onMouseLeave={scheduleDesktopMenuClose}
                    >
                      <button
                        className={`relative flex items-center gap-1 py-8 text-sm font-semibold transition-colors duration-200 ${
                          isActive ? 'text-[#0369a1]' : 'text-slate-600 hover:text-[#0369a1]'
                        }`}
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                        {isActive && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0369a1]" />}
                      </button>

                      {expanded && (
                        <div className="absolute left-0 top-full w-64 pt-0">
                          <div className="rounded-b-2xl border border-t-0 border-slate-200 bg-white p-2 shadow-xl shadow-slate-300/20">
                            {item.children?.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                  isLinkActive(pathname, child.href) 
                                    ? 'bg-sky-50 text-[#0c4a6e]' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#091c37]'
                                }`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href ?? '/'}
                    className={`relative py-8 text-sm font-semibold transition-colors duration-200 ${
                      isActive ? 'text-[#0369a1]' : 'text-slate-600 hover:text-[#0369a1]'
                    }`}
                  >
                    {item.label}
                    {isActive && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0369a1]" />}
                  </Link>
                );
              })}
              
              <Link
                href="/take-action/donate"
                className="ml-4 inline-flex items-center rounded-full bg-[#0369a1] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0c4a6e]"
              >
                Donate
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-slate-700 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE DRAWER COMPONENT --- */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden={!isDrawerOpen}
      />

      {/* Drawer Panel */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation panel"
        className={`fixed inset-y-0 right-0 z-[70] w-full max-w-[26rem] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full min-h-screen flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Menu</p>
              <h2 className="text-xl font-bold text-[#0369a1]">Navigation</h2>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = isItemActive(pathname, item);
                if (item.children) {
                  const expanded = mobileGroupOpen === item.label;
                  return (
                    <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50">
                      <button
                        onClick={() => setMobileGroupOpen(expanded ? null : item.label)}
                        className={`flex w-full items-center justify-between rounded-3xl px-4 py-4 text-left text-base font-semibold transition-colors ${
                          isActive ? 'bg-sky-50 text-[#0369a1]' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                      </button>
                      {expanded && (
                        <div className="space-y-1 border-t border-slate-200 bg-white px-4 py-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                                isLinkActive(pathname, child.href) ? 'bg-sky-50 text-[#0369a1]' : 'text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {child.label}
                              <ArrowRight className="h-4 w-4 opacity-40" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href ?? '/'}
                    className={`block rounded-3xl px-4 py-4 text-base font-semibold transition-colors ${
                      isActive ? 'bg-sky-50 text-[#0369a1]' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer CTA */}
          <div className="border-t border-slate-100 p-5">
            <Link
              href="/take-action/donate"
              className="flex w-full items-center justify-center rounded-full bg-[#0369a1] py-4 text-base font-bold text-white shadow-lg transition-transform duration-200 hover:bg-[#0c4a6e] active:scale-95"
            >
              Donate Now
            </Link>
            <p className="mt-4 text-center text-sm text-slate-500">
              Project Water — Every drop counts.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}