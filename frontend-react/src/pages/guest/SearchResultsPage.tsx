import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { storefrontApi } from '../../api/storefrontApi';
import { Product } from '../../data';
import { formatCategorySlug } from '../../constants';
import { ProductCard } from '../../components/sephora/ProductCard';

export default function SearchResultsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'featured';
  const brand = searchParams.get('brand') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    storefrontApi
      .getProducts({
        category: slug,
        q: q || undefined,
        sort: sort !== 'featured' ? sort : undefined,
        brand: brand || undefined,
      })
      .then((res) => {
        if (res.success && res.data) {
          setProducts(res.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, q, sort, brand]);

  const brands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);

  const title = q
    ? `Kết quả tìm kiếm cho "${q}"`
    : slug
    ? `Danh mục: ${formatCategorySlug(slug)}`
    : 'Tất cả sản phẩm làm đẹp';

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8 font-sans">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
        <Link to="/" className="hover:underline">Trang chủ</Link>
        <span>/</span>
        <span className="font-semibold text-black">{q ? 'Tìm kiếm' : formatCategorySlug(slug)}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-gray-200 pb-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight">{title}</h1>
          <p className="text-xs text-gray-500 mt-1">Hiển thị {products.length} sản phẩm phù hợp</p>
        </div>

        {/* Sort & Filter Controls */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-gray-500">Sắp xếp:</label>
          <select
            value={sort}
            onChange={(e) => {
              searchParams.set('sort', e.target.value);
              setSearchParams(searchParams);
            }}
            className="text-xs font-semibold bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:border-black"
          >
            <option value="featured">Nổi bật nhất</option>
            <option value="price_asc">Giá: Thấp đến Cao</option>
            <option value="price_desc">Giá: Cao đến Thấp</option>
            <option value="rating">Đánh giá cao nhất</option>
            <option value="reviews">Nhiều nhận xét nhất</option>
          </select>
        </div>
      </div>

      {/* Brand Filter Pills */}
      {brands.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          <button
            onClick={() => {
              searchParams.delete('brand');
              setSearchParams(searchParams);
            }}
            className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
              !brand ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả nhãn hàng
          </button>
          {brands.slice(0, 10).map((b) => (
            <button
              key={b}
              onClick={() => {
                searchParams.set('brand', b);
                setSearchParams(searchParams);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
                brand === b ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-500">Đang tra cứu danh mục từ Oracle...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center bg-gray-50 rounded-2xl p-8">
          <div className="text-3xl mb-2">🔍</div>
          <h3 className="font-bold text-base text-gray-900 mb-1">Không tìm thấy sản phẩm phù hợp</h3>
          <p className="text-xs text-gray-500 mb-4">Bạn thử tìm với từ khóa "Rare Beauty", "Lip", "Serum" hoặc chọn danh mục khác nhé.</p>
          <Link to="/" className="inline-block bg-black text-white text-xs font-bold px-6 py-2.5 rounded-full">
            Về trang chủ
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((p) => (
            <div key={p.skuId} className="flex justify-center">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
