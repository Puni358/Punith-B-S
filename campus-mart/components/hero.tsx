import Image from 'next/image'
import { Heart, MapPin, Search, ShoppingBag, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice, listings } from '@/lib/listings'

const previewItems = listings.slice(0, 6)

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* subtle brand gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-accent)_0%,transparent_70%)]"
      />

      <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-14 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="flex size-1.5 rounded-full bg-primary" />
              Buy. Sell. Save. On Campus.
            </span>

            <h1 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Everything Students Need.{' '}
              <span className="text-primary">Right on Campus.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground lg:mx-0">
              Buy and sell affordable student essentials with people from your
              campus community.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" render={<a href="#marketplace" />}>
                <ShoppingBag />
                Browse Marketplace
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<a href="#sell" />}
              >
                <Tag />
                Sell an Item
              </Button>
            </div>

            {/* Search */}
            <form
              action="#marketplace"
              className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-xl border border-border bg-card p-1.5 shadow-sm lg:mx-0"
            >
              <span className="pl-2 text-muted-foreground">
                <Search className="size-4" />
              </span>
              <input
                type="search"
                aria-label="Search the marketplace"
                placeholder="Search textbooks, calculators, furniture, electronics..."
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button type="submit" size="sm" className="shrink-0">
                Search
              </Button>
            </form>
          </div>

          {/* Marketplace preview */}
          <MarketplacePreview />
        </div>
      </div>
    </section>
  )
}

function MarketplacePreview() {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-border bg-card p-3 shadow-xl shadow-primary/5 sm:p-4">
        {/* window chrome */}
        <div className="flex items-center justify-between gap-3 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShoppingBag className="size-3.5" />
            </span>
            <span className="text-sm font-semibold">Popular Near You</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            <MapPin className="size-3" />
            Your Campus
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {previewItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl border border-border bg-background p-1.5 transition-colors hover:border-primary/40"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
                <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-card/90 text-muted-foreground">
                  <Heart className="size-3" />
                </span>
              </div>
              <p className="mt-1.5 truncate px-0.5 text-[11px] font-medium leading-tight">
                {item.title}
              </p>
              <p className="px-0.5 text-[11px] font-bold text-primary">
                {formatPrice(item.price)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* floating stat chip */}
      <div className="absolute -bottom-3 -left-3 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg sm:flex">
        <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-primary">
          <Tag className="size-4" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold">2,400+</p>
          <p className="text-[11px] text-muted-foreground">items listed</p>
        </div>
      </div>
    </div>
  )
}
