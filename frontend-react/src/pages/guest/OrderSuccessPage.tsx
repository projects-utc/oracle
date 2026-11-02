import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shoppingApi } from '../../api/shoppingApi';
import { Order } from '../../data';
import { formatUSD, formatPoints } from '../../constants';

export default function OrderSuccessPage() {
  const { code } = useParams<{ code: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;
    shoppingApi.getOrderByCode(code).then((res) => {
      if (res.success && res.data) {
        setOrder(res.data);
      }
      setLoading(false);
    });
  }, [code]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 font-sans text-center">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-xs">
        ✓
      </div>
      <h1 className="text-2xl font-extrabold text-black mb-2">Đặt hàng thành công!</h1>
      <p className="text-xs text-gray-600 mb-6 leading-relaxed">
        Cảm ơn bạn đã mua sắm tại Sephora. Đơn hàng của bạn đã được lưu trữ bền vững trên máy chủ Oracle Database.
      </p>

      {/* Order Info Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm text-left mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-2">
          <div>
            <div className="text-[11px] font-bold text-gray-500 uppercase">Mã đơn hàng:</div>
            <div className="font-mono text-base font-extrabold text-[#810017]">{code}</div>
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-amber-50 border border-amber-300 text-amber-900 rounded-full text-xs font-bold">
              {order?.orderStatus || 'PENDING'}
            </span>
          </div>
        </div>

        {order && (
          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-gray-700">Người nhận: </span>
              <span>{order.shippingName} ({order.shippingPhone})</span>
            </div>
            <div>
              <span className="font-bold text-gray-700">Địa chỉ giao hàng: </span>
              <span>{order.shippingAddress}</span>
            </div>
            {order.fulfillmentStore && (
              <div>
                <span className="font-bold text-gray-700">Cửa hàng phục vụ: </span>
                <span>{order.fulfillmentStore}</span>
              </div>
            )}
            <div className="border-t border-gray-100 pt-3">
              <div className="font-bold text-gray-700 mb-2">Sản phẩm trong đơn ({order.items?.length || 0}):</div>
              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-900 font-medium truncate max-w-[300px]">
                      {item.productName} <span className="text-gray-500">x{item.quantity}</span>
                    </span>
                    <span className="font-bold text-black">{formatUSD(item.lineTotal)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between font-extrabold text-sm">
              <span>Tổng thanh toán:</span>
              <span className="text-[#810017]">{formatUSD(order.totalAmount)}</span>
            </div>
            <div className="text-emerald-700 font-semibold text-[11px]">
              Tích luỹ thành công: +{formatPoints(order.pointsEarned)}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to="/my-orders" className="w-full sm:w-auto bg-black text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors">
          Xem lịch sử đơn hàng
        </Link>
        <Link to="/" className="w-full sm:w-auto border border-gray-300 bg-white text-black text-xs font-bold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}
