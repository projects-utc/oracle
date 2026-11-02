"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SephoraLogo,
  SearchIcon,
  AiBeautyIcon,
  StoreIcon,
  ServicesIcon,
  HeartIcon,
  BasketIcon,
  SparkleIcon,
  CloseIcon,
  ChevronDown
} from "./icons";
import { megaNavData } from "./data";

interface HeaderProps {
  lovesCount: number;
  basketCount: number;
  onOpenAiChat?: () => void;
  onOpenStoreModal?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export function SephoraHeader({
  lovesCount,
  basketCount,
  onOpenAiChat,
  onOpenStoreModal,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSignInDropdown, setShowSignInDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white font-sans text-black border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* 1. Top Persistent Banner (Ticker) */}
      <div className="bg-[#810017] text-white text-xs py-2 px-4 transition-colors">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex-1 text-center md:text-left font-medium tracking-tight">
            <span>Want 30% off<sup>‡1</sup> ALL Sephora Collection? <sup>‡1</sup>Terms apply.&nbsp;</span>
            <Link
              href="https://www.sephora.com/profile/MyAccount"
              className="font-bold underline hover:text-white/80 transition-colors inline-flex items-center"
            >
              SIGN IN OR JOIN NOW <span className="ml-1 text-[10px]">▸</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-1 font-bold tracking-wider text-sm text-[#f6b834]">
            <span>30%</span>
            <span className="text-[10px] leading-tight">OFF<sup>‡1</sup></span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Row (Desktop & Mobile) */}
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center py-1">
          <SephoraLogo className="h-4 sm:h-[18px] w-auto text-black" />
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-[560px] mx-2 relative items-center">
          <div className="relative w-full flex items-center">
            <span className="absolute left-3.5 text-gray-500 pointer-events-none">
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f2f2f2] hover:bg-[#e8e8e8] focus:bg-white text-sm rounded-full pl-10 pr-28 py-2.5 outline-none border border-transparent focus:border-black transition-all placeholder:text-gray-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-24 text-gray-400 hover:text-black p-1"
                aria-label="Clear search"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onOpenAiChat}
              className="absolute right-1.5 flex items-center gap-1 bg-white hover:bg-gray-50 text-[11px] font-bold text-gray-900 px-2.5 py-1 rounded-full border border-gray-200 shadow-xs transition-colors"
            >
              <AiBeautyIcon className="w-3.5 h-3.5" />
              <span>AI Beauty</span>
              <span className="bg-black text-[9px] text-white px-1 rounded-xs font-semibold">NEW</span>
            </button>
          </div>
        </div>

        {/* Actions / Utilities (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-medium shrink-0">
          {/* Store & Delivery */}
          <button
            onClick={onOpenStoreModal}
            className="flex items-center gap-2.5 hover:opacity-75 transition-opacity text-left group"
          >
            <StoreIcon className="w-6 h-6 text-black shrink-0" />
            <div className="leading-tight">
              <span className="block font-bold text-xs">Shop Store & Delivery</span>
              <span className="text-[11px] text-gray-500 group-hover:underline">Choose your store & location</span>
            </div>
          </button>

          {/* Services & Events */}
          <Link
            href="https://www.sephora.com/happening/services"
            className="flex items-center gap-2.5 hover:opacity-75 transition-opacity text-left"
          >
            <ServicesIcon className="w-6 h-6 text-black shrink-0" />
            <div className="leading-tight">
              <span className="block font-bold text-xs">Services</span>
              <span className="text-[11px] text-gray-500">& Events</span>
            </div>
          </Link>

          {/* Sign In Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowSignInDropdown(!showSignInDropdown)}
              className="flex items-center gap-1 py-1 hover:opacity-75 font-semibold text-xs transition-opacity"
            >
              <span>Sign In</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showSignInDropdown && (
              <div
                className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-lg p-4 z-50 text-left animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setShowSignInDropdown(false)}
              >
                <div className="font-bold text-sm mb-1">Good evening, Beautiful.</div>
                <div className="text-xs text-gray-600 mb-3">Sign in for a personalized experience.</div>
                <button className="w-full bg-black text-white font-bold py-2 rounded-full text-xs hover:bg-neutral-800 transition-colors mb-2">
                  Sign In
                </button>
                <button className="w-full bg-white text-black border border-black font-bold py-2 rounded-full text-xs hover:bg-gray-50 transition-colors mb-3">
                  Create Account
                </button>
                <div className="border-t border-gray-100 pt-3 space-y-2 text-xs text-gray-700">
                  <Link href="https://www.sephora.com/beauty/insider" className="block hover:underline">Beauty Insider</Link>
                  <Link href="https://www.sephora.com/profile/MyAccount/Orders" className="block hover:underline">Orders</Link>
                  <Link href="https://www.sephora.com/beauty/creditcard" className="block hover:underline">Sephora Credit Card</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Icons (Loves & Basket) */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Loves Icon */}
          <Link
            href="https://www.sephora.com/profile/MyAccount/Loves"
            className="relative p-1 hover:opacity-75 transition-opacity"
            aria-label={`Favorites, ${lovesCount} items`}
          >
            <HeartIcon className="w-6 h-6 text-black" filled={lovesCount > 0} />
            {lovesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {lovesCount}
              </span>
            )}
          </Link>

          {/* Basket Icon */}
          <Link
            href="https://www.sephora.com/basket"
            className="relative p-1 hover:opacity-75 transition-opacity"
            aria-label={`Basket, ${basketCount} items`}
          >
            <BasketIcon className="w-6 h-6 text-black" />
            {basketCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {basketCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="md:hidden px-4 pb-2.5">
        <div className="relative w-full flex items-center">
          <span className="absolute left-3 text-gray-500 pointer-events-none">
            <SearchIcon className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f2f2f2] text-sm rounded-full pl-9 pr-24 py-2 outline-none border border-transparent focus:border-black placeholder:text-gray-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-20 text-gray-400 p-1"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onOpenAiChat}
            className="absolute right-1 flex items-center gap-1 bg-white text-[10px] font-bold px-2 py-1 rounded-full border border-gray-200"
          >
            <AiBeautyIcon className="w-3 h-3" />
            <span>AI</span>
            <span className="bg-black text-[8px] text-white px-0.5 rounded-xs">NEW</span>
          </button>
        </div>
      </div>

      {/* 3. Category Navigation Bar (Desktop MegaNav) */}
      <nav
        className="hidden md:block bg-black text-white text-xs tracking-tight relative"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 lg:space-x-3 overflow-x-auto no-scrollbar py-2.5">
            {megaNavData.map((category) => (
              <div
                key={category.id}
                onMouseEnter={() => setActiveMenu(category.id)}
                className="relative py-1 cursor-pointer"
              >
                <Link
                  href={`/shop/${category.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className={`px-2 py-1 font-medium hover:text-white/80 transition-colors flex items-center gap-1 whitespace-nowrap ${
                    activeMenu === category.id ? "text-white underline underline-offset-4 decoration-2" : "text-white/95"
                  }`}
                >
                  {category.hasSparkle && <SparkleIcon className="w-2.5 h-2.5 text-[#d6b672] shrink-0" />}
                  <span>{category.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* MegaMenu Dropdown Pane */}
        {activeMenu && (
          <div
            className="absolute left-0 right-0 top-full bg-white text-black border-b border-gray-200 shadow-2xl py-6 z-50 transition-all"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-[1280px] mx-auto px-6">
              {(() => {
                const cur = megaNavData.find((m) => m.id === activeMenu);
                if (!cur) return null;
                return (
                  <div className="grid grid-cols-4 gap-8">
                    <div className="col-span-1 border-r border-gray-100 pr-6">
                      <h3 className="font-bold text-sm tracking-tight uppercase mb-3 flex items-center gap-1.5 text-black">
                        {cur.hasSparkle && <SparkleIcon className="w-3.5 h-3.5 text-[#d6b672]" />}
                        <span>All {cur.label}</span>
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">
                        Discover top-rated bestselling {cur.label.toLowerCase()} essentials curated by beauty experts.
                      </p>
                      <Link
                        href={`/shop/${cur.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        className="inline-block text-xs font-bold underline hover:text-gray-600 transition-colors"
                      >
                        Shop All {cur.label} ▸
                      </Link>
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-2">
                      {cur.subcategories.map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.href}
                          className="text-xs text-gray-700 hover:text-black hover:font-semibold py-1 transition-all"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>

                    <div className="col-span-1 bg-gray-50 rounded-lg p-4 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          Featured Special
                        </div>
                        <div className="font-bold text-xs text-black mb-1">
                          Save up to 30% Off
                        </div>
                        <p className="text-[11px] text-gray-600">
                          Use code <span className="font-mono font-bold bg-white px-1 py-0.5 rounded border border-gray-200">ALLONSALE</span> at checkout.
                        </p>
                      </div>
                      <Link
                        href="https://www.sephora.com/beauty/beauty-offers"
                        className="text-[11px] font-bold text-black underline mt-3 hover:text-gray-700"
                      >
                        View Offers ▸
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Horizontal Category Pills */}
      <div className="md:hidden border-t border-gray-100 bg-white px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
        <button
          onClick={onOpenStoreModal}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-xs font-bold text-gray-800 bg-gray-50 hover:bg-gray-100 whitespace-nowrap"
        >
          <StoreIcon className="w-3.5 h-3.5" />
          <span>Shop My Store</span>
        </button>

        {megaNavData.slice(0, 8).map((cat) => (
          <Link
            key={cat.id}
            href={`/shop/${cat.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-800 hover:border-black whitespace-nowrap bg-white"
          >
            {cat.hasSparkle && <SparkleIcon className="w-2.5 h-2.5 text-[#d6b672]" />}
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>
    </header>
  );
}
