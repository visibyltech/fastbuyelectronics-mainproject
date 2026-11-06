import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BNPLDashboard: React.FC = () => {
  const { bnplApplications, setCurrentView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-sky-950/60 border border-blue-800/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-950/90 border border-blue-700/60 text-blue-300 text-xs font-mono mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>FastBuy Electronics Credit System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Buy Now, Pay Later (BNPL) Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Spread payments over 3 to 12 months. Integrated architecture ready for Carbon, CredPal, and CDcare financing rails.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('store')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Apply For Electronics</span>
        </button>
      </div>

      {/* Integration readiness info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>BVN / NIN Credit Assessment</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Real-time identity verification and credit capacity checks matching Nigerian financial regulations.
          </p>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold">
            <Building2 className="w-4 h-4" />
            <span>Fintech Provider API Ready</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Data payload structured for plug-and-play webhook callbacks with Nigerian BNPL aggregators.
          </p>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold">
            <Calendar className="w-4 h-4" />
            <span>Automated Debit Mandates</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Supports Direct Debit (NIBSS e-BillsPay / Paystack Direct) on salary payment dates.
          </p>
        </div>
      </div>

      {/* Application List */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
          Active BNPL Applications & Facilities ({bnplApplications.length})
        </h3>

        {bnplApplications.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4 max-w-md mx-auto">
            <CreditCard className="w-10 h-10 text-blue-400 mx-auto" />
            <h4 className="text-sm font-semibold text-white">No BNPL Applications Yet</h4>
            <p className="text-xs text-slate-400">
              Select any television, laptop, or generator in our store and choose "Buy Now Pay Later" at checkout to apply.
            </p>
            <button
              onClick={() => setCurrentView('store')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
            >
              Browse Electronics
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bnplApplications.map((app) => (
              <div
                key={app.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4"
              >
                <div className="flex justify-between items-start gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">{app.id}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{app.productName}</h4>
                    <p className="text-xs text-slate-400">Applicant: {app.customerName}</p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold border ${
                      app.status === 'approved'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : app.status === 'rejected'
                        ? 'bg-rose-950 text-rose-400 border-rose-800'
                        : 'bg-amber-950 text-amber-400 border-amber-800'
                    }`}
                  >
                    {app.status === 'approved'
                      ? 'APPROVED'
                      : app.status === 'rejected'
                      ? 'REJECTED'
                      : 'UNDER REVIEW'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Total Price</span>
                    <span className="font-bold text-white tabular-nums">₦{app.productPrice.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Monthly Repayment</span>
                    <span className="font-bold text-cyan-400 tabular-nums">₦{app.monthlyInstallment.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Tenure</span>
                    <span className="font-bold text-slate-200">{app.durationMonths} Mos</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span>Employment Type:</span>
                    <span className="text-slate-200 font-medium">{app.employmentType}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span>Income Level:</span>
                    <span className="text-slate-200 font-mono">₦{app.monthlyIncome.toLocaleString()} / mo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
