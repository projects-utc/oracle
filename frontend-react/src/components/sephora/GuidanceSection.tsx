import React from 'react';
import { Link } from 'react-router-dom';
import { GuidanceLink } from '../../data';

export function GuidanceSection({ links }: { links?: GuidanceLink[] }) {
  if (!links || links.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-black mb-4">Gợi ý Mua sắm theo Chủ đề</h2>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {links.map((link) => (
            <Link
              key={link.slug}
              to={`/shop/${link.slug}`}
              className="shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-gray-200 hover:border-black bg-white transition-all shadow-2xs hover:shadow-xs group"
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0 group-hover:scale-125 transition-transform" style={{ backgroundColor: link.iconColor }} />
              <span className="text-xs font-bold text-gray-900 whitespace-nowrap">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
