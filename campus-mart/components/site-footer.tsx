import { GraduationCap } from 'lucide-react'

const footerLinks = [
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Categories', href: '#categories' },
  { label: 'Sell', href: '#sell' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-5" />
          </span>
          <div>
            <p className="font-display text-base font-bold tracking-tight">
              CampusMart
            </p>
            <p className="text-xs text-muted-foreground">
              Buy. Sell. Save. On Campus.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6 md:text-left">
          © 2026 CampusMart. Built for students.
        </p>
      </div>
    </footer>
  )
}
