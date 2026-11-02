"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "./data";
import { HeartIcon, StarIcon } from "./icons";

interface ProductCardProps {
  product: Product;
  isLoved?: boolean;
  onToggleLove?: (id: string) => void;
  onAddToBasket?: (product: Product) => void;
}

export function ProductCard({
  product,
  isLoved = false,
  onToggleLove,
  onAddToBasket,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToBasket) {
      onAddToBasket(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  const handleLove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleLove) {
      onToggleLove(product.id);
    }
  };

  return (
    <div className="group relative flex flex-col w-[170px] sm:w-[200px] md:w-[220px] shrink-0 bg-white font-sans text-left transition-all">
      {/* 1. Image Container */}
      <div className="relative w-full aspect-square bg-[#f8f8f8] rounded-xs overflow-hidden mb-2.5">
        <Link href={product.url} className="block w-full h-full">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
              Sephora
            </div>
          )}
        </Link>

        {/* Badge Overlay */}
        {product.badge && (
          <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded-xs shadow-xs text-[10px] font-bold tracking-tight text-gray-800 flex items-center gap-1 border border-gray-100">
            {product.badge.toLowerCase().includes("clean") && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#008060]" />
            )}
            <span className="truncate max-w-[120px]">{product.badge}</span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={handleLove}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-xs text-gray-700 hover:text-black transition-all"
          aria-label={isLoved ? "Remove from loves" : "Add to loves"}
        >
          <HeartIcon className="w-4 h-4" filled={isLoved} />
        </button>

        {/* Quick Add Button (Desktop Hover overlay / Mobile action) */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleAdd}
            className={`w-full py-1.5 text-xs font-bold rounded-full shadow-md transition-all ${
              added
                ? "bg-[#008060] text-white"
                : "bg-black text-white hover:bg-neutral-800 active:scale-98"
            }`}
          >
            {added ? "Added ✓" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="flex flex-col flex-1">
        {/* Brand */}
        <Link
          href={product.url}
          className="font-bold text-xs uppercase tracking-tight text-black hover:underline line-clamp-1 mb-0.5"
        >
          {product.brand}
        </Link>

        {/* Title */}
        <Link
          href={product.url}
          className="text-xs text-gray-800 hover:underline line-clamp-2 leading-snug mb-1 min-h-[32px]"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Variation / Shades */}
        {product.variation && (
          <div className="text-[11px] text-gray-500 truncate mb-1">
            {product.variation}
          </div>
        )}

        {/* Star Rating & Review Count */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => {
              const fill = Math.max(0, Math.min(1, product.rating - (i - 1)));
              return <StarIcon key={i} fill={fill} className="w-3 h-3 text-black" />;
            })}
          </div>
          <span className="text-[11px] text-gray-500 font-medium">
            ({product.reviews >= 1000 ? `${(product.reviews / 1000).toFixed(1)}K` : product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-1 font-bold text-sm text-black">
          {product.price}
        </div>
      </div>
    </div>
  );
}
