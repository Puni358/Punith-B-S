import React from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../types';
import { Tag, Calendar, User } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(listing.price);

  const displayImage = listing.images && listing.images.length > 0 
    ? listing.images[0] 
    : 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800';

  const dateFormatted = new Date(listing.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="retro-card retro-card-hover flex flex-col justify-between h-full overflow-hidden group">
      <div>
        {/* Card Image Container */}
        <div className="relative aspect-[4/3] bg-[#EFE9E3] border-b-2 border-[#1A1A1A] overflow-hidden">
          <img
            src={displayImage}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800';
            }}
          />
          {/* Category Badge */}
          <div className="absolute top-2.5 left-2.5 bg-[#F7F3EF] border border-[#1A1A1A] px-2 py-0.5 font-mono text-[11px] font-bold shadow-[2px_2px_0_#1A1A1A]">
            {listing.category}
          </div>
          {/* Condition Badge */}
          <div className="absolute top-2.5 right-2.5 bg-[#C9B59C] border border-[#1A1A1A] px-2 py-0.5 font-mono text-[11px] font-bold shadow-[2px_2px_0_#1A1A1A]">
            {listing.condition}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-2">
          <Link to={`/listing/${listing.id}`} className="block group-hover:underline">
            <h3 className="font-mono font-bold text-base line-clamp-1 text-[#1A1A1A]">
              {listing.title}
            </h3>
          </Link>

          <p className="font-sans text-xs text-[#4A4A4A] line-clamp-2 min-h-[32px]">
            {listing.description}
          </p>

          <div className="pt-2 flex items-baseline justify-between border-t border-[#D9CFC7]">
            <span className="font-mono font-extrabold text-xl text-[#1A1A1A]">
              {formattedPrice}
            </span>
            <span className="font-mono text-[11px] text-[#666666] flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {dateFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Seller Footer */}
      <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-2 border-t border-[#1A1A1A]/10 bg-[#F7F3EF]/50">
        <div className="flex items-center gap-2 truncate">
          <img
            src={listing.sellerPhotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(listing.sellerName)}&background=1A1A1A&color=F7F3EF`}
            alt={listing.sellerName}
            className="w-5 h-5 rounded-none border border-[#1A1A1A] object-cover flex-shrink-0"
          />
          <span className="font-sans text-xs text-[#333333] truncate font-medium">
            {listing.sellerName}
          </span>
        </div>

        <Link
          to={`/listing/${listing.id}`}
          className="retro-btn text-[11px] px-2.5 py-1 bg-[#F7F3EF] flex-shrink-0"
        >
          View &rarr;
        </Link>
      </div>
    </div>
  );
};
