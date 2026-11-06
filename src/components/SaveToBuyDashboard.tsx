import React, { useState } from 'react';
import {
  PiggyBank,
  CheckCircle2,
  Calendar,
  Upload,
  ArrowRight,
  ShieldAlert,
  Clock,
  FileCheck,
  Plus,
  Copy,
  Check,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SaveToBuyPlan } from '../types';

export const SaveToBuyDashboard: React.FC = () => {
  const {
    saveToBuyPlans,
    addSaveToBuyPayment,
    bankConfig,
    setCurrentView,
    addToast
  } = useApp();

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    saveToBuyPlans[0]?.id || null
  );

  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(100000);
  const [depositReceiptFile, setDepositReceiptFile] = useState<File | null>(null);
  const [depositReceiptPreview, setDepositReceiptPreview] = useState<string | null>(null);
  const [depositReference, setDepositReference] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);

  const activePlan = saveToBuyPlans.find((p) => p.id === selectedPlanId) || saveToBuyPlans[0];

  // Overall totals
  const totalValue = saveToBuyPlans.reduce((sum, p) => sum + p.totalPrice, 0);
  const totalDeposited = saveToBuyPlans.reduce((sum, p) => sum + p.depositedAmount, 0);
  const totalOutstanding = saveToBuyPlans.reduce((sum, p) => sum + p.outstandingBalance, 0);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankConfig.accountNumber);
    setCopiedBank(true);
    addToast({
      type: 'success',
      title: 'Copied!',
      message: 'Bank account number copied'
    });
    setTimeout(() => setCopiedBank(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDepositReceiptFile(file);
      const url = URL.createObjectURL(file);
      setDepositReceiptPreview(url);
    }
  };

  const handleRecordDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePlan) return;

    if (depositAmount <= 0) {
      addToast({
        type: 'warning',
        title: 'Invalid Amount',
        message: 'Deposit amount must be greater than zero'
      });
      return;
    }

    addSaveToBuyPayment(
      activePlan.id,
      depositAmount,
      depositReceiptFile ? depositReceiptFile.name : `deposit_receipt_${depositAmount}.pdf`,
      depositReceiptPreview || '',
      depositReference || `TRF-${Date.now()}`
    );

    setIsDepositModalOpen(false);
    setDepositReceiptFile(null);
    setDepositReceiptPreview(null);
    setDepositReference('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-950/70 via-slate-900 to-sky-950/70 border border-cyan-800/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/90 border border-cyan-700/60 text-cyan-300 text-xs font-mono mb-2">
            <PiggyBank className="w-3.5 h-3.5" />
            <span>FASTBUY Flexible Installments</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Save To Buy Customer Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Track your electronics savings balance, upload transfer receipts for ongoing installments, and monitor your delivery readiness.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('store')}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Save For Another Item</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
          <span className="text-xs text-slate-400">Total Goods Reserved</span>
          <p className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
            ₦{totalValue.toLocaleString()}
          </p>
          <span className="text-[11px] text-cyan-400 font-mono">
            {saveToBuyPlans.length} active savings plan(s)
          </span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-emerald-900/40 rounded-xl space-y-1">
          <span className="text-xs text-slate-400">Total Deposited So Far</span>
          <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            ₦{totalDeposited.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-300/80 font-mono">
            {totalValue > 0 ? `${Math.round((totalDeposited / totalValue) * 100)}% overall funded` : '0%'}
          </span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
          <span className="text-xs text-slate-400">Outstanding Balance to Clear</span>
          <p className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 tabular-nums">
            ₦{totalOutstanding.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-500 font-mono">
            Items release upon zero balance
          </span>
        </div>
      </div>

      {saveToBuyPlans.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4 max-w-lg mx-auto">
          <PiggyBank className="w-12 h-12 text-cyan-400 mx-auto" />
          <h3 className="text-base font-semibold text-white">No Active Save To Buy Plans</h3>
          <p className="text-xs text-slate-400">
            Start saving for any television, generator, inverter, or refrigerator with only 30% initial deposit!
          </p>
          <button
            onClick={() => setCurrentView('store')}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Explore Electronics Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Plan Selector Sidebar Left (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
              Your Reserved Items ({saveToBuyPlans.length})
            </h3>

            <div className="space-y-3">
              {saveToBuyPlans.map((plan) => {
                const isSelected = plan.id === activePlan?.id;
                const progress = Math.min(100, Math.round((plan.depositedAmount / plan.totalPrice) * 100));

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={plan.productImage}
                        alt={plan.productName}
                        className="w-14 h-14 object-contain rounded-lg bg-slate-900 p-1 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400">
                          <span>{plan.id}</span>
                          <span className={plan.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}>
                            {plan.status.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-white truncate mt-0.5">{plan.productName}</h4>
                        <p className="text-xs font-bold font-mono text-cyan-300 mt-1 tabular-nums">
                          ₦{plan.totalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-400">Funded: {progress}%</span>
                        <span className="text-emerald-400 font-bold tabular-nums">
                          ₦{plan.depositedAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Crucial Handover Policy Notice */}
            <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-xl space-y-2 text-xs text-amber-200">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Product Release Policy</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-200/90">
                In line with Alaba International electronics retail standards, physical goods remain safely warehoused and tagged in your name at 26 F Line. Products are released for pickup or doorstep delivery only upon 100% full payment confirmation.
              </p>
            </div>
          </div>

          {/* Active Plan Detail & Ledger Right (8 cols) */}
          {activePlan && (
            <div className="lg:col-span-8 space-y-6">
              {/* Active Plan Top Detail Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <span>PLAN ID: {activePlan.id}</span>
                      <span>·</span>
                      <span className="text-slate-400">Started {activePlan.createdAt.split('T')[0]}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white mt-1">{activePlan.productName}</h2>
                    <span className="text-xs text-slate-400">Customer: {activePlan.customerName} ({activePlan.phone})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activePlan.outstandingBalance > 0 ? (
                      <button
                        onClick={() => {
                          setDepositAmount(activePlan.installmentAmount);
                          setIsDepositModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Next Payment Receipt</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-bold">
                        100% Fully Paid · Ready for Delivery
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">Savings Progress</span>
                    <span className="text-sm font-mono font-bold text-cyan-400">
                      {Math.min(100, Math.round((activePlan.depositedAmount / activePlan.totalPrice) * 100))}% Completed
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.round((activePlan.depositedAmount / activePlan.totalPrice) * 100))}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-mono pt-1 text-slate-400">
                    <span>Deposited: ₦{activePlan.depositedAmount.toLocaleString()}</span>
                    <span className="text-cyan-300 font-bold">
                      Remaining: ₦{activePlan.outstandingBalance.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Key Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Installment Amount</span>
                    <span className="font-mono font-bold text-white text-sm tabular-nums">
                      ₦{activePlan.installmentAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">
                      {activePlan.paymentFrequency}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Next Due Date</span>
                    <span className="font-mono font-bold text-cyan-300 text-sm">
                      {activePlan.nextPaymentDate}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      Duration: {activePlan.durationMonths} Mos
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Fulfillment</span>
                    <span className="font-bold text-white text-xs">
                      {activePlan.deliveryMethod === 'pickup' ? 'Alaba Store Pickup' : 'Doorstep Delivery'}
                    </span>
                    <span className="text-[10px] text-cyan-400 block truncate">
                      {activePlan.deliveryState}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Item Status</span>
                    <span className="font-bold text-amber-400 text-xs">
                      {activePlan.status === 'completed' ? 'Cleared for Handover' : 'Tagged in Warehouse'}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      {activePlan.productCondition}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment History & Receipts Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">Payment & Receipt Ledger</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {activePlan.payments.length} installment(s) logged
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase">
                      <tr>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Amount Paid</th>
                        <th className="py-3 px-4">Reference</th>
                        <th className="py-3 px-4">Receipt Proof</th>
                        <th className="py-3 px-4">Finance Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                      {activePlan.payments.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 font-mono text-slate-300">{p.date}</td>
                          <td className="py-3 px-4 font-mono font-bold text-emerald-400 tabular-nums">
                            ₦{p.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-400">{p.reference || 'N/A'}</td>
                          <td className="py-3 px-4">
                            <span className="text-cyan-400 font-medium truncate max-w-[150px] block" title={p.receiptFileName}>
                              {p.receiptFileName || 'receipt_slip.pdf'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>VERIFIED</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal: Upload Subsequent Installment Receipt */}
      {isDepositModalOpen && activePlan && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Record Next Installment</h3>
                <p className="text-xs text-slate-400">Plan #{activePlan.id} · {activePlan.productName}</p>
              </div>
              <button
                onClick={() => setIsDepositModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleRecordDeposit} className="space-y-4">
              {/* Bank Account reminder */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Transfer Bank:</span>
                  <span className="font-semibold text-white">{bankConfig.bankName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Account No:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-400 text-sm">{bankConfig.accountNumber}</span>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="p-1 rounded bg-slate-800 text-slate-300"
                    >
                      {copiedBank ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Name:</span>
                  <span className="truncate">{bankConfig.accountName}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Amount Deposited (₦) *
                </label>
                <input
                  type="number"
                  required
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  placeholder="e.g. 150000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                />
                <span className="text-[11px] text-slate-500">
                  Current balance remaining: ₦{activePlan.outstandingBalance.toLocaleString()}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Transfer Reference / Session ID
                </label>
                <input
                  type="text"
                  value={depositReference}
                  onChange={(e) => setDepositReference(e.target.value)}
                  placeholder="e.g. ZEN-NIP-123490"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Upload Payment Receipt Screenshot *
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  required
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-cyan-950 file:text-cyan-300"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDepositModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Submit Payment Proof
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
