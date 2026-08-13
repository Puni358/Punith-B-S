import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageSquare, Handshake, PlusCircle, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Find',
    description: 'Search for what you need across campus listings—textbooks, lab gear, tech, and dorm supplies.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Connect',
    description: 'Contact the student selling it directly to agree on a convenient meetup time and location.',
    icon: MessageSquare,
  },
  {
    number: '03',
    title: 'Buy or Sell',
    description: 'Meet safely on campus at the library or student center to inspect the item and finalize.',
    icon: Handshake,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white border-t border-zinc-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            Simple Process
          </span>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl mt-1">
            How CampusMart Works
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            3 simple steps to buy or sell anything on campus safely in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center p-6 rounded-3xl border border-zinc-200/80 bg-zinc-50/50 transition-all hover:bg-white hover:shadow-xl hover:border-purple-300"
              >
                <span className="absolute top-4 right-5 text-2xl font-black text-purple-200">
                  {step.number}
                </span>

                <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/20 mb-5">
                  <Icon className="size-7" />
                </div>

                <h3 className="font-extrabold text-lg text-zinc-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/sell"
            className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/25 transition-all hover:bg-purple-700 active:scale-95"
          >
            <PlusCircle className="size-4" />
            <span>Start Selling Now</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
