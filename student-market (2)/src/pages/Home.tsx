import React, { useEffect, useState } from 'react';
import { fetchListings } from '../services/listingService';
import { Listing } from '../types';
import { MarketplaceHero } from '../components/marketplace/MarketplaceHero';
import { CategoryGrid } from '../components/marketplace/CategoryGrid';
import { MarketplaceExplorer } from '../components/marketplace/MarketplaceExplorer';
import { TrustSection } from '../components/marketplace/TrustSection';
import { HowItWorks } from '../components/marketplace/HowItWorks';
import { SellCta } from '../components/marketplace/SellCta';

export const Home: React.FC = () => {
  const [allListings, setAllListings] = useState<Listing[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const data = await fetchListings();
        if (isMounted) {
          setAllListings(data);
        }
      } catch (err) {
        console.error('Failed to load marketplace listings for home', err);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <MarketplaceHero previewListings={allListings} />

      {/* Category Explorer Grid */}
      <CategoryGrid />

      {/* Popular Near You / Products Grid */}
      <MarketplaceExplorer initialListings={allListings} />

      {/* Trust & Safety Section */}
      <TrustSection />

      {/* How It Works Steps */}
      <HowItWorks />

      {/* Sell Item Banner CTA */}
      <SellCta />
    </div>
  );
};
