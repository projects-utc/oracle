"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "./data";
import { ProductCard } from "./product-card";
import { ChevronLeft, ChevronRight } from "./icons";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  viewAllUrl?: string;
  products: Product[];
  lovedIds?: Set<string>;
  onToggleLove?: (id: string) => void;
  onAddToBasket?: (product: Product) => void;
}

export function ProductCarousel({
  title,
  subtitle,
  viewAllUrl,
  products,
  lovedIds = new Set(),
  onToggleLove,
  onAddToBasket,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {viewAllUrl && (
            <Link
              href={viewAllUrl}
              className="text-xs font-semibold text-black hover:underline"
            >
              View all
            </Link>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-black hover:bg-gray-50 hover:scale-105 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/3 -translate-y-1/2 -translate-x-0 sm:translate-x-3 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-black hover:bg-gray-50 hover:scale-105 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Scrolling Area */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {products.map((product) => (
              <ProductCard
                key={product.skuId || product.id}
                product={product}
                isLoved={lovedIds.has(product.id)}
                onToggleLove={onToggleLove}
                onAddToBasket={onAddToBasket}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
