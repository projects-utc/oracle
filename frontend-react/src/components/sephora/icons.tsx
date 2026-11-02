import React from "react";

export function SephoraLogo({ className = "h-4 w-auto text-black" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 125 17"
      fill="currentColor"
      aria-label="Sephora"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M8.94 1.645s-.05.142-.747 2.032c-1.992-1.586-5.33-1.47-5.33.97 0 2.861 6.972 2.502 6.755 7.61C9.445 16.36 4.395 17.302.5 15.326c.34-.723.694-1.42.936-1.99 2.945 1.741 5.481.943 5.898-.458C8.473 9.044.53 10.228.53 4.793c0-2.286 2.647-5.84 8.41-3.148ZM16.465 1.33h9.124s-.027.822-.01 1.991H18.75v4.082h4.844c-.017.814-.008 1.453-.008 1.873H18.75v5.088h6.83a104.28 104.28 0 0 0 0 1.954h-9.106L16.465 1.33ZM38.195 8.675c-.55 0-.958-.006-1.516-.009 0-2.796.005-5.41.005-5.41s.666-.003 1.295-.003c.602 0 4.106-.273 4.22 2.523.11 2.757-2.648 2.9-4.004 2.9Zm.136-7.316c-.81-.02-2.501-.029-3.945-.029l.005 14.988h2.296s-.007-2.861-.007-4.708c.559.006 1.157.012 1.638.012 4.093 0 6.643-1.895 6.474-5.26-.182-3.64-3.078-4.98-6.461-5.003ZM62.903 1.33v6.072H53.94V1.33h-2.288v14.988h2.288v-6.953h8.963v6.953h2.288V1.33H62.903ZM78.89 1.33c-4.838 0-8.818 3.394-8.818 8.784 0 5.46 3.99 8.855 8.818 8.855 4.838 0 8.818-3.395 8.818-8.855 0-5.39-3.98-8.784-8.818-8.784Zm0 1.968c3.55 0 6.48 2.768 6.48 6.816 0 4.119-2.93 6.887-6.48 6.887-3.55 0-6.48-2.768-6.48-6.887 0-4.048 2.93-6.816 6.48-6.816ZM102.66 8.675c-.55 0-.958-.006-1.516-.009 0-2.796.005-5.41.005-5.41s.666-.003 1.295-.003c.602 0 4.106-.273 4.22 2.523.11 2.757-2.648 2.9-4.004 2.9Zm5.352 7.643-4.52-6.52c2.261-.595 3.328-2.38 3.256-4.767-.107-3.518-2.883-4.992-6.6-4.992-1.34 0-2.87.01-3.693.03l-.005 14.988h2.296s-.007-2.861-.007-4.708c.559.006 1.157.012 1.638.012l3.896 5.957h3.739ZM120.375 1.33l-6.817 14.988h2.502l1.657-3.722h7.674l1.637 3.722h2.518L122.73 1.33h-2.355Zm1.218 2.457 3.039 6.837h-6.098l3.059-6.837Z"
      />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function AiBeautyIcon({ className = "w-5 h-5 text-fuchsia-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
        fill="url(#ai-grad)"
      />
      <circle cx="19" cy="19" r="2.5" fill="#ec4899" />
      <circle cx="6" cy="18" r="1.5" fill="#8b5cf6" />
      <defs>
        <linearGradient id="ai-grad" x1="4" y1="2" x2="20" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec4899" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function StoreIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M1.5 24a.5.5 0 01-.5-.5v-20a.5.5 0 01.5-.5h21a.5.5 0 01.5.5v20a.5.5 0 01-.5.5h-21zM22 23V4H2v19h20z" />
      <path d="M0 23h24v1H0z" />
      <path d="M7.5 24a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-9zm8.5-1v-9H8v9h8z" />
      <path d="M11.5 13h1v11h-1zM1 6V5h22v1zm0 2V7h22v1zm0 2V9h22v1z" />
    </svg>
  );
}

export function ServicesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
    </svg>
  );
}

export function HeartIcon({ className = "w-5 h-5", filled = false }: { className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "#000000" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1.6"}
      className={className}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function BasketIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function SparkleIcon({ className = "w-3 h-3 text-[#d6b672]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}

export function StarIcon({ fill = 1, className = "w-3.5 h-3.5 text-black" }: { fill?: number; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-black">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {fill > 0 && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${Math.round(fill * 100)}%` }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      )}
    </div>
  );
}

export function MobileHomeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.338 7.854v-.001l-9.516-6.404a1.494 1.494 0 0 0-1.676 0L1.661 7.842A1.5 1.5 0 0 0 1 9.085V22.5A1.5 1.5 0 0 0 2.5 24h6a1.5 1.5 0 0 0 1.5-1.5v-7a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v7a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V9.098c0-.5-.248-.966-.662-1.244Z" />
    </svg>
  );
}

export function MobileShopIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M4 6h16l-1 14H5L4 6z" />
      <path d="M8 6V4a4 4 0 0 1 8 0v2" />
    </svg>
  );
}

export function MobileOffersIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

export function MobileStoreIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function ChatIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function AppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export function SmsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function CreditCardIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

export function ChevronLeft({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ChevronRight({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function CloseIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
