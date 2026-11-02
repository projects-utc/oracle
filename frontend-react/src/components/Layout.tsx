import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { formatPoints } from '../constants';
import { storefrontApi } from '../api/storefrontApi';
import {
  SephoraLogo,
  SearchIcon,
  AiBeautyIcon,
  StoreIcon,
  ServicesIcon,
  HeartIcon,
  BasketIcon,
  SparkleIcon,
  CloseIcon,
  ChevronDown,
  ChatIcon,
  AppIcon,
  SmsIcon,
  CreditCardIcon,
} from './sephora/icons';

export function Header() {
  const { currentUser, logout, homeData, cartCount, lovedSkuIds, setShowStoreModal, setShowAiChatModal, selectedStore } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSignInDropdown, setShowSignInDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = homeData?.categories || [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white font-sans text-black border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* 1. Top Ticker Banner */}
      <div className="bg-[#810017] text-white text-xs py-2 px-4 transition-colors">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex-1 text-center md:text-left font-medium tracking-tight">
            <span>Muốn giảm ngay 30% toàn bộ Sephora Collection? Nhập mã </span>
            <span className="font-bold underline text-[#f6b834] cursor-pointer" onClick={() => navigate('/offers')}>
              ALLONSALE
            </span>
            <span> khi thanh toán ▸</span>
          </div>
          <div className="hidden md:flex items-center gap-1 font-bold tracking-wider text-sm text-[#f6b834]">
            <span>30%</span>
            <span className="text-[10px] leading-tight">OFF</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="shrink-0 flex items-center py-1">
          <SephoraLogo className="h-4 sm:h-[18px] w-auto text-black" />
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-[560px] mx-2 relative items-center">
          <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
            <span className="absolute left-3.5 text-gray-400 pointer-events-none">
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, thương hiệu (Rare Beauty, Lip, Serum)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f2f2f2] hover:bg-[#e8e8e8] focus:bg-white text-sm rounded-full pl-10 pr-28 py-2.5 outline-none border border-transparent focus:border-black transition-all placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-24 text-gray-400 hover:text-black p-1"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowAiChatModal(true)}
              className="absolute right-1.5 flex items-center gap-1 bg-white hover:bg-gray-50 text-[11px] font-bold text-gray-900 px-2.5 py-1 rounded-full border border-gray-200 shadow-xs cursor-pointer"
            >
              <AiBeautyIcon className="w-3.5 h-3.5 text-black" />
              <span>AI Beauty</span>
              <span className="bg-[#810017] text-[9px] text-white px-1 rounded-xs font-semibold">NEW</span>
            </button>
          </form>
        </div>

        {/* Actions / Utilities (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-medium shrink-0">
          {/* Store Locator */}
          <button
            type="button"
            onClick={() => setShowStoreModal(true)}
            className="flex items-center gap-2.5 hover:opacity-75 transition-opacity text-left group cursor-pointer"
          >
            <StoreIcon className="w-6 h-6 text-black shrink-0" />
            <div className="leading-tight">
              <span className="block font-bold text-xs">{selectedStore?.name || 'Chọn Cửa hàng'}</span>
              <span className="text-[11px] text-gray-500 group-hover:underline">{selectedStore?.city || 'Tìm điểm nhận gần nhất'}</span>
            </div>
          </button>

          {/* Offers */}
          <Link to="/offers" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
            <ServicesIcon className="w-6 h-6 text-black shrink-0" />
            <div className="leading-tight">
              <span className="block font-bold text-xs">Ưu đãi</span>
              <span className="text-[11px] text-gray-500">& Quà tặng</span>
            </div>
          </Link>

          {/* Account Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSignInDropdown(!showSignInDropdown)}
              className="flex items-center gap-1 py-1 hover:opacity-75 font-semibold text-xs transition-opacity cursor-pointer"
            >
              <span>{currentUser ? currentUser.fullName : 'Tài khoản'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showSignInDropdown && (
              <div
                className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-4 z-50 text-left animate-in fade-in"
                onMouseLeave={() => setShowSignInDropdown(false)}
              >
                {currentUser ? (
                  <div>
                    <div className="font-bold text-sm text-black">{currentUser.fullName}</div>
                    <div className="text-[11px] text-gray-500 mb-2">@{currentUser.username}</div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-[11px] font-bold mb-3">
                      <span className="text-[#810017]">{currentUser.loyaltyTier}</span>
                      <span>•</span>
                      <span>{formatPoints(currentUser.pointsBalance)}</span>
                    </div>

                    <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
                      <Link to="/my-orders" className="block hover:underline font-medium" onClick={() => setShowSignInDropdown(false)}>
                        📦 Đơn hàng của tôi
                      </Link>
                      <Link to="/loves" className="block hover:underline font-medium" onClick={() => setShowSignInDropdown(false)}>
                        ❤️ Mục yêu thích ({lovedSkuIds.size})
                      </Link>
                      <Link to="/offers" className="block hover:underline font-medium" onClick={() => setShowSignInDropdown(false)}>
                        🎁 Beauty Insider Rewards
                      </Link>
                      {currentUser.role === 'ADMIN' && (
                        <Link to="/admin" className="block font-bold text-[#810017] hover:underline" onClick={() => setShowSignInDropdown(false)}>
                          ⚙️ Cổng Quản trị Admin
                        </Link>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setShowSignInDropdown(false);
                      }}
                      className="w-full mt-4 bg-gray-100 text-black font-bold py-2 rounded-full text-xs hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-sm mb-1 text-black">Chào mừng đến với Sephora ✨</div>
                    <div className="text-xs text-gray-500 mb-3">Đăng nhập để nhận tích điểm Beauty Insider và ưu đãi độc quyền.</div>
                    <Link
                      to="/login"
                      className="block text-center w-full bg-black text-white font-bold py-2 rounded-full text-xs hover:bg-neutral-800 transition-colors mb-2"
                      onClick={() => setShowSignInDropdown(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      className="block text-center w-full bg-white text-black border border-black font-bold py-2 rounded-full text-xs hover:bg-gray-50 transition-colors"
                      onClick={() => setShowSignInDropdown(false)}
                    >
                      Tạo tài khoản mới
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Loves & Basket Icons */}
        <div className="flex items-center gap-4 shrink-0">
          <Link to="/loves" className="relative p-1 hover:opacity-75 transition-opacity" aria-label="Favorites">
            <HeartIcon className="w-6 h-6 text-black" filled={lovedSkuIds.size > 0} />
            {lovedSkuIds.size > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {lovedSkuIds.size}
              </span>
            )}
          </Link>

          <Link to="/basket" className="relative p-1 hover:opacity-75 transition-opacity" aria-label="Shopping Basket">
            <BasketIcon className="w-6 h-6 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#810017] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="md:hidden px-4 pb-2.5">
        <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
          <span className="absolute left-3 text-gray-400">
            <SearchIcon className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm sản phẩm, thương hiệu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f2f2f2] text-sm rounded-full pl-9 pr-20 py-2 outline-none border border-transparent focus:border-black"
          />
          <button
            type="button"
            onClick={() => setShowAiChatModal(true)}
            className="absolute right-1.5 flex items-center gap-1 bg-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-200"
          >
            <AiBeautyIcon className="w-3 h-3" />
            <span>AI</span>
          </button>
        </form>
      </div>

      {/* 3. MegaNav Bar (Desktop) */}
      <nav
        className="hidden md:block bg-black text-white text-xs tracking-tight relative"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 lg:space-x-3 overflow-x-auto no-scrollbar py-2.5">
            {categories.map((category) => (
              <div
                key={category.id}
                onMouseEnter={() => setActiveMenu(category.id)}
                className="relative py-1 cursor-pointer"
              >
                <Link
                  to={`/shop/${category.slug}`}
                  className={`px-2 py-1 font-medium hover:text-white/80 transition-colors flex items-center gap-1 whitespace-nowrap ${
                    activeMenu === category.id ? 'text-white underline underline-offset-4 decoration-2' : 'text-white/95'
                  }`}
                >
                  {category.hasSparkle && <SparkleIcon className="w-2.5 h-2.5 text-[#d6b672] shrink-0" />}
                  <span>{category.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* MegaMenu Dropdown Flyout */}
        {activeMenu && (
          <div
            className="absolute left-0 right-0 top-full bg-white text-black border-b border-gray-200 shadow-2xl py-6 z-50 animate-in fade-in"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-[1280px] mx-auto px-6">
              {(() => {
                const cur = categories.find((m) => m.id === activeMenu);
                if (!cur) return null;
                return (
                  <div className="grid grid-cols-4 gap-8">
                    <div className="col-span-1 border-r border-gray-100 pr-6">
                      <h3 className="font-bold text-sm tracking-tight uppercase mb-3 flex items-center gap-1.5 text-black">
                        {cur.hasSparkle && <SparkleIcon className="w-3.5 h-3.5 text-[#d6b672]" />}
                        <span>Tất cả {cur.label}</span>
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">
                        Khám phá các sản phẩm {cur.label.toLowerCase()} bán chạy nhất được tuyển chọn bởi chuyên gia làm đẹp Sephora.
                      </p>
                      <Link
                        to={`/shop/${cur.slug}`}
                        onClick={() => setActiveMenu(null)}
                        className="inline-block text-xs font-bold underline hover:text-gray-600 transition-colors"
                      >
                        Xem tất cả {cur.label} ▸
                      </Link>
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-2">
                      {cur.subcategories.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs text-gray-700 hover:text-black hover:font-semibold py-1 transition-all"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>

                    <div className="col-span-1 bg-gray-50 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          Ưu đãi nổi bật
                        </div>
                        <div className="font-bold text-xs text-black mb-1">
                          Giảm đến 30% Sephora Collection
                        </div>
                        <p className="text-[11px] text-gray-600">
                          Nhập mã <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-gray-200">ALLONSALE</span> khi đặt hàng.
                        </p>
                      </div>
                      <Link
                        to="/offers"
                        onClick={() => setActiveMenu(null)}
                        className="text-[11px] font-bold text-black underline mt-3 hover:text-gray-700"
                      >
                        Xem chi tiết ưu đãi ▸
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Category Horizontal Scroll */}
      <div className="md:hidden border-t border-gray-100 bg-white px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowStoreModal(true)}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-xs font-bold text-gray-800 bg-gray-50 whitespace-nowrap"
        >
          <StoreIcon className="w-3.5 h-3.5" />
          <span>{selectedStore?.name ? selectedStore.name.slice(0, 15) : 'Cửa hàng'}</span>
        </button>

        {categories.slice(0, 8).map((cat) => (
          <Link
            key={cat.id}
            to={`/shop/${cat.slug}`}
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-800 whitespace-nowrap bg-white hover:border-black"
          >
            {cat.hasSparkle && <SparkleIcon className="w-2.5 h-2.5 text-[#d6b672]" />}
            <span>{cat.label}</span>
          </Link>
        ))}
      </div>
    </header>
  );
}

export function Footer() {
  const { homeData, setShowInternationalModal, addToast } = useStore();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [submittingPhone, setSubmittingPhone] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submittingEmail) return;
    setSubmittingEmail(true);
    try {
      const res = await storefrontApi.subscribe('EMAIL', email.trim());
      if (res.success) {
        addToast(res.data.alreadySubscribed ? 'Email của bạn đã được đăng ký trước đó!' : 'Đăng ký nhận bản tin Sephora thành công! ✨', 'success');
        setEmail('');
      } else {
        addToast(res.message || 'Lỗi đăng ký email', 'error');
      }
    } catch {
      addToast('Không thể kết nối đến máy chủ', 'error');
    } finally {
      setSubmittingEmail(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || submittingPhone) return;
    setSubmittingPhone(true);
    try {
      const res = await storefrontApi.subscribe('SMS', phone.trim());
      if (res.success) {
        addToast(res.data.alreadySubscribed ? 'Số điện thoại của bạn đã đăng ký trước đó!' : 'Đăng ký nhận tin nhắn khuyến mãi thành công! 📱', 'success');
        setPhone('');
      } else {
        addToast(res.message || 'Lỗi đăng ký SMS', 'error');
      }
    } catch {
      addToast('Không thể kết nối đến máy chủ', 'error');
    } finally {
      setSubmittingPhone(false);
    }
  };

  const footerCols = homeData?.footerColumns || [];

  return (
    <footer className="w-full font-sans bg-black text-white mt-12">
      {/* 1. Website Feedback Strip */}
      <div className="bg-[#e6e6e6] text-black text-center py-2 px-4 text-xs font-semibold">
        <Link to="/offers" className="hover:underline">
          Khám phá trọn bộ ưu đãi và quà tặng Beauty Insider mới nhất ▸
        </Link>
      </div>

      {/* 2. Five Service Highlights Bar */}
      <div className="border-b border-neutral-800 py-6 px-4">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-xs text-left">
          <Link to="/offers" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
            <StoreIcon className="w-6 h-6 text-white shrink-0" />
            <div>
              <div className="font-bold">Hệ thống Cửa hàng</div>
              <div className="text-[11px] text-gray-400">Chọn cửa hàng gần bạn</div>
            </div>
          </Link>
          <Link to="/offers" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
            <ChatIcon className="w-6 h-6 text-white shrink-0" />
            <div>
              <div className="font-bold">Trợ lý Trực tuyến</div>
              <div className="text-[11px] text-gray-400">Tư vấn làm đẹp 24/7</div>
            </div>
          </Link>
          <Link to="/offers" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
            <AppIcon className="w-6 h-6 text-white shrink-0" />
            <div>
              <div className="font-bold">Ứng dụng Sephora</div>
              <div className="text-[11px] text-gray-400">Tải ngay trên iOS & Android</div>
            </div>
          </Link>
          <Link to="/offers" className="flex items-center gap-3 hover:text-gray-300 transition-colors">
            <SmsIcon className="w-6 h-6 text-white shrink-0" />
            <div>
              <div className="font-bold">Nhận Tin khuyến mãi</div>
              <div className="text-[11px] text-gray-400">Cập nhật qua SMS</div>
            </div>
          </Link>
          <Link to="/offers" className="flex items-center gap-3 hover:text-gray-300 transition-colors col-span-2 sm:col-span-1">
            <CreditCardIcon className="w-6 h-6 text-white shrink-0" />
            <div>
              <div className="font-bold">Thẻ Sephora Insider</div>
              <div className="text-[11px] text-gray-400">Tích điểm đổi quà</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Link Columns & Subscriptions */}
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {footerCols.map((col, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-sm text-white mb-4 tracking-tight">{col.title}</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {col.links?.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link to={link.href.startsWith('/') ? link.href : '/offers'} className="hover:underline hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Region & Sign Up Column */}
          <div>
            <h3 className="font-bold text-sm text-white mb-4 tracking-tight">Khu vực & Ngôn ngữ</h3>
            <button
              type="button"
              onClick={() => setShowInternationalModal(true)}
              className="flex items-center gap-2 text-xs text-gray-300 hover:text-white mb-6 cursor-pointer"
            >
              <span className="text-base">🇻🇳</span>
              <span className="font-semibold text-white underline">Việt Nam - Tiếng Việt / English</span>
            </button>

            {/* SMS Form */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Đăng ký nhận SMS ưu đãi Sephora
              </label>
              <form onSubmit={handlePhoneSubmit} className="flex gap-2">
                <input
                  type="tel"
                  placeholder="Số điện thoại di động..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-white text-black px-3 py-2 rounded-lg text-xs outline-none"
                />
                <button
                  type="submit"
                  disabled={submittingPhone}
                  className="bg-transparent border border-white text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  Gửi
                </button>
              </form>
            </div>

            {/* Email Form */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Đăng ký nhận Bản tin làm đẹp
              </label>
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white text-black px-3 py-2 rounded-lg text-xs outline-none"
                />
                <button
                  type="submit"
                  disabled={submittingEmail}
                  className="bg-transparent border border-white text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Legal Bar */}
      <div className="border-t border-neutral-800 py-6 px-4 text-xs text-gray-400">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left text-[11px] space-y-1">
            <div>© 2026 Sephora Oracle Full-Stack System. Thiết kế theo kiến trúc chuẩn room-book.</div>
            <div className="text-gray-500">Kết nối trực tiếp Oracle Database 23ai FREEPDB1 tại 58.186.149.175:32012</div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/offers" className="hover:underline">Điều khoản sử dụng</Link>
            <span>•</span>
            <Link to="/offers" className="hover:underline">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileBottomNav() {
  const { setShowStoreModal, setShowAiChatModal } = useStore();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-around text-[10px] font-bold text-gray-700 shadow-lg">
      <Link to="/" className="flex flex-col items-center gap-1 hover:text-black">
        <span className="text-base">🏠</span>
        <span>Trang chủ</span>
      </Link>
      <Link to="/shop/makeup" className="flex flex-col items-center gap-1 hover:text-black">
        <span className="text-base">💄</span>
        <span>Sản phẩm</span>
      </Link>
      <Link to="/offers" className="flex flex-col items-center gap-1 hover:text-black">
        <span className="text-base">🎁</span>
        <span>Ưu đãi</span>
      </Link>
      <button onClick={() => setShowStoreModal(true)} className="flex flex-col items-center gap-1 hover:text-black">
        <span className="text-base">🏬</span>
        <span>Cửa hàng</span>
      </button>
      <button onClick={() => setShowAiChatModal(true)} className="flex flex-col items-center gap-1 text-[#810017]">
        <span className="text-base">✨</span>
        <span>AI Beauty</span>
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useStore();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-3.5 rounded-xl text-xs font-semibold shadow-xl border flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            t.type === 'success'
              ? 'bg-neutral-900 text-white border-black'
              : t.type === 'error'
              ? 'bg-rose-900 text-white border-rose-800'
              : t.type === 'warn'
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-white text-black border-gray-200 shadow-md'
          }`}
        >
          <span>{t.message}</span>
          <button onClick={() => removeToast(t.id)} className="opacity-60 hover:opacity-100 cursor-pointer p-0.5">✕</button>
        </div>
      ))}
    </div>
  );
}
