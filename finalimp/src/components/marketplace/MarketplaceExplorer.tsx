import React, { useEffect, useState } from 'react';
import { Search, X, ShoppingBag, Sparkles, Filter, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchListings } from '../../services/listingService';
import { Listing, ListingCategory } from '../../types';
import { ListingCard } from './ListingCard';

interface MarketplaceExplorerProps {
  initialListings?: Listing[];
  defaultCategory?: ListingCategory | 'All';
  showCategorySelector?: boolean;
}

const CATEGORY_TABS: (ListingCategory | 'All')[] = [
  'All',
  'Books',
  'Electronics',
  'Furniture',
  'Stationery',
  'Clothing',
  'Accessories',
  'Other',
];

export const MarketplaceExplorer: React.FC<MarketplaceExplorerProps> = ({
  initialListings = [],
  defaultCategory = 'All',
  showCategorySelector = true,
}) => {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [loading, setLoading] = useState<boolean>(initialListings.length === 0);
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'All'>(defaultCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchListings(selectedCategory, searchQuery);
        if (isMounted) {
          setListings(data);
        }
      } catch (err) {
        console.error('Error fetching explorer listings:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery]);

  const handleClear = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <section id="marketplace" className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Filter Bar */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-200">
              <Sparkles className="size-3.5" />
              On-Campus Marketplace
            </div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl mt-2">
              Popular Near You
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Real items posted by students currently on campus.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, textbook..."
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 py-2.5 pl-10 pr-9 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              id="explorer-search-input"
            />
            <Search className="absolute left-3.5 top-3 size-4 text-zinc-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-700"
                title="Clear filter"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        {showCategorySelector && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-100">
            <span className="flex items-center gap-1 text-xs font-bold text-zinc-400 mr-2 flex-shrink-0">
              <Filter className="size-3.5" />
              Category:
            </span>
            {CATEGORY_TABS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
                id={`explorer-cat-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-500 font-medium px-1">
          <span>
            <strong className="text-zinc-900 font-bold">{listings.length}</strong>{' '}
            {listings.length === 1 ? 'item' : 'items'} available on campus
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(selectedCategory !== 'All' || searchQuery !== '') && (
            <button
              type="button"
              onClick={handleClear}
              className="text-purple-600 hover:underline font-bold flex items-center gap-1"
            >
              <X className="size-3" /> Reset Filters
            </button>
          )}
        </div>

        {/* Grid of Listings */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="animate-pulse rounded-2xl border border-zinc-200 bg-zinc-50 p-4 space-y-4"
              >
                <div className="aspect-[4/3] rounded-xl bg-zinc-200" />
                <div className="h-4 bg-zinc-200 rounded w-3/4" />
                <div className="h-3 bg-zinc-200 rounded w-1/2" />
                <div className="h-6 bg-zinc-200 rounded w-1/3 pt-2" />
              </div>
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center space-y-4">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <ShoppingBag className="size-6" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900">
              No matching campus items
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              No active listings match your current filter. Try searching for a different item or clear your search query.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-700 shadow-xs hover:bg-zinc-50"
              >
                Clear Filters
              </button>
              <Link
                to="/sell"
                className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-600/20 hover:bg-purple-700 inline-flex items-center gap-1.5"
              >
                <PlusCircle className="size-3.5" />
                Sell Something
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
