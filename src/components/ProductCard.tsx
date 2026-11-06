import React from 'react';
import { Heart, ShoppingBag, PiggyBank, Star } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import tvImage from '../assets/images/product_oled_smart_tv_1793977433232.jpg';
import fridgeImage from '../assets/images/product_smart_refrigerator_1793977434129.jpg';
import acImage from '../assets/images/product_inverter_ac_1793977434537.jpg';
import generatorImage from '../assets/images/product_silent_generator_1793977434099.jpg';
import heroImage from '../assets/images/hero_flagship_electronics_1793977432202.jpg';

interface ProductCardProps { product: Product; }

const resolveProductImage = (path: string, category: string) => {
  if (path && (/^https?:\/\//i.test(path) || path.startsWith('data:') || (path.startsWith('/') && !path.startsWith('/src/')))) return path;
  const value = (path || '').toLowerCase();
  if (value.includes('oled') || value.includes('smart_tv')) return tvImage;
  if (value.includes('refrigerator') || value.includes('fridge')) return fridgeImage;
  if (value.includes('inverter_ac') || value.includes('air_condition')) return acImage;
  if (value.includes('generator')) return generatorImage;
  if (category.toLowerCase().includes('tv')) return tvImage;
  if (category.toLowerCase().includes('refrigerator')) return fridgeImage;
  if (category.toLowerCase().includes('air conditioner')) return acImage;
  if (category.toLowerCase().includes('generator')) return generatorImage;
  return heroImage;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct, setCheckoutPreselectedProduct, setCheckoutDefaultMode, setIsCheckoutOpen, setIsCartOpen } = useApp();
  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice > product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const initialDeposit30 = Math.round(product.price * 0.3);

  const handleStartSaveToBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckoutPreselectedProduct(product);
    setCheckoutDefaultMode('save_to_buy');
    setIsCheckoutOpen(true);
  };

  return (
    <article onClick={() => setSelectedProduct(product)} className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 transition duration-200 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/20">
      <div className="relative aspect-square w-full overflow-hidden bg-white/95 p-2 sm:p-3">
        <img src={resolveProductImage(product.images?.[0] || '', product.category)} alt={product.name} loading="lazy" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute left-2 top-2 flex max-w-[72%] flex-col items-start gap-1">
          <span className={`rounded px-1.5 py-1 text-[8px] font-extrabold tracking-wide sm:text-[9px] ${product.condition === 'BRAND NEW' ? 'border border-cyan-700/50 bg-cyan-950/95 text-cyan-300' : 'border border-amber-700/50 bg-amber-950/95 text-amber-300'}`}>
            {product.condition === 'BRAND NEW' ? 'BRAND NEW' : `UK USED · ${product.ukUsedGrade || 'GRADE A'}`}
          </span>
          {discountPercent > 0 && <span className="rounded bg-rose-950/95 px-1.5 py-0.5 text-[9px] font-bold text-rose-300">-{discountPercent}%</span>}
        </div>
        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'} className={`absolute right-2 top-2 rounded-full p-1.5 shadow-sm transition ${isFavorited ? 'bg-rose-600 text-white' : 'bg-slate-950/80 text-slate-500 hover:text-white'}`}>
          <Heart className={`h-3.5 w-3.5 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-2 p-2.5 sm:p-3">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-cyan-300 sm:text-[10px]">
            <span className="truncate">{product.brand}</span><span className="text-slate-600">·</span><span className="truncate font-medium text-slate-400">{product.category}</span>
          </div>
          <h3 className="mt-1 line-clamp-2 min-h-[2.35rem] text-[11px] font-semibold leading-snug text-slate-100 group-hover:text-cyan-300 sm:text-xs">
            {product.name}
          </h3>
          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-400">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-200">{product.rating}</span>
            <span className="truncate">({product.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-2">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-sm font-extrabold tabular-nums text-white sm:text-base">₦{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && <span className="text-[9px] text-slate-500 line-through sm:text-[10px]">₦{product.originalPrice.toLocaleString()}</span>}
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-1 rounded-md border border-cyan-900/60 bg-cyan-950/40 px-2 py-1">
            <span className="flex items-center gap-1 text-[9px] text-slate-400"><PiggyBank className="h-3 w-3 shrink-0 text-cyan-400" /> 30% deposit</span>
            <span className="text-[10px] font-bold tabular-nums text-cyan-300">₦{initialDeposit30.toLocaleString()}</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <button onClick={(e) => { e.stopPropagation(); addToCart(product); setIsCartOpen(true); }} className="flex min-w-0 items-center justify-center gap-1 rounded-md border border-slate-700 bg-slate-800 px-1.5 py-2 text-[10px] font-bold text-white transition hover:bg-slate-700 sm:text-xs">
              <ShoppingBag className="h-3 w-3 shrink-0 text-cyan-300" /><span>Cart</span>
            </button>
            <button onClick={handleStartSaveToBuy} className="flex min-w-0 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 px-1.5 py-2 text-[10px] font-bold text-white transition hover:from-cyan-500 hover:to-blue-500 sm:text-xs">
              <PiggyBank className="h-3 w-3 shrink-0" /><span>Save to Buy</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
