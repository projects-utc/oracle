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
  if (pts == null) return '0 điểm';
  return `${pts.toLocaleString('vi-VN')} điểm`;
}

export function formatOrderStatus(status?: string): string {
  switch (status?.toUpperCase()) {
    case 'PENDING':
      return 'Chờ xác nhận';
    case 'CONFIRMED':
      return 'Đã xác nhận';
    case 'SHIPPING':
      return 'Đang giao hàng';
    case 'COMPLETED':
      return 'Giao thành công';
    case 'CANCELLED':
      return 'Đã hủy';
    default:
      return status || 'Chưa xác định';
  }
}

export function formatRole(role?: string): string {
  return role === 'ADMIN' ? 'Quản trị viên' : 'Khách hàng';
}

export function formatUserStatus(status?: string): string {
  return status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa';
}

export function formatBadge(badge?: string): string {
  if (!badge) return '';
  const upper = badge.toUpperCase();
  if (upper.includes('NEW')) return 'Mới';
  if (upper.includes('BEST') || upper.includes('SELLER')) return 'Bán chạy';
  if (upper.includes('LIMITED')) return 'Bản giới hạn';
  if (upper.includes('EXCLUSIVE')) return 'Độc quyền';
  if (upper.includes('SALE') || upper.includes('OFF')) return 'Ưu đãi';
  return badge;
}

export function formatCategorySlug(slug?: string): string {
  if (!slug) return 'Tất cả sản phẩm';
  const clean = slug.toLowerCase().trim();
  switch (clean) {
    case 'makeup':
      return 'Trang điểm';
    case 'skincare':
      return 'Chăm sóc da';
    case 'fragrance':
      return 'Nước hoa';
    case 'hair':
      return 'Chăm sóc tóc';
    case 'bath-body':
    case 'body':
      return 'Tắm & Chăm sóc cơ thể';
    case 'tools-brushes':
      return 'Dụng cụ & Cọ trang điểm';
    case 'clean-beauty':
      return 'Mỹ phẩm thuần chay';
    case 'mini-size':
      return 'Mỹ phẩm du lịch mini';
    case 'gifts-value-sets':
      return 'Bộ quà tặng & Combo ưu đãi';
    case 'new':
      return 'Sản phẩm mới về';
    case 'trending-on-social':
      return 'Thịnh hành nhất';
    default:
      return clean
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
  }
}
