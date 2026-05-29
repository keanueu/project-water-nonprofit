'use client';

import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? Math.min(scrollTop / scrollableHeight, 1) : 0;

      setVisible(scrollTop > 280);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const radius = 20;
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const dashOffset = circumference * (1 - scrollProgress);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 inline-flex h-16 w-16 items-center justify-center rounded-full border border-sky-200 bg-white/95 text-[#0c4a6e] backdrop-blur transition-colors duration-300 hover:border-[#0369a1] hover:text-[#0369a1]"
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="24" cy="24" r={radius} stroke="rgba(14, 165, 233, 0.2)" strokeWidth="3" fill="none" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="rgb(3, 105, 161)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-150"
        />
      </svg>
      <FontAwesomeIcon icon={faArrowUp} className="relative h-4 w-4" />
    </button>
  );
}
