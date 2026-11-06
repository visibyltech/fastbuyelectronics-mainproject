import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Truck,
  PiggyBank,
  CreditCard
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STORE_INFO } from '../data/mockData';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setSelectedCondition } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-900 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Alaba Bench Tested</p>
              <p className="text-[11px] text-slate-500">100% verified authentic units</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Save To Buy (30% Down)</p>
              <p className="text-[11px] text-slate-500">Flexible installment savings</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Nationwide Shipping</p>
              <p className="text-[11px] text-slate-500">36 States + FCT & Free Pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Direct Bank Settlement</p>
              <p className="text-[11px] text-slate-500">Zenith Bank verified transfers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={STORE_INFO.logoUrl}
                alt="FASTBUY ELECTRONICS Logo"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/50"
              />
              <span className="font-display font-extrabold text-lg text-white">
                FASTBUY <span className="text-cyan-400">ELECTRONICS</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Premier Nigerian electronics showroom located at the heart of Alaba International Market, Lagos. Delivering brand new home appliances and inspected Grade A UK used electronics to homes and businesses across Nigeria.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-mono">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Phone / WhatsApp: {STORE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{STORE_INFO.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Categories Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Electronics Categories
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('TVs');
                    setCurrentView('store');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Smart 4K & OLED TVs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Air Conditioners');
                    setCurrentView('store');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Inverter Air Conditioners
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Refrigerators');
                    setCurrentView('store');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Side-by-Side & French Fridges
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Generators');
                    setCurrentView('store');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Silent Diesel & Petrol Generators
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Laptops');
                    setCurrentView('store');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Laptops & Apple MacBooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Electronics Accessories');
                    setCurrentView('store');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Pure Sine Wave Solar Inverters
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Purchasing Systems (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Payment & Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('save_to_buy_dashboard')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <PiggyBank className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Save To Buy (30% Deposit)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('bnpl_dashboard')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Buy Now, Pay Later (BNPL)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('order_tracking')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Track Order / Delivery Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCondition('UK USED');
                    setCurrentView('store');
                  }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  UK Used Quality Standard Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hover:text-cyan-400 transition-colors font-mono"
                >
                  Store Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Directions (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Alaba Showroom
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Visiting Lagos? Come directly to 26 F Line, Alaba International Market, Ojo. Test units on running generator before purchase.
            </p>
            <a
              href="https://wa.me/2347013990666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 px-3 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 rounded-lg text-xs font-semibold"
            >
              Get Directions via WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} FASTBUY ELECTRONICS. All rights reserved. 26 F Line, Alaba International Market, Lagos.</p>
          <div className="flex items-center gap-4">
            <span>RC: 7819201-NG</span>
            <span>·</span>
            <span>Alaba Electronics Association Member</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
