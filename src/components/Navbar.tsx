import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ShieldCheck,
  Package,
  PiggyBank,
  PhoneCall,
  Menu,
  X,
  CreditCard,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STORE_INFO } from '../data/mockData';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    setIsCartOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Top Notification Bar - Alaba Location & WhatsApp */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 border-b border-sky-900/40 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold uppercase tracking-wider text-[11px]">Showroom:</span>
            <span className="truncate">{STORE_INFO.address}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="tel:07013990666"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-300"
            >
              <PhoneCall className="w-3 h-3 text-cyan-400" />
              <span>07013990666</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-cyan-400 font-medium hidden sm:inline">Save To Buy Available (30% Deposit)</span>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Bar (Strict 3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-1 sm:gap-6">
        {/* Zone 1: Brand Wordmark & Official Logo */}
        <div
          onClick={() => {
            setCurrentView('store');
            setSelectedCategory('ALL');
            setSelectedCondition('ALL');
          }}
          className="flex min-w-0 items-center gap-2 sm:gap-3 cursor-pointer group shrink"
        >
          <img
            src={STORE_INFO.logoUrl}
            alt="FASTBUY ELECTRONICS Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-cyan-500/50 group-hover:ring-cyan-400 transition-all shadow-lg shadow-cyan-950/50 shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-[13px] min-[390px]:text-[15px] sm:text-xl tracking-tight text-white flex items-center gap-0.5 whitespace-nowrap">
              FASTBUY
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                ELECTRONICS
              </span>
            </span>
            <span className="text-[8px] sm:text-[10px] text-slate-400 tracking-wider font-mono uppercase">
              Alaba Int'l Market Lagos
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300 whitespace-nowrap shrink-0">
          <button
            onClick={() => {
              setCurrentView('store');
              setSelectedCategory('ALL');
              setSelectedCondition('ALL');
            }}
            className={`transition-colors hover:text-cyan-400 ${
              currentView === 'store' && selectedCondition === 'ALL'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            All Products
          </button>

          <button
            onClick={() => {
              setCurrentView('store');
              setSelectedCondition('BRAND NEW');
            }}
            className={`transition-colors hover:text-cyan-400 ${
              currentView === 'store' && selectedCondition === 'BRAND NEW'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            Brand New
          </button>

          <button
            onClick={() => {
              setCurrentView('store');
              setSelectedCondition('UK USED');
            }}
            className={`transition-colors hover:text-cyan-400 ${
              currentView === 'store' && selectedCondition === 'UK USED'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            UK Used Deals
          </button>

          <button
            onClick={() => setCurrentView('save_to_buy_dashboard')}
            className={`flex items-center gap-1.5 transition-colors hover:text-cyan-400 ${
              currentView === 'save_to_buy_dashboard'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            <PiggyBank className="w-4 h-4 text-cyan-400" />
            <span>Save To Buy</span>
          </button>

          <button
            onClick={() => setCurrentView('order_tracking')}
            className={`flex items-center gap-1.5 transition-colors hover:text-cyan-400 ${
              currentView === 'order_tracking'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            <Package className="w-4 h-4 text-cyan-400" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => setCurrentView('bnpl_dashboard')}
            className={`flex items-center gap-1.5 transition-colors hover:text-cyan-400 ${
              currentView === 'bnpl_dashboard'
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-300'
            }`}
          >
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <span>BNPL Pay Later</span>
          </button>
        </nav>

        {/* Zone 3: Search, Wishlist, Cart & Admin Action */}
        <div className="flex items-center gap-0.5 sm:gap-3 shrink-0">
          {/* Desktop Search Input */}
          <div className="hidden md:flex items-center relative w-56 xl:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'store') setCurrentView('store');
              }}
              placeholder="Search TV, AC, Generator..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-xs text-slate-500 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* Mobile search toggle */}
          <button
            onClick={() => setShowSearchMobile(!showSearchMobile)}
            className="md:hidden p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist button */}
          <button
            onClick={() => {
              setCurrentView('store');
              // Could also scroll or filter by wishlist
            }}
            title="Wishlist"
            className="relative p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-mono text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-2 sm:px-3.5 py-2 rounded-lg text-xs font-semibold shadow-lg shadow-cyan-900/30 transition-all hover:shadow-cyan-700/40 shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-slate-950 font-mono text-[11px] font-bold px-1.5 py-0.2 rounded-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Switch */}
          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
            className={`p-2 rounded-lg text-xs transition-colors flex items-center gap-1 border ${
              currentView === 'admin'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
            title="Admin Portal"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="hidden xl:inline font-mono">Admin</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {showSearchMobile && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-slate-800">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'store') setCurrentView('store');
              }}
              placeholder="Search electronics, brands, specs..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-8 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-500"
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-6 py-4 space-y-3">
          <div className="text-xs uppercase font-mono text-slate-500 tracking-wider">Navigation</div>
          <button
            onClick={() => {
              setCurrentView('store');
              setSelectedCategory('ALL');
              setSelectedCondition('ALL');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            All Electronics
          </button>
          <button
            onClick={() => {
              setCurrentView('store');
              setSelectedCondition('BRAND NEW');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            Brand New Appliances
          </button>
          <button
            onClick={() => {
              setCurrentView('store');
              setSelectedCondition('UK USED');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            UK Used Tested Deals
          </button>
          <button
            onClick={() => {
              setCurrentView('save_to_buy_dashboard');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-cyan-400 font-semibold"
          >
            Save To Buy Dashboard (30% Deposit)
          </button>
          <button
            onClick={() => {
              setCurrentView('order_tracking');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            Track My Order / Transfer Receipt
          </button>
          <button
            onClick={() => {
              setCurrentView('bnpl_dashboard');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
          >
            BNPL Pay Later Applications
          </button>
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setCurrentView('admin');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-slate-400 hover:text-white font-mono"
            >
              Store Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
