'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ListingCard } from '@/components/listing-card'
import { categories, listings } from '@/lib/listings'

export function MarketplaceExplorer() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (id: string) =>
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return listings.filter((l) => {
      const matchesCategory = !activeCategory || l.category === activeCategory
      const matchesQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.condition.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  return (
    <>
      {/* Shop by Category */}
      <section
        id="categories"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:px-6"
      >
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Jump straight to what you&apos;re looking for.
            </p>
          </div>
          {activeCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory(null)}
            >
              <X /> Clear
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => {
            const Icon = cat.icon
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(active ? null : cat.id)
                  document
                    .getElementById('marketplace')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-center transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm',
                  active && 'border-primary bg-accent',
                )}
              >
                <span
                  className={cn(
                    'flex size-9 items-center justify-center rounded-lg bg-muted text-foreground transition-colors',
                    active && 'bg-primary text-primary-foreground',
                  )}
                >
                  <Icon className="size-4.5" />
                </span>
                <span className="text-xs font-medium leading-tight">
                  {cat.name}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Popular Near You + search/filter */}
      <section
        id="marketplace"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 pb-12 sm:px-6"
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Popular Near You
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} item{filtered.length === 1 ? '' : 's'}{' '}
              available on campus.
            </p>
          </div>

          <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-card p-1.5 shadow-sm sm:w-80">
            <span className="pl-2 text-muted-foreground">
              <Search className="size-4" />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search the marketplace"
              placeholder="Search textbooks, calculators, furniture..."
              className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="pr-1.5 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isFavorite={favorites.has(listing.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-4 py-14 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <SlidersHorizontal className="size-5" />
            </span>
            <div>
              <p className="font-medium">No items match your search</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different keyword or clear your filters.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery('')
                setActiveCategory(null)
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </section>
    </>
  )
}
