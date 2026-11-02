export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
} as const;

export const ORDER_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  SHIPPING: 'SHIPPING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const LOYALTY_TIERS = {
  INSIDER: 'INSIDER',
  VIB: 'VIB',
  ROUGE: 'ROUGE',
} as const;

export function formatUSD(amount: number | string | null | undefined): string {
  if (amount == null) return '$0.00';
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]/g, '')) : amount;
  if (isNaN(num)) return '$0.00';
  return `$${num.toFixed(2)}`;
}

export function formatPoints(pts: number | null | undefined): string {
  if (pts == null) return '0 pts';
  return `${pts.toLocaleString('vi-VN')} pts`;
}
