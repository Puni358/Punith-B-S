import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Sparkles, ArrowRight } from 'lucide-react';

export const SellCta: React.FC = () => {
  return (
    <section id="sell" className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-zinc-900 p-8 sm:p-12 text-white shadow-2xl">
          {/* Decorative background glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 size-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-purple-200 border border-white/10">
              <Sparkles className="size-3.5 text-purple-300" />
              List in under a minute
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl leading-tight">
              Got something you don't need anymore?
            </h2>

            <p className="text-sm text-purple-100 sm:text-base leading-relaxed">
              Turn your unused textbooks, calculators, tech, and dorm supplies into extra cash. Post it on CampusMart and connect directly with interested students around you.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/sell"
                id="cta-sell-btn"
                className="flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-purple-950 shadow-lg transition-all hover:bg-purple-50 hover:scale-[1.02] active:scale-95"
              >
                <Tag className="size-4 text-purple-600" />
                <span>Sell an Item</span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                to="/browse"
                className="text-xs font-bold text-purple-200 hover:text-white underline underline-offset-4 transition-colors"
              >
                Or browse active listings &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
