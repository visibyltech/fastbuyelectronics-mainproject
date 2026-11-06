/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SaveToBuyDashboard } from './components/SaveToBuyDashboard';
import { OrderTrackingView } from './components/OrderTrackingModal';
import { BNPLDashboard } from './components/BNPLDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'store' && (
          <>
            <CategoryNav />
            <HeroBanner />
            <ProductGrid />
          </>
        )}

        {currentView === 'save_to_buy_dashboard' && <SaveToBuyDashboard />}

        {currentView === 'order_tracking' && <OrderTrackingView />}

        {currentView === 'bnpl_dashboard' && <BNPLDashboard />}

        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Persistent Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />

      {/* Floating Elements */}
      <FloatingWhatsAppButton />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
