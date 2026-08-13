'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Categories', href: '#categories' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Sell an Item', href: '#sell' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="#top"
          className="flex items-center gap-2"
          aria-label="CampusMart home"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            CampusMart
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" size="sm" render={<a href={link.href} />}>
              {link.label}
            </Button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Search"
            render={<a href="#marketplace" />}
          >
            <Search />
          </Button>
          <Button variant="ghost" size="sm" render={<a href="/login" />}>
            Login
          </Button>
          <Button size="sm" render={<a href="/signup" />}>
            Sign Up
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 border-t border-border/70 pt-3">
              <Button variant="outline" size="sm" className="flex-1" render={<a href="/login" />}>
                Login
              </Button>
              <Button size="sm" className="flex-1" render={<a href="/signup" />}>
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
