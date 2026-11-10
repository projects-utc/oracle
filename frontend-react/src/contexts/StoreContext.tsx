import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { authApi } from '../api/authApi';
import { storefrontApi } from '../api/storefrontApi';
import { shoppingApi } from '../api/shoppingApi';
import { CartItem, HomeStorefrontData, Product, StoreLocation, User } from '../data';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

const GUEST_CART_KEY = 'sephora_guest_cart';

export interface StoreContextType {
  currentUser: User | null;
  login: (username: string, password?: string) => Promise<{ success: boolean; message?: string; user?: User }>;
  register: (payload: { username: string; password: string; fullName: string; email?: string; phone?: string }) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => void;
  homeData: HomeStorefrontData | null;
  loadingHome: boolean;
  refreshHome: () => Promise<void>;
  refreshUserSession: () => Promise<void>;
  lovedSkuIds: Set<string>;
  favorites: Product[];
  toggleLove: (skuId: string) => Promise<void>;
  cartItems: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateCartQty: (skuId: string, quantity: number) => Promise<void>;
  removeCartItem: (skuId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  selectedStore: StoreLocation | null;
  selectStore: (store: StoreLocation) => void;
  showStoreModal: boolean;
  setShowStoreModal: (show: boolean) => void;
  showAiChatModal: boolean;
  setShowAiChatModal: (show: boolean) => void;
  showInternationalModal: boolean;
  setShowInternationalModal: (show: boolean) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'info' | 'success' | 'warn' | 'error', duration?: number) => void;
  removeToast: (id: number) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [homeData, setHomeData] = useState<HomeStorefrontData | null>(null);
  const [loadingHome, setLoadingHome] = useState(true);
  const [lovedSkuIds, setLovedSkuIds] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showAiChatModal, setShowAiChatModal] = useState(false);
  const [showInternationalModal, setShowInternationalModal] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'info' | 'success' | 'warn' | 'error' = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const refreshHome = useCallback(async () => {
    setLoadingHome(true);
    try {
      const res = await storefrontApi.getHome();
      if (res.success && res.data) {
        setHomeData(res.data);
      } else {
        addToast(res.message || 'Không thể tải dữ liệu trang chủ', 'error');
      }
    } catch {
      addToast('Không thể kết nối đến máy chủ backend', 'error');
    } finally {
      setLoadingHome(false);
    }
  }, [addToast]);

  const refreshUserSession = useCallback(async () => {
    try {
      const meRes = await authApi.getMe();
      if (meRes.success && meRes.data) {
        setCurrentUser(meRes.data);
      }
      const [favRes, cartRes] = await Promise.all([
        shoppingApi.getFavorites(),
        shoppingApi.getCart(),
      ]);
      if (favRes.success && favRes.data) {
        setFavorites(favRes.data);
        setLovedSkuIds(new Set(favRes.data.map((p) => p.skuId)));
      }
      if (cartRes.success && cartRes.data) {
        setCartItems(cartRes.data.items || []);
      } else {
        setCartItems([]);
      }
    } catch {
      // not logged in
    }
  }, []);

  const loadUserData = refreshUserSession;

  // Initial mount: load home data & check auth session
  useEffect(() => {
    refreshHome();
    authApi.getMe().then((res) => {
      if (res.success && res.data) {
        setCurrentUser(res.data);
        loadUserData();
      } else {
        // Load guest cart from localStorage
        try {
          const savedGuestCart = localStorage.getItem(GUEST_CART_KEY);
          if (savedGuestCart) {
            setCartItems(JSON.parse(savedGuestCart));
          }
        } catch {}
      }
    });

    // Default store
    storefrontApi.getStores().then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setSelectedStore(res.data[0]);
      }
    });
  }, [refreshHome, loadUserData]);

  const login = useCallback(
    async (username: string, password = '') => {
      const res = await authApi.login({ username, password });
      if (res.success && res.data?.user) {
        const u = res.data.user;
        setCurrentUser(u);
        addToast(`Chào mừng bạn trở lại, ${u.fullName}! ✨`, 'success');

        // Sync guest cart to backend
        try {
          const guestCartRaw = localStorage.getItem(GUEST_CART_KEY);
          if (guestCartRaw) {
            const guestItems: CartItem[] = JSON.parse(guestCartRaw);
            const syncPayload = guestItems.map((gi) => ({ skuId: gi.skuId, quantity: gi.quantity }));
            if (syncPayload.length > 0) {
              await shoppingApi.syncCart(syncPayload);
              localStorage.removeItem(GUEST_CART_KEY);
            }
          }
        } catch {}

        await loadUserData();
        return { success: true, user: u };
      }
      return { success: false, message: res.message || 'Đăng nhập không thành công' };
    },
    [addToast, loadUserData]
  );

  const register = useCallback(
    async (payload: { username: string; password: string; fullName: string; email?: string; phone?: string }) => {
      const res = await authApi.register(payload);
      if (res.success && res.data?.user) {
        const u = res.data.user;
        setCurrentUser(u);
        addToast(`Đăng ký tài khoản thành công! ✨`, 'success');
        await loadUserData();
        return { success: true, user: u };
      }
      return { success: false, message: res.message || 'Đăng ký không thành công' };
    },
    [addToast, loadUserData]
  );

  const logout = useCallback(() => {
    authApi.logout();
    setCurrentUser(null);
    setFavorites([]);
    setLovedSkuIds(new Set());
    setCartItems([]);
    addToast('Đã đăng xuất khỏi tài khoản', 'info');
  }, [addToast]);

  const toggleLove = useCallback(
    async (skuId: string) => {
      if (!currentUser) {
        // Guest love toggle in state
        setLovedSkuIds((prev) => {
          const next = new Set(prev);
          if (next.has(skuId)) next.delete(skuId);
          else next.add(skuId);
          return next;
        });
        addToast('Đã cập nhật mục yêu thích', 'info');
        return;
      }
      try {
        const res = await shoppingApi.toggleFavorite(skuId);
        if (res.success && res.data) {
          setLovedSkuIds((prev) => {
            const next = new Set(prev);
            if (res.data.loved) next.add(skuId);
            else next.delete(skuId);
            return next;
          });
          const favListRes = await shoppingApi.getFavorites();
          if (favListRes.success && favListRes.data) {
            setFavorites(favListRes.data);
          }
          addToast(res.data.loved ? 'Đã thêm vào mục yêu thích ❤️' : 'Đã xóa khỏi mục yêu thích', 'info');
        }
      } catch {
        addToast('Không thể cập nhật danh sách yêu thích', 'error');
      }
    },
    [currentUser, addToast]
  );

  const addToCart = useCallback(
    async (product: Product, quantity = 1) => {
      if (!currentUser) {
        // Guest cart in localStorage
        setCartItems((prev) => {
          const existing = prev.find((i) => i.skuId === product.skuId);
          let next: CartItem[];
          if (existing) {
            next = prev.map((i) => (i.skuId === product.skuId ? { ...i, quantity: i.quantity + quantity, lineTotal: (i.quantity + quantity) * product.priceValue } : i));
          } else {
            next = [...prev, { id: Date.now(), skuId: product.skuId, product, quantity, lineTotal: quantity * product.priceValue }];
          }
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(next));
          return next;
        });
        addToast(`Đã thêm ${product.name} vào giỏ hàng ✓`, 'success');
        return;
      }

      try {
        const res = await shoppingApi.addToCart(product.skuId, quantity);
        if (res.success && res.data) {
          setCartItems(res.data.items || []);
          addToast(`Đã thêm ${product.name} vào giỏ hàng ✓`, 'success');
        } else {
          addToast(res.message || 'Không thể thêm vào giỏ hàng', 'error');
        }
      } catch {
        addToast('Lỗi kết nối khi thêm vào giỏ hàng', 'error');
      }
    },
    [currentUser, addToast]
  );

  const updateCartQty = useCallback(
    async (skuId: string, quantity: number) => {
      if (!currentUser) {
        setCartItems((prev) => {
          let next: CartItem[];
          if (quantity <= 0) {
            next = prev.filter((i) => i.skuId !== skuId);
          } else {
            next = prev.map((i) => (i.skuId === skuId ? { ...i, quantity, lineTotal: quantity * i.product.priceValue } : i));
          }
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(next));
          return next;
        });
        return;
      }

      try {
        const res = await shoppingApi.updateCartItem(skuId, quantity);
        if (res.success && res.data) {
          setCartItems(res.data.items || []);
        }
      } catch {}
    },
    [currentUser]
  );

  const removeCartItem = useCallback(
    async (skuId: string) => {
      if (!currentUser) {
        setCartItems((prev) => {
          const next = prev.filter((i) => i.skuId !== skuId);
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(next));
          return next;
        });
        addToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
        return;
      }

      try {
        const res = await shoppingApi.removeCartItem(skuId);
        if (res.success && res.data) {
          setCartItems(res.data.items || []);
          addToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
        }
      } catch {}
    },
    [currentUser, addToast]
  );

  const clearCart = useCallback(async () => {
    if (!currentUser) {
      setCartItems([]);
      localStorage.removeItem(GUEST_CART_KEY);
      return;
    }
    try {
      const res = await shoppingApi.clearCart();
      if (res.success && res.data) {
        setCartItems(res.data.items || []);
      }
    } catch {}
  }, [currentUser]);

  const selectStore = useCallback((store: StoreLocation) => {
    setSelectedStore(store);
    setShowStoreModal(false);
    if (currentUser) {
      authApi.updateStore(store.id);
    }
    addToast(`Đã chọn cửa hàng: ${store.name}`, 'info');
  }, [currentUser, addToast]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.lineTotal || item.quantity * (item.product?.priceValue || 0)), 0);

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        homeData,
        loadingHome,
        refreshHome,
        lovedSkuIds,
        favorites,
        toggleLove,
        cartItems,
        cartCount,
        cartSubtotal,
        addToCart,
        updateCartQty,
        removeCartItem,
        clearCart,
        selectedStore,
        selectStore,
        showStoreModal,
        setShowStoreModal,
        showAiChatModal,
        setShowAiChatModal,
        showInternationalModal,
        setShowInternationalModal,
        toasts,
        addToast,
        removeToast,
        refreshUserSession,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
