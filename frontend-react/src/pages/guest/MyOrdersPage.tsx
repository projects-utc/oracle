import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shoppingApi } from '../../api/shoppingApi';
import { Order } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { formatUSD, formatPoints } from '../../constants';

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
        <p className="text-xs text-gray-500 mb-6">Bạn cần đăng nhập để theo dõi lịch sử đơn hàng của mình.</p>
        <Link to="/login?from=/my-orders" className="inline-block bg-black text-white text-xs font-bold px-6 py-2.5 rounded-full">
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
          <p className="text-xs text-gray-500 mt-1">Theo dõi trạng thái đơn hàng và lịch sử điểm thưởng Beauty Insider</p>
        </div>
        <Link to="/" className="text-xs font-bold text-black hover:underline">← Về trang chủ</Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-gray-500">Đang tải lịch sử đơn hàng từ Oracle...</div>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center bg-gray-50 rounded-2xl p-8">
          <div className="text-3xl mb-2">📦</div>
          <h3 className="font-bold text-base text-gray-900 mb-1">Bạn chưa có đơn hàng nào</h3>
          <p className="text-xs text-gray-500 mb-4">Các đơn hàng bạn đặt sẽ được lưu trữ và hiển thị chi tiết tại đây.</p>
          <Link to="/" className="inline-block bg-black text-white text-xs font-bold px-6 py-2.5 rounded-full">
            Bắt đầu mua sắm
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-3 mb-4 gap-2">
                <div>
                  <span className="font-mono font-bold text-sm text-[#810017]">{o.orderCode}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(o.createdAt).toLocaleString('vi-VN')}
                  </span>
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
                    {o.orderStatus}
                  </span>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-2 mb-4">
                {o.items?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.imageUrl} alt={item.productName} className="w-10 h-10 object-contain rounded-md bg-gray-50 p-1 border border-gray-100" />
                      <div>
                        <div className="font-bold text-black truncate max-w-[300px]">{item.productName}</div>
                        <div className="text-[11px] text-gray-500">Số lượng: {item.quantity} • Đơn giá: {formatUSD(item.unitPrice)}</div>
                      </div>
                    </div>
                    <div className="font-bold text-black">{formatUSD(item.lineTotal)}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs">
                <div className="text-gray-500">
                  Giao tới: <span className="font-semibold text-black">{o.shippingName}</span> • {o.shippingAddress}
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-base text-[#810017]">{formatUSD(o.totalAmount)}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">+{formatPoints(o.pointsEarned)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
