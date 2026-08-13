import React from 'react';
import {
  ShieldCheck,
  BadgePercent,
  Users,
  MapPin,
  Banknote,
  GraduationCap
} from 'lucide-react';

const TRUST_FEATURES = [
  {
    title: 'Campus-Focused',
    description: 'Listings strictly from students in your campus community.',
    icon: GraduationCap,
  },
  {
    title: 'Affordable Prices',
    description: 'Save up to 70% compared to retail bookstore prices.',
    icon: BadgePercent,
  },
  {
    title: 'Easy Student-to-Student',
    description: 'Direct messaging and quick response times with peers.',
    icon: Users,
  },
  {
    title: 'Safer Local Deals',
    description: 'Meet in safe public campus spots like libraries or canteens.',
    icon: MapPin,
  },
  {
    title: 'Zero Hidden Fees',
    description: '100% free peer exchange. Keep every rupee you earn.',
    icon: Banknote,
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100/80 px-3.5 py-1 text-xs font-bold text-purple-800 mb-3 border border-purple-200">
            <ShieldCheck className="size-4 text-purple-600" />
            Built for College Communities
          </div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            Made for Students, by Students
          </h2>
          <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
            CampusMart simplifies buying and selling on campus so you can save money, declutter your dorm room, and help fellow students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TRUST_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-purple-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-purple-200"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 mb-4 shadow-xs">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-bold text-sm text-zinc-900 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
