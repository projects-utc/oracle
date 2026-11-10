import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi, AdminDashboardData } from '../../api/adminApi';
import { formatUSD, formatOrderStatus } from '../../constants';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
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
    return <div className="py-20 text-center text-xs text-gray-500">Đang tải dữ liệu tổng quan từ cơ sở dữ liệu...</div>;
  }

  if (!data) {
    return <div className="py-20 text-center text-xs text-rose-600">Không thể tải dữ liệu báo cáo</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#810017] text-white text-[11px] font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HỆ THỐNG QUẢN TRỊ BÁN HÀNG ORACLE 23ai</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Xin chào, Quản trị viên! ✨</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
            Theo dõi tổng quan tình hình kinh doanh, số lượng đơn đặt hàng và giám sát tồn kho sản phẩm thời gian thực.
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
            <span>Quản lý Đơn hàng</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Core KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Tổng doanh thu</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{formatUSD(data.totalRevenue)}</div>
          <div className="text-[11px] text-gray-400 mt-1">Từ các đơn hoàn thành</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Tổng số đơn hàng</span>
            <ShoppingBag className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{data.totalOrders}</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">{data.pendingOrders} đơn đang chờ duyệt</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Sản phẩm trong kho</span>
            <Package className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{data.totalProducts}</div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">{data.lowStockProducts} mặt hàng sắp hết</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Tài khoản thành viên</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{data.totalCustomers}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Khách hàng đã đăng ký</div>
        </div>
      </div>

      {/* Tables Row: Recent Orders & Recent Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-sm text-gray-900">Đơn đặt hàng gần đây</h3>
            <Link to="/admin/orders" className="text-xs font-bold text-[#810017] hover:underline">Xem tất cả ▸</Link>
          </div>

          <div className="space-y-3">
            {data.recentOrders?.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">Chưa có đơn hàng nào</p>
            ) : (
              data.recentOrders?.map((o) => (
                <div key={o.id} className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-mono font-bold text-gray-900">{o.orderCode}</div>
                    <div className="text-[11px] text-gray-500">{o.shippingName} • {new Date(o.createdAt).toLocaleDateString('vi-VN')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-black">{formatUSD(o.totalAmount)}</div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mt-1 ${
                      o.orderStatus === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : o.orderStatus === 'CANCELLED'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {formatOrderStatus(o.orderStatus)}
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
            <h3 className="font-extrabold text-sm text-gray-900">Nhật ký thay đổi gần đây (Oracle Trigger)</h3>
            <Link to="/admin/users" className="text-xs font-bold text-[#810017] hover:underline">Xem chi tiết ▸</Link>
          </div>

          <div className="space-y-2.5">
            {data.recentAuditLogs?.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">Chưa có lịch sử thay đổi</p>
            ) : (
              data.recentAuditLogs?.map((log) => (
                <div key={log.id} className="p-2.5 rounded-xl border border-gray-100 text-xs flex items-center justify-between">
                  <div className="min-w-0 pr-3">
                    <div className="font-semibold text-gray-900 truncate">
                      <span className="font-bold text-[#810017]">[{log.actionType}]</span> {log.detailText}
                    </div>
                    <div className="text-[10px] text-gray-400">Thực hiện bởi: @{log.actorUsername}</div>
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
