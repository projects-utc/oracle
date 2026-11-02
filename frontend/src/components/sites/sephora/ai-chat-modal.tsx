"use client";

import React, { useState } from "react";
import { AiBeautyIcon, CloseIcon } from "./icons";

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: "user" | "ai";
  text: string;
}

export function AiChatModal({ isOpen, onClose }: AiChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hi gorgeous! ✨ I'm your Sephora AI Beauty Advisor. Ask me anything about skincare routines, shade matching, holiday gift ideas, or trending makeup!",
    },
  ]);
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);

    // Simulated beauty advice
    setTimeout(() => {
      let reply = "Based on Sephora community favorites, I recommend checking out our top-rated ILIA Super Serum Skin Tint SPF 40 and Rare Beauty Soft Pinch Liquid Blush for a glowing, natural look!";
      if (userText.toLowerCase().includes("gift")) {
        reply = "For holiday gifts, our Sephora Favorites Fragrance Sampler Sets and $35 & Under Trending Gift kits are selling fastest right now!";
      } else if (userText.toLowerCase().includes("lip") || userText.toLowerCase().includes("mask")) {
        reply = "LANEIGE Lip Sleeping Mask is our #1 bestseller for deep lip hydration and plush shine!";
      } else if (userText.toLowerCase().includes("discount") || userText.toLowerCase().includes("sale") || userText.toLowerCase().includes("code")) {
        reply = "During the Sephora Savings Event, use promo code ALLONSALE at checkout to unlock up to 30% off Sephora Collection and tiered savings!";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in font-sans"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl max-w-lg w-full h-[520px] max-h-[85vh] flex flex-col relative shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white rounded-full shadow-xs">
              <AiBeautyIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-black flex items-center gap-1.5">
                <span>AI Beauty Chat</span>
                <span className="bg-black text-white text-[9px] px-1.5 py-0.2 rounded-full font-semibold">
                  BETA
                </span>
              </h3>
              <p className="text-[11px] text-gray-500">Powered by Sephora beauty intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-full"
            aria-label="Close chat"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fdfdfd]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] text-xs leading-relaxed p-3 rounded-2xl ${
                  m.sender === "user"
                    ? "bg-black text-white rounded-br-xs"
                    : "bg-gray-100 text-gray-900 rounded-bl-xs border border-gray-200/50"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={handleSend} className="p-3 border-t border-gray-100 bg-white flex gap-2">
          <input
            type="text"
            placeholder="Ask about shades, skincare, gifts..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-xs outline-none focus:border-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white text-xs font-bold rounded-full hover:bg-neutral-800 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
