import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  SaveToBuyPlan,
  BNPLApplication,
  BankAccountConfig,
  ProductCondition,
  ProductCategory
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_SAVE_TO_BUY_PLANS,
  INITIAL_BANK_CONFIG
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], paymentStatus?: Order['paymentStatus']) => void;
  uploadOrderReceipt: (orderId: string, fileName: string, fileUrl: string, reference?: string) => void;

  saveToBuyPlans: SaveToBuyPlan[];
  createSaveToBuyPlan: (planData: Omit<SaveToBuyPlan, 'id' | 'createdAt' | 'status' | 'payments' | 'depositedAmount' | 'outstandingBalance'>, initialDepositAmount: number, receiptFileName: string, receiptUrl: string, reference?: string) => SaveToBuyPlan;
  addSaveToBuyPayment: (planId: string, amount: number, receiptFileName: string, receiptUrl: string, reference?: string) => void;
  verifySaveToBuyPayment: (planId: string, paymentId: string) => void;

  bnplApplications: BNPLApplication[];
  submitBNPLApplication: (application: Omit<BNPLApplication, 'id' | 'createdAt' | 'status'>) => BNPLApplication;
  updateBNPLStatus: (id: string, status: 'approved' | 'rejected') => void;

  bankConfig: BankAccountConfig;
  updateBankConfig: (config: BankAccountConfig) => void;

  // Navigation & View states
  currentView: 'store' | 'save_to_buy_dashboard' | 'order_tracking' | 'bnpl_dashboard' | 'admin';
  setCurrentView: (view: 'store' | 'save_to_buy_dashboard' | 'order_tracking' | 'bnpl_dashboard' | 'admin') => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory | 'ALL';
  setSelectedCategory: (cat: ProductCategory | 'ALL') => void;
  selectedCondition: ProductCondition | 'ALL';
  setSelectedCondition: (cond: ProductCondition | 'ALL') => void;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest';
  setSortBy: (sort: 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest') => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutPreselectedProduct: Product | null;
  setCheckoutPreselectedProduct: (p: Product | null) => void;
  checkoutDefaultMode: 'buy_now' | 'save_to_buy' | 'bnpl';
  setCheckoutDefaultMode: (mode: 'buy_now' | 'save_to_buy' | 'bnpl') => void;

  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or default
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('fastbuy_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fastbuy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fastbuy_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('fastbuy_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [saveToBuyPlans, setSaveToBuyPlans] = useState<SaveToBuyPlan[]>(() => {
    try {
      const saved = localStorage.getItem('fastbuy_stb_plans');
      return saved ? JSON.parse(saved) : INITIAL_SAVE_TO_BUY_PLANS;
    } catch {
      return INITIAL_SAVE_TO_BUY_PLANS;
    }
  });

  const [bnplApplications, setBnplApplications] = useState<BNPLApplication[]>(() => {
    try {
      const saved = localStorage.getItem('fastbuy_bnpl_apps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bankConfig, setBankConfig] = useState<BankAccountConfig>(() => {
    try {
      const saved = localStorage.getItem('fastbuy_bank_config');
      return saved ? JSON.parse(saved) : INITIAL_BANK_CONFIG;
    } catch {
      return INITIAL_BANK_CONFIG;
    }
  });

  // UI state
  const [currentView, setCurrentViewState] = useState<'store' | 'save_to_buy_dashboard' | 'order_tracking' | 'bnpl_dashboard' | 'admin'>('store');
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpenState] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpenState] = useState(false);

  const setCurrentView = (view: 'store' | 'save_to_buy_dashboard' | 'order_tracking' | 'bnpl_dashboard' | 'admin') => {
    if (view !== currentView) window.history.pushState({ fastbuy: true, layer: 'view', view }, '', window.location.href);
    setCurrentViewState(view);
  };
  const setSelectedProduct = (product: Product | null) => {
    if (product) window.history.pushState({ fastbuy: true, layer: 'product' }, '', window.location.href);
    setSelectedProductState(product);
  };
  const setIsCartOpen = (open: boolean) => {
    if (open && !isCartOpen) window.history.pushState({ fastbuy: true, layer: 'cart' }, '', window.location.href);
    setIsCartOpenState(open);
  };
  const setIsCheckoutOpen = (open: boolean) => {
    if (open && !isCheckoutOpen) window.history.pushState({ fastbuy: true, layer: 'checkout' }, '', window.location.href);
    setIsCheckoutOpenState(open);
  };

  useEffect(() => {
    window.history.replaceState({ fastbuy: true, layer: 'root' }, '', window.location.href);
    window.history.pushState({ fastbuy: true, layer: 'root' }, '', window.location.href);
    const handleBack = () => {
      if (isCheckoutOpen) setIsCheckoutOpenState(false);
      else if (selectedProduct) setSelectedProductState(null);
      else if (isCartOpen) setIsCartOpenState(false);
      else if (currentView !== 'store') setCurrentViewState('store');
      else {
        window.history.pushState({ fastbuy: true, layer: 'root' }, '', window.location.href);
      }
    };
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [isCheckoutOpen, selectedProduct, isCartOpen, currentView]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');
  const [selectedCondition, setSelectedCondition] = useState<ProductCondition | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating' | 'newest'>('featured');


  const [checkoutPreselectedProduct, setCheckoutPreselectedProduct] = useState<Product | null>(null);
  const [checkoutDefaultMode, setCheckoutDefaultMode] = useState<'buy_now' | 'save_to_buy' | 'bnpl'>('buy_now');

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fastbuy_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('fastbuy_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fastbuy_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fastbuy_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fastbuy_stb_plans', JSON.stringify(saveToBuyPlans));
  }, [saveToBuyPlans]);

  useEffect(() => {
    localStorage.setItem('fastbuy_bnpl_apps', JSON.stringify(bnplApplications));
  }, [bnplApplications]);

  useEffect(() => {
    localStorage.setItem('fastbuy_bank_config', JSON.stringify(bankConfig));
  }, [bankConfig]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name.slice(0, 36)}... added to your shopping bag`
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Wishlist'
        });
        return prev.filter((id) => id !== productId);
      } else {
        addToast({
          type: 'success',
          title: 'Saved to Wishlist'
        });
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `FBE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order['orderStatus'],
    paymentStatus?: Order['paymentStatus']
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus: status,
            paymentStatus: paymentStatus || o.paymentStatus
          };
        }
        return o;
      })
    );
    addToast({
      type: 'success',
      title: 'Order Status Updated',
      message: `Order #${orderId} marked as ${status.replace('_', ' ').toUpperCase()}`
    });
  };

  const uploadOrderReceipt = (
    orderId: string,
    fileName: string,
    fileUrl: string,
    reference?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            receiptFileName: fileName,
            receiptUrl: fileUrl,
            transferReference: reference || o.transferReference,
            paymentStatus: 'pending_verification'
          };
        }
        return o;
      })
    );
    addToast({
      type: 'success',
      title: 'Receipt Uploaded',
      message: 'Payment proof submitted to FASTBUY Alaba finance desk for verification'
    });
  };

  // Save To Buy
  const createSaveToBuyPlan = (
    planData: Omit<
      SaveToBuyPlan,
      'id' | 'createdAt' | 'status' | 'payments' | 'depositedAmount' | 'outstandingBalance'
    >,
    initialDepositAmount: number,
    receiptFileName: string,
    receiptUrl: string,
    reference?: string
  ): SaveToBuyPlan => {
    const planId = `STB-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newPlan: SaveToBuyPlan = {
      ...planData,
      id: planId,
      depositedAmount: initialDepositAmount,
      outstandingBalance: Math.max(0, planData.totalPrice - initialDepositAmount),
      status: 'active',
      createdAt: new Date().toISOString(),
      payments: [
        {
          id: `PAY-INIT-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          amount: initialDepositAmount,
          receiptFileName,
          receiptUrl,
          reference: reference || 'INIT-DEP',
          status: 'verified',
          note: 'Initial 30%+ Commitment Deposit'
        }
      ]
    };
    setSaveToBuyPlans((prev) => [newPlan, ...prev]);
    addToast({
      type: 'success',
      title: 'Save To Buy Plan Created!',
      message: `Your savings plan #${planId} is now active. Complete installments to claim your item.`
    });
    return newPlan;
  };

  const addSaveToBuyPayment = (
    planId: string,
    amount: number,
    receiptFileName: string,
    receiptUrl: string,
    reference?: string
  ) => {
    setSaveToBuyPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const updatedDeposited = plan.depositedAmount + amount;
          const updatedBalance = Math.max(0, plan.totalPrice - updatedDeposited);
          const isCompleted = updatedBalance <= 0;

          const newPayment = {
            id: `PAY-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            amount,
            receiptFileName,
            receiptUrl,
            reference: reference || `INSTAL-${Date.now()}`,
            status: 'verified' as const,
            note: isCompleted ? 'Final Settlement Payment' : 'Installment Payment'
          };

          return {
            ...plan,
            depositedAmount: updatedDeposited,
            outstandingBalance: updatedBalance,
            status: isCompleted ? ('completed' as const) : plan.status,
            payments: [...plan.payments, newPayment]
          };
        }
        return plan;
      })
    );

    addToast({
      type: 'success',
      title: 'Payment Recorded',
      message: `Deposit of ₦${amount.toLocaleString()} received and added to your balance.`
    });
  };

  const verifySaveToBuyPayment = (planId: string, paymentId: string) => {
    setSaveToBuyPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          return {
            ...plan,
            payments: plan.payments.map((p) =>
              p.id === paymentId ? { ...p, status: 'verified' as const } : p
            )
          };
        }
        return plan;
      })
    );
    addToast({
      type: 'success',
      title: 'Payment Verified',
      message: 'Receipt marked as verified'
    });
  };

  // BNPL
  const submitBNPLApplication = (
    applicationData: Omit<BNPLApplication, 'id' | 'createdAt' | 'status'>
  ): BNPLApplication => {
    const newApp: BNPLApplication = {
      ...applicationData,
      id: `BNPL-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending_review',
      createdAt: new Date().toISOString()
    };
    setBnplApplications((prev) => [newApp, ...prev]);
    addToast({
      type: 'success',
      title: 'BNPL Application Submitted',
      message: 'Application under verification with Alaba credit evaluation team'
    });
    return newApp;
  };

  const updateBNPLStatus = (id: string, status: 'approved' | 'rejected') => {
    setBnplApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
    addToast({
      type: 'info',
      title: 'BNPL Status Updated',
      message: `Application #${id} is now ${status.toUpperCase()}`
    });
  };

  // Products CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `fbe-custom-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    addToast({
      type: 'success',
      title: 'Product Added',
      message: `${product.name} is now live in the store`
    });
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    addToast({
      type: 'success',
      title: 'Product Updated'
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast({
      type: 'info',
      title: 'Product Deleted'
    });
  };

  // Bank config
  const updateBankConfig = (newConfig: BankAccountConfig) => {
    setBankConfig(newConfig);
    addToast({
      type: 'success',
      title: 'Bank Details Updated',
      message: 'Store checkout bank account is now synced'
    });
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        uploadOrderReceipt,
        saveToBuyPlans,
        createSaveToBuyPlan,
        addSaveToBuyPayment,
        verifySaveToBuyPayment,
        bnplApplications,
        submitBNPLApplication,
        updateBNPLStatus,
        bankConfig,
        updateBankConfig,
        currentView,
        setCurrentView,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCondition,
        setSelectedCondition,
        sortBy,
        setSortBy,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutPreselectedProduct,
        setCheckoutPreselectedProduct,
        checkoutDefaultMode,
        setCheckoutDefaultMode,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
