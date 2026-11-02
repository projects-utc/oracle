"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { biRewardsData, RewardItem } from "./data";
import { ChevronLeft, ChevronRight } from "./icons";

interface RewardsCarouselProps {
  onRedeemClick?: (reward: RewardItem) => void;
}

export function RewardsCarousel({ onRedeemClick }: RewardsCarouselProps) {
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
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  if (!biRewardsData || biRewardsData.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black">
              Beauty Insider Rewards
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Sign in to redeem your points.
            </p>
          </div>
          <Link
            href="https://www.sephora.com/rewards"
            className="text-xs font-semibold text-black hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-black hover:bg-gray-50 hover:scale-105 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/3 -translate-y-1/2 -translate-x-0 sm:translate-x-3 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-black hover:bg-gray-50 hover:scale-105 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {biRewardsData.map((reward) => (
              <div
                key={reward.id}
                className="w-[160px] sm:w-[180px] shrink-0 flex flex-col justify-between border border-gray-100 rounded-xs p-3 bg-white hover:shadow-md transition-shadow text-left"
              >
                <div>
                  <div className="relative w-full aspect-square bg-[#f9f9f9] rounded-xs overflow-hidden mb-2">
                    {reward.image ? (
                      <img
                        src={reward.image}
                        alt={reward.name}
                        className="w-full h-full object-contain p-2 mix-blend-multiply"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        Reward
                      </div>
                    )}
                  </div>

                  <div className="font-bold text-xs uppercase tracking-tight text-black line-clamp-1 mb-0.5">
                    {reward.brand}
                  </div>

                  <div className="text-xs text-gray-800 line-clamp-2 leading-snug mb-1 min-h-[32px]">
                    {reward.name}
                  </div>

                  <div className="font-bold text-xs text-[#810017] mb-3">
                    {reward.points}
                  </div>
                </div>

                <button
                  onClick={() => onRedeemClick && onRedeemClick(reward)}
                  className="w-full py-1.5 px-2 border border-black rounded-full text-[11px] font-bold text-black hover:bg-black hover:text-white transition-colors text-center"
                >
                  Sign In to Redeem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
