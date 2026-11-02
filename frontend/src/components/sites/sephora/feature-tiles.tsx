"use client";

import React from "react";
import Link from "next/link";
import { featureTilesData } from "./data";

export function FeatureTiles() {
  if (!featureTilesData || featureTilesData.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featureTilesData.map((tile, idx) => (
            <div
              key={tile.id || idx}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xs border border-gray-100 hover:shadow-lg transition-all duration-300 bg-white"
            >
              {/* Media Image */}
              <div
                className="relative w-full aspect-4/3 overflow-hidden"
                style={{ backgroundColor: tile.bgColor }}
              >
                {tile.image ? (
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/80 font-bold text-sm">
                    {tile.title}
                  </div>
                )}
              </div>

              {/* Text content */}
              <div
                className="p-4 sm:p-5 flex flex-col flex-1 justify-between text-left"
                style={{
                  backgroundColor: tile.bgColor,
                  color: tile.textColor,
                }}
              >
                <div>
                  <h3 className="font-bold text-base sm:text-lg tracking-tight mb-1 group-hover:underline">
                    {tile.title}
                  </h3>
                  {tile.subtitle && (
                    <p className="text-xs opacity-90 line-clamp-2 leading-relaxed mb-3">
                      {tile.subtitle}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Link
                    href="https://www.sephora.com/shop/gifts"
                    className="inline-flex items-center text-xs font-bold group-hover:underline tracking-tight"
                    style={{ color: tile.textColor }}
                  >
                    <span>{tile.cta || "SHOP NOW ▸"}</span>
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
