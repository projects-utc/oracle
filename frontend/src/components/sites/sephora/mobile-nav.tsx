"use client";

import React from "react";
import Link from "next/link";
import {
  MobileHomeIcon,
  MobileShopIcon,
  MobileOffersIcon,
  MobileStoreIcon,
  AiBeautyIcon,
} from "./icons";

interface MobileNavProps {
  activeTab?: string;
  onOpenAiChat?: () => void;
  onOpenStoreModal?: () => void;
}

export function MobileBottomNav({
  activeTab = "home",
  onOpenAiChat,
  onOpenStoreModal,
}: MobileNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 px-2 py-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] font-sans">
      <div className="grid grid-cols-5 items-center text-center">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === "home" ? "text-black font-bold" : "text-gray-500 hover:text-black"
          }`}
        >
          <MobileHomeIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </Link>

        {/* 2. Shop */}
        <Link
          href="https://www.sephora.com/shop"
          className="flex flex-col items-center justify-center py-1 text-gray-500 hover:text-black transition-colors"
        >
          <MobileShopIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Shop</span>
        </Link>

        {/* 3. Offers */}
        <Link
          href="https://www.sephora.com/beauty/beauty-offers"
          className="flex flex-col items-center justify-center py-1 text-gray-500 hover:text-black transition-colors"
        >
          <MobileOffersIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Offers</span>
        </Link>

        {/* 4. My Store */}
        <button
          onClick={onOpenStoreModal}
          className="flex flex-col items-center justify-center py-1 text-gray-500 hover:text-black transition-colors"
        >
          <MobileStoreIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">My Store</span>
        </button>

        {/* 5. AI Beauty */}
        <button
          onClick={onOpenAiChat}
          className="flex flex-col items-center justify-center py-1 text-gray-500 hover:text-black transition-colors relative"
        >
          <div className="relative">
            <AiBeautyIcon className="w-5 h-5 mb-0.5" />
            <span className="absolute -top-1.5 -right-3.5 bg-black text-[8px] text-white px-1 rounded-xs font-bold">
              NEW
            </span>
          </div>
          <span className="text-[10px]">AI Beauty</span>
        </button>
      </div>
    </nav>
  );
}
