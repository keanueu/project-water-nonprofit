'use client';

import { Zap, Eye, Wrench } from 'lucide-react';

interface Proposition {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const propositions: Proposition[] = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Enabled by Technology',
    description:
      'Local teams use smartphone-based reporting to log source condition, GPS location, and field photography in near real time for complete transparency.',
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: 'Built on Visibility',
    description:
      'Every water point is tracked and monitored. Public accountability keeps the repair loop active and ensures long-term sustainability.',
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: 'Focused on Repair',
    description:
      'When infrastructure fails, visibility and maintenance capacity matter as much as construction. We reserve funding for repairs.',
  },
];

export default function ValueProposition() {
  return (
    <section className="w-full bg-white py-24 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#0369a1] mb-3">
            Our Approach
          </p>
          <h2 className="mb-4 text-4xl sm:text-5xl font-serif font-bold text-[#091c37]">
            Built for Real-World Impact
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            We solve the water crisis through proven methods and long-term commitment
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {propositions.map((prop, index) => (
            <div
              key={index}
              className="group rounded-lg p-8 bg-gradient-to-br from-white to-slate-50 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:border-[#0369a1]/20"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex p-3 rounded-lg bg-[#0369a1]/10 text-[#0369a1] group-hover:bg-[#0369a1] group-hover:text-white transition-colors duration-300">
                {prop.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-semibold text-[#091c37]">{prop.title}</h3>

              {/* Description */}
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
