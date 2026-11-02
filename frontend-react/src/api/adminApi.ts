import { apiFetch, ApiResponse } from './httpClient';
import { AuditLog, Order, Product, PromoOffer, RewardItem, StoreLocation, User } from '../data';

export interface AdminDashboardData {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  totalCustomers: number;
  activePromotions: number;
  totalSubscriptions: number;
  recentOrders: Order[];
  recentAuditLogs: AuditLog[];
}

export const adminApi = {
  async getDashboard(): Promise<ApiResponse<AdminDashboardData>> {
    return apiFetch<AdminDashboardData>('/api/admin/dashboard');
  },

  // Products
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    return apiFetch<Product[]>('/api/admin/products');
  },

  async createProduct(payload: Partial<Product> & { collections?: string[] }): Promise<ApiResponse<Product>> {
    return apiFetch<Product>('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateProduct(id: number, payload: Partial<Product> & { collections?: string[] }): Promise<ApiResponse<Product>> {
    return apiFetch<Product>(`/api/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteProduct(id: number): Promise<ApiResponse<void>> {
    return apiFetch<void>(`/api/admin/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Promotions & Rewards
  async createPromotion(payload: Partial<PromoOffer>): Promise<ApiResponse<PromoOffer>> {
    return apiFetch<PromoOffer>('/api/admin/promotions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updatePromotion(id: number, payload: Partial<PromoOffer>): Promise<ApiResponse<PromoOffer>> {
    return apiFetch<PromoOffer>(`/api/admin/promotions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deletePromotion(id: number): Promise<ApiResponse<void>> {
    return apiFetch<void>(`/api/admin/promotions/${id}`, {
      method: 'DELETE',
    });
  },

  async createReward(payload: Partial<RewardItem>): Promise<ApiResponse<RewardItem>> {
    return apiFetch<RewardItem>('/api/admin/rewards', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateReward(id: number, payload: Partial<RewardItem>): Promise<ApiResponse<RewardItem>> {
    return apiFetch<RewardItem>(`/api/admin/rewards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteReward(id: number): Promise<ApiResponse<void>> {
    return apiFetch<void>(`/api/admin/rewards/${id}`, {
      method: 'DELETE',
    });
  },

  // Orders
  async getAllOrders(status?: string): Promise<ApiResponse<Order[]>> {
    return apiFetch<Order[]>(`/api/admin/orders${status ? `?status=${encodeURIComponent(status)}` : ''}`);
  },

  async updateOrderStatus(id: number, status: string): Promise<ApiResponse<Order>> {
    return apiFetch<Order>(`/api/admin/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Users
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return apiFetch<User[]>('/api/admin/users');
  },

  async updateUserStatus(id: number, status: string): Promise<ApiResponse<User>> {
    return apiFetch<User>(`/api/admin/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  async updateUserRole(id: number, role: string): Promise<ApiResponse<User>> {
    return apiFetch<User>(`/api/admin/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },

  async updateUserPoints(id: number, points: number): Promise<ApiResponse<User>> {
    return apiFetch<User>(`/api/admin/users/${id}/points`, {
      method: 'PATCH',
      body: JSON.stringify({ points }),
    });
  },

  // Stores & Subscriptions
  async getAllStores(): Promise<ApiResponse<StoreLocation[]>> {
    return apiFetch<StoreLocation[]>('/api/admin/stores');
  },

  async createStore(payload: Partial<StoreLocation>): Promise<ApiResponse<StoreLocation>> {
    return apiFetch<StoreLocation>('/api/admin/stores', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateStore(id: number, payload: Partial<StoreLocation>): Promise<ApiResponse<StoreLocation>> {
    return apiFetch<StoreLocation>(`/api/admin/stores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteStore(id: number): Promise<ApiResponse<void>> {
    return apiFetch<void>(`/api/admin/stores/${id}`, {
      method: 'DELETE',
    });
  },

  async getSubscriptions(): Promise<ApiResponse<Array<{ id: number; channelType: string; contactValue: string; createdAt: string }>>> {
    return apiFetch('/api/admin/subscriptions');
  },

  // Audit Logs
  async getAuditLogs(): Promise<ApiResponse<AuditLog[]>> {
    return apiFetch<AuditLog[]>('/api/admin/audit-logs');
  },
};
