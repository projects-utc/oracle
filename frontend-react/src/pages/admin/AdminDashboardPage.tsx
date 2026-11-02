import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi, AdminDashboardData } from '../../api/adminApi';
import { formatUSD } from '../../constants';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  TicketPercent,
  Mail,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboard().then((res) => {
      if (res.success && res.data) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-xs text-gray-500">Đang tải chỉ số Dashboard từ Oracle...</div>;
  }

  if (!data) {
    return <div className="py-20 text-center text-xs text-rose-600">Không thể tải dữ liệu Dashboard</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#810017] text-white text-[11px] font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TRUNG TÂM ĐIỀU HÀNH ORACLE 23ai</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Chào mừng trở lại, Quản trị viên! ✨</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
            Hệ thống đang đồng bộ dữ liệu giao dịch thương mại điện tử, danh mục sản phẩm và ưu đãi thời gian thực trên Oracle Database.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="bg-white text-black hover:bg-slate-100 font-bold text-xs px-4 py-2.5 rounded-full transition-colors inline-flex items-center gap-1.5"
          >
            <span>Quản lý Sản phẩm</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/admin/orders"
            className="bg-[#810017] hover:bg-[#6b0013] text-white font-bold text-xs px-4 py-2.5 rounded-full transition-colors inline-flex items-center gap-1.5"
          >
            <span>Xử lý Đơn hàng</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Doanh thu sàn</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-extrabold text-gray-900 tracking-tight">{formatUSD(data.totalRevenue)}</div>
          <div className="text-[10px] text-gray-400 mt-1">Từ đơn đã xác nhận</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Tổng đơn hàng</span>
            <ShoppingBag className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-lg font-extrabold text-gray-900 tracking-tight">{data.totalOrders}</div>
          <div className="text-[10px] text-amber-700 font-semibold mt-1">{data.pendingOrders} đơn chờ duyệt</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Sản phẩm</span>
            <Package className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-lg font-extrabold text-gray-900 tracking-tight">{data.totalProducts}</div>
          <div className="text-[10px] text-rose-600 font-semibold mt-1">{data.lowStockProducts} mục sắp hết</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Thành viên</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-lg font-extrabold text-gray-900 tracking-tight">{data.totalCustomers}</div>
          <div className="text-[10px] text-gray-400 mt-1">Tài khoản Beauty Insider</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Ưu đãi</span>
            <TicketPercent className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-lg font-extrabold text-gray-900 tracking-tight">{data.activePromotions}</div>
          <div className="text-[10px] text-gray-400 mt-1">Chiến dịch đang mở</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Bản tin</span>
            <Mail className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-lg font-extrabold text-gray-900 tracking-tight">{data.totalSubscriptions}</div>
          <div className="text-[10px] text-gray-400 mt-1">Email & SMS đăng ký</div>
        </div>
      </div>

      {/* Tables Row: Recent Orders & Recent Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-sm text-gray-900">Đơn đặt hàng mới nhất</h3>
            <Link to="/admin/orders" className="text-xs font-bold text-[#810017] hover:underline">Xem tất cả ▸</Link>
          </div>

          <div className="space-y-3">
            {data.recentOrders?.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">Chưa có đơn hàng nào</p>
            ) : (
              data.recentOrders?.map((o) => (
                <div key={o.id} className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-mono font-bold text-gray-900">{o.orderCode}</div>
                    <div className="text-[11px] text-gray-500">{o.shippingName} • {new Date(o.createdAt).toLocaleDateString('vi-VN')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-black">{formatUSD(o.totalAmount)}</div>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-0.5 ${
                      o.orderStatus === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {o.orderStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Audit Logs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-sm text-gray-900">Nhật ký kiểm toán hệ thống</h3>
            <Link to="/admin/audit-logs" className="text-xs font-bold text-[#810017] hover:underline">Xem nhật ký ▸</Link>
          </div>

          <div className="space-y-2.5">
            {data.recentAuditLogs?.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">Chưa có nhật ký kiểm toán</p>
            ) : (
              data.recentAuditLogs?.map((log) => (
                <div key={log.id} className="p-2.5 rounded-xl border border-gray-100 text-xs flex items-center justify-between">
                  <div className="min-w-0 pr-3">
                    <div className="font-semibold text-gray-900 truncate">
                      <span className="font-bold text-[#810017]">[{log.actionType}]</span> {log.detailText}
                    </div>
                    <div className="text-[10px] text-gray-400">Bởi: @{log.actorUsername}</div>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0">
                    {new Date(log.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
