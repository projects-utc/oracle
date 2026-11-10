import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureTile } from '../../data';

const TILE_MAP: Record<string, { title: string; subtitle: string; cta: string }> = {
  "HUDA BEAUTY’s First Fragrance": {
    title: 'Nước Hoa Cao Cấp Huda Beauty',
    subtitle: 'Hương thơm hoa cỏ ấm áp, ngọt ngào và quyến rũ dài lâu.',
    cta: 'Khám phá ngay',
  },
  'Body Care Worth Bragging About': {
    title: 'Chăm Sóc Cơ Thể Toàn Diện',
    subtitle: 'Dưỡng ẩm mịn màng và phục hồi da với công thức dưỡng thể cao cấp.',
    cta: 'Khám phá ngay',
  },
  'New and Clean at Sephora': {
    title: 'Mỹ Phẩm Thuần Chay & Lành Tính',
    subtitle: 'Tuyển chọn son bóng, phấn mắt và mỹ phẩm an toàn cho mọi làn da.',
    cta: 'Khám phá ngay',
  },
};

export function FeatureTiles({ tiles }: { tiles?: FeatureTile[] }) {
  if (!tiles || tiles.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiles.map((tile) => {
            const mapped = TILE_MAP[tile.title];
            const title = mapped ? mapped.title : tile.title;
            const subtitle = mapped ? mapped.subtitle : tile.subtitle;
            const cta = mapped ? mapped.cta : (tile.cta.includes('SHOP') ? 'Xem ngay' : tile.cta);

            return (
              <Link
                key={tile.id}
                to={tile.targetUrl || '/shop/gifts-value-sets'}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl p-6 min-h-[260px] md:min-h-[300px] transition-transform duration-300 hover:shadow-lg"
                style={{ backgroundColor: tile.bgColor, color: tile.textColor }}
              >
                <div className="z-10 max-w-[70%]">
                  <h3 className="text-xl font-extrabold tracking-tight leading-tight mb-2">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs font-medium opacity-90 leading-relaxed mb-4">
                      {subtitle}
                    </p>
                  )}
                  <span className="inline-flex items-center text-xs font-bold underline underline-offset-4 group-hover:translate-x-1 transition-transform">
                    {cta} ▸
                  </span>
                </div>

                <div className="absolute right-0 bottom-0 w-[55%] h-[80%] pointer-events-none">
                  <img
                    src={tile.image}
                    alt={title}
                    className="w-full h-full object-contain object-right-bottom group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
