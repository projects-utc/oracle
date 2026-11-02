import React from 'react';
import { Link } from 'react-router-dom';
import { SavingsBannerData } from '../../data';

export function SavingsBanner({ data }: { data?: SavingsBannerData | null }) {
  if (!data) return null;

  return (
    <section className="w-full my-6 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <Link
          to="/offers"
          className="group block rounded-2xl overflow-hidden p-6 md:p-8 text-white transition-all shadow-md hover:shadow-xl"
          style={{ backgroundColor: data.bgColor || '#810017' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block bg-[#f6b834] text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full mb-3">
                SỰ KIỆN ƯU ĐÃI
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
                {data.title}
              </h2>
              <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                {data.subtitle}
              </p>
            </div>

            {/* Tiers Badge Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto">
              {data.tiers?.map((tier, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-3 text-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: tier.badgeColor, color: tier.textColor }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{tier.label}</div>
                  <div className="text-base font-extrabold my-0.5">{tier.discount}</div>
                  <div className="text-[9px] font-medium opacity-75">{tier.dates}</div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
