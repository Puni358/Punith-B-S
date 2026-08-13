import { Sparkles, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SellCta() {
  return (
    <section id="sell" className="scroll-mt-16 px-4 pb-14 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-primary/20 bg-primary px-6 py-10 text-primary-foreground sm:px-10">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
              <Sparkles className="size-3.5" />
              List in under a minute
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              Got something you don&apos;t need anymore?
            </h2>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-primary-foreground/80">
              Turn your unused stuff into extra money. Post it on CampusMart and
              reach students right around you.
            </p>
          </div>

          <Button
            size="lg"
            variant="secondary"
            className="shrink-0"
            render={<a href="/sell" />}
          >
            <Tag />
            Sell an Item
          </Button>
        </div>
      </div>
    </section>
  )
}
