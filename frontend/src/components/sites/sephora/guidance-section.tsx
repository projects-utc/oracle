"use client";

import React from "react";
import Link from "next/link";
import { guidanceLinksData } from "./data";

export function GuidanceSection() {
  return (
    <section className="w-full my-10 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header */}
        <div className="mb-6 text-left">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black">
            Need a Little Guidance?
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Check out what&apos;s popular now.
          </p>
        </div>

        {/* 7 Round Soft Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {guidanceLinksData.map((item, idx) => (
            <Link
              key={idx}
              href={`/shop/${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="group flex flex-col items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-black hover:shadow-md transition-all text-center min-h-[130px]"
            >
              <div className="text-xs font-bold text-gray-800 group-hover:text-black line-clamp-2 leading-tight">
                {item.label}
              </div>

              {/* Icon representation */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border border-dashed transition-transform group-hover:scale-110"
                style={{ borderColor: item.iconColor, color: item.iconColor }}
              >
                {idx === 0 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                )}
                {idx === 1 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                )}
                {idx === 2 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                    <rect x="6" y="8" width="12" height="14" rx="2" />
                    <path d="M10 8V5h4v3" />
                    <line x1="8" y1="3" x2="16" y2="3" />
                  </svg>
                )}
                {idx === 3 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )}
                {idx === 4 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )}
                {idx === 5 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                    <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
                    <path d="M19 11v2a7 7 0 0 1-14 0v-2" />
                  </svg>
                )}
                {idx === 6 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
