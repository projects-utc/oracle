// TypeScript domain interfaces for Sephora E-Commerce Storefront & Admin
// ZERO static mock data arrays — all data is loaded from Spring Boot + Oracle DB.

export interface User {
  id: number;
  username: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  role: 'CUSTOMER' | 'ADMIN';
  status: 'ACTIVE' | 'LOCKED';
  loyaltyTier: 'INSIDER' | 'VIB' | 'ROUGE';
  pointsBalance: number;
  preferredStoreId?: number | null;
}

export interface Subcategory {
  label: string;
  slug: string;
  href: string;
}

export interface Category {
  id: string;
  slug: string;
  label: string;
  hasSparkle: boolean;
  subcategories: Subcategory[];
}

export interface Product {
  dbId: number;
  id: string; // productCode (e.g. "P455418")
  skuId: string; // unique SKU (e.g. "2333607")
  brand: string;
  name: string;
  categorySlug: string;
  price: string; // e.g. "$48.00"
  priceValue: number;
  variation?: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  url: string;
  stockQty: number;
  collections?: string[];
}

export interface ProductDetail {
  product: Product;
  relatedProducts: Product[];
}

export interface HeroBanner {
  id: string;
  bgColor: string;
  textColor: string;
  image: string;
  alt?: string;
  title: string;
  subtitle?: string;
  cta: string;
  targetUrl: string;
}

export interface SavingsTier {
  label: string;
  discount: string;
  dates: string;
  badgeColor: string;
  textColor: string;
}

export interface SavingsBannerData {
  bgColor: string;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  tiers: SavingsTier[];
}

export interface PromoOffer {
  dbId?: number;
  id: string;
  title: string;
  description: string;
  code?: string;
  discountPercent?: number;
  minOrderAmount?: number;
  legalCopy: string;
  actionLabel: string;
  detailsActionLabel: string;
  image: string;
}

export interface FeatureTile {
  id: string;
  bgColor: string;
  textColor: string;
  title: string;
  subtitle?: string;
  cta: string;
  image: string;
  targetUrl: string;
}

export interface RewardItem {
  dbId?: number;
  id: string;
  brand: string;
  name: string;
  points: string;
  pointsCost: number;
  image: string;
  url: string;
  stockQty: number;
}

export interface GuidanceLink {
  label: string;
  slug: string;
  iconColor: string;
}

export interface ReassuranceBanner {
  id: string;
  bgColor: string;
  title: string;
  subtitle?: string;
  cta: string;
  image: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface StoreLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  state?: string;
  stateCode?: string;
  zipCode: string;
  distance?: string;
  distanceLabel?: string;
  hours?: string;
  hoursLabel?: string;
}

export interface CartItem {
  id: number;
  skuId: string;
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface CartResponse {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
}

export interface OrderItem {
  id: number;
  skuId: string;
  productName: string;
  brand: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  id: number;
  orderCode: string;
  orderStatus: 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  promoCode?: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  fulfillmentStore?: string;
  pointsEarned: number;
  createdAt: string;
  items: OrderItem[];
}

export interface RewardRedemption {
  id: number;
  rewardCode: string;
  brand: string;
  name: string;
  imageUrl: string;
  pointsSpent: number;
  createdAt: string;
}

export interface AuditLog {
  id: number;
  actorUserId?: number;
  actorUsername: string;
  actionType: string;
  targetType: string;
  targetId?: string;
  detailText?: string;
  createdAt: string;
}

export interface HomeStorefrontData {
  categories: Category[];
  heroBanners: HeroBanner[];
  chosenForYou: Product[];
  justDropped: Product[];
  sellingFast: Product[];
  savingsBanner: SavingsBannerData | null;
  beautyOffers: PromoOffer[];
  featureTiles: FeatureTile[];
  rewards: RewardItem[];
  guidanceLinks: GuidanceLink[];
  reassuranceBanners: ReassuranceBanner[];
  footerColumns: FooterColumn[];
}
