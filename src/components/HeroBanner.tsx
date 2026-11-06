import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import heroImage from '../assets/images/hero_flagship_electronics_1793977432202.jpg';
import tvImage from '../assets/images/product_oled_smart_tv_1793977433232.jpg';
import fridgeImage from '../assets/images/product_smart_refrigerator_1793977434129.jpg';
import acImage from '../assets/images/product_inverter_ac_1793977434537.jpg';
import generatorImage from '../assets/images/product_silent_generator_1793977434099.jpg';

const slides = [heroImage, tvImage, fridgeImage, acImage, generatorImage];

export const HeroBanner: React.FC = () => {
  const { setSelectedCondition, setCurrentView } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const shop = (condition: 'BRAND NEW' | 'UK USED') => {
    setSelectedCondition(condition);
    document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative isolate h-[250px] sm:h-[290px] lg:h-[340px] overflow-hidden border-b border-slate-800 bg-slate-950">
      {slides.map((image, index) => (
        <img
          key={image}
          src={image}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === activeSlide ? 'opacity-45' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-950/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Alaba International Market · Lagos
          </div>
          <h1 className="max-w-xl font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Quality electronics. <span className="text-cyan-300">Better value.</span>
          </h1>
          <p className="mt-2 max-w-lg text-xs leading-relaxed text-slate-200 sm:text-sm">
            Shop brand-new and quality-tested UK-used home electronics with flexible payment options.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => shop('BRAND NEW')} className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 sm:text-sm">
              Shop electronics <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => shop('UK USED')} className="rounded-lg border border-white/25 bg-slate-950/60 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:text-sm">
              UK used deals
            </button>
            <button onClick={() => setCurrentView('save_to_buy_dashboard')} className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/40 bg-cyan-950/70 px-3 py-2.5 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-900/80">
              <Sparkles className="h-3.5 w-3.5" /> Save to Buy · 30% deposit
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5" aria-label="Hero slideshow controls">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setActiveSlide(index)} aria-label={`Show slide ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === activeSlide ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/50 hover:bg-white'}`} />
        ))}
      </div>
    </section>
  );
};
