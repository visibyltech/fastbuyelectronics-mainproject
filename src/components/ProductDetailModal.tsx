import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  PiggyBank,
  ShoppingBag,
  CreditCard,
  MapPin,
  CheckCircle,
  MessageCircle,
  Share2,
  Heart
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { STORE_INFO, INITIAL_REVIEWS } from '../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCheckoutPreselectedProduct,
    setCheckoutDefaultMode,
    setIsCheckoutOpen,
    products,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const initialDeposit30 = Math.round(selectedProduct.price * 0.3);

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  const handleBuyNow = () => {
    addToCart(selectedProduct);
    setCheckoutPreselectedProduct(selectedProduct);
    setCheckoutDefaultMode('buy_now');
    setIsCheckoutOpen(true);
    setSelectedProduct(null);
  };

  const handleSaveToBuy = () => {
    setCheckoutPreselectedProduct(selectedProduct);
    setCheckoutDefaultMode('save_to_buy');
    setIsCheckoutOpen(true);
    setSelectedProduct(null);
  };

  const handleBNPL = () => {
    setCheckoutPreselectedProduct(selectedProduct);
    setCheckoutDefaultMode('bnpl');
    setIsCheckoutOpen(true);
    setSelectedProduct(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: `Check out ${selectedProduct.name} at FASTBUY ELECTRONICS Alaba Market: ₦${selectedProduct.price.toLocaleString()}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'info',
        title: 'Link Copied',
        message: 'Product link copied to clipboard'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-bold uppercase">{selectedProduct.brand}</span>
            <span>·</span>
            <span>{selectedProduct.category}</span>
            <span>·</span>
            <span className="text-slate-300 font-bold">
              {selectedProduct.condition === 'BRAND NEW' ? 'BRAND NEW (SEALED)' : `UK USED (${selectedProduct.ukUsedGrade || 'GRADE A'})`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[82vh] space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gallery Left (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-4/3 w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={selectedProduct.images[selectedImgIdx] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-3 left-3">
                  {selectedProduct.condition === 'BRAND NEW' ? (
                    <span className="px-2.5 py-1 rounded text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-700">
                      FACTORY SEALED
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-950 text-amber-300 border border-amber-700">
                      UK TESTED · {selectedProduct.ukUsedGrade || 'GRADE A'}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md ${
                    isFavorited ? 'bg-rose-600 text-white' : 'bg-slate-900/80 text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Inspection Assurance Card */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Alaba International Quality Guarantee</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  All units undergo 100% bench testing at our Alaba engineering workshop. Tested for electrical stability, voltage tolerance, and authentic components before handover.
                </p>
                <div className="flex items-center gap-1.5 text-slate-300 text-[11px] pt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Showroom: {STORE_INFO.address}</span>
                </div>
              </div>
            </div>

            {/* Details & Contiguous Purchase Module Right (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                  {selectedProduct.name}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-mono">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-white">{selectedProduct.rating}</span>
                    <span className="text-slate-400">({selectedProduct.reviewCount} customer reviews)</span>
                  </div>
                  <span className="text-slate-600">|</span>
                  <span className="text-emerald-400 font-mono font-medium">
                    {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock} units at Alaba)` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
                    ₦{selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="ml-3 text-sm text-slate-500 line-through font-mono tabular-nums">
                      ₦{selectedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Warranty: <span className="text-cyan-400 font-semibold">{selectedProduct.warranty}</span>
                </div>
              </div>

              {/* 3 Purchasing Options Banner */}
              <div className="bg-gradient-to-r from-sky-950/40 via-slate-900 to-sky-950/40 border border-cyan-800/40 rounded-xl p-4 space-y-3">
                <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider font-mono">
                  Flexible Nigerian Payment Options
                </div>

                {/* Option 1: Buy Now Pay Now */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700">
                  <div>
                    <p className="text-xs font-semibold text-white">1. Buy Now, Pay Now</p>
                    <p className="text-[11px] text-slate-400">Direct bank transfer with instant proof upload & express dispatch</p>
                  </div>
                  <button
                    onClick={handleBuyNow}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0"
                  >
                    Pay ₦{selectedProduct.price.toLocaleString()}
                  </button>
                </div>

                {/* Option 2: Save to Buy (30% Deposit) */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-600/40">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-cyan-300">2. Save To Buy (30% Down)</p>
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono">POPULAR</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Deposit <strong className="text-white font-mono">₦{initialDeposit30.toLocaleString()}</strong> today. Lock price, complete balance in 1-6 months!
                    </p>
                  </div>
                  <button
                    onClick={handleSaveToBuy}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    <PiggyBank className="w-3.5 h-3.5" />
                    <span>Save To Buy</span>
                  </button>
                </div>

                {/* Option 3: Buy Now Pay Later (BNPL) */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700">
                  <div>
                    <p className="text-xs font-semibold text-white">3. Buy Now, Pay Later (BNPL)</p>
                    <p className="text-[11px] text-slate-400">Spread over 3 to 12 months with salary or business eligibility</p>
                  </div>
                  <button
                    onClick={handleBNPL}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs shrink-0 flex items-center gap-1"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Apply BNPL</span>
                  </button>
                </div>
              </div>

              {/* Cart Button & WhatsApp Inquiry */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  <span>Add To Shopping Cart</span>
                </button>

                <a
                  href={`https://wa.me/2347013990666?text=${encodeURIComponent(
                    `Hello FASTBUY Electronics, I am inquiring from your website about the ${selectedProduct.name} (₦${selectedProduct.price.toLocaleString()}). Is this ready for immediate inspection or delivery from Alaba?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp 07013990666</span>
                </a>
              </div>
            </div>
          </div>

          {/* Tabs: Overview, Specifications, Reviews */}
          <div className="border-t border-slate-800 pt-6">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-3 text-sm">
              <button
                onClick={() => setActiveTab('overview')}
                className={`font-semibold pb-2 -mb-3 transition-colors ${
                  activeTab === 'overview'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Product Overview
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`font-semibold pb-2 -mb-3 transition-colors ${
                  activeTab === 'specs'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`font-semibold pb-2 -mb-3 transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Customer Reviews ({selectedProduct.reviewCount})
              </button>
            </div>

            <div className="pt-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
                      Key Engineering Highlights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedProduct.keyFeatures.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="overflow-hidden rounded-xl border border-slate-800">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-slate-800">
                      {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-slate-950/60' : 'bg-slate-900/60'}>
                          <td className="py-3 px-4 font-mono font-medium text-slate-400 w-1/3">{key}</td>
                          <td className="py-3 px-4 font-semibold text-slate-100">{val}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-950">
                        <td className="py-3 px-4 font-mono font-medium text-slate-400">Condition Rating</td>
                        <td className="py-3 px-4 font-semibold text-cyan-400">
                          {selectedProduct.condition === 'BRAND NEW' ? 'Factory Brand New (Sealed)' : `UK Used ${selectedProduct.ukUsedGrade || 'Grade A'} (100% Tested)`}
                        </td>
                      </tr>
                      <tr className="bg-slate-900">
                        <td className="py-3 px-4 font-mono font-medium text-slate-400">Alaba Warranty</td>
                        <td className="py-3 px-4 font-semibold text-emerald-400">{selectedProduct.warranty}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold font-mono text-white">{selectedProduct.rating} / 5.0</span>
                      <span className="text-xs text-slate-400">based on verified Alaba in-store & delivery customers</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {INITIAL_REVIEWS.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{rev.author}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-slate-400">{rev.location}</span>
                          </div>
                          <span className="text-slate-500 font-mono text-[11px]">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                          <span className="ml-2 text-[11px] font-mono text-emerald-400">Verified Purchase ({rev.productCondition})</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-800">
              <h3 className="text-sm font-semibold text-white mb-4">Related in {selectedProduct.category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProduct(rel);
                      setSelectedImgIdx(0);
                    }}
                    className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-14 h-14 object-contain rounded bg-slate-900 p-1 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-200 truncate">{rel.name}</p>
                      <p className="text-xs font-bold font-mono text-cyan-400 mt-0.5">
                        ₦{rel.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
