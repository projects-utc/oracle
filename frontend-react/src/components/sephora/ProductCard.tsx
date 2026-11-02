import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { HeartIcon, StarIcon } from './icons';

export function ProductCard({ product }: { product: Product }) {
  const { lovedSkuIds, toggleLove, addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const isLoved = lovedSkuIds.has(product.skuId);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleLove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLove(product.skuId);
  };

  return (
    <div className="group relative flex flex-col w-[170px] sm:w-[200px] md:w-[220px] shrink-0 bg-white font-sans text-left transition-all">
      {/* 1. Image Container */}
      <div className="relative w-full aspect-square bg-[#f8f8f8] rounded-lg overflow-hidden mb-2.5">
        <Link to={`/product/${product.skuId}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Favorite Love Button */}
        <button
          onClick={handleLove}
          aria-label={isLoved ? 'Remove from Loves' : 'Add to Loves'}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white shadow-xs flex items-center justify-center transition-transform hover:scale-110 z-10 cursor-pointer"
        >
          <HeartIcon className="w-4 h-4 text-black" filled={isLoved} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 hidden sm:block">
          <button
            onClick={handleAdd}
            className={`w-full py-2 px-3 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
              added ? 'bg-emerald-700 text-white' : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            {added ? 'Đã thêm ✓' : 'Thêm nhanh'}
          </button>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="flex flex-col flex-1">
        {product.badge && (
          <div className="mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#f2f2f2] px-1.5 py-0.5 rounded-xs">
              {product.badge}
            </span>
          </div>
        )}

        <div className="text-[11px] font-bold text-gray-900 uppercase tracking-tight truncate">
          {product.brand}
        </div>

        <Link
          to={`/product/${product.skuId}`}
          className="text-xs font-medium text-black line-clamp-2 hover:underline min-h-[32px] mt-0.5 mb-1 leading-snug"
        >
          {product.name}
        </Link>

        {product.variation && (
          <div className="text-[11px] text-gray-500 truncate mb-1">
            {product.variation}
          </div>
        )}

        <div className="mt-auto pt-1 flex items-baseline justify-between">
          <span className="font-bold text-xs sm:text-sm text-black">{product.price}</span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-600">
          <div className="flex items-center text-amber-500">
            <StarIcon className="w-3 h-3 fill-current" />
          </div>
          <span className="font-bold text-black">{product.rating.toFixed(1)}</span>
          <span className="text-gray-400">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}
