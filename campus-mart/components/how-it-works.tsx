import { Handshake, Search, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'

const steps = [
  {
    icon: Search,
    step: '1',
    title: 'Find',
    desc: 'Search for what you need across campus listings.',
  },
  {
    icon: Handshake,
    step: '2',
    title: 'Connect',
    desc: 'Contact the student selling it and agree on a time.',
  },
  {
    icon: Tag,
    step: '3',
    title: 'Buy or Sell',
    desc: 'Meet safely on campus and complete the transaction.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-12 sm:px-6"
    >
      <div className="mb-6 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          How It Works
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
          Three simple steps to buy or sell on campus.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {steps.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.step}
              className="relative rounded-xl border border-border bg-card p-5"
            >
              <span className="absolute right-4 top-4 font-display text-3xl font-bold text-muted/70">
                {s.step}
              </span>
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <Button size="lg" render={<a href="#sell" />}>
          Start Selling
        </Button>
      </div>
    </section>
  )
}
