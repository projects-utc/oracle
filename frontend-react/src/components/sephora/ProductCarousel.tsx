import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from './icons';

export function ProductCarousel({
  title,
  subtitle,
  viewAllUrl,
  products,
}: {
  title: string;
  subtitle?: string;
  viewAllUrl?: string;
  products: Product[];
}) {
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
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black">{title}</h2>
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {viewAllUrl && (
            <Link to={viewAllUrl} className="text-xs font-bold text-black hover:underline shrink-0 flex items-center gap-1">
              <span>Xem tất cả</span>
              <span className="text-[10px]">▸</span>
            </Link>
          )}
        </div>

        {/* Carousel */}
        <div className="relative group">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-black" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {products.map((product) => (
              <ProductCard key={product.skuId} product={product} />
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
