import React from 'react';
import { Link } from 'react-router-dom';
import { ReassuranceBanner } from '../../data';

const REASSURANCE_MAP: Record<string, { title: string; subtitle: string; cta: string }> = {
  'Get Your Gifts in Time': {
    title: 'Giao Hàng Miễn Phí Toàn Quốc',
    subtitle: 'Áp dụng cho mọi đơn hàng không giới hạn giá trị.',
    cta: 'Tìm hiểu thêm',
  },
  'Your Holiday Gift Guide': {
    title: 'Gợi Ý Quà Tặng Tinh Tế',
    subtitle: 'Tuyển tập các set quà làm đẹp ý nghĩa và sang trọng nhất.',
    cta: 'Xem ngay',
  },
  'Shop Gifts Now, Pay Later': {
    title: 'Thanh Toán COD An Tâm',
    subtitle: 'Kiểm tra hàng trước khi nhận, bảo hành đổi trả trong 7 ngày.',
    cta: 'Xem chi tiết',
  },
};

export function ReassuranceBanners({ banners }: { banners?: ReassuranceBanner[] }) {
  if (!banners || banners.length === 0) return null;

  return (
    <section className="w-full my-6 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((b) => {
            const mapped = REASSURANCE_MAP[b.title];
            const title = mapped ? mapped.title : b.title;
            const subtitle = mapped ? mapped.subtitle : b.subtitle;
            const cta = mapped ? mapped.cta : (b.cta.includes('LEARN') ? 'Tìm hiểu thêm' : b.cta);

            return (
              <div
                key={b.id}
                className="rounded-xl p-5 flex items-center justify-between text-black transition-all hover:shadow-md"
                style={{ backgroundColor: b.bgColor || '#d6b672' }}
              >
                <div className="max-w-[65%]">
                  <h4 className="font-bold text-sm tracking-tight mb-1">{title}</h4>
                  {subtitle && <p className="text-xs text-neutral-800 leading-snug mb-2">{subtitle}</p>}
                  <Link to="/offers" className="text-xs font-bold underline">
                    {cta} ▸
                  </Link>
                </div>
                <div className="w-16 h-16 shrink-0">
                  <img src={b.image} alt={title} className="w-full h-full object-contain" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
