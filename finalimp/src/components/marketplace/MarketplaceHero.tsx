import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, ArrowRight, Heart, Sparkles, MapPin, Tag } from 'lucide-react';
import { Listing } from '../../types';

interface MarketplaceHeroProps {
  previewListings?: Listing[];
}

export const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({ previewListings = [] }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/browse?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/browse');
    }
  };

  const displayPreviews = previewListings.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/80 via-white to-white py-12 lg:py-20">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[600px] -translate-x-1/2 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Text Content */}
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-purple-700 shadow-xs backdrop-blur-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-purple-600" />
              </span>
              <span>Buy. Sell. Save. On Campus.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl leading-[1.1]">
              Everything Students Need.{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Right on Campus.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-zinc-600 sm:text-lg max-w-2xl leading-relaxed">
              Buy and sell affordable student essentials with people from your campus community. From textbooks and calculators to dorm furniture and laptops.
            </p>

            {/* Search Input Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-xl">
              <div className="relative flex items-center rounded-2xl border border-zinc-200/90 bg-white p-2 shadow-lg shadow-purple-900/5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20">
                <Search className="ml-3 size-5 text-zinc-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search textbooks, calculators, laptops, desks..."
                  className="w-full border-0 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-0"
                  id="hero-search-input"
                />
                <button
                  type="submit"
                  id="hero-search-btn"
                  className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-600/20 transition-all hover:bg-purple-700 active:scale-95 flex-shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/browse"
                id="hero-browse-btn"
                className="flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-95"
              >
                <ShoppingBag className="size-4 text-purple-400" />
                Browse Marketplace
              </Link>

              <Link
                to="/sell"
                id="hero-sell-btn"
                className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-bold text-zinc-800 shadow-xs transition-all hover:bg-zinc-50 hover:border-purple-300 active:scale-95"
              >
                <Tag className="size-4 text-purple-600" />
                Sell an Item
              </Link>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-4 text-purple-600" />
                Verified Student Sellers
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-purple-600" />
                Direct On-Campus Meetups
              </span>
            </div>
          </div>

          {/* Right Side Marketplace Preview Card */}
          <div className="relative lg:col-span-5">
            <div className="relative rounded-3xl border border-purple-100 bg-white/90 p-5 shadow-2xl shadow-purple-900/10 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                    <ShoppingBag className="size-4" />
                  </span>
                  <span className="font-bold text-sm text-zinc-900">
                    Popular Near You
                  </span>
                </div>
                <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200">
                  Campus Verified
                </span>
              </div>

              {/* Grid of Preview Cards */}
              <div className="grid grid-cols-2 gap-3">
                {displayPreviews.map((item) => (
                  <Link
                    key={item.id}
                    to={`/listing/${item.id}`}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-2 transition-all hover:bg-white hover:border-purple-300 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-200">
                      <img
                        src={item.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800'}
                        alt={item.title}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute bottom-1 right-1 rounded-md bg-zinc-900/80 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-1 text-xs font-bold text-zinc-900 group-hover:text-purple-600">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-medium truncate">
                      {item.sellerName}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Bottom Stat Floating Badge */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-purple-900 to-indigo-900 p-3 text-white shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                    <Sparkles className="size-4 text-purple-300" />
                  </span>
                  <div>
                    <p className="text-xs font-bold leading-none">2,400+ items listed</p>
                    <p className="text-[10px] text-purple-200">Active campus listings</p>
                  </div>
                </div>
                <Link
                  to="/browse"
                  className="rounded-lg bg-white/20 px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-purple-900"
                >
                  View All &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
