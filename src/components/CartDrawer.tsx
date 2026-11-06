import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, PiggyBank, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    setIsCheckoutOpen,
    setCheckoutDefaultMode,
    setCheckoutPreselectedProduct
  } = useApp();

  if (!isCartOpen) return null;

  const deposit30 = Math.round(cartSubtotal * 0.3);

  const handleProceedBuyNow = () => {
    setCheckoutPreselectedProduct(null);
    setCheckoutDefaultMode('buy_now');
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleProceedSaveToBuy = () => {
    setCheckoutPreselectedProduct(null);
    setCheckoutDefaultMode('save_to_buy');
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="font-display font-bold text-base text-white">Your Shopping Bag</h2>
              <span className="text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded-full">
                {cartCount} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-semibold text-white">Your bag is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse our Alaba store for Brand New and UK Used electronics with verified store warranties.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span>Selected Products</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain rounded-lg bg-slate-900 p-1 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-xs font-semibold text-slate-100 line-clamp-2">
                            {item.product.name}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 shrink-0"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                            item.product.condition === 'BRAND NEW'
                              ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/40'
                              : 'bg-amber-950/60 text-amber-300 border-amber-800/40'
                          }`}>
                            {item.product.condition}
                          </span>
                          <span className="text-xs font-bold font-mono text-cyan-400 tabular-nums">
                            ₦{item.product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                      <span className="text-slate-400">Quantity</span>
                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-0.5 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-white text-xs font-bold px-1 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-0.5 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Save To Buy Option Callout */}
                <div className="bg-sky-950/50 border border-cyan-800/50 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <PiggyBank className="w-4 h-4 text-cyan-400" />
                      Save To Buy (30% Down):
                    </span>
                    <span className="font-bold font-mono text-white tabular-nums">
                      ₦{deposit30.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Pay 30% commitment now, lock in this price, and pay the rest weekly or monthly!
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout actions */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white font-bold text-sm tabular-nums">
                    ₦{cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Delivery to any Nigerian State</span>
                  <span className="text-cyan-400">Calculated at checkout (Free Alaba Pickup)</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedBuyNow}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all"
                >
                  <span>1. Buy Now (Full Payment)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleProceedSaveToBuy}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-900/80 to-cyan-900/80 hover:from-blue-800 hover:to-cyan-800 text-cyan-300 border border-cyan-700/60 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <PiggyBank className="w-4 h-4 text-cyan-400" />
                  <span>2. Save To Buy (Deposit ₦{deposit30.toLocaleString()})</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zenith Bank Verified Transfer · Direct Alaba Showroom Release</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
