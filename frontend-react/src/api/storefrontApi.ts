import { apiFetch, ApiResponse } from './httpClient';
import { HomeStorefrontData, Product, ProductDetail, PromoOffer, RewardItem, StoreLocation } from '../data';

export const storefrontApi = {
  async getHome(): Promise<ApiResponse<HomeStorefrontData>> {
    return apiFetch<HomeStorefrontData>('/api/public/storefront/home');
  },

  async getProducts(params: { q?: string; category?: string; collection?: string; brand?: string; sort?: string } = {}): Promise<ApiResponse<Product[]>> {
    const search = new URLSearchParams();
    if (params.q) search.set('q', params.q);
    if (params.category) search.set('category', params.category);
    if (params.collection) search.set('collection', params.collection);
    if (params.brand) search.set('brand', params.brand);
    if (params.sort) search.set('sort', params.sort);
    const qs = search.toString();
    return apiFetch<Product[]>(`/api/public/products${qs ? `?${qs}` : ''}`);
  },

  async getProductDetail(skuId: string): Promise<ApiResponse<ProductDetail>> {
    return apiFetch<ProductDetail>(`/api/public/products/${encodeURIComponent(skuId)}`);
  },

  async getPromotions(): Promise<ApiResponse<PromoOffer[]>> {
    return apiFetch<PromoOffer[]>('/api/public/promotions');
  },

  async validatePromo(code: string, subtotal: number): Promise<ApiResponse<{
    code: string;
    discountPercent: number;
    discountAmount: number;
    finalTotal: number;
    title: string;
  }>> {
    return apiFetch('/api/public/promotions/validate', {
      method: 'POST',
      body: JSON.stringify({ code, subtotal }),
    });
  },

  async getRewards(): Promise<ApiResponse<RewardItem[]>> {
    return apiFetch<RewardItem[]>('/api/public/rewards');
  },

  async getStores(q?: string): Promise<ApiResponse<StoreLocation[]>> {
    return apiFetch<StoreLocation[]>(`/api/public/stores${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  },

  async subscribe(channelType: 'EMAIL' | 'SMS', contactValue: string): Promise<ApiResponse<{
    channelType: string;
    contactValue: string;
    alreadySubscribed: boolean;
  }>> {
    return apiFetch('/api/public/subscriptions', {
      method: 'POST',
      body: JSON.stringify({ channelType, contactValue }),
    });
  },

  async aiChat(sessionKey: string, message: string): Promise<ApiResponse<{
    reply: string;
    recommendedProducts: Product[];
  }>> {
    return apiFetch('/api/public/ai-chat', {
      method: 'POST',
      body: JSON.stringify({ sessionKey, message }),
    });
  },
};
