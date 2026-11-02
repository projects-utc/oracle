import { apiFetch, ApiResponse } from './httpClient';
import { CartResponse, Order, Product, RewardRedemption } from '../data';

export const shoppingApi = {
  async getFavorites(): Promise<ApiResponse<Product[]>> {
    return apiFetch<Product[]>('/api/private/favorites');
  },

  async toggleFavorite(skuId: string): Promise<ApiResponse<{ skuId: string; loved: boolean; lovesCount: number }>> {
    return apiFetch(`/api/private/favorites/${encodeURIComponent(skuId)}/toggle`, {
      method: 'POST',
    });
  },

  async getCart(): Promise<ApiResponse<CartResponse>> {
    return apiFetch<CartResponse>('/api/private/cart');
  },

  async addToCart(skuId: string, quantity = 1): Promise<ApiResponse<CartResponse>> {
    return apiFetch<CartResponse>('/api/private/cart/items', {
      method: 'POST',
      body: JSON.stringify({ skuId, quantity }),
    });
  },

  async syncCart(items: Array<{ skuId: string; quantity: number }>): Promise<ApiResponse<CartResponse>> {
    return apiFetch<CartResponse>('/api/private/cart/sync', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  },

  async updateCartItem(skuId: string, quantity: number): Promise<ApiResponse<CartResponse>> {
    return apiFetch<CartResponse>(`/api/private/cart/items/${encodeURIComponent(skuId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
  },

  async removeCartItem(skuId: string): Promise<ApiResponse<CartResponse>> {
    return apiFetch<CartResponse>(`/api/private/cart/items/${encodeURIComponent(skuId)}`, {
      method: 'DELETE',
    });
  },

  async clearCart(): Promise<ApiResponse<CartResponse>> {
    return apiFetch<CartResponse>('/api/private/cart', {
      method: 'DELETE',
    });
  },

  async createOrder(payload: {
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    promoCode?: string;
    fulfillmentStore?: string;
  }): Promise<ApiResponse<Order>> {
    return apiFetch<Order>('/api/private/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async getMyOrders(): Promise<ApiResponse<Order[]>> {
    return apiFetch<Order[]>('/api/private/orders');
  },

  async getOrderByCode(orderCode: string): Promise<ApiResponse<Order>> {
    return apiFetch<Order>(`/api/private/orders/${encodeURIComponent(orderCode)}`);
  },

  async redeemReward(rewardCode: string): Promise<ApiResponse<{
    rewardCode: string;
    rewardName: string;
    pointsSpent: number;
    remainingPoints: number;
    redeemedAt: string;
  }>> {
    return apiFetch(`/api/private/rewards/${encodeURIComponent(rewardCode)}/redeem`, {
      method: 'POST',
    });
  },

  async getMyRedemptions(): Promise<ApiResponse<RewardRedemption[]>> {
    return apiFetch<RewardRedemption[]>('/api/private/rewards/redemptions');
  },
};
