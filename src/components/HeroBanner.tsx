import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import heroImage from '../assets/images/hero_flagship_electronics_1793977432202.jpg';
import tvImage from '../assets/images/product_oled_smart_tv_1793977433232.jpg';
import fridgeImage from '../assets/images/product_smart_refrigerator_1793977434129.jpg';
import acImage from '../assets/images/product_inverter_ac_1793977434537.jpg';
import generatorImage from '../assets/images/product_silent_generator_1793977434099.jpg';

type HeroSlide = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  category: string;
  primary: string;
  secondary: string;
};

const slides: HeroSlide[] = [
  {
    eyebrow: 'Alaba International Market · Lagos',
    title: 'Power your home with',
    highlight: 'better electronics.',
    description: 'Shop trusted appliances, carefully selected for your home and business.',
    image: heroImage,
    category: 'ALL',
    primary: 'Explore electronics',
    secondary: 'Browse new arrivals'
  },
  {
    eyebrow: 'Entertainment starts here',
    title: 'Bring every moment',
    highlight: 'to life.',
    description: 'Discover stunning 4K TVs and home entertainment at great value.',
    image: tvImage,
    category: 'TVs',
    primary: 'Shop Smart TVs',
    secondary: 'See TV collection'
  },
  {
    eyebrow: 'A smarter, fresher kitchen',
    title: 'More space. More',
    highlight: 'convenience.',
    description: 'Explore modern refrigerators built for everyday family life.',
    image: fridgeImage,
    category: 'Refrigerators',
    primary: 'Shop refrigerators',
    secondary: 'Explore appliances'
  },
  {
    eyebrow: 'Comfort for every season',
    title: 'Stay cool. Use power',
    highlight: 'more wisely.',
    description: 'Find efficient inverter air conditioners for Nigerian homes.',
    image: acImage,
    category: 'Air Conditioners',
    primary: 'Shop air conditioners',
    secondary: 'Explore appliances'
  },
  {
    eyebrow: 'Reliable power, less worry',
    title: 'Keep your world',
    highlight: 'running.',
    description: 'Discover dependable generators and power solutions for home or work.',
    image: generatorImage,
    category: 'Generators',
    primary: 'Shop generators',
    secondary: 'View power solutions'
  }
];

export const HeroBanner: React.FC = () => {
  const { setSelectedCondition, setSelectedCategory, setCurrentView } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[activeSlide];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const goToSlide = (index: number) => setActiveSlide((index + slides.length) % slides.length);

  const shop = () => {
    setSelectedCondition('ALL');
    setSelectedCategory(slide.category);
    setCurrentView('store');
    window.setTimeout(() => document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-slate-800 bg-[#050b1c]">
      <div className="relative mx-auto min-h-[390px] max-w-7xl px-4 py-7 sm:min-h-[420px] sm:px-6 sm:py-10 lg:min-h-[470px]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          {slides.map((item, index) => (
            <img key={item.image} src={item.image} alt="" aria-hidden="true" className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${index === activeSlide ? 'opacity-25 sm:opacity-30' : 'opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050b1c] via-[#050b1c]/95 to-[#050b1c]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050b1c] via-transparent to-[#050b1c]/35" />
          <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="relative grid min-h-[330px] grid-cols-[1.12fr_0.88fr] items-center gap-1 sm:min-h-[340px] sm:gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative z-10 min-w-0 py-4">
            <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-400/25 bg-slate-950/75 px-2.5 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-cyan-200 sm:px-3 sm:text-[10px] sm:tracking-[0.16em]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              <span className="truncate">{slide.eyebrow}</span>
            </div>
            <h1 className="max-w-[17rem] text-[clamp(1.55rem,5.8vw,3.6rem)] font-black leading-[1.08] tracking-tight text-white sm:max-w-xl">
              {slide.title} <span className="text-cyan-300">{slide.highlight}</span>
            </h1>
            <p className="mt-3 max-w-[19rem] text-[11px] leading-relaxed text-slate-300 sm:mt-4 sm:max-w-lg sm:text-base">
              {slide.description}
            </p>
            <div className="mt-5 flex max-w-full flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap">
              <button onClick={shop} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-3 py-3 text-[10px] font-extrabold text-slate-950 shadow-lg shadow-cyan-950/40 transition hover:bg-cyan-400 sm:px-5 sm:text-sm">
                <span>{slide.primary}</span><ArrowRight className="h-4 w-4 shrink-0" />
              </button>
              <button onClick={() => { setSelectedCondition('ALL'); setSelectedCategory('ALL'); setCurrentView('store'); document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-slate-950/65 px-3 py-3 text-[10px] font-bold text-white transition hover:border-cyan-400/60 hover:bg-slate-900 sm:px-4 sm:text-sm">
                {slide.secondary}
              </button>
            </div>
            <button onClick={() => setCurrentView('save_to_buy_dashboard')} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-950/60 px-3 py-2.5 text-[10px] font-bold text-cyan-200 transition hover:bg-cyan-900/70 sm:text-xs">
              <Sparkles className="h-4 w-4" /> Start with 30% · Save to Buy
            </button>
          </div>

          <div className="relative flex min-w-0 items-center justify-center">
            <div className="absolute h-[72%] w-[92%] rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative flex aspect-[4/5] w-full max-h-[285px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-slate-950/40 p-1 shadow-2xl shadow-black/30 backdrop-blur-[2px] sm:max-h-[360px] sm:rounded-3xl sm:p-4">
              <img key={slide.image} src={slide.image} alt={slide.category === 'ALL' ? 'Featured electronics collection' : slide.category} className="h-full w-full object-contain drop-shadow-2xl transition-all duration-500" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/80 px-2 py-2 backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4 sm:px-3">
                <span className="truncate text-[8px] font-bold uppercase tracking-wider text-slate-200 sm:text-[10px]">{slide.category === 'ALL' ? 'Featured collection' : slide.category}</span>
                <span className="ml-2 shrink-0 text-[8px] font-semibold text-cyan-300 sm:text-[10px]">FASTBUY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3 sm:mt-5 sm:pt-4">
          <div className="hidden items-center gap-4 text-[10px] text-slate-400 sm:flex">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-cyan-300" /> Quality checked</span>
            <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-cyan-300" /> Delivery available</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="mr-1 text-[9px] font-semibold tabular-nums text-slate-400 sm:text-[10px]">0{activeSlide + 1} / 0{slides.length}</span>
            <button onClick={() => goToSlide(activeSlide - 1)} aria-label="Previous slide" className="rounded-full border border-white/15 bg-slate-900/70 p-2 text-white hover:border-cyan-400"><ArrowLeft className="h-3.5 w-3.5" /></button>
            <div className="flex items-center gap-1.5">
              {slides.map((item, index) => <button key={item.category} onClick={() => goToSlide(index)} aria-label={`Show ${item.category} slide`} aria-current={index === activeSlide ? 'true' : undefined} className={`h-1.5 rounded-full transition-all ${index === activeSlide ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/40 hover:bg-white'}`} />)}
            </div>
            <button onClick={() => goToSlide(activeSlide + 1)} aria-label="Next slide" className="rounded-full border border-white/15 bg-slate-900/70 p-2 text-white hover:border-cyan-400"><ArrowRight className="h-3.5 w-3.5" /></button>
            <button onClick={() => setPaused(!paused)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} className="rounded-full border border-white/15 bg-slate-900/70 p-2 text-slate-300 hover:text-white">{paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}</button>
          </div>
        </div>
      </div>
    </section>
  );
};
