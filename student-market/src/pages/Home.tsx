import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchListings } from '../services/listingService';
import { Listing } from '../types';
import { ListingCard } from '../components/ListingCard';
import { ListingCardSkeleton } from '../components/Loading';
import { 
  BookOpen, 
  Laptop, 
  Armchair, 
  PenTool, 
  Shirt, 
  Glasses, 
  Package, 
  ArrowRight, 
  Sparkles,
  ShoppingBag,
  PlusCircle
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Books', icon: BookOpen, color: '#EFE9E3' },
  { name: 'Electronics', icon: Laptop, color: '#EFE9E3' },
  { name: 'Furniture', icon: Armchair, color: '#EFE9E3' },
  { name: 'Stationery', icon: PenTool, color: '#EFE9E3' },
  { name: 'Clothing', icon: Shirt, color: '#EFE9E3' },
  { name: 'Accessories', icon: Glasses, color: '#EFE9E3' },
  { name: 'Other', icon: Package, color: '#EFE9E3' },
];

export const Home: React.FC = () => {
  const [recentListings, setRecentListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const loadRecent = async () => {
      try {
        const all = await fetchListings();
        if (isMounted) {
          setRecentListings(all.slice(0, 6)); // Top 6
        }
      } catch (err) {
        console.error('Error loading home listings', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadRecent();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="retro-card p-6 md:p-12 bg-[#F7F3EF] border-2 border-[#1A1A1A] shadow-[6px_6px_0_#1A1A1A] relative overflow-hidden">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#C9B59C] border-2 border-[#1A1A1A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_#1A1A1A]">
            <Sparkles className="w-4 h-4" />
            Official Campus Exchange
          </div>

          <h1 className="font-mono text-3xl sm:text-5xl font-black text-[#1A1A1A] leading-tight tracking-tight uppercase">
            BUY. SELL. CONNECT.
          </h1>

          <p className="font-mono text-lg font-bold text-[#1A1A1A]">
            Your campus marketplace.
          </p>

          <p className="font-sans text-base sm:text-lg text-[#333333] max-w-2xl leading-relaxed">
            Find useful things from students around you, or sell things you no longer need. Textbooks, electronics, dorm essentials, and stationery at fair student prices.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/browse"
              id="hero-browse-btn"
              className="retro-btn retro-btn-primary px-6 py-3 text-sm flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              BROWSE MARKETPLACE
            </Link>

            <Link
              to="/sell"
              id="hero-sell-btn"
              className="retro-btn bg-[#C9B59C] hover:bg-[#D9CFC7] px-6 py-3 text-sm flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              SELL SOMETHING
            </Link>
          </div>
        </div>

        {/* Decorative Watermark Badge */}
        <div className="hidden lg:block absolute -right-8 -bottom-10 opacity-15 pointer-events-none select-none font-mono text-9xl font-black text-[#1A1A1A]">
          MARKET
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-2">
          <h2 className="font-mono text-xl font-bold uppercase text-[#1A1A1A] tracking-wide">
            Explore Categories
          </h2>
          <Link to="/browse" className="font-mono text-xs font-bold hover:underline flex items-center gap-1">
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/browse?category=${cat.name}`}
                className="retro-card p-3 text-center flex flex-col items-center justify-center gap-2 hover:bg-[#D9CFC7] transition-all group"
              >
                <div className="w-10 h-10 bg-[#1A1A1A] text-[#F7F3EF] flex items-center justify-center border border-[#1A1A1A] shadow-[2px_2px_0_#C9B59C] group-hover:scale-110 transition-transform">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="font-mono font-bold text-xs text-[#1A1A1A]">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Listings Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-2">
          <h2 className="font-mono text-xl font-bold uppercase text-[#1A1A1A] tracking-wide">
            Recent Listings
          </h2>
          <Link
            to="/browse"
            className="retro-btn px-3 py-1 text-xs flex items-center gap-1"
          >
            View All Marketplace ({recentListings.length})
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ListingCardSkeleton />
            <ListingCardSkeleton />
            <ListingCardSkeleton />
          </div>
        ) : recentListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          /* Empty state specified in Section 8 */
          <div className="retro-card p-12 text-center bg-[#F7F3EF] space-y-4 max-w-lg mx-auto my-8">
            <div className="w-16 h-16 mx-auto bg-[#C9B59C] border-2 border-[#1A1A1A] flex items-center justify-center shadow-[3px_3px_0_#1A1A1A]">
              <ShoppingBag className="w-8 h-8 text-[#1A1A1A]" />
            </div>
            <h3 className="font-mono font-bold text-xl text-[#1A1A1A]">
              No listings yet.
            </h3>
            <p className="font-sans text-sm text-[#555555]">
              Be the first student to sell something on campus!
            </p>
            <div className="pt-2">
              <Link
                to="/sell"
                id="empty-create-listing-btn"
                className="retro-btn retro-btn-primary px-6 py-2.5 text-xs inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                CREATE LISTING
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
