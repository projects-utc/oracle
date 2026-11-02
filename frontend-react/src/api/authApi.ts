import { apiFetch, ApiResponse, tokenStorage } from './httpClient';
import { User } from '../data';

export interface AuthData {
  token: string;
  tokenType: string;
  user: User;
}

export const authApi = {
  async register(payload: { username: string; password: string; fullName: string; email?: string; phone?: string }): Promise<ApiResponse<AuthData>> {
    const res = await apiFetch<AuthData>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (res.success && res.data?.token) {
      tokenStorage.set(res.data.token);
    }
    return res;
  },

  async login(payload: { username: string; password: string }): Promise<ApiResponse<AuthData>> {
    const res = await apiFetch<AuthData>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (res.success && res.data?.token) {
      tokenStorage.set(res.data.token);
    }
    return res;
  },

  async getMe(): Promise<ApiResponse<User>> {
    return apiFetch<User>('/api/private/users/me');
  },

  async updateStore(storeId: number): Promise<ApiResponse<User>> {
    return apiFetch<User>('/api/private/users/me/store', {
      method: 'PATCH',
      body: JSON.stringify({ storeId }),
    });
  },

  logout() {
    tokenStorage.remove();
  },
};
