import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storefrontApi } from '../../api/storefrontApi';
import { shoppingApi } from '../../api/shoppingApi';
import { PromoOffer, RewardItem } from '../../data';
import { useStore } from '../../contexts/StoreContext';

export default function OffersPage() {
  const { currentUser, addToast, refreshUserSession } = useStore();
  const [offers, setOffers] = useState<PromoOffer[]>([]);
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    storefrontApi.getPromotions().then((res) => {
      if (res.success && res.data) setOffers(res.data);
    });
    storefrontApi.getRewards().then((res) => {
      if (res.success && res.data) setRewards(res.data);
    });
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast(`Đã chép mã ${code} vào bộ nhớ tạm!`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRedeem = async (r: RewardItem) => {
    if (!currentUser) {
      addToast('Vui lòng đăng nhập để đổi quà Beauty Insider', 'info');
      return;
    }
    try {
      const res = await shoppingApi.redeemReward(r.id);
      if (res.success && res.data) {
        await refreshUserSession();
        addToast(`Đổi thành công phần quà "${r.name}"! Trừ ${res.data.pointsSpent} điểm.`, 'success');
      } else {
        addToast(res.message || 'Không thể đổi quà', 'error');
      }
    } catch {
      addToast('Lỗi kết nối khi đổi quà', 'error');
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8 font-sans">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-extrabold text-black tracking-tight">Khuyến mãi & Quà tặng đổi điểm</h1>
        <p className="text-xs text-gray-500 mt-1">Tổng hợp toàn bộ 23 mã khuyến mãi và 15 quà tặng Đổi điểm Beauty Insider</p>
      </div>

      {/* Offers Section */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-black mb-4">Mã ưu đãi & Quà tặng kèm đơn hàng</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col justify-between hover:border-black transition-all">
              <div>
                <img src={offer.image} alt={offer.title} className="w-full aspect-video object-cover rounded-lg mb-3" />
                <h3 className="font-bold text-sm text-black mb-1 line-clamp-1">{offer.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">{offer.description}</p>
              </div>

              {offer.code && (
                <div className="bg-gray-100 p-2.5 rounded-lg flex items-center justify-between text-xs mt-2">
                  <span className="font-mono font-bold text-black">{offer.code}</span>
                  <button
                    onClick={() => copyCode(offer.code!)}
                    className="font-bold text-[#810017] hover:underline cursor-pointer"
                  >
                    {copiedCode === offer.code ? 'Đã chép ✓' : 'Sao chép'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Bazaar Section */}
      <div>
        <h2 className="text-lg font-bold text-black mb-4">Kho Quà Đổi Điểm Beauty Insider</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {rewards.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-3.5 flex flex-col justify-between hover:border-black transition-all">
              <div>
                <img src={r.image} alt={r.name} className="w-full aspect-square object-contain p-2 bg-gray-50 rounded-lg mb-2" />
                <div className="text-[10px] font-bold text-gray-500 uppercase truncate">{r.brand}</div>
                <div className="text-xs font-semibold text-black line-clamp-2 mt-0.5">{r.name}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="font-extrabold text-xs text-[#810017]">{r.points}</span>
                <button
                  onClick={() => handleRedeem(r)}
                  className="bg-black text-white text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Đổi quà
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
