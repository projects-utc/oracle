import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { ProductCard } from '../../components/sephora/ProductCard';

export default function LovesPage() {
  const { favorites, lovedSkuIds } = useStore();

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8 font-sans">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-black tracking-tight">Danh sách yêu thích (Loves)</h1>
          <p className="text-xs text-gray-500 mt-1">Các sản phẩm bạn đã lưu để theo dõi và mua sắm sau</p>
        </div>
        <Link to="/" className="text-xs font-bold text-black hover:underline">← Về trang chủ</Link>
      </div>

      {favorites.length === 0 ? (
        <div className="py-20 text-center bg-gray-50 rounded-2xl p-8">
          <div className="text-3xl mb-2">❤️</div>
          <h3 className="font-bold text-base text-gray-900 mb-1">Danh sách Loves của bạn đang trống</h3>
          <p className="text-xs text-gray-500 mb-4">Hãy bấm vào biểu tượng trái tim trên các thẻ sản phẩm để lưu lại món đồ yêu thích nhé.</p>
          <Link to="/" className="inline-block bg-black text-white text-xs font-bold px-6 py-2.5 rounded-full">
            Khám phá sản phẩm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {favorites.map((p) => (
            <div key={p.skuId} className="flex justify-center">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
