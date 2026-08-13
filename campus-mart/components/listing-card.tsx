'use client'

import Image from 'next/image'
import { Heart, MapPin, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categoryLabel, formatPrice, type Listing } from '@/lib/listings'

type ListingCardProps = {
  listing: Listing
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

export function ListingCard({
  listing,
  isFavorite,
  onToggleFavorite,
}: ListingCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={listing.image || '/placeholder.svg'}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-card/90 px-2 py-0.5 text-[11px] font-medium text-foreground backdrop-blur">
          {categoryLabel(listing.category)}
        </span>
        <button
          type="button"
          onClick={() => onToggleFavorite(listing.id)}
          aria-label={
            isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
          aria-pressed={isFavorite}
          className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-card/90 text-muted-foreground backdrop-blur transition-colors hover:text-primary"
        >
          <Heart
            className={cn('size-4', isFavorite && 'fill-primary text-primary')}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-tight text-balance">
            {listing.title}
          </h3>
          <p className="shrink-0 text-sm font-bold text-primary">
            {formatPrice(listing.price)}
          </p>
        </div>

        <span className="w-fit rounded-md bg-accent px-1.5 py-0.5 text-[11px] font-medium text-accent-foreground">
          {listing.condition}
        </span>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="size-3" />
            {listing.sellerName}
          </span>
          <span className="flex items-center gap-1 truncate">
            <MapPin className="size-3 shrink-0" />
            <span className="truncate">{listing.location}</span>
          </span>
        </div>
      </div>
    </article>
  )
}
