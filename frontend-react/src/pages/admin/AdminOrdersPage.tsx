import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { Order } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { formatUSD, formatPoints } from '../../constants';
import { Eye, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';

export default function AdminOrdersPage() {
  const { addToast } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await adminApi.getAllOrders(statusFilter || undefined);
    if (res.success && res.data) {
      setOrders(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      const res = await adminApi.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        addToast(`Cập nhật đơn hàng sang trạng thái ${newStatus} thành công!`, 'success');
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(res.data);
        }
        await fetchOrders();
      } else {
        addToast(res.message || 'Lỗi cập nhật trạng thái', 'error');
      }
    } catch {
      addToast('Không thể kết nối đến máy chủ', 'error');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Quản lý Đơn hàng</h1>
          <p className="text-xs text-gray-500 mt-1">Theo dõi giao dịch, duyệt trạng thái và quản lý tồn kho hoàn hủy</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: '', label: 'Tất cả' },
            { id: 'PENDING', label: 'Chờ duyệt' },
            { id: 'CONFIRMED', label: 'Đã duyệt' },
            { id: 'SHIPPING', label: 'Đang giao' },
            { id: 'COMPLETED', label: 'Hoàn thành' },
            { id: 'CANCELLED', label: 'Đã hủy' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab.id ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Mã đơn hàng</th>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Ngày đặt</th>
                <th className="py-3 px-4">Tổng tiền</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">Đang tải danh sách đơn hàng từ Oracle...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">Không có đơn hàng nào</td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#810017]">{o.orderCode}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">{o.shippingName}</div>
                      <div className="text-[11px] text-gray-400">{o.shippingPhone}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(o.createdAt).toLocaleString('vi-VN')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-black">{formatUSD(o.totalAmount)}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">+{formatPoints(o.pointsEarned)}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
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
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-black font-semibold rounded-lg text-xs cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Chi tiết</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div>
                <div className="text-[10px] font-bold uppercase text-gray-400">Chi tiết đơn hàng:</div>
                <div className="font-mono text-base font-extrabold text-[#810017]">{selectedOrder.orderCode}</div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-black p-1 text-base">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                  <div className="text-gray-400 text-[10px] font-bold">Người nhận:</div>
                  <div className="font-bold text-gray-900">{selectedOrder.shippingName}</div>
                  <div className="text-gray-600">{selectedOrder.shippingPhone}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-[10px] font-bold">Trạng thái hiện tại:</div>
                  <div className="font-bold text-black">{selectedOrder.orderStatus}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">Tích luỹ: +{selectedOrder.pointsEarned} pts</div>
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-[10px] font-bold mb-1">Địa chỉ giao:</div>
                <div className="text-gray-800 font-medium">{selectedOrder.shippingAddress}</div>
              </div>

              {/* Items in order */}
              <div className="border-t border-gray-100 pt-3">
                <div className="font-bold text-gray-900 mb-2">Danh sách sản phẩm:</div>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={item.imageUrl} alt={item.productName} className="w-10 h-10 object-contain rounded bg-gray-50 p-1" />
                        <div className="truncate">
                          <div className="font-semibold text-gray-900 truncate">{item.productName}</div>
                          <div className="text-[10px] text-gray-400">SKU: {item.skuId} • SL: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-bold text-black text-right shrink-0">{formatUSD(item.lineTotal)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update Action Buttons */}
              <div className="border-t border-gray-100 pt-4">
                <div className="font-bold text-gray-900 mb-2 text-xs">Chuyển trạng thái đơn:</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'CONFIRMED')}
                    disabled={selectedOrder.orderStatus === 'CONFIRMED' || selectedOrder.orderStatus === 'CANCELLED'}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer disabled:opacity-40"
                  >
                    Duyệt CONFIRMED
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'SHIPPING')}
                    disabled={selectedOrder.orderStatus === 'SHIPPING' || selectedOrder.orderStatus === 'CANCELLED'}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer disabled:opacity-40"
                  >
                    Giao SHIPPING
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'COMPLETED')}
                    disabled={selectedOrder.orderStatus === 'COMPLETED' || selectedOrder.orderStatus === 'CANCELLED'}
                    className="px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white font-bold text-xs cursor-pointer disabled:opacity-40"
                  >
                    Xong COMPLETED
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'CANCELLED')}
                    disabled={selectedOrder.orderStatus === 'CANCELLED'}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer disabled:opacity-40"
                  >
                    Hủy CANCELLED (Hoàn kho)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
