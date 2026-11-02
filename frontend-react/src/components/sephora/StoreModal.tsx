import React, { useState, useEffect } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { storefrontApi } from '../../api/storefrontApi';
import { StoreLocation } from '../../data';
import { StoreIcon, CloseIcon, SearchIcon } from './icons';

export function StoreModal() {
  const { showStoreModal, setShowStoreModal, selectedStore, selectStore } = useStore();
  const [zipQuery, setZipQuery] = useState('');
  const [stores, setStores] = useState<StoreLocation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showStoreModal) return;
    const timer = setTimeout(() => {
      setLoading(true);
      storefrontApi.getStores(zipQuery).then((res) => {
        if (res.success && res.data) {
          setStores(res.data);
        }
        setLoading(false);
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [showStoreModal, zipQuery]);

  if (!showStoreModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 font-sans" onClick={() => setShowStoreModal(false)}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-left relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShowStoreModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black p-1">
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <StoreIcon className="w-5 h-5 text-black" />
          <h2 className="font-bold text-lg text-black">Chọn Cửa hàng & Điểm nhận</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Tìm kiếm cửa hàng Sephora gần bạn nhất để nhận hàng ngay trong ngày hoặc tham gia sự kiện làm đẹp.
        </p>

        <div className="relative mb-4">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm theo mã ZIP (ví dụ: 10017, 90210), thành phố hoặc tên..."
            value={zipQuery}
            onChange={(e) => setZipQuery(e.target.value)}
            className="w-full bg-[#f2f2f2] focus:bg-white text-sm rounded-full pl-10 pr-4 py-2.5 outline-none border border-transparent focus:border-black transition-all"
          />
        </div>

        <div className="space-y-2.5 max-h-[340px] overflow-y-auto no-scrollbar">
          {loading ? (
            <div className="text-center py-8 text-xs text-gray-500">Đang tìm cửa hàng...</div>
          ) : stores.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">Không tìm thấy cửa hàng phù hợp với từ khóa "{zipQuery}"</div>
          ) : (
            stores.map((s) => {
              const isSelected = selectedStore?.id === s.id;
              return (
                <div key={s.id} className={`p-4 rounded-xl border transition-all flex items-center justify-between ${isSelected ? 'border-black bg-neutral-50 shadow-xs' : 'border-gray-200 hover:border-gray-400 bg-white'}`}>
                  <div>
                    <div className="font-bold text-sm text-black flex items-center gap-2">
                      <span>{s.name}</span>
                      <span className="text-[11px] font-normal text-gray-500">• {s.distance}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">{s.address}, {s.city}, {s.state} {s.zipCode}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">{s.hours}</div>
                  </div>
                  <button
                    onClick={() => selectStore(s)}
                    className={`text-xs font-bold px-4 py-2 rounded-full transition-colors ${isSelected ? 'bg-black text-white' : 'border border-black text-black hover:bg-black hover:text-white'}`}
                  >
                    {isSelected ? 'Đã chọn ✓' : 'Chọn cửa hàng'}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
