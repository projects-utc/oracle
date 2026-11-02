"use client";

import React, { useState } from "react";
import { CloseIcon, StoreIcon, SearchIcon } from "./icons";

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStore: string;
  onSelectStore: (store: string) => void;
}

const mockStores = [
  { name: "Sephora 5th Avenue", address: "597 5th Ave, New York, NY 10017", distance: "0.4 mi", hours: "Open until 8:00 PM" },
  { name: "Sephora Times Square", address: "1500 Broadway, New York, NY 10036", distance: "0.8 mi", hours: "Open until 9:00 PM" },
  { name: "Sephora Meatpacking District", address: "21-27 9th Ave, New York, NY 10014", distance: "1.7 mi", hours: "Open until 8:00 PM" },
  { name: "Sephora SoHo", address: "555 Broadway, New York, NY 10012", distance: "2.1 mi", hours: "Open until 8:00 PM" },
];

export function StoreModal({ isOpen, onClose, selectedStore, onSelectStore }: StoreModalProps) {
  const [zipQuery, setZipQuery] = useState("");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 font-sans"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-lg w-full p-6 text-left relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-full"
          aria-label="Close modal"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <StoreIcon className="w-5 h-5 text-black" />
          <h2 className="text-lg font-bold text-black">Choose Your Store</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          See product availability, in-store pickup options, and store events.
        </p>

        {/* Search by ZIP */}
        <div className="relative mb-4">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Enter ZIP code or City, State"
            value={zipQuery}
            onChange={(e) => setZipQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-full text-xs outline-none focus:border-black"
          />
        </div>

        {/* Stores list */}
        <div className="space-y-2.5 max-h-[300px] overflow-y-auto no-scrollbar">
          {mockStores.map((store, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border text-xs flex items-center justify-between transition-all ${
                selectedStore === store.name
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div>
                <div className="font-bold text-black">{store.name}</div>
                <div className="text-gray-500 text-[11px]">{store.address}</div>
                <div className="text-[11px] text-green-700 font-medium mt-0.5">
                  {store.hours} • {store.distance}
                </div>
              </div>
              <button
                onClick={() => {
                  onSelectStore(store.name);
                  onClose();
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedStore === store.name
                    ? "bg-black text-white"
                    : "bg-white border border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                {selectedStore === store.name ? "Selected ✓" : "Select Store"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
