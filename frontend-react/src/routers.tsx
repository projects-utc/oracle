import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages - Auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Pages - Guest / Storefront
import HomePage from './pages/guest/HomePage';
import SearchResultsPage from './pages/guest/SearchResultsPage';
import ProductDetailPage from './pages/guest/ProductDetailPage';
import BasketPage from './pages/guest/BasketPage';
import OrderSuccessPage from './pages/guest/OrderSuccessPage';
import MyOrdersPage from './pages/guest/MyOrdersPage';
import LovesPage from './pages/guest/LovesPage';
import OffersPage from './pages/guest/OffersPage';

// Pages - Admin
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* ── Client / Guest Routes ────────────────────────────────────────── */}
      <Route path="/" element={<HomePage />} />
      <Route path="/client" element={<HomePage />} />
      <Route path="/shop/:slug" element={<SearchResultsPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/product/:skuId" element={<ProductDetailPage />} />
      <Route path="/basket" element={<BasketPage />} />
      <Route path="/order-success/:code" element={<OrderSuccessPage />} />
      <Route path="/my-orders" element={<MyOrdersPage />} />
      <Route path="/loves" element={<LovesPage />} />
      <Route path="/offers" element={<OffersPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ── Admin Management Routes (/admin/*) ────────────────────────────── */}
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />
      <Route path="/admin/promotions" element={<Navigate to="/admin/products" replace />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/stores" element={<Navigate to="/admin/products" replace />} />
      <Route path="/admin/audit-logs" element={<Navigate to="/admin/users" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
