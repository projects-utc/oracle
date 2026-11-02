import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { storefrontApi } from '../../api/storefrontApi';
import { Product } from '../../data';
import { AiBeautyIcon, CloseIcon, SparkleIcon } from './icons';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  products?: Product[];
}

export function AiChatModal() {
  const { showAiChatModal, setShowAiChatModal, addToCart } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Chào bạn! ✨ Tôi là Trợ lý Làm đẹp AI của Sephora. Hãy hỏi tôi về chu trình dưỡng da, cách chọn tone nền, quà tặng lễ hội hoặc các ưu đãi giảm giá tốt nhất nhé!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!showAiChatModal) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const sessionKey = localStorage.getItem('sephora_ai_session') || `sess_${Date.now()}`;
      localStorage.setItem('sephora_ai_session', sessionKey);

      const res = await storefrontApi.aiChat(sessionKey, userText);
      if (res.success && res.data) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: res.data.reply,
            products: res.data.recommendedProducts,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Rất tiếc, tôi đang gặp gián đoạn kết nối. Bạn hãy thử lại sau ít giây nhé!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in font-sans" onClick={() => setShowAiChatModal(false)}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-lg w-full h-[85vh] sm:h-[620px] flex flex-col shadow-2xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-neutral-900 text-white px-5 py-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f6b834] text-black flex items-center justify-center">
              <AiBeautyIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-1.5">
                <span>Sephora AI Beauty Advisor</span>
                <span className="bg-[#810017] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">LIVE ORACLE</span>
              </div>
              <div className="text-[11px] text-gray-400">Tư vấn sản phẩm & ưu đãi trực tuyến 24/7</div>
            </div>
          </div>
          <button onClick={() => setShowAiChatModal(false)} className="text-gray-400 hover:text-white p-1">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Message stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${m.sender === 'user' ? 'bg-black text-white rounded-br-xs' : 'bg-white text-gray-900 border border-gray-200 rounded-bl-xs'}`}>
                {m.text}
              </div>

              {/* Recommended products card pills */}
              {m.products && m.products.length > 0 && (
                <div className="w-full mt-2 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <SparkleIcon className="w-3 h-3 text-[#f6b834]" /> Gợi ý sản phẩm từ Oracle:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {m.products.map((p) => (
                      <div key={p.skuId} className="bg-white rounded-xl p-2.5 border border-gray-200 flex items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={p.image} alt={p.name} className="w-12 h-12 object-contain rounded-md bg-gray-50 shrink-0" />
                          <div className="truncate">
                            <div className="text-[10px] font-bold text-gray-500 uppercase truncate">{p.brand}</div>
                            <div className="text-xs font-semibold text-gray-900 truncate">{p.name}</div>
                            <div className="text-xs font-bold text-black mt-0.5">{p.price}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(p)}
                          className="shrink-0 bg-black text-white hover:bg-neutral-800 text-[11px] font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                        >
                          Thêm +
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 italic py-2">
              <span className="animate-spin inline-block">✨</span> Trợ lý AI đang tra cứu dữ liệu Sephora...
            </div>
          )}
        </div>

        {/* Input form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Hỏi về quà tặng, dưỡng môi, kem chống nắng, mã giảm giá..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-100 focus:bg-white text-xs rounded-full px-4 py-2.5 outline-none border border-transparent focus:border-black transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-black text-white hover:bg-neutral-800 text-xs font-bold px-4 py-2.5 rounded-full disabled:opacity-40 transition-colors"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}
