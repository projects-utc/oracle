"use client";

import React from "react";
import Link from "next/link";
import { heroBannersData } from "./data";

export function HeroBanners() {
  if (!heroBannersData || heroBannersData.length === 0) return null;

  return (
    <section className="w-full my-6 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {heroBannersData.map((banner, idx) => (
            <div
              key={banner.id || idx}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-gray-100 hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: banner.bgColor || "#f9f9f9" }}
            >
              {/* Image banner section */}
              <div className="relative w-full aspect-16/10 sm:aspect-4/3 overflow-hidden bg-black/5">
                {banner.image ? (
                  <img
                    src={banner.image}
                    alt={banner.alt || banner.title}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-bold">
                    Sephora Feature
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white text-black">
                <div>
                  <h3 className="font-bold text-base sm:text-lg tracking-tight mb-1 line-clamp-1 group-hover:underline">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                    {banner.subtitle}
                  </p>
                </div>

                <div>
                  <Link
                    href="https://www.sephora.com/shop/new-beauty-products"
                    className="inline-flex items-center text-xs font-bold text-black group-hover:underline tracking-tight"
                  >
                    <span>{banner.cta || "SHOP NOW ▸"}</span>
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
