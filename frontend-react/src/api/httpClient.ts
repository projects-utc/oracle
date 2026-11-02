export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

const TOKEN_KEY = 'sephora_jwt_token';

export const tokenStorage = {
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  remove() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = tokenStorage.get();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const json = await response.json().catch(() => ({
    success: false,
    message: 'Không thể phân tích dữ liệu phản hồi từ máy chủ',
    data: null as unknown as T,
  }));

  if (!response.ok) {
    return {
      success: false,
      message: json.message || `Lỗi yêu cầu: HTTP ${response.status}`,
      data: json.data,
    };
  }

  return json;
}
