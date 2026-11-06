import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STORE_INFO } from '../data/mockData';

export const FloatingWhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage = encodeURIComponent(
    'Hello FASTBUY Electronics! I am messaging from your website to inquire about electronics prices, warranty, and Alaba showroom pickup.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl text-xs text-slate-200 max-w-xs animate-fadeIn relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="font-semibold text-emerald-400 mb-0.5">Chat with Alaba Sales Desk</p>
          <p className="text-[11px] text-slate-300">
            Have questions about a TV, Inverter, or Save To Buy? Message us on WhatsApp: <strong>{STORE_INFO.phone}</strong>
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={`https://wa.me/2347013990666?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl shadow-emerald-950/60 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        aria-label="Chat on WhatsApp 07013990666"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-bold text-xs hidden sm:inline whitespace-nowrap">
          WhatsApp FastBuy
        </span>
      </a>
    </div>
  );
};
