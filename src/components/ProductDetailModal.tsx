import React, { useState } from 'react';
import { X, Star, ShieldCheck, PiggyBank, ShoppingBag, CreditCard, MapPin, CheckCircle, MessageCircle, Share2, Heart, Truck, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { STORE_INFO, INITIAL_REVIEWS } from '../data/mockData';
import tvImage from '../assets/images/product_oled_smart_tv_1793977433232.jpg';
import fridgeImage from '../assets/images/product_smart_refrigerator_1793977434129.jpg';
import acImage from '../assets/images/product_inverter_ac_1793977434537.jpg';
import generatorImage from '../assets/images/product_silent_generator_1793977434099.jpg';
import heroImage from '../assets/images/hero_flagship_electronics_1793977432202.jpg';

const productImage = (product: Product) => {
  const source = (product.images?.[0] || '').toLowerCase();
  const category = product.category.toLowerCase();
  if (source.includes('oled') || source.includes('smart_tv') || category.includes('tv')) return tvImage;
  if (source.includes('refrigerator') || source.includes('fridge') || category.includes('refrigerator')) return fridgeImage;
  if (source.includes('inverter_ac') || source.includes('air_condition') || category.includes('air conditioner')) return acImage;
  if (source.includes('generator') || category.includes('generator')) return generatorImage;
  return heroImage;
};

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isInWishlist,
    setCheckoutPreselectedProduct, setCheckoutDefaultMode, setIsCheckoutOpen,
    products, addToast, setIsCartOpen
  } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const deposit = Math.round(selectedProduct.price * 0.3);
  const relatedProducts = products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 3);
  const image = productImage(selectedProduct);

  const openCheckout = (mode: 'buy_now' | 'save_to_buy' | 'bnpl') => {
    setCheckoutPreselectedProduct(selectedProduct);
    setCheckoutDefaultMode(mode);
    setIsCheckoutOpen(true);
    setSelectedProduct(null);
  };
  const handleBuyNow = () => openCheckout('buy_now');
  const handleSaveToBuy = () => openCheckout('save_to_buy');
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: selectedProduct.name, text: `FASTBUY ELECTRONICS: ${selectedProduct.name} — ₦${selectedProduct.price.toLocaleString()}`, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast({ type: 'info', title: 'Link Copied', message: 'Product link copied to clipboard' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 sm:bg-slate-950/85 sm:backdrop-blur-md overflow-y-auto overscroll-contain">
      <div className="min-h-[100dvh] w-full flex items-start justify-center sm:p-4 lg:p-6">
        <section className="relative w-full max-w-6xl min-w-0 bg-slate-900 sm:border sm:border-slate-800 sm:rounded-2xl shadow-2xl overflow-hidden">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 px-3 py-3 sm:px-5 bg-slate-950/95 backdrop-blur border-b border-slate-800">
            <div className="min-w-0 flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">
              <span className="text-cyan-400 font-bold uppercase truncate">{selectedProduct.brand}</span>
              <span>·</span><span className="truncate">{selectedProduct.category}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline text-slate-300 font-semibold">{selectedProduct.condition === 'BRAND NEW' ? 'BRAND NEW' : `UK USED · ${selectedProduct.ukUsedGrade || 'GRADE A'}`}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={handleShare} aria-label="Share product" className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><Share2 className="w-4 h-4" /></button>
              <button onClick={() => setSelectedProduct(null)} aria-label="Close product details" className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"><X className="w-5 h-5" /></button>
            </div>
          </header>

          <div className="p-3 sm:p-5 lg:p-7 space-y-5 sm:space-y-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start">
              <div className="min-w-0 space-y-3">
                <div className="relative w-full aspect-[4/3] sm:aspect-[5/4] max-h-[42vh] sm:max-h-[520px] bg-white rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-3 sm:p-6">
                  <img
                    src={image}
                    alt={selectedProduct.name}
                    className="block w-full h-full object-contain"
                    onError={(e) => { e.currentTarget.src = heroImage; }}
                  />
                  <span className={`absolute top-2 left-2 sm:top-3 sm:left-3 rounded-md px-2 py-1 text-[9px] sm:text-xs font-bold border ${selectedProduct.condition === 'BRAND NEW' ? 'bg-cyan-950 text-cyan-300 border-cyan-700' : 'bg-amber-950 text-amber-300 border-amber-700'}`}>
                    {selectedProduct.condition === 'BRAND NEW' ? 'FACTORY SEALED' : `UK TESTED · ${selectedProduct.ukUsedGrade || 'GRADE A'}`}
                  </span>
                  <button onClick={() => toggleWishlist(selectedProduct.id)} aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'} className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-full shadow ${isFavorited ? 'bg-rose-600 text-white' : 'bg-slate-900/90 text-slate-300'}`}>
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>
                {selectedProduct.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedProduct.images.map((_, index) => (
                      <button key={index} onClick={() => setSelectedImgIdx(index)} className={`h-14 w-14 shrink-0 rounded-lg border-2 p-1 bg-white ${selectedImgIdx === index ? 'border-cyan-400' : 'border-slate-700'}`}>
                        <img src={image} alt={`Product view ${index + 1}`} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="min-w-0 space-y-4">
                <div className="space-y-2">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white leading-tight break-words">{selectedProduct.name}</h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <span className="inline-flex items-center gap-1 text-amber-400"><Star className="w-4 h-4 fill-current" /><b className="text-white">{selectedProduct.rating}</b><span className="text-slate-400">({selectedProduct.reviewCount} reviews)</span></span>
                    <span className={`font-medium ${selectedProduct.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{selectedProduct.stock > 0 ? `In Stock · ${selectedProduct.stock} available` : 'Out of Stock'}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 sm:p-4 space-y-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">₦{selectedProduct.price.toLocaleString()}</span>
                    {selectedProduct.originalPrice > selectedProduct.price && <span className="text-xs sm:text-sm text-slate-500 line-through">₦{selectedProduct.originalPrice.toLocaleString()}</span>}
                  </div>
                  <p className="text-xs text-slate-400 break-words">Warranty: <span className="text-cyan-300 font-semibold">{selectedProduct.warranty}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setIsCartOpen(true); }} className="min-w-0 min-h-12 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-2 py-3 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-cyan-300 shrink-0" /><span>Add to Cart</span>
                  </button>
                  <button onClick={handleBuyNow} disabled={selectedProduct.stock <= 0} className="min-w-0 min-h-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 px-2 py-3 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4 shrink-0" /><span>Buy Now</span>
                  </button>
                </div>
                <button onClick={handleSaveToBuy} disabled={selectedProduct.stock <= 0} className="w-full min-h-12 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 disabled:opacity-40 px-3 py-3 text-white font-bold text-sm flex items-center justify-center gap-2">
                  <PiggyBank className="w-4 h-4" /><span>Save to Buy</span><span className="text-cyan-100 text-xs font-medium">· 30% deposit (₦{deposit.toLocaleString()})</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center">Choose your payment option securely at checkout.</p>

                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs"><ShieldCheck className="w-4 h-4 shrink-0" /> Alaba International Quality Guarantee</div>
                  <p className="text-[11px] leading-relaxed text-slate-400">All units are checked for electrical stability, voltage tolerance and authentic components before handover.</p>
                  <div className="flex items-start gap-2 text-[11px] text-slate-300"><MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span className="min-w-0 break-words">{STORE_INFO.address}</span></div>
                </div>
                <a href={`https://wa.me/2347013990666?text=${encodeURIComponent(`Hello FASTBUY Electronics, I am interested in ${selectedProduct.name} priced at ₦${selectedProduct.price.toLocaleString()}.`) }`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-xs text-emerald-400 hover:text-emerald-300"><MessageCircle className="w-4 h-4" /> Ask about this product on WhatsApp</a>
              </div>
            </div>

            <section className="border-t border-slate-800 pt-4 sm:pt-6 space-y-4">
              <div className="grid grid-cols-3 gap-1 rounded-xl border border-slate-800 bg-slate-950 p-1">
                {([
                  ['overview', 'Description'],
                  ['specs', 'Specifications'],
                  ['reviews', 'Reviews']
                ] as const).map(([tab, label]) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`min-w-0 rounded-lg px-1.5 py-2.5 text-[10px] sm:text-xs font-semibold ${activeTab === tab ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>{label}</button>
                ))}
              </div>
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-slate-300 break-words">{selectedProduct.description}</p>
                  {selectedProduct.keyFeatures?.length > 0 && <div className="space-y-2"><h3 className="text-xs uppercase font-bold tracking-wider text-cyan-400">Key Features</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{selectedProduct.keyFeatures.map((feature, i) => <div key={i} className="flex items-start gap-2 text-xs text-slate-300"><CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /><span className="break-words">{feature}</span></div>)}</div></div>}
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="overflow-hidden rounded-xl border border-slate-800">
                  <div className="divide-y divide-slate-800">{Object.entries(selectedProduct.specifications || {}).map(([key, value]) => <div key={key} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 px-3 py-3 text-xs even:bg-slate-950/50"><span className="text-slate-400 break-words">{key}</span><span className="text-slate-100 font-medium break-words">{value}</span></div>)}
                    <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 px-3 py-3 text-xs bg-slate-950/50"><span className="text-slate-400">Condition</span><span className="text-cyan-300 font-semibold">{selectedProduct.condition === 'BRAND NEW' ? 'Brand New · Factory Sealed' : `UK Used · ${selectedProduct.ukUsedGrade || 'Grade A'}`}</span></div>
                    <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 px-3 py-3 text-xs"><span className="text-slate-400">Warranty</span><span className="text-emerald-300 font-semibold break-words">{selectedProduct.warranty}</span></div>
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && <div className="space-y-3"><div className="text-lg font-bold text-white">{selectedProduct.rating} / 5 <span className="text-xs font-normal text-slate-400">· {selectedProduct.reviewCount} customer reviews</span></div>{INITIAL_REVIEWS.map(review => <article key={review.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-2"><div className="flex flex-wrap justify-between gap-2 text-xs"><b className="text-white">{review.author}</b><span className="text-slate-500">{review.date}</span></div><div className="flex gap-1 text-amber-400">{Array.from({length:review.rating}).map((_,i)=><Star key={i} className="w-3 h-3 fill-current"/>)}</div><p className="text-xs text-slate-300 leading-relaxed">{review.comment}</p></article>)}</div>}
            </section>

            {relatedProducts.length > 0 && <section className="border-t border-slate-800 pt-4 space-y-3"><h3 className="text-sm font-bold text-white">You may also like</h3><div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{relatedProducts.map(product => <button key={product.id} onClick={() => { setSelectedProduct(product); setSelectedImgIdx(0); setActiveTab('overview'); }} className="min-w-0 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-2 text-left"><img src={productImage(product)} alt="" className="w-14 h-14 rounded-lg bg-white object-contain p-1 shrink-0"/><span className="min-w-0"><span className="block text-xs text-slate-200 line-clamp-2">{product.name}</span><span className="block mt-1 text-xs font-bold text-cyan-300">₦{product.price.toLocaleString()}</span></span></button>)}</div></section>}
          </div>
        </section>
      </div>
    </div>
  );
};
