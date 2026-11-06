import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import heroImage from '../assets/images/hero_flagship_electronics_1793977432202.jpg';
import tvImage from '../assets/images/product_oled_smart_tv_1793977433232.jpg';
import fridgeImage from '../assets/images/product_smart_refrigerator_1793977434129.jpg';
import acImage from '../assets/images/product_inverter_ac_1793977434537.jpg';
import generatorImage from '../assets/images/product_silent_generator_1793977434099.jpg';

type HeroSlide = {
  title: string;
  highlight: string;
  image: string;
  category: string;
  button: string;
};

const slides: HeroSlide[] = [
  { title: 'Everything your home needs.', highlight: 'All in one place.', image: heroImage, category: 'ALL', button: 'Shop electronics' },
  { title: 'Big-screen moments.', highlight: 'Better entertainment.', image: tvImage, category: 'TVs', button: 'Shop televisions' },
  { title: 'Keep it fresh.', highlight: 'Live more comfortably.', image: fridgeImage, category: 'Refrigerators', button: 'Shop refrigerators' },
  { title: 'Comfort in every season.', highlight: 'Stay cool.', image: acImage, category: 'Air Conditioners', button: 'Shop air conditioners' },
  { title: 'Power through every day.', highlight: 'Stay switched on.', image: generatorImage, category: 'Generators', button: 'Shop generators' }
];

export const HeroBanner: React.FC = () => {
  const { setSelectedCondition, setSelectedCategory, setCurrentView } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide(current => (current + 1) % slides.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  const shop = () => {
    setSelectedCondition('ALL');
    setSelectedCategory(slide.category);
    setCurrentView('store');
    window.setTimeout(() => document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  };

  return (
    <section className="relative isolate h-[310px] overflow-hidden border-b border-slate-800 bg-[#030817] sm:h-[380px] lg:h-[440px]">
      {slides.map((item, index) => (
        <img
          key={item.image}
          src={item.image}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030817]/95 via-[#030817]/75 to-[#030817]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030817]/80 via-transparent to-[#030817]/25" />
      <div className="absolute inset-0 bg-[#030817]/10" />

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-12">
        <div className="max-w-[34rem] min-w-0 pb-7 sm:pb-9">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-300 sm:mb-4 sm:text-xs">FASTBUY ELECTRONICS · ALABA, LAGOS</p>
          <h1 className="max-w-[19rem] text-[clamp(1.8rem,7vw,3.6rem)] font-black leading-[1.05] tracking-tight text-white sm:max-w-xl">
            {slide.title} <span className="text-cyan-300">{slide.highlight}</span>
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
            <button onClick={shop} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-xs font-extrabold text-slate-950 shadow-lg shadow-cyan-950/40 transition hover:bg-cyan-400 sm:text-sm">
              {slide.button}<ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => setCurrentView('save_to_buy_dashboard')} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/30 bg-slate-950/40 px-3 py-2.5 text-[11px] font-semibold text-white backdrop-blur-sm transition hover:border-cyan-300 hover:text-cyan-200 sm:text-xs">
              <Sparkles className="h-4 w-4 text-cyan-300" /> Save to Buy
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-5 z-10 flex items-center gap-1.5 sm:bottom-5 sm:right-8" aria-label="Automatic slideshow progress">
        {slides.map((item, index) => (
          <span key={item.category} className={`h-1.5 rounded-full transition-all duration-500 ${index === activeSlide ? 'w-7 bg-cyan-400' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
   </section>
  );
};
