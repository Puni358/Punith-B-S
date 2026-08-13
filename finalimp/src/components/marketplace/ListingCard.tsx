import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../../types';
import { Heart, MapPin, Sparkles } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onFavoriteToggle?: (id: string, isFav: boolean) => void;
  isFavorite?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onFavoriteToggle,
  isFavorite: initialFav = false,
}) => {
  const [isFav, setIsFav] = useState(initialFav);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(listing.price);

  const displayImage =
    listing.images && listing.images.length > 0
      ? listing.images[0]
      : 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800';

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isFav;
    setIsFav(next);
    if (onFavoriteToggle) {
      onFavoriteToggle(listing.id, next);
    }
  };

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10"
    >
      {/* Image aspect ratio container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <img
          src={displayImage}
          alt={listing.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800';
          }}
        />

        {/* Category Pill */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 px-2.5 py-1 text-[11px] font-bold text-zinc-800 shadow-sm">
          {listing.category}
        </span>

        {/* Condition Badge */}
        <span className="absolute right-12 top-3 rounded-full bg-purple-100/90 backdrop-blur-md border border-purple-200 px-2.5 py-1 text-[10px] font-extrabold text-purple-800 uppercase tracking-wider">
          {listing.condition}
        </span>

        {/* Heart Favorite Toggle Button */}
        <button
          type="button"
          onClick={toggleFav}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border transition-all duration-200 ${
            isFav
              ? 'border-red-200 bg-red-50 text-red-500 shadow-sm scale-110'
              : 'border-zinc-200 bg-white/90 text-zinc-500 backdrop-blur-md hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`size-4 ${isFav ? 'fill-red-500' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-1.5">
          <h3 className="line-clamp-1 font-bold text-base text-zinc-900 group-hover:text-purple-600 transition-colors">
            {listing.title}
          </h3>
          <p className="line-clamp-2 text-xs text-zinc-500 leading-relaxed min-h-[32px]">
            {listing.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-400 block uppercase tracking-wider">
              Price
            </span>
            <span className="text-lg font-black text-purple-700 tracking-tight">
              {formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-right">
            <img
              src={
                listing.sellerPhotoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  listing.sellerName
                )}&background=9333ea&color=ffffff`
              }
              alt={listing.sellerName}
              className="size-6 rounded-full object-cover border border-purple-200"
            />
            <div className="text-left">
              <span className="block text-[11px] font-bold text-zinc-800 line-clamp-1 max-w-[90px]">
                {listing.sellerName}
              </span>
              <span className="text-[10px] text-zinc-400 flex items-center gap-0.5">
                <MapPin className="size-2.5 text-purple-500" />
                Campus
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
