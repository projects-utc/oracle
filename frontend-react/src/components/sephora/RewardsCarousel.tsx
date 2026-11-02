import React, { useRef } from 'react';
import { RewardItem } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { shoppingApi } from '../../api/shoppingApi';
import { ChevronLeft, ChevronRight } from './icons';

export function RewardsCarousel({ rewards }: { rewards?: RewardItem[] }) {
  const { currentUser, addToast, refreshUserSession } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
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

  if (!rewards || rewards.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black">Beauty Insider Rewards Bazaar</h2>
            <p className="text-xs text-gray-500 mt-0.5">Dùng điểm tích lũy của bạn để đổi các món quà mini cao cấp</p>
          </div>
        </div>

        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-black" />
          </button>

          <div ref={scrollRef} className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="flex flex-col w-[170px] sm:w-[200px] shrink-0 bg-white rounded-xl border border-gray-200 p-3.5 justify-between transition-all hover:border-black"
              >
                <div>
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50 mb-2 p-2">
                    <img src={reward.image} alt={reward.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 truncate">{reward.brand}</div>
                  <div className="text-xs font-semibold text-black line-clamp-2 mt-0.5">{reward.name}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-extrabold text-xs text-[#810017]">{reward.points}</span>
                  <button
                    onClick={() => handleRedeem(reward)}
                    className="text-[11px] font-bold bg-black text-white px-3 py-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Đổi quà
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
