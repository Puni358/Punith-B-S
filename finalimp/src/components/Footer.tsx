import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-900 text-zinc-300 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md">
                <GraduationCap className="size-5" />
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                CampusMart
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Buy. Sell. Save. On Campus. The premier peer-to-peer student exchange marketplace for textbooks, electronics, dorm furniture, and engineering essentials.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/60 border border-purple-800/50 px-3 py-1 text-[11px] font-medium text-purple-300">
              <ShieldCheck className="size-3.5 text-purple-400" />
              Verified Campus Exchange
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-100 mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/browse" className="hover:text-white transition-colors">Browse All Items</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell an Item</Link></li>
              <li><Link to="/my-listings" className="hover:text-white transition-colors">My Listings</Link></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-100 mb-4">
              Popular Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/browse?category=Books" className="hover:text-white transition-colors">Textbooks & Notes</Link></li>
              <li><Link to="/browse?category=Electronics" className="hover:text-white transition-colors">Laptops & Calculators</Link></li>
              <li><Link to="/browse?category=Stationery" className="hover:text-white transition-colors">Engineering Supplies</Link></li>
              <li><Link to="/browse?category=Furniture" className="hover:text-white transition-colors">Hostel Essentials</Link></li>
            </ul>
          </div>

          {/* Safety Notice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-100 mb-4">
              Campus Safety
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Always inspect items in person and prefer well-lit, public meeting locations on campus like library foyers or student center lobbies.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-purple-400 font-medium">
              <Sparkles className="size-3" />
              Direct Student-to-Student Deals
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <p>&copy; {new Date().getFullYear()} CampusMart. Built for college students.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="size-3.5 text-purple-500 fill-purple-500 inline" /> for campus communities
          </p>
        </div>
      </div>
    </footer>
  );
};
