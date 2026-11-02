import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureTile } from '../../data';

export function FeatureTiles({ tiles }: { tiles?: FeatureTile[] }) {
  if (!tiles || tiles.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiles.map((tile) => (
            <Link
              key={tile.id}
              to={tile.targetUrl || '/shop/gifts-value-sets'}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl p-6 min-h-[260px] md:min-h-[300px] transition-transform duration-300 hover:shadow-lg"
              style={{ backgroundColor: tile.bgColor, color: tile.textColor }}
            >
              <div className="z-10 max-w-[70%]">
                <h3 className="text-xl font-extrabold tracking-tight leading-tight mb-2">
                  {tile.title}
                </h3>
                {tile.subtitle && (
                  <p className="text-xs font-medium opacity-90 leading-relaxed mb-4">
                    {tile.subtitle}
                  </p>
                )}
                <span className="inline-flex items-center text-xs font-bold underline underline-offset-4 group-hover:translate-x-1 transition-transform">
                  {tile.cta} ▸
                </span>
              </div>

              <div className="absolute right-0 bottom-0 w-[55%] h-[80%] pointer-events-none">
                <img
                  src={tile.image}
                  alt={tile.title}
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
