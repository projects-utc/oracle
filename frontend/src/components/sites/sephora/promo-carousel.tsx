"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { PromoOffer, beautyOffersData } from "./data";
import { ChevronLeft, ChevronRight, CloseIcon } from "./icons";

export function PromoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<PromoOffer | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!beautyOffersData || beautyOffersData.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black">
            Beauty Offers ({beautyOffersData.length})
          </h2>
          <Link
            href="https://www.sephora.com/beauty/beauty-offers"
            className="text-xs font-semibold text-black hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-black hover:bg-gray-50 hover:scale-105 transition-all"
              aria-label="Previous offers"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-0 sm:translate-x-3 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-black hover:bg-gray-50 hover:scale-105 transition-all"
              aria-label="Next offers"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Cards Flex Row */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {beautyOffersData.map((offer) => (
              <div
                key={offer.id}
                className="w-[240px] sm:w-[260px] shrink-0 flex flex-col justify-between border border-gray-200 rounded-xs p-4 bg-white hover:shadow-md transition-shadow text-left"
              >
                <div>
                  {/* Image */}
                  <div className="relative w-full aspect-16/10 bg-gray-50 rounded-xs overflow-hidden mb-3">
                    {offer.image ? (
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#810017] text-white text-xs font-bold">
                        Special Offer
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xs text-black leading-snug line-clamp-2 mb-1">
                    {offer.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] text-gray-600 line-clamp-3 leading-relaxed mb-2">
                    {offer.description}
                  </p>

                  {/* Promo Code tag */}
                  {offer.code && (
                    <div className="mb-2">
                      <button
                        onClick={() => handleCopyCode(offer.code!)}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-dashed border-gray-400 bg-gray-50 text-[11px] font-mono font-bold text-black hover:bg-gray-100 transition-colors"
                        title="Click to copy promo code"
                      >
                        <span>Code: {offer.code}</span>
                        <span className="text-[9px] text-gray-500 font-sans">
                          {copiedCode === offer.code ? "Copied!" : "Copy"}
                        </span>
                      </button>
                    </div>
                  )}

                  <div className="text-[10px] text-gray-400">
                    {offer.legalCopy}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <Link
                    href="https://www.sephora.com/beauty/beauty-offers"
                    className="flex-1 text-center py-1.5 px-3 rounded-full border border-black text-xs font-bold text-black hover:bg-black hover:text-white transition-colors"
                  >
                    {offer.actionLabel || "Shop Now"}
                  </Link>

                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="text-xs font-medium text-gray-600 hover:text-black underline py-1"
                  >
                    {offer.detailsActionLabel || "See details"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offer Details Modal */}
        {selectedOffer && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setSelectedOffer(null)}
          >
            <div
              className="bg-white rounded-lg max-w-md w-full p-6 text-left relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedOffer(null)}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-black rounded-full"
                aria-label="Close modal"
              >
                <CloseIcon className="w-5 h-5" />
              </button>

              <h3 className="font-bold text-base text-black mb-2 pr-6">
                {selectedOffer.title}
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed mb-4">
                {selectedOffer.description}
              </p>

              {selectedOffer.code && (
                <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200 flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-black">
                    {selectedOffer.code}
                  </span>
                  <button
                    onClick={() => handleCopyCode(selectedOffer.code!)}
                    className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full hover:bg-neutral-800"
                  >
                    {copiedCode === selectedOffer.code ? "Copied!" : "Copy Code"}
                  </button>
                </div>
              )}

              <p className="text-[11px] text-gray-500 mb-6 leading-normal">
                {selectedOffer.legalCopy} Valid while supplies last. Quantities are limited. Minimum purchase requirement excludes taxes and shipping. Non-transferable.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedOffer(null)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <Link
                  href="https://www.sephora.com/beauty/beauty-offers"
                  className="px-5 py-2 bg-black text-white rounded-full text-xs font-bold hover:bg-neutral-800"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
