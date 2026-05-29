'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  backgroundImage: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

export default function HeroSection({
  headline,
  subheadline,
  backgroundImage,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: HeroSectionProps) {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(9, 28, 55, 0.5) 0%, rgba(3, 105, 161, 0.3) 100%), url('${backgroundImage}')`,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 text-center">
        {/* Headline */}
        <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight text-white drop-shadow-lg">
          {headline}
        </h1>

        {/* Subheadline */}
        <p className="mb-12 text-lg sm:text-xl lg:text-2xl text-white/95 font-light leading-relaxed drop-shadow-md max-w-2xl mx-auto">
          {subheadline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          {/* Primary Button */}
          <Link
            href={primaryButtonHref}
            className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 bg-[#0369a1] text-white font-semibold transition-colors duration-300 hover:bg-[#091c37]"
          >
            {primaryButtonText}
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary Button */}
          <Link
            href={secondaryButtonHref}
            className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 bg-white/10 text-white font-semibold border border-white/30 hover:bg-white hover:text-[#091c37] transition-colors duration-300 backdrop-blur-sm"
          >
            {secondaryButtonText}
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
