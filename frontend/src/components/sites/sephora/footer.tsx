"use client";

import React, { useState } from "react";
import Link from "next/link";
import { footerColumnsData } from "./data";
import { StoreIcon, ChatIcon, AppIcon, SmsIcon, CreditCardIcon } from "./icons";

export function SephoraFooter() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      setTimeout(() => setEmailSubmitted(false), 3000);
      setEmail("");
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) {
      setPhoneSubmitted(true);
      setTimeout(() => setPhoneSubmitted(false), 3000);
      setPhone("");
    }
  };

  return (
    <footer className="w-full font-sans bg-black text-white">
      {/* 1. Website Feedback Strip */}
      <div className="bg-[#e6e6e6] text-black text-center py-2.5 px-4 text-xs font-semibold">
        <Link
          href="https://www.sephora.com/feedback"
          className="hover:underline transition-all inline-block"
        >
          Website feedback? Let us know ▸
        </Link>
      </div>

      {/* 2. Five Service Highlights Bar */}
      <div className="border-b border-neutral-800 py-6 px-4">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-xs text-left">
          {/* Find a Store */}
          <Link
            href="https://www.sephora.com/happening/stores/sephora-near-me"
            className="flex items-center gap-3 hover:text-gray-300 transition-colors group"
          >
            <StoreIcon className="w-6 h-6 text-white shrink-0 group-hover:scale-105 transition-transform" />
            <div>
              <div className="font-bold">Find a Store</div>
              <div className="text-[11px] text-gray-400">Choose Your Store</div>
            </div>
          </Link>

          {/* Customer Service Chat */}
          <Link
            href="https://www.sephora.com/beauty/customer-service"
            className="flex items-center gap-3 hover:text-gray-300 transition-colors group"
          >
            <ChatIcon className="w-6 h-6 text-white shrink-0 group-hover:scale-105 transition-transform" />
            <div>
              <div className="font-bold">Customer Service Chat</div>
              <div className="text-[11px] text-gray-400">Available 24/7</div>
            </div>
          </Link>

          {/* Get the App */}
          <Link
            href="https://www.sephora.com/beauty/mobile-app"
            className="flex items-center gap-3 hover:text-gray-300 transition-colors group"
          >
            <AppIcon className="w-6 h-6 text-white shrink-0 group-hover:scale-105 transition-transform" />
            <div>
              <div className="font-bold">Get the App</div>
              <div className="text-[11px] text-gray-400">Download Now</div>
            </div>
          </Link>

          {/* Get Sephora Texts */}
          <Link
            href="https://www.sephora.com/beauty/sms"
            className="flex items-center gap-3 hover:text-gray-300 transition-colors group"
          >
            <SmsIcon className="w-6 h-6 text-white shrink-0 group-hover:scale-105 transition-transform" />
            <div>
              <div className="font-bold">Get Sephora Texts</div>
              <div className="text-[11px] text-gray-400">Sign Up Now</div>
            </div>
          </Link>

          {/* Sephora Credit Card */}
          <Link
            href="https://www.sephora.com/beauty/creditcard"
            className="flex items-center gap-3 hover:text-gray-300 transition-colors group col-span-2 sm:col-span-1"
          >
            <CreditCardIcon className="w-6 h-6 text-white shrink-0 group-hover:scale-105 transition-transform" />
            <div>
              <div className="font-bold">Sephora Credit Card</div>
              <div className="text-[11px] text-gray-400">Want 25% off? DETAILS</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Main Link Columns & Newsletter */}
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {/* Column 1: About Sephora */}
          <div>
            <h3 className="font-bold text-sm text-white mb-4 tracking-tight">
              About Sephora
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {footerColumnsData[0]?.links?.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:underline hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: My Sephora */}
          <div>
            <h3 className="font-bold text-sm text-white mb-4 tracking-tight">
              My Sephora
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {footerColumnsData[1]?.links?.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:underline hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h3 className="font-bold text-sm text-white mb-4 tracking-tight">
              Help
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {footerColumnsData[2]?.links?.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:underline hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Region & Language + Sign Up */}
          <div>
            <h3 className="font-bold text-sm text-white mb-4 tracking-tight">
              Region & Language
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-300 mb-6">
              <span className="text-base">🇺🇸</span>
              <span className="font-semibold text-white">United States - English</span>
            </div>

            <div className="mb-6">
              <div className="font-serif italic text-lg sm:text-xl text-white font-normal leading-snug mb-1">
                We Belong to
              </div>
              <div className="font-serif italic text-lg sm:text-xl text-white font-normal leading-snug">
                Something Beautiful
              </div>
            </div>

            {/* Texts Sign Up */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Sign up for Sephora Texts
              </label>
              <form onSubmit={handlePhoneSubmit} className="flex gap-2">
                <input
                  type="tel"
                  placeholder="Mobile Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-white text-black px-3 py-2 rounded-xs text-xs outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-transparent border border-white text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-colors"
                >
                  {phoneSubmitted ? "Done!" : "Continue"}
                </button>
              </form>
            </div>

            {/* Email Sign Up */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Sign up for Sephora Emails
              </label>
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white text-black px-3 py-2 rounded-xs text-xs outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-transparent border border-white text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-colors"
                >
                  {emailSubmitted ? "Done!" : "Sign Up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Legal & Social Bar */}
      <div className="border-t border-neutral-800 py-6 px-4 text-xs text-gray-400">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <div>© 2026 Sephora USA, Inc. All rights reserved.</div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-[11px]">
              <Link href="https://www.sephora.com/beauty/privacy-policy" className="hover:underline">Privacy Policy</Link>
              <span>•</span>
              <Link href="https://www.sephora.com/beauty/terms-of-use" className="hover:underline">Terms of Use</Link>
              <span>•</span>
              <Link href="https://www.sephora.com/beauty/accessibility" className="hover:underline">Accessibility</Link>
              <span>•</span>
              <Link href="https://www.sephora.com/sitemap" className="hover:underline">Sitemap</Link>
              <span>•</span>
              <Link href="https://www.sephora.com/beauty/privacy-policy#your-privacy-choices" className="hover:underline">Your Privacy Choices</Link>
            </div>
            <div className="text-[11px] text-gray-500">
              1-877-737-4672 &nbsp;|&nbsp; TTY: 1-888-866-9845
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-white">
            <Link href="https://www.instagram.com/sephora" aria-label="Instagram" className="hover:opacity-75">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
            <Link href="https://www.facebook.com/sephora" aria-label="Facebook" className="hover:opacity-75">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link href="https://twitter.com/sephora" aria-label="X (Twitter)" className="hover:opacity-75">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link href="https://www.youtube.com/sephora" aria-label="YouTube" className="hover:opacity-75">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
            <Link href="https://www.pinterest.com/sephora" aria-label="Pinterest" className="hover:opacity-75">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.94-.13-2.39.03-3.42.14-.94.94-3.99.94-3.99s-.24-.48-.24-1.19c0-1.12.65-1.95 1.46-1.95.69 0 1.02.52 1.02 1.14 0 .69-.44 1.73-.67 2.69-.19.81.41 1.47 1.21 1.47 1.45 0 2.57-1.53 2.57-3.74 0-1.96-1.41-3.32-3.41-3.32-2.32 0-3.69 1.74-3.69 3.54 0 .7.27 1.45.61 1.86.07.08.08.15.06.24-.06.27-.21.85-.24.96-.04.16-.13.2-.3.12-1.12-.52-1.82-2.15-1.82-3.46 0-2.82 2.05-5.41 5.91-5.41 3.1 0 5.51 2.21 5.51 5.16 0 3.08-1.94 5.56-4.64 5.56-.91 0-1.76-.47-2.05-1.03l-.56 2.13c-.2.78-.75 1.76-1.12 2.36A12 12 0 1 0 12 0z" />
              </svg>
            </Link>
            <Link href="https://www.tiktok.com/@sephora" aria-label="TikTok" className="hover:opacity-75">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
