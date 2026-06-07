'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function WaterDonationCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40"
        >
          <div className="pointer-events-auto mx-auto mb-4 flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-sky-700/40 bg-[#08203d]/95 px-5 py-3 text-white shadow-2xl shadow-[#08203d]/40 backdrop-blur">
            <p className="hidden text-sm text-sky-100 sm:block">
              Water systems last longer when communities can fund repairs and rapid response.
            </p>
            <p className="text-sm text-sky-100 sm:hidden">Support long-term water reliability.</p>

            <div className="flex items-center gap-2">
              <Link
                href="/take-action/donate"
                className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#08203d] transition hover:bg-sky-50"
              >
                Give <span className="numbers">$34</span>
              </Link>
              <Link
                href="/take-action/donate"
                className="inline-flex items-center gap-1 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Custom gift
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
