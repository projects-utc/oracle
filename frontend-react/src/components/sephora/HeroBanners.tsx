import React from 'react';
import { Link } from 'react-router-dom';
import { HeroBanner } from '../../data';

const BANNER_MAP: Record<string, { title: string; subtitle: string; cta: string }> = {
  'Go-Tos Only': {
    title: 'Top Mỹ Phẩm Bán Chạy Nhất',
    subtitle: 'Các dòng sản phẩm được yêu thích và đánh giá cao nhất.',
    cta: 'Khám phá ngay',
  },
  'Weightless Korean Sunscreen': {
    title: 'Kem Chống Nắng Hàn Quốc',
    subtitle: 'Bảo vệ dịu nhẹ, thẩm thấu nhanh và nâng tông tự nhiên cho làn da.',
    cta: 'Mua ngay',
  },
  'Holiday Gifts Are Here': {
    title: 'Bộ Sưu Tập Quà Tặng Mới',
    subtitle: 'Combo mỹ phẩm chính hãng với mức giá tiết kiệm đặc biệt.',
    cta: 'Xem chi tiết',
  },
};

export function HeroBanners({ banners }: { banners?: HeroBanner[] }) {
  if (!banners || banners.length === 0) return null;

  return (
    <section className="w-full my-4 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((banner) => {
            const mapped = BANNER_MAP[banner.title];
            const title = mapped ? mapped.title : banner.title;
            const subtitle = mapped ? mapped.subtitle : banner.subtitle;
            const cta = mapped ? mapped.cta : (banner.cta.includes('SHOP') ? 'Khám phá ngay' : banner.cta);

            return (
              <Link
                key={banner.id}
                to={banner.targetUrl || '/shop/new'}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl p-6 min-h-[260px] md:min-h-[300px] transition-transform duration-300 hover:shadow-lg"
                style={{ backgroundColor: banner.bgColor, color: banner.textColor }}
              >
                <div className="z-10 max-w-[75%]">
                  <h3 className="text-xl md:text-2xl font-extrabold tracking-tight leading-tight mb-2">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs md:text-sm font-medium opacity-90 leading-relaxed mb-4">
                      {subtitle}
                    </p>
                  )}
                  <span className="inline-flex items-center text-xs font-bold underline underline-offset-4 group-hover:translate-x-1 transition-transform">
                    {cta} ▸
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
