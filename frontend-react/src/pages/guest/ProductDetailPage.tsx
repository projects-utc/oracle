import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storefrontApi } from '../../api/storefrontApi';
import { ProductDetail } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { HeartIcon, StarIcon, StoreIcon } from '../../components/sephora/icons';
import { ProductCarousel } from '../../components/sephora/ProductCarousel';

export function ProductDetailPage() {
  const { skuId } = useParams<{ skuId: string }>();
  const { lovedSkuIds, toggleLove, addToCart, selectedStore } = useStore();

  const [detail, setDetail] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!skuId) return;
    setLoading(true);
    storefrontApi
      .getProductDetail(skuId)
      .then((res) => {
        if (res.success && res.data) {
          setDetail(res.data);
          setQuantity(1);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [skuId]);

  if (loading) {
    return (
      <div className="py-24 text-center font-sans">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-gray-500">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!detail || !detail.product) {
    return (
      <div className="max-w-md mx-auto py-20 text-center font-sans">
        <div className="text-3xl mb-3">🛍️</div>
        <h2 className="text-lg font-bold text-black mb-1">Không tìm thấy sản phẩm</h2>
        <p className="text-xs text-gray-500 mb-6">Mã SKU "{skuId}" không tồn tại hoặc đã ngừng kinh doanh.</p>
        <Link to="/" className="inline-block bg-black text-white text-xs font-bold px-6 py-2.5 rounded-full">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  const p = detail.product;
  const isLoved = lovedSkuIds.has(p.skuId);

  const handleAdd = () => {
    addToCart(p, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8 font-sans">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link to="/" className="hover:underline">Trang chủ</Link>
        <span>/</span>
        <Link to={`/shop/${p.categorySlug}`} className="hover:underline capitalize">{p.categorySlug}</Link>
        <span>/</span>
        <span className="font-semibold text-black truncate max-w-[200px]">{p.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Gallery Image */}
        <div className="bg-[#f8f8f8] rounded-2xl p-6 sm:p-10 flex items-center justify-center aspect-square">
          <img src={p.image} alt={p.name} className="max-h-[380px] w-auto object-contain transition-transform hover:scale-105 duration-300" />
        </div>

        {/* Product Purchase Actions */}
        <div className="flex flex-col justify-start">
          {p.badge && (
            <div className="mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-black bg-[#f2f2f2] px-2 py-0.5 rounded-xs">
                {p.badge}
              </span>
            </div>
          )}

          <div className="text-sm font-extrabold text-black uppercase tracking-wider mb-1">{p.brand}</div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-3">{p.name}</h1>

          {/* Reviews & Star Rating */}
          <div className="flex items-center gap-2 mb-4 text-xs text-gray-600">
            <div className="flex items-center text-amber-500">
              <StarIcon className="w-4 h-4 fill-current" />
            </div>
            <span className="font-extrabold text-black text-sm">{p.rating.toFixed(1)}</span>
            <span className="text-gray-400">({p.reviews.toLocaleString()} nhận xét)</span>
            <span className="text-gray-300">•</span>
            <span className="font-mono text-gray-500">SKU: {p.skuId}</span>
          </div>

          {/* Price */}
          <div className="text-2xl sm:text-3xl font-extrabold text-black mb-4">{p.price}</div>

          {/* Variation */}
          {p.variation && (
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 mb-6 text-xs text-gray-700">
              <span className="font-bold text-gray-900">Phân loại: </span>
              <span>{p.variation}</span>
            </div>
          )}

          {/* Store Pickup Notice */}
          <div className="flex items-center gap-3 p-3.5 bg-neutral-50 rounded-xl border border-gray-200 mb-6 text-xs">
            <StoreIcon className="w-5 h-5 text-black shrink-0" />
            <div>
              <div className="font-bold text-black">{selectedStore?.name || 'Nhận hàng tại cửa hàng Sephora'}</div>
              <div className="text-[11px] text-gray-500">
                {p.stockQty > 0 ? `Còn hàng sẵn tại ${selectedStore?.city || 'cửa hàng gần bạn'}` : 'Tạm thời hết hàng tại cửa hàng này'}
              </div>
            </div>
          </div>

          {/* Stock & Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-full bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:text-black cursor-pointer"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(p.stockQty, q + 1))}
                className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:text-black cursor-pointer"
              >
                +
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Tồn kho Oracle: <span className="font-bold text-black">{p.stockQty} sản phẩm</span>
            </div>
          </div>

          {/* Add to Basket & Love Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAdd}
              disabled={p.stockQty <= 0}
              className={`flex-1 py-3.5 px-6 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-40 ${
                added ? 'bg-emerald-700 text-white' : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              {p.stockQty <= 0 ? 'Tạm hết hàng' : added ? 'Đã thêm vào giỏ hàng ✓' : `Thêm vào giỏ hàng • ${(p.priceValue * quantity).toFixed(2)}$`}
            </button>

            <button
              onClick={() => toggleLove(p.skuId)}
              aria-label="Toggle Love"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isLoved ? 'border-black bg-black text-white' : 'border-gray-300 bg-white hover:border-black text-black'
              }`}
            >
              <HeartIcon className="w-5 h-5 fill-current" filled={isLoved} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {detail.relatedProducts && detail.relatedProducts.length > 0 && (
        <ProductCarousel
          title="Sản phẩm tương tự cùng danh mục"
          subtitle="Các gợi ý bổ trợ được nhiều khách hàng cùng mua"
          products={detail.relatedProducts}
        />
      )}
    </div>
  );
}

export default ProductDetailPage;
