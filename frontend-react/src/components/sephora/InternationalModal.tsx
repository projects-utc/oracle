import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import { CloseIcon } from './icons';

export function InternationalModal() {
  const { showInternationalModal, setShowInternationalModal } = useStore();

  if (!showInternationalModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in font-sans" onClick={() => setShowInternationalModal(false)}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShowInternationalModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black p-1">
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="text-3xl mb-3">🇺🇸 ⇌ 🇻🇳</div>
        <h3 className="font-bold text-lg text-black mb-2">Phạm vi giao hàng Quốc tế</h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-6">
          Trang web hiện đang cấu hình theo chuẩn trải nghiệm Sephora Storefront & Hệ thống quản trị với máy chủ Oracle Database tại Việt Nam.
        </p>

        <div className="space-y-2.5">
          <button
            onClick={() => setShowInternationalModal(false)}
            className="w-full bg-black text-white font-bold py-2.5 rounded-full text-xs hover:bg-neutral-800 transition-colors"
          >
            Tiếp tục mua sắm tại Sephora
          </button>
        </div>
      </div>
    </div>
  );
}
