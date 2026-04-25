'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, Droplet, Heart, Globe } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    icon: <Users className="w-8 h-8" />,
    value: '785M',
    label: 'People Reached',
    description: 'Safe water access across communities',
  },
  {
    icon: <Droplet className="w-8 h-8" />,
    value: '95%',
    label: 'Long-Term Success',
    description: 'Water points remaining functional',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    value: '600+',
    label: 'Communities',
    description: 'Transformed through our work',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: '5YR+',
    label: 'Repair Guarantee',
    description: 'Maintenance funding reserved',
  },
];

export default function ImpactStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-white to-slate-50 py-24 px-6 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl sm:text-5xl lg:text-5xl font-serif font-bold text-[#091c37]">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Measurable results that prove the power of reliable water access
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg bg-white p-8 shadow-sm hover:shadow-md transition-all duration-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#0369a1]/5 rounded-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />

              {/* Icon */}
              <div className="relative mb-6 inline-flex p-3 rounded-lg bg-[#0369a1]/10 text-[#0369a1] group-hover:bg-[#0369a1] group-hover:text-white transition-colors duration-300">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="mb-2">
                <p className="text-4xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#091c37] group-hover:text-[#0369a1] transition-colors duration-300">
                  {stat.value}
                </p>
              </div>

              {/* Label */}
              <h3 className="mb-2 text-lg font-semibold text-[#091c37]">{stat.label}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                {stat.description}
              </p>

              {/* Hover Border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0369a1] to-[#0d9488] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
