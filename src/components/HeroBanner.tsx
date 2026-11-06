import React from 'react';
import { ShieldCheck, Truck, Clock, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroBanner: React.FC = () => {
  const { setSelectedCondition, setSelectedCategory, setCurrentView } = useApp();

  return (
    <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & Action Triggers */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>26 F Line, Alaba International Market Lagos</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
              Premium Electronics Direct from Alaba Hub to Your Home.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Shop verified <strong className="text-white font-semibold">Brand New</strong> appliances with manufacturer warranty and tested <strong className="text-white font-semibold">Grade A UK Used</strong> electronics. Flexible payment with <strong className="text-cyan-400 font-semibold">Save To Buy (30% Deposit)</strong> and Buy Now Pay Later.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCondition('BRAND NEW');
                  window.scrollTo({ top: 650, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <span>Shop Brand New</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedCondition('UK USED');
                  window.scrollTo({ top: 650, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span>UK Used Deals</span>
              </button>

              <button
                onClick={() => setCurrentView('save_to_buy_dashboard')}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-900/60 to-cyan-900/60 hover:from-blue-800/80 hover:to-cyan-800/80 text-cyan-300 border border-cyan-700/50 text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Save To Buy (30% Down)</span>
              </button>
            </div>

            {/* Key Assurance Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Tested at Alaba</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Up to 2 Years Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Nationwide Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Resolution Showcase Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-cyan-950/40 group">
              <img
                src="/src/assets/images/hero_flagship_electronics_1793977432202.jpg"
                alt="FASTBUY Electronics Showroom Alaba International"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-xl">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="text-white font-semibold">Alaba Showroom Direct</p>
                    <p className="text-slate-400 text-[11px]">Free Store Pickup or Express Delivery</p>
                  </div>
                  <span className="font-mono text-cyan-400 text-xs font-bold px-2 py-1 bg-cyan-950 border border-cyan-800 rounded">
                    07013990666
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
