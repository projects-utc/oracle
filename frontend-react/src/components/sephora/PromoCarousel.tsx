import React, { useRef, useState } from 'react';
import { PromoOffer } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { ChevronLeft, ChevronRight, CloseIcon } from './icons';

export function PromoCarousel({ offers }: { offers?: PromoOffer[] }) {
  const { addToast } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedOffer, setSelectedOffer] = useState<PromoOffer | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast(`Đã sao chép mã ${code} vào bộ nhớ tạm!`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!offers || offers.length === 0) return null;

  return (
    <section className="w-full my-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black">Beauty Offers</h2>
            <p className="text-xs text-gray-500 mt-0.5">Quà tặng kèm theo nhãn hàng và ưu đãi giảm giá độc quyền</p>
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
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="flex flex-col w-[260px] sm:w-[280px] shrink-0 bg-white rounded-xl border border-gray-200 p-4 justify-between transition-all hover:border-black hover:shadow-md"
              >
                <div>
                  <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-50 mb-3">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-sm text-black line-clamp-1 mb-1">{offer.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">{offer.description}</p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                  {offer.code && (
                    <div className="flex items-center justify-between bg-neutral-100 px-3 py-1.5 rounded-lg text-xs">
                      <span className="font-mono font-bold text-black">{offer.code}</span>
                      <button
                        onClick={() => copyCode(offer.code!)}
                        className="text-[11px] font-bold text-[#810017] hover:underline cursor-pointer"
                      >
                        {copiedCode === offer.code ? 'Đã chép ✓' : 'Sao chép'}
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      onClick={() => setSelectedOffer(offer)}
                      className="text-gray-500 hover:text-black hover:underline cursor-pointer"
                    >
                      {offer.detailsActionLabel || 'Chi tiết'}
                    </button>
                    <span className="font-bold text-black">{offer.actionLabel || 'Áp dụng'} ▸</span>
                  </div>
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

        {/* Offer Details Modal */}
        {selectedOffer && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in" onClick={() => setSelectedOffer(null)}>
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedOffer(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black p-1">
                <CloseIcon className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-lg text-black mb-2">{selectedOffer.title}</h3>
              <p className="text-xs text-gray-700 leading-relaxed mb-4">{selectedOffer.description}</p>
              {selectedOffer.code && (
                <div className="bg-gray-100 p-3 rounded-xl flex items-center justify-between mb-4">
                  <span className="font-mono font-bold text-sm">{selectedOffer.code}</span>
                  <button onClick={() => copyCode(selectedOffer.code!)} className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {copiedCode === selectedOffer.code ? 'Đã sao chép ✓' : 'Sao chép mã'}
                  </button>
                </div>
              )}
              <div className="text-[11px] text-gray-400 leading-normal border-t border-gray-100 pt-3">
                {selectedOffer.legalCopy}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
