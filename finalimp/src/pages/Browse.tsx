import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchListings } from '../services/listingService';
import { Listing, ListingCategory } from '../types';
import { ListingCard } from '../components/marketplace/ListingCard';
import { Search, Filter, X, ShoppingBag, Sparkles, PlusCircle } from 'lucide-react';

const CATEGORIES: (ListingCategory | 'All')[] = [
  'All',
  'Books',
  'Electronics',
  'Furniture',
  'Stationery',
  'Clothing',
  'Accessories',
  'Other',
];

export const Browse: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = (searchParams.get('category') as ListingCategory | 'All') || 'All';
  const urlSearchQuery = searchParams.get('q') || '';

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>(urlSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'All'>(categoryQuery);

  useEffect(() => {
    setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

  useEffect(() => {
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [urlSearchQuery]);

  useEffect(() => {
    let isMounted = true;
    const loadListings = async () => {
      setLoading(true);
      try {
        const data = await fetchListings(selectedCategory, searchQuery);
        if (isMounted) {
          setListings(data);
        }
      } catch (err) {
        console.error('Failed to load marketplace listings', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadListings();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (cat: ListingCategory | 'All') => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 min-h-screen bg-white">
      {/* Top Banner Header */}
      <div className="rounded-3xl border border-zinc-200 bg-gradient-to-r from-purple-50 via-indigo-50/30 to-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
              <Sparkles className="size-3.5 text-purple-600" />
              Campus Directory
            </div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight sm:text-4xl">
              Browse Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600">
              Explore textbooks, laptops, stationery, calculators, and hostel essentials posted by students across campus.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  searchParams.set('q', e.target.value);
                } else {
                  searchParams.delete('q');
                }
                setSearchParams(searchParams);
              }}
              placeholder="Search title, textbook, calculator..."
              className="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-10 pr-9 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              id="browse-search-input"
            />
            <Search className="size-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  searchParams.delete('q');
                  setSearchParams(searchParams);
                }}
                className="absolute right-3 top-3.5 text-zinc-400 hover:text-zinc-700"
                title="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filtering System */}
        <div className="mt-6 pt-4 border-t border-zinc-200/80">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-zinc-500">
            <Filter className="size-3.5 text-purple-600" />
            Category Filter:
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300'
                }`}
                id={`filter-cat-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Indicator Bar */}
      <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 px-1">
        <span>
          Showing <strong className="text-zinc-900">{listings.length}</strong> {listings.length === 1 ? 'item' : 'items'}
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>

        {(selectedCategory !== 'All' || searchQuery !== '') && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs text-purple-600 hover:underline flex items-center gap-1 font-bold"
          >
            <X className="size-3" /> Reset Filters
          </button>
        )}
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-zinc-200 bg-zinc-50 p-4 space-y-4"
            >
              <div className="aspect-[4/3] rounded-xl bg-zinc-200" />
              <div className="h-4 bg-zinc-200 rounded w-3/4" />
              <div className="h-3 bg-zinc-200 rounded w-1/2" />
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
            No matching items found.
          </h3>
          <p className="text-xs text-zinc-500">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-700 shadow-xs hover:bg-zinc-50"
            >
              Clear All Filters
            </button>
            <Link
              to="/sell"
              className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-600/20 hover:bg-purple-700 inline-flex items-center gap-1.5"
            >
              <PlusCircle className="size-3.5" />
              Sell Item
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
