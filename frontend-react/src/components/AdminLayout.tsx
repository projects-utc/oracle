import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  TicketPercent,
  FileText,
  LogOut,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout, addToast } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not logged in or not admin, show login gate
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-[#810017] text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
            S
          </div>
          <h2 className="text-xl font-extrabold tracking-tight mb-2">Cổng Quản trị Sephora</h2>
          <p className="text-xs text-slate-400 mb-6">
            Khu vực dành riêng cho Quản trị viên hệ thống. Vui lòng đăng nhập bằng tài khoản có quyền ADMIN.
          </p>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-left mb-6">
            <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px] mb-1">Tài khoản Admin mặc định:</div>
            <div className="font-mono text-emerald-400 font-bold">admin / 123</div>
          </div>
          <Link
            to="/login?from=/admin"
            className="block w-full bg-[#810017] hover:bg-[#6b0013] text-white font-bold py-3 rounded-full text-xs transition-colors"
          >
            Đăng nhập Quản trị viên
          </Link>
          <Link to="/" className="inline-block mt-4 text-xs text-slate-400 hover:text-white underline">
            ← Quay lại Storefront
          </Link>
        </div>
      </div>
    );
  }

  const navGroups = [
    {
      group: 'BÁO CÁO & THỐNG KÊ',
      items: [
        { path: '/admin', label: 'Báo cáo Doanh thu', icon: <LayoutDashboard className="w-4 h-4" /> },
      ],
    },
    {
      group: 'QUẢN LÝ BÁN HÀNG',
      items: [
        { path: '/admin/products', label: 'Sản phẩm & Kho hàng', icon: <Package className="w-4 h-4" /> },
        { path: '/admin/orders', label: 'Quản lý Đơn hàng', icon: <ShoppingBag className="w-4 h-4" /> },
        { path: '/admin/users', label: 'Tài khoản & Kiểm toán', icon: <Users className="w-4 h-4" /> },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    addToast('Đã đăng xuất khỏi tài khoản quản trị', 'info');
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sticky Dark Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 bg-[#0F172A] text-slate-300 flex flex-col justify-between z-50 transition-transform duration-200 border-r border-slate-800 shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#810017] to-black text-white flex items-center justify-center font-extrabold text-base shadow-md">
                S
              </div>
              <div>
                <div className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1">
                  <span>Sephora</span>
                  <span className="text-[#f6b834] font-bold">Quản trị</span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Hệ thống Quản trị sàn</div>
              </div>
            </Link>
          </div>

          {/* Navigation Groups */}
          <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx}>
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {group.group}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          active
                            ? 'bg-[#810017] text-white font-bold shadow-xs'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white px-2 py-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Về trang mua hàng</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 px-2 py-1.5 transition-colors w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất (@{currentUser.username})</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar for Mobile */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg border border-gray-300 text-gray-700"
          >
            ☰ Menu
          </button>
          <div className="font-extrabold text-sm text-black">Quản trị Hệ thống</div>
          <Link to="/" className="text-xs font-bold text-gray-600">Trang chủ</Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
