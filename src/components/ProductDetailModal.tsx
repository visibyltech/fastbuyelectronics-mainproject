import React, { useState } from 'react';
import {
  X, Star, ShieldCheck, PiggyBank, ShoppingBag, CreditCard,
  MapPin, CheckCircle, MessageCircle, Share2, Heart, Truck
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { STORE_INFO, INITIAL_REVIEWS } from '../data/mockData';
import tvImage from '../assets/images/product_oled_smart_tv_1793977433232.jpg';
import fridgeImage from '../assets/images/product_smart_refrigerator_1793977434129.jpg';
import acImage from '../assets/images/product_inverter_ac_1793977434537.jpg';
import generatorImage from '../assets/images/product_silent_generator_1793977434099.jpg';
import heroImage from '../assets/images/hero_flagship_electronics_1793977432202.jpg';

const productImage = (product: Product, index = 0) => {
  const rawPath = product.images?.[index] || product.images?.[0] || '';
  if (rawPath && (/^https?:\/\//i.test(rawPath) || rawPath.startsWith('data:') || (rawPath.startsWith('/') && !rawPath.startsWith('/src/')))) return rawPath;
  const path = rawPath.toLowerCase();
  const category = (product.category || '').toLowerCase();
  if (path.includes('oled') || path.includes('smart_tv') || category.includes('tv')) return tvImage;
  if (path.includes('refrigerator') || path.includes('fridge') || category.includes('refrigerator')) return fridgeImage;
  if (path.includes('inverter_ac') || path.includes('air_condition') || category.includes('air conditioner')) return acImage;
  if (path.includes('generator') || category.includes('generator')) return generatorImage;
  return heroImage;
};

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isInWishlist,
    setCheckoutPreselectedProduct, setCheckoutDefaultMode, setIsCheckoutOpen,
    products, addToast
  } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const initialDeposit30 = Math.round(selectedProduct.price * 0.3);
  const relatedProducts = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  const openCheckout = (mode: 'buy_now' | 'save_to_buy' | 'bnpl') => {
    setCheckoutPreselectedProduct(selectedProduct);
    setCheckoutDefaultMode(mode);
    setIsCheckoutOpen(true);
    setSelectedProduct(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: `Check out ${selectedProduct.name} at FASTBUY ELECTRONICS: ₦${selectedProduct.price.toLocaleString()}`,
        url: window.location.href
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({ type: 'info', title: 'Link Copied', message: 'Product link copied to clipboard' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-950/95 backdrop-blur-sm sm:flex sm:items-start sm:justify-center sm:p-4">
      <section className="relative mx-auto min-h-screen w-full max-w-5xl overflow-hidden bg-slate-900 text-slate-100 sm:my-4 sm:min-h-0 sm:rounded-2xl sm:border sm:border-slate-800 sm:shadow-2xl">
        <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur">
          <div className="min-w-0 truncate text-[11px] font-semibold text-cyan-300">
            {selectedProduct.brand} <span className="text-slate-600">·</span> {selectedProduct.category}
          </div>
          <div className="ml-3 flex shrink-0 items-center gap-1">
            <button onClick={handleShare} aria-label="Share product" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"><Share2 className="h-4 w-4" /></button>
            <button onClick={() => setSelectedProduct(null)} aria-label="Close product details" className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white"><X className="h-5 w-5" /></button>
          </div>
        </header>

        <div className="max-h-[calc(100dvh-48px)] overflow-y-auto p-3 sm:max-h-[85vh] sm:p-6">
          <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-7">
            <div className="min-w-0 lg:col-span-5">
              <div className="relative mx-auto flex aspect-[4/3] w-full max-h-[300px] items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-white p-3 sm:max-h-[390px] sm:p-5">
                <img
                  src={productImage(selectedProduct, selectedImgIdx)}
                  alt={selectedProduct.name}
                  className="h-full w-full object-contain"
                />
                <span className={`absolute left-3 top-3 rounded-md border px-2 py-1 text-[9px] font-extrabold tracking-wide sm:text-[10px] ${selectedProduct.condition === 'BRAND NEW' ? 'border-cyan-700 bg-cyan-950 text-cyan-200' : 'border-amber-700 bg-amber-950 text-amber-200'}`}>
                  {selectedProduct.condition === 'BRAND NEW' ? 'FACTORY SEALED' : `UK USED · ${selectedProduct.ukUsedGrade || 'GRADE A'}`}
                </span>
                <button onClick={() => toggleWishlist(selectedProduct.id)} aria-label="Toggle wishlist" className={`absolute right-3 top-3 rounded-full p-2 ${isFavorited ? 'bg-rose-600 text-white' : 'bg-slate-950/80 text-slate-300'}`}>
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {selectedProduct.images.map((_, index) => (
                    <button key={index} onClick={() => setSelectedImgIdx(index)} className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 ${selectedImgIdx === index ? 'border-cyan-400' : 'border-slate-700'}`}>
                      <img src={productImage(selectedProduct, index)} alt={`${selectedProduct.name} view ${index + 1}`} className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <ShieldCheck className="h-4 w-4 shrink-0" /> Alaba International Quality Guarantee
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
                  Products are inspected and tested before handover. Warranty terms are shown below.
                </p>
                <div className="mt-2 flex min-w-0 items-start gap-1.5 text-[10px] leading-relaxed text-slate-300">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  <span className="min-w-0 break-words">Showroom: {STORE_INFO.address}</span>
                </div>
              </div>
            </div>

            <div className="min-w-0 space-y-3 lg:col-span-7">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">{selectedProduct.brand} · {selectedProduct.category}</div>
                <h1 className="mt-1 break-words text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl">{selectedProduct.name}</h1>
                <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                  <span className="flex items-center gap-1 text-amber-400"><Star className="h-3.5 w-3.5 fill-current" /><strong className="text-white">{selectedProduct.rating}</strong><span className="text-slate-400">({selectedProduct.reviewCount} reviews)</span></span>
                  <span className={`font-semibold ${selectedProduct.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{selectedProduct.stock > 0 ? `In stock · ${selectedProduct.stock} available` : 'Out of stock'}</span>
                </div>
              </div>

              <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950 p-3 sm:p-4">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="break-words text-2xl font-extrabold tabular-nums text-white sm:text-3xl">₦{selectedProduct.price.toLocaleString()}</span>
                  {selectedProduct.originalPrice > selectedProduct.price && <span className="text-xs text-slate-500 line-through">₦{selectedProduct.originalPrice.toLocaleString()}</span>}
                </div>
                <p className="mt-1 break-words text-[11px] leading-relaxed text-slate-400">Warranty: <strong className="text-cyan-300">{selectedProduct.warranty}</strong></p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={selectedProduct.stock <= 0}
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setIsCartOpen(true); }}
                  className="flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-2 py-2.5 text-xs font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingBag className="h-4 w-4 shrink-0 text-cyan-300" /><span>Add to Cart</span>
                </button>
                <button
                  disabled={selectedProduct.stock <= 0}
                  onClick={() => openCheckout('buy_now')}
                  className="flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-xl bg-cyan-500 px-2 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CreditCard className="h-4 w-4 shrink-0" /><span>Buy Now</span>
                </button>
              </div>

              <button
                disabled={selectedProduct.stock <= 0}
                onClick={() => openCheckout('save_to_buy')}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-cyan-700/70 bg-gradient-to-r from-cyan-950 to-blue-950 px-3 py-2.5 text-xs font-bold text-cyan-200 transition hover:border-cyan-400 hover:from-cyan-900 hover:to-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PiggyBank className="h-4 w-4" /> Save to Buy · Start with 30% (₦{initialDeposit30.toLocaleString()})
              </button>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-950/70 p-2"><Truck className="h-3.5 w-3.5 shrink-0 text-cyan-400" /> Delivery available</div>
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-950/70 p-2"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-cyan-400" /> Warranty support</div>
              </div>

              <a
                href={`https://wa.me/2347013990666?text=${encodeURIComponent(`Hello FASTBUY Electronics, I am asking about ${selectedProduct.name} (₦${selectedProduct.price.toLocaleString()}). Is it available?`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-emerald-700/50 bg-emerald-950/50 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60"
              >
                <MessageCircle className="h-4 w-4" /> Ask about this product on WhatsApp
              </a>
            </div>
          </div>

          <section className="mt-6 min-w-0 border-t border-slate-800 pt-5">
            <div className="grid grid-cols-3 gap-1 rounded-xl border border-slate-800 bg-slate-950 p-1">
              {([
                ['overview', 'Description'],
                ['specs', 'Specifications'],
                ['reviews', `Reviews (${selectedProduct.reviewCount})`]
              ] as const).map(([tab, label]) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`min-w-0 rounded-lg px-1 py-2 text-[10px] font-bold sm:text-xs ${activeTab === tab ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                  {label}
                </button>
              ))}
            </div>

            <div className="min-w-0 pt-4">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="break-words text-sm leading-relaxed text-slate-300">{selectedProduct.description}</p>
                  <div>
                    <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-cyan-300">Key Features</h3>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {selectedProduct.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex min-w-0 items-start gap-2 text-xs leading-relaxed text-slate-300">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><span className="min-w-0 break-words">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="overflow-hidden rounded-xl border border-slate-800">
                  {Object.entries(selectedProduct.specifications).map(([key, value], index) => (
                    <div key={key} className={`grid min-w-0 grid-cols-2 gap-3 px-3 py-3 text-xs ${index % 2 === 0 ? 'bg-slate-950/70' : 'bg-slate-900'}`}>
                      <span className="min-w-0 break-words text-slate-400">{key}</span>
                      <span className="min-w-0 break-words font-semibold text-slate-100">{value}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-3 bg-slate-950 px-3 py-3 text-xs">
                    <span className="text-slate-400">Warranty</span><span className="break-words font-semibold text-cyan-300">{selectedProduct.warranty}</span>
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {INITIAL_REVIEWS.map((review) => (
                    <article key={review.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs"><strong>{review.author}</strong><span className="text-slate-500">{review.date}</span></div>
                      <div className="mt-1 flex items-center gap-1 text-amber-400">{Array.from({ length: review.rating }).map((_, index) => <Star key={index} className="h-3 w-3 fill-current" />)}<span className="ml-1 text-[10px] text-slate-400">{review.location}</span></div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-300">{review.comment}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {relatedProducts.length > 0 && (
            <section className="mt-6 border-t border-slate-800 pt-5">
              <h3 className="mb-3 text-sm font-bold text-white">Related {selectedProduct.category}</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {relatedProducts.map((product) => (
                  <button key={product.id} onClick={() => { setSelectedProduct(product); setSelectedImgIdx(0); setActiveTab('overview'); }} className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-2 text-left hover:border-cyan-500/50">
                    <img src={productImage(product)} alt={product.name} className="h-14 w-14 shrink-0 rounded-lg bg-white object-contain p-1" />
                    <span className="min-w-0"><span className="block truncate text-xs font-semibold text-slate-200">{product.name}</span><span className="mt-1 block text-xs font-bold text-cyan-300">₦{product.price.toLocaleString()}</span></span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};
