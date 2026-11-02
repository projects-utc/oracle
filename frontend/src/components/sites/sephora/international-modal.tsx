"use client";

import React from "react";
import Link from "next/link";
import { CloseIcon } from "./icons";

interface InternationalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InternationalModal({ isOpen, onClose }: InternationalModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full p-8 text-center relative shadow-2xl font-sans"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-full transition-colors"
          aria-label="Close modal"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Content */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-black leading-snug mb-3">
          Looks like you are trying to access{" "}
          <span className="text-[#0056b3]">Sephora.com</span> (USA & Canada) from another country.
        </h2>

        <p className="text-sm text-gray-700 leading-normal mb-6">
          This site does not ship to your country.
        </p>

        {/* Primary Action Button */}
        <div className="mb-4">
          <Link
            href="https://www.sephora.com/international"
            className="w-full inline-block py-3 px-6 bg-[#cf112c] hover:bg-[#b00f25] text-white font-bold text-sm rounded-full transition-colors shadow-sm"
          >
            View Sephora International Websites
          </Link>
        </div>

        {/* Secondary Action */}
        <div>
          <button
            onClick={onClose}
            className="text-xs text-gray-600 hover:text-black underline font-medium py-1 transition-colors"
          >
            Continue to Sephora.com
          </button>
        </div>
      </div>
    </div>
  );
}
