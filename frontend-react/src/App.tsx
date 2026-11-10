import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { StoreProvider } from './contexts/StoreContext';
import { Header, Footer, MobileBottomNav, ToastContainer } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { AiChatModal } from './components/sephora/AiChatModal';
import { AppRoutes } from './routers';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <div className="admin-app-shell">
        <AdminLayout>
          <AppRoutes />
        </AdminLayout>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="app-shell flex flex-col min-h-screen font-sans bg-white text-black selection:bg-neutral-900 selection:text-white">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <AppRoutes />
      </main>
      <Footer />
      <MobileBottomNav />
      <AiChatModal />
      <ToastContainer />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
