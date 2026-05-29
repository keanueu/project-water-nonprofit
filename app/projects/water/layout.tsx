'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faDroplet, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { ReactNode } from 'react';
import WaterDonationCTA from '@/components/WaterDonationCTA';

type SubNavItem = {
  href: string;
  label: string;
  icon: IconProp;
};

const subNav: SubNavItem[] = [
  { href: '/projects/water/overview', label: 'Overview', icon: faChartColumn },
  { href: '/projects/water/solutions', label: 'Solutions', icon: faDroplet },
  { href: '/projects/water/impact', label: 'Impact', icon: faHeartPulse },
];

export default function ProjectWaterLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="sticky top-16 z-40 border-b border-sky-100 bg-white/90 backdrop-blur lg:top-[72px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-1.5 py-2 text-xs text-slate-500">
            <Link href="/" className="transition hover:text-sky-700">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-sky-700">Water Project</span>
          </div>

          <nav className="flex flex-wrap gap-2 pb-3" aria-label="Water project sections">
            {subNav.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    active
                      ? 'border-sky-200 bg-sky-50 text-[#0c4a6e]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-[#091c37]'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="projects-nav-pill"
                      className="h-1.5 w-1.5 rounded-full bg-sky-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <WaterDonationCTA />
    </div>
  );
}
