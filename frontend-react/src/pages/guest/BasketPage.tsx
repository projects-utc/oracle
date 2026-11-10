import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { shoppingApi } from '../../api/shoppingApi';
import { storefrontApi } from '../../api/storefrontApi';
import { formatVND } from '../../constants';
import { localizeProduct } from '../../utils/productLocalization';

export default function BasketPage() {
  const { cartItems, updateCartQty, removeCartItem, clearCart, currentUser, selectedStore, addToast, refreshUserSession } = useStore();
  const navigate = useNavigate();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent: number;
    discountAmount: number;
    title: string;
  } | null>(null);

  const [shippingName, setShippingName] = useState(currentUser?.fullName || '');
  const [shippingPhone, setShippingPhone] = useState(currentUser?.phone || '');
  const [shippingAddress, setShippingAddress] = useState('123 Nguyen Hue, Quan 1, TP.HCM');
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [promoError, setPromoError] = useState('');
  React.useEffect(() => {
    if (currentUser) {
      if (!shippingName) setShippingName(currentUser.fullName || '');
      if (!shippingPhone) setShippingPhone(currentUser.phone || '0900000003');
    }
  }, [currentUser]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.lineTotal || item.quantity * (item.product?.priceValue || 0)),
    0
  );

  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = async (codeToUse?: string) => {
    const code = (codeToUse || promoCodeInput).trim().toUpperCase();
    if (!code) return;
    setPromoError('');
    try {
      const res = await storefrontApi.validatePromo(code, subtotal);
      if (res.success && res.data) {
        setAppliedPromo({
          code: res.data.code,
          discountPercent: res.data.discountPercent,
          discountAmount: res.data.discountAmount,
          title: res.data.title,
        });
        setPromoCodeInput(code);
        addToast(`Đã áp dụng mã giảm giá ${code} thành công! 🎉`, 'success');
      } else {
        setPromoError(res.message || 'Mã giảm giá không hợp lệ');
        setAppliedPromo(null);
      }
    } catch {
      setPromoError('Không thể kiểm tra mã giảm giá');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      addToast('Vui lòng đăng nhập để hoàn tất đặt đơn hàng', 'info');
      navigate('/login?from=/basket');
      return;
    }

    if (cartItems.length === 0) {
      addToast('Giỏ hàng của bạn đang trống', 'warn');
      return;
    }

    setLoadingCheckout(true);
    try {
      const res = await shoppingApi.createOrder({
        shippingName: shippingName.trim(),
        shippingPhone: shippingPhone.trim(),
        shippingAddress: shippingAddress.trim(),
        promoCode: appliedPromo?.code,
        fulfillmentStore: selectedStore?.name,
      });

      if (res.success && res.data) {
        await refreshUserSession();
        addToast('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Sephora.', 'success');
        navigate(`/order-success/${res.data.orderCode}`);
      } else {
        addToast(res.message || 'Lỗi khi tạo đơn hàng', 'error');
      }
    } catch {
      addToast('Lỗi kết nối khi gửi đơn hàng', 'error');
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center font-sans">
        <div className="text-4xl mb-3">🛍️</div>
        <h2 className="text-xl font-bold text-black mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-xs text-gray-500 mb-6">Hãy dạo xem các bộ sưu tập mỹ phẩm mới và bán chạy nhất tại Sephora nhé.</p>
        <Link to="/" className="inline-block bg-black text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors">
          Bắt đầu mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8 font-sans">
      <h1 className="text-2xl font-extrabold text-black tracking-tight mb-6">Giỏ hàng của bạn ({cartItems.length} sản phẩm)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Line Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs divide-y divide-gray-100">
            {cartItems.map((item) => {
              const prod = localizeProduct(item.product);
              return (
                <div key={item.skuId} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <Link to={`/product/${item.skuId}`} className="shrink-0 w-16 h-16 bg-gray-50 rounded-xl p-2 border border-gray-100 block">
                      <img src={prod?.image} alt={prod?.name} className="w-full h-full object-contain" />
                    </Link>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 truncate">{prod?.brand}</div>
                      <Link to={`/product/${item.skuId}`} className="text-xs font-bold text-gray-900 truncate hover:underline block">
                        {prod?.name}
                      </Link>
                      <div className="text-xs font-extrabold text-[#810017] mt-0.5">{formatVND(prod?.priceValue)}</div>
                    </div>
                  </div>

                  {/* Quantity Controls & Delete */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center border border-gray-300 rounded-full bg-white text-xs">
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.skuId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:text-black cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.skuId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:text-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-extrabold text-sm text-black min-w-[90px] text-right">
                      {formatVND(item.lineTotal || item.quantity * (prod?.priceValue || 0))}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCartItem(item.skuId)}
                      className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Xóa sản phẩm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs">
            <Link to="/" className="text-black font-bold hover:underline">← Tiếp tục chọn thêm sản phẩm</Link>
            <button onClick={clearCart} className="text-gray-500 hover:text-rose-600 underline cursor-pointer">
              Làm trống giỏ hàng
            </button>
          </div>
        </div>

        {/* Right: Summary & Checkout Form */}
        <div className="space-y-6">
          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-base font-extrabold text-black mb-4">Thông tin thanh toán</h2>

            {/* Promo Code Box */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Mã giảm giá</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá..."
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono font-bold uppercase outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => handleApplyPromo()}
                  className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              </div>
              {promoError && <p className="text-[11px] text-rose-600 mt-1 font-medium">{promoError}</p>}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 text-xs border-t border-gray-100 pt-4 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span className="font-bold text-black">{formatVND(subtotal)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Giảm giá ({appliedPromo.code} -{appliedPromo.discountPercent}%):</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển:</span>
                <span className="font-bold text-emerald-700">Miễn phí</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-black pt-3 border-t border-gray-200">
                <span>Tổng cộng:</span>
                <span className="text-base text-[#810017]">{formatVND(finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Form Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-base font-extrabold text-black mb-3">Thông tin nhận hàng</h2>

            {!currentUser && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                Bạn chưa đăng nhập. Vui lòng{' '}
                <Link to="/login?from=/basket" className="font-bold underline">đăng nhập</Link> để lưu đơn hàng vào lịch sử tài khoản.
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Họ và tên người nhận *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Lê Hoàng Nam"
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Số điện thoại liên hệ *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0901234567"
                  value={shippingPhone}
                  onChange={(e) => setShippingPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Địa chỉ giao hàng chi tiết *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-black"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-gray-200 text-gray-600 text-[11px] space-y-1">
                <div className="font-bold text-black flex items-center gap-1.5">
                  <span>💵</span>
                  <span>Phương thức thanh toán:</span>
                </div>
                <div>Thanh toán tiền mặt khi nhận hàng (COD). Kiểm tra hàng trước khi thanh toán.</div>
              </div>

              <button
                type="submit"
                disabled={loadingCheckout}
                className="w-full mt-2 bg-[#810017] hover:bg-[#6b0013] text-white font-bold py-3.5 rounded-full text-xs transition-colors cursor-pointer disabled:opacity-50 shadow-md"
              >
                {loadingCheckout ? 'Đang tạo đơn hàng...' : `Đặt hàng ngay (${formatVND(finalTotal)})`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
