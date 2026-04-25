'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
}: CTASectionProps) {
  return (
    <section className="w-full bg-gradient-to-r from-[#091c37] to-[#0c4a6e] py-24 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl text-center">
        {/* Icon */}
        <div className="mb-6 inline-flex p-4 rounded-full bg-[#0ea5e9]/20 text-[#0ea5e9]">
          <Heart className="w-8 h-8" />
        </div>

        {/* Title */}
        <h2 className="mb-4 text-4xl sm:text-5xl font-serif font-bold text-white">
          {title}
        </h2>

        {/* Description */}
        <p className="mb-10 text-lg sm:text-xl text-white/85 font-light max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* CTA Button */}
        <Link
          href={buttonHref}
          className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#0ea5e9] text-[#091c37] font-bold rounded-lg shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 ease-out transform hover:scale-105"
        >
          {buttonText}
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
