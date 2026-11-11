import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shoppingApi } from '../../api/shoppingApi';
import { Order } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { formatVND, formatOrderStatus } from '../../constants';
import { PRODUCT_LOCALIZATION } from '../../utils/productLocalization';

export default function MyOrdersPage() {
  const { currentUser } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    shoppingApi.getMyOrders().then((res) => {
      if (res.success && res.data) {
        setOrders(res.data);
      }
      setLoading(false);
    });
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center font-sans">
        <div className="text-3xl mb-3">🔒</div>
        <h2 className="text-lg font-bold text-black mb-2">Vui lòng đăng nhập</h2>
        <p className="text-xs text-gray-500 mb-6">Bạn cần đăng nhập để theo dõi danh sách đơn hàng đã mua.</p>
        <Link to="/login?from=/my-orders" className="inline-block bg-black text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-colors">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-black tracking-tight">Đơn hàng của tôi</h1>
          <p className="text-xs text-gray-500 mt-1">Theo dõi tiến độ xử lý và lịch sử các đơn hàng bạn đã đặt</p>
        </div>
        <Link to="/" className="text-xs font-bold text-black hover:underline">← Về trang chủ</Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-gray-500">Đang tải lịch sử đơn hàng...</div>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center bg-gray-50 rounded-2xl p-8">
          <div className="text-3xl mb-2">📦</div>
          <h3 className="font-bold text-base text-gray-900 mb-1">Bạn chưa có đơn hàng nào</h3>
          <p className="text-xs text-gray-500 mb-4">Các đơn hàng bạn đặt sẽ được lưu trữ và hiển thị chi tiết tại đây.</p>
          <Link to="/" className="inline-block bg-black text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-colors">
            Khám phá sản phẩm
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-3 mb-4 gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold text-sm text-[#810017]">{o.orderCode}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(o.createdAt).toLocaleString('vi-VN')}
                  </span>
                  {o.promoCode && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-50 text-[#810017] border border-rose-200 flex items-center gap-1">
                      <span>🏷️</span>
                      <span>Mã: {o.promoCode}</span>
                      {o.discountAmount > 0 && <span>(-{formatVND(o.discountAmount)})</span>}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    o.orderStatus === 'COMPLETED'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : o.orderStatus === 'CANCELLED'
                      ? 'bg-rose-50 text-rose-800 border-rose-300'
                      : o.orderStatus === 'SHIPPING'
                      ? 'bg-sky-50 text-sky-800 border-sky-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {formatOrderStatus(o.orderStatus)}
                  </span>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-2 mb-4">
                {o.items?.map((item) => {
                  const localizedName = PRODUCT_LOCALIZATION[item.skuId]?.name || item.productName;
                  return (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.imageUrl} alt={localizedName} className="w-10 h-10 object-contain rounded-md bg-gray-50 p-1 border border-gray-100" />
                        <div>
                          <div className="font-bold text-black truncate max-w-[300px]">{localizedName}</div>
                          <div className="text-[11px] text-gray-500">Số lượng: {item.quantity} • Đơn giá: {formatVND(item.unitPrice)}</div>
                        </div>
                      </div>
                      <div className="font-bold text-black">{formatVND(item.lineTotal)}</div>
                    </div>
                  );
                })}
              </div>

              {/* Order Footer: Shipping Info & Price Breakdown */}
              <div className="border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 text-gray-600">
                  <div>
                    <span className="font-bold text-gray-800">Người nhận: </span>
                    <span className="font-semibold text-black">{o.shippingName}</span>
                    {o.shippingPhone && <span> ({o.shippingPhone})</span>}
                  </div>
                  <div>
                    <span className="font-bold text-gray-800">Địa chỉ: </span>
                    <span>{o.shippingAddress}</span>
                  </div>
                  {o.fulfillmentStore && (
                    <div className="text-[11px] text-gray-500">
                      <span className="font-bold text-gray-700">Điểm phục vụ: </span>
                      <span>{o.fulfillmentStore}</span>
                    </div>
                  )}
                  {o.pointsEarned > 0 && (
                    <div className="text-[11px] text-amber-800 font-semibold pt-1">
                      ⭐ Tích lũy: +{o.pointsEarned.toLocaleString('vi-VN')} điểm Beauty Insider
                    </div>
                  )}
                </div>

                <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 space-y-1.5 md:ml-auto md:w-72">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính:</span>
                    <span className="font-bold text-black">
                      {formatVND(o.subtotalAmount || (o.totalAmount + (o.discountAmount || 0)))}
                    </span>
                  </div>
                  {o.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Giảm giá {o.promoCode ? `(${o.promoCode})` : ''}:</span>
                      <span>-{formatVND(o.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Vận chuyển:</span>
                    <span className="font-bold text-emerald-700">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-black pt-2 border-t border-gray-200">
                    <span>Tổng thanh toán:</span>
                    <span className="text-base text-[#810017]">{formatVND(o.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
