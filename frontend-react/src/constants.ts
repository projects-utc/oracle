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

export const USD_TO_VND_RATE = 25000;

export function formatVND(amount: number | string | null | undefined): string {
  if (amount == null) return '0 ₫';
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]/g, '')) : amount;
  if (isNaN(num)) return '0 ₫';
  // If the number is a raw USD amount (e.g., <= 1000), convert to VND
  const vnd = num <= 1000 ? Math.round(num * USD_TO_VND_RATE) : Math.round(num);
  return `${vnd.toLocaleString('vi-VN')} ₫`;
}

// Deprecated alias for formatVND to ensure smooth backward compatibility across existing calls
export const formatUSD = formatVND;

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

export interface NavSubcategory {
  label: string;
  href: string;
}

export interface NavCategory {
  id: string;
  slug: string;
  label: string;
  hasSparkle?: boolean;
  subcategories: NavSubcategory[];
}

export const CORE_VIETNAMESE_CATEGORIES: NavCategory[] = [
  {
    id: 'cat-makeup',
    slug: 'makeup',
    label: 'Trang điểm',
    subcategories: [
      { label: 'Son môi & Dưỡng môi', href: '/shop/makeup' },
      { label: 'Kem nền & Cushion', href: '/shop/makeup' },
      { label: 'Phấn phủ & Kem lót', href: '/shop/makeup' },
      { label: 'Má hồng & Tạo khối', href: '/shop/makeup' },
      { label: 'Mascara & Kẻ mắt', href: '/shop/makeup' },
    ],
  },
  {
    id: 'cat-skincare',
    slug: 'skincare',
    label: 'Chăm sóc da',
    subcategories: [
      { label: 'Serum & Tinh chất', href: '/shop/skincare' },
      { label: 'Kem dưỡng ẩm', href: '/shop/skincare' },
      { label: 'Kem chống nắng', href: '/shop/skincare' },
      { label: 'Sữa rửa mặt & Tẩy trang', href: '/shop/skincare' },
      { label: 'Tẩy tế bào chết (BHA/AHA)', href: '/shop/skincare' },
    ],
  },
  {
    id: 'cat-fragrance',
    slug: 'fragrance',
    label: 'Nước hoa',
    subcategories: [
      { label: 'Nước hoa Nữ cao cấp', href: '/shop/fragrance' },
      { label: 'Nước hoa Nam lịch lãm', href: '/shop/fragrance' },
      { label: 'Nước hoa Unisex độc đáo', href: '/shop/fragrance' },
      { label: 'Xịt thơm Body Mist', href: '/shop/fragrance' },
    ],
  },
  {
    id: 'cat-hair',
    slug: 'hair',
    label: 'Chăm sóc tóc',
    subcategories: [
      { label: 'Dầu gội & Dầu xả', href: '/shop/hair' },
      { label: 'Mặt nạ & Dầu ủ tóc', href: '/shop/hair' },
      { label: 'Tinh dầu & Serum dưỡng tóc', href: '/shop/hair' },
      { label: 'Xịt dưỡng & Giữ nếp tóc', href: '/shop/hair' },
    ],
  },
  {
    id: 'cat-gifts',
    slug: 'gifts-value-sets',
    label: 'Bộ quà tặng',
    hasSparkle: true,
    subcategories: [
      { label: 'Set son môi mini', href: '/shop/gifts-value-sets' },
      { label: 'Combo chăm sóc da toàn diện', href: '/shop/gifts-value-sets' },
      { label: 'Set nước hoa du lịch', href: '/shop/gifts-value-sets' },
      { label: 'Hộp quà tặng sự kiện', href: '/shop/gifts-value-sets' },
    ],
  },
  {
    id: 'cat-offers',
    slug: 'offers',
    label: 'Khuyến mãi',
    hasSparkle: true,
    subcategories: [
      { label: 'Mã giảm giá độc quyền', href: '/offers' },
      { label: 'Quà tặng kèm theo nhãn hàng', href: '/offers' },
      { label: 'Sản phẩm giảm giá đặc biệt', href: '/offers' },
    ],
  },
];
