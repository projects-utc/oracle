"use client";

import React, { useState, useMemo } from "react";
import { SephoraHeader } from "@/components/sites/sephora/header";
import { HeroBanners } from "@/components/sites/sephora/hero-banners";
import { ProductCarousel } from "@/components/sites/sephora/product-carousel";
import { SavingsBanner } from "@/components/sites/sephora/savings-banner";
import { PromoCarousel } from "@/components/sites/sephora/promo-carousel";
import { FeatureTiles } from "@/components/sites/sephora/feature-tiles";
import { RewardsCarousel } from "@/components/sites/sephora/rewards-carousel";
import { GuidanceSection } from "@/components/sites/sephora/guidance-section";
import { ReassuranceBanners } from "@/components/sites/sephora/reassurance-banners";
import { SephoraFooter } from "@/components/sites/sephora/footer";
import { MobileBottomNav } from "@/components/sites/sephora/mobile-nav";
import { InternationalModal } from "@/components/sites/sephora/international-modal";
import { StoreModal } from "@/components/sites/sephora/store-modal";
import { AiChatModal } from "@/components/sites/sephora/ai-chat-modal";
import {
  chosenForYouData,
  justDroppedData,
  sellingFastData,
  Product,
} from "@/components/sites/sephora/data";
function filterProducts(list: Product[], query: string) {
  if (!query.trim()) return list;
  const q = query.toLowerCase();
  return list.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.variation && p.variation.toLowerCase().includes(q))
  );
}
export default function SephoraHomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [lovedIds, setLovedIds] = useState<Set<string>>(new Set());
  const [basket, setBasket] = useState<Product[]>([]);
  const [showInternationalModal, setShowInternationalModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showAiChatModal, setShowAiChatModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState("Sephora 5th Avenue");

  const handleToggleLove = (id: string) => {
    setLovedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddToBasket = (product: Product) => {
    setBasket((prev) => [...prev, product]);
  };

  const filteredChosen = useMemo(() => filterProducts(chosenForYouData, searchQuery), [searchQuery]);
  const filteredJustDropped = useMemo(() => filterProducts(justDroppedData, searchQuery), [searchQuery]);
  const filteredSellingFast = useMemo(() => filterProducts(sellingFastData, searchQuery), [searchQuery]);
  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* 1. Header (Banner, Search, Icons, MegaNav) */}
      <SephoraHeader
        lovesCount={lovedIds.size}
        basketCount={basket.length}
        onOpenAiChat={() => setShowAiChatModal(true)}
        onOpenStoreModal={() => setShowStoreModal(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. Main Body Content */}
      <main className="flex-1 pb-16 md:pb-0">
        {searchQuery ? (
          <div className="max-w-[1280px] mx-auto px-4 py-8">
            <h1 className="text-xl font-bold mb-4">
              Search results for &ldquo;{searchQuery}&rdquo;
            </h1>
            {filteredChosen.length === 0 && filteredJustDropped.length === 0 && filteredSellingFast.length === 0 ? (
              <p className="text-sm text-gray-500 py-8">
                No matching beauty products found. Try searching for &ldquo;Rare Beauty&rdquo;, &ldquo;Lip&rdquo;, or &ldquo;Foundation&rdquo;.
              </p>
            ) : (
              <div className="space-y-8">
                {filteredChosen.length > 0 && (
                  <ProductCarousel
                    title="Chosen For You"
                    products={filteredChosen}
                    lovedIds={lovedIds}
                    onToggleLove={handleToggleLove}
                    onAddToBasket={handleAddToBasket}
                  />
                )}
                {filteredJustDropped.length > 0 && (
                  <ProductCarousel
                    title="Just Dropped"
                    products={filteredJustDropped}
                    lovedIds={lovedIds}
                    onToggleLove={handleToggleLove}
                    onAddToBasket={handleAddToBasket}
                  />
                )}
                {filteredSellingFast.length > 0 && (
                  <ProductCarousel
                    title="Selling Fast"
                    products={filteredSellingFast}
                    lovedIds={lovedIds}
                    onToggleLove={handleToggleLove}
                    onAddToBasket={handleAddToBasket}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Top 3 Editorial Banners */}
            <HeroBanners />

            {/* Product Carousel: Chosen For You */}
            <ProductCarousel
              title="Chosen For You"
              subtitle="Personalized recommendations"
              viewAllUrl="https://www.sephora.com/shop/new-beauty-products"
              products={filteredChosen}
              lovedIds={lovedIds}
              onToggleLove={handleToggleLove}
              onAddToBasket={handleAddToBasket}
            />

            {/* Savings Event Deep Red Banner */}
            <SavingsBanner />

            {/* Beauty Offers (23 items) */}
            <PromoCarousel />

            {/* Product Carousel: Just Dropped */}
            <ProductCarousel
              title="Just Dropped"
              subtitle="The latest formulas and trending drops"
              viewAllUrl="https://www.sephora.com/shop/new-beauty-products"
              products={filteredJustDropped}
              lovedIds={lovedIds}
              onToggleLove={handleToggleLove}
              onAddToBasket={handleAddToBasket}
            />

            {/* Curated 3-Up Feature Tiles */}
            <FeatureTiles />

            {/* Product Carousel: Selling Fast */}
            <ProductCarousel
              title="Selling Fast"
              subtitle="Get them before they're gone"
              viewAllUrl="https://www.sephora.com/shop/bestselling-beauty-products"
              products={filteredSellingFast}
              lovedIds={lovedIds}
              onToggleLove={handleToggleLove}
              onAddToBasket={handleAddToBasket}
            />

            {/* Beauty Insider Rewards Carousel */}
            <RewardsCarousel onRedeemClick={() => setShowInternationalModal(true)} />

            {/* Guided Shopping 7-Tile Section */}
            <GuidanceSection />

            {/* Reassurance Banners (Get gifts in time, holiday guide, pay later) */}
            <ReassuranceBanners />
          </>
        )}
      </main>

      {/* 3. Global Footer */}
      <SephoraFooter />

      {/* 4. Mobile Bottom Navigation Bar (fixed on <768px) */}
      <MobileBottomNav
        onOpenAiChat={() => setShowAiChatModal(true)}
        onOpenStoreModal={() => setShowStoreModal(true)}
      />

      {/* 5. Modals and Drawers */}
      <InternationalModal
        isOpen={showInternationalModal}
        onClose={() => setShowInternationalModal(false)}
      />

      <StoreModal
        isOpen={showStoreModal}
        onClose={() => setShowStoreModal(false)}
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
      />

      <AiChatModal
        isOpen={showAiChatModal}
        onClose={() => setShowAiChatModal(false)}
      />
    </div>
  );
}
