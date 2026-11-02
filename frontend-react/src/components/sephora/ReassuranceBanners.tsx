import React from 'react';
import { Link } from 'react-router-dom';
import { ReassuranceBanner } from '../../data';

export function ReassuranceBanners({ banners }: { banners?: ReassuranceBanner[] }) {
  if (!banners || banners.length === 0) return null;

  return (
    <section className="w-full my-6 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((b) => (
            <div
              key={b.id}
              className="rounded-xl p-5 flex items-center justify-between text-black transition-all hover:shadow-md"
              style={{ backgroundColor: b.bgColor || '#d6b672' }}
            >
              <div className="max-w-[65%]">
                <h4 className="font-bold text-sm tracking-tight mb-1">{b.title}</h4>
                {b.subtitle && <p className="text-xs text-neutral-800 leading-snug mb-2">{b.subtitle}</p>}
                <Link to="/offers" className="text-xs font-bold underline">
                  {b.cta} ▸
                </Link>
              </div>
              <div className="w-16 h-16 shrink-0">
                <img src={b.image} alt={b.title} className="w-full h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
