import {
  GraduationCap,
  MessagesSquare,
  PiggyBank,
  Repeat,
  ShieldCheck,
} from 'lucide-react'

const points = [
  {
    icon: GraduationCap,
    title: 'Campus-focused',
    desc: 'Every listing comes from students on or near your campus.',
  },
  {
    icon: PiggyBank,
    title: 'Affordable prices',
    desc: 'Save big on second-hand essentials at student-friendly rates.',
  },
  {
    icon: Repeat,
    title: 'Easy student-to-student',
    desc: 'List an item in seconds and sell it to a classmate.',
  },
  {
    icon: MessagesSquare,
    title: 'Simple communication',
    desc: 'Chat directly with sellers — no middlemen, no hassle.',
  },
  {
    icon: ShieldCheck,
    title: 'Safer local deals',
    desc: 'Meet on campus in familiar places for peace of mind.',
  },
]

export function TrustSection() {
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-balance">
            Made for Students, by Students
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            A marketplace that understands campus life.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {points.map((point) => {
            const Icon = point.icon
            return (
              <div
                key={point.title}
                className="rounded-xl border border-border bg-card p-4"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
                  <Icon className="size-4.5" />
                </span>
                <h3 className="mt-3 text-sm font-semibold">{point.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {point.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
