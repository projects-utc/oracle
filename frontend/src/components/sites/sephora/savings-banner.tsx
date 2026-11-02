"use client";

import React from "react";
import Link from "next/link";
import { savingsBannerData } from "./data";

export function SavingsBanner() {
  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <Link
          href="https://www.sephora.com/beauty/savings-event"
          className="group block relative overflow-hidden rounded-xs bg-[#810017] text-white shadow-md hover:shadow-xl transition-all"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between p-6 sm:p-8 gap-6">
            {/* Left: 4 Discount Tier Circular Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 shrink-0">
              {savingsBannerData.tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/40 shadow-inner p-1 text-center transition-transform group-hover:scale-105 duration-200"
                  style={{ backgroundColor: tier.badgeColor, color: tier.textColor }}
                >
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-tighter uppercase leading-none px-1">
                    {tier.label}
                  </span>
                  <span className="text-base sm:text-xl font-extrabold leading-tight my-0.5">
                    {tier.discount}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-medium leading-none opacity-90">
                    {tier.dates}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: Event Info & Call to Action */}
            <div className="text-center lg:text-left flex-1 max-w-xl">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">
                {savingsBannerData.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-3">
                {savingsBannerData.subtitle}
              </p>
              <div className="inline-flex items-center text-xs sm:text-sm font-bold tracking-wider underline group-hover:text-white/80 transition-colors">
                <span>{savingsBannerData.cta}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
