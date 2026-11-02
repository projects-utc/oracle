"use client";

import React from "react";
import Link from "next/link";
import { reassuranceBannersData } from "./data";

export function ReassuranceBanners() {
  if (!reassuranceBannersData || reassuranceBannersData.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reassuranceBannersData.map((banner, idx) => (
            <div
              key={banner.id || idx}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-gray-200 bg-[#D6B672] text-black hover:shadow-lg transition-all duration-300"
            >
              {/* Media image */}
              <div className="relative w-full aspect-16/10 overflow-hidden bg-black/5">
                {banner.image ? (
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-sm">
                    {banner.title}
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className="p-5 flex flex-col flex-1 justify-between text-left">
                <div>
                  <h3 className="font-bold text-base sm:text-lg tracking-tight mb-1 group-hover:underline">
                    {banner.title}
                  </h3>
                  {banner.subtitle && (
                    <p className="text-xs text-black/80 line-clamp-2 leading-relaxed mb-3">
                      {banner.subtitle}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Link
                    href="https://www.sephora.com/beauty/pick-up-delivery-options"
                    className="inline-flex items-center text-xs font-bold text-black group-hover:underline tracking-tight"
                  >
                    <span>{banner.cta || "LEARN MORE ▸"}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
