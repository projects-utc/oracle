import React from 'react';
import { Link } from 'react-router-dom';
import { HeroBanner } from '../../data';

export function HeroBanners({ banners }: { banners?: HeroBanner[] }) {
  if (!banners || banners.length === 0) return null;

  return (
    <section className="w-full my-4 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.targetUrl || '/shop/new'}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl p-6 min-h-[260px] md:min-h-[300px] transition-transform duration-300 hover:shadow-lg"
              style={{ backgroundColor: banner.bgColor, color: banner.textColor }}
            >
              <div className="z-10 max-w-[75%]">
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight leading-tight mb-2">
                  {banner.title}
                </h3>
                {banner.subtitle && (
                  <p className="text-xs md:text-sm font-medium opacity-90 leading-relaxed mb-4">
                    {banner.subtitle}
                  </p>
                )}
                <span className="inline-flex items-center text-xs font-bold underline underline-offset-4 group-hover:translate-x-1 transition-transform">
                  {banner.cta} ▸
                </span>
              </div>

              <div className="absolute right-0 bottom-0 w-[55%] h-[80%] pointer-events-none">
                <img
                  src={banner.image}
                  alt={banner.alt || banner.title}
                  className="w-full h-full object-contain object-right-bottom group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
