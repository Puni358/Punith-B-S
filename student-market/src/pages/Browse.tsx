import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchListings } from '../services/listingService';
import { Listing, ListingCategory } from '../types';
import { ListingCard } from '../components/ListingCard';
import { ListingCardSkeleton } from '../components/Loading';
import { Search, Filter, X, ShoppingBag } from 'lucide-react';

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

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'All'>(categoryQuery);

  useEffect(() => {
    setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

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
    return () => { isMounted = false; };
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
    <div className="space-y-8 pb-12">
      {/* Page Title Header */}
      <div className="retro-card p-6 bg-[#F7F3EF] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] uppercase tracking-wide">
              Marketplace
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#555555]">
              Browse items put up for sale by students across campus.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, textbook, tech..."
              className="retro-input w-full px-3.5 py-2 text-sm pl-10 pr-8"
              id="browse-search-input"
            />
            <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-3 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-[#666666] hover:text-[#1A1A1A]"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filtering System */}
        <div className="pt-2 border-t border-[#D9CFC7]">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase text-[#1A1A1A]">
            <Filter className="w-3.5 h-3.5" />
            Category Filter:
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1 text-xs font-mono font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-[#F7F3EF] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#C9B59C]'
                    : 'retro-btn bg-[#F7F3EF]'
                }`}
                id={`filter-cat-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between font-mono text-xs font-bold text-[#1A1A1A] px-1">
        <span>
          Showing {listings.length} {listings.length === 1 ? 'item' : 'items'}
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>

        {(selectedCategory !== 'All' || searchQuery !== '') && (
          <button
            onClick={handleClearFilters}
            className="text-xs text-[#1A1A1A] underline hover:opacity-80 flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Reset Filters
          </button>
        )}
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ListingCardSkeleton />
          <ListingCardSkeleton />
          <ListingCardSkeleton />
          <ListingCardSkeleton />
          <ListingCardSkeleton />
          <ListingCardSkeleton />
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      ) : (
        <div className="retro-card p-12 text-center bg-[#F7F3EF] space-y-3 max-w-md mx-auto my-8">
          <div className="w-12 h-12 mx-auto bg-[#C9B59C] border-2 border-[#1A1A1A] flex items-center justify-center shadow-[2px_2px_0_#1A1A1A]">
            <ShoppingBag className="w-6 h-6 text-[#1A1A1A]" />
          </div>
          <h3 className="font-mono font-bold text-lg text-[#1A1A1A]">
            No matching items found.
          </h3>
          <p className="font-sans text-xs text-[#555555]">
            Try adjusting your search terms or selecting a different category.
          </p>
          <button
            onClick={handleClearFilters}
            className="retro-btn retro-btn-primary px-4 py-2 text-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
