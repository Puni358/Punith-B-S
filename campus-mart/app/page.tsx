import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { MarketplaceExplorer } from '@/components/marketplace-explorer'
import { SellCta } from '@/components/sell-cta'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TrustSection } from '@/components/trust-section'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <MarketplaceExplorer />
        <TrustSection />
        <HowItWorks />
        <SellCta />
      </main>
      <SiteFooter />
    </div>
  )
}
