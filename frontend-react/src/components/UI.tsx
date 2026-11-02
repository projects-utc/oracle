import React, { ReactNode } from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  onClick,
  type = 'button',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}) {
  const base = 'inline-flex items-center justify-center font-bold transition-all rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-xs px-5 py-2.5',
    lg: 'text-sm px-7 py-3',
  };
  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 shadow-xs',
    secondary: 'bg-neutral-100 text-black hover:bg-neutral-200',
    outline: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-black hover:bg-neutral-100',
    gold: 'bg-[#f6b834] text-black hover:bg-[#e5a825] shadow-xs',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  variant = 'neutral',
  className = '',
}: {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'rouge' | 'vib';
  className?: string;
}) {
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    rouge: 'bg-rose-900 text-rose-100 border-rose-800 font-bold',
    vib: 'bg-neutral-900 text-white border-black font-bold',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  badge,
  className = '',
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</span>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{value}</div>
        {badge}
      </div>
      {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
    </div>
  );
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150" onClick={onClose}>
      <div className={`bg-white rounded-2xl w-full ${maxWidth} p-6 relative shadow-2xl overflow-hidden`} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <h3 className="font-bold text-base text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-black p-1 text-lg">✕</button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
