import React from 'react';
import { Heart, ShoppingBag, Eye, PiggyBank, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setCheckoutPreselectedProduct,
    setCheckoutDefaultMode,
    setIsCheckoutOpen
  } = useApp();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const initialDeposit30 = Math.round(product.price * 0.3);

  const handleStartSaveToBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckoutPreselectedProduct(product);
    setCheckoutDefaultMode('save_to_buy');
    setIsCheckoutOpen(true);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // fallback if needed
            e.currentTarget.src = '/src/assets/images/hero_flagship_electronics_1793977432202.jpg';
          }}
        />

        {/* Condition Tag */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.condition === 'BRAND NEW' ? (
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-700/60 tracking-wider">
              BRAND NEW
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950/90 text-amber-300 border border-amber-700/60 tracking-wider">
              UK USED · {product.ukUsedGrade || 'GRADE A'}
            </span>
          )}

          {discountPercent > 0 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/90 text-rose-400 border border-rose-800/60">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorited
              ? 'bg-rose-600/90 text-white'
              : 'bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full py-2 bg-slate-950/90 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg border border-slate-700 flex items-center justify-center gap-1.5 backdrop-blur-md shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Quick Specs</span>
          </button>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="text-cyan-400 font-semibold uppercase">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-slate-100 mt-1 line-clamp-2 group-hover:text-cyan-300 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-slate-200">{product.rating}</span>
            <span className="text-slate-500">({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Price & Save to Buy Indicator */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg font-bold font-mono text-white tracking-tight tabular-nums">
                ₦{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-500 line-through font-mono ml-2 tabular-nums">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-400 font-mono">
              {product.stock > 0 ? 'In Stock (Alaba)' : 'Out of Stock'}
            </span>
          </div>

          {/* Save to Buy Preview Tag */}
          <div className="bg-sky-950/50 border border-sky-800/40 rounded px-2 py-1 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <PiggyBank className="w-3 h-3 text-cyan-400" />
              <span>Save To Buy (30%):</span>
            </span>
            <span className="text-cyan-300 font-mono font-semibold tabular-nums">
              ₦{initialDeposit30.toLocaleString()}
            </span>
          </div>

          {/* Buttons: Add to Cart & Save To Buy */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleStartSaveToBuy}
              className="w-full py-2 px-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-sm transition-all"
              title="Deposit 30% and save for this item"
            >
              <PiggyBank className="w-3.5 h-3.5" />
              <span>Save to Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
