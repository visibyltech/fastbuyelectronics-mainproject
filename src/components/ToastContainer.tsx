import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl flex items-start gap-3 animate-slideIn backdrop-blur-md ${
            toast.type === 'success'
              ? 'bg-slate-900/95 border-emerald-500/50 text-white'
              : toast.type === 'warning'
              ? 'bg-slate-900/95 border-amber-500/50 text-white'
              : toast.type === 'error'
              ? 'bg-slate-900/95 border-rose-500/50 text-white'
              : 'bg-slate-900/95 border-cyan-500/50 text-white'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />}

          <div className="flex-1 text-xs">
            <p className="font-bold text-white">{toast.title}</p>
            {toast.message && <p className="text-slate-300 mt-0.5 text-[11px] leading-snug">{toast.message}</p>}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
