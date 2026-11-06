import React, { useState } from 'react';
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Upload,
  MessageCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { orders, uploadOrderReceipt, setCurrentView, addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('FBE-2026-8819');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders[0] || null
  );

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptRef, setReceiptRef] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQ = searchQuery.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === cleanQ ||
        o.phone.toLowerCase().includes(cleanQ) ||
        o.customerName.toLowerCase().includes(cleanQ)
    );

    if (found) {
      setSelectedOrder(found);
    } else {
      addToast({
        type: 'warning',
        title: 'Order Not Found',
        message: `No order found matching "${searchQuery}". Check your receipt or phone number.`
      });
    }
  };

  const handleUploadReceiptForOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !receiptFile) return;

    uploadOrderReceipt(
      selectedOrder.id,
      receiptFile.name,
      URL.createObjectURL(receiptFile),
      receiptRef || 'MANUAL-PROOF'
    );
    setReceiptFile(null);
    setReceiptRef('');
  };

  const STEPS: { status: OrderStatus; label: string; desc: string }[] = [
    {
      status: 'placed',
      label: 'Order Placed',
      desc: 'Order received into FASTBUY system'
    },
    {
      status: 'payment_verified',
      label: 'Payment Verified',
      desc: 'Zenith Bank transfer cleared by Alaba desk'
    },
    {
      status: 'processing',
      label: 'Bench Testing & Packing',
      desc: 'Technical inspection at 26 F Line Alaba'
    },
    {
      status: 'dispatched',
      label: selectedOrder?.deliveryMethod === 'pickup' ? 'Ready for Alaba Pickup' : 'Dispatched with Courier',
      desc: selectedOrder?.deliveryMethod === 'pickup' ? 'Waiting at Showroom 26 F Line' : `In transit to ${selectedOrder?.state || 'destination'}`
    },
    {
      status: 'delivered',
      label: 'Delivered / Handed Over',
      desc: 'Customer signed warranty and accepted unit'
    }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'payment_verified':
        return 1;
      case 'processing':
        return 2;
      case 'dispatched':
      case 'ready_for_pickup':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  const currentStepIdx = selectedOrder ? getStepIndex(selectedOrder.orderStatus) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Title & Search bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
              Track Order & Shipment
            </h1>
            <p className="text-xs text-slate-400">
              Enter your FastBuy Order Tracking Number (e.g. FBE-2026-8819) or phone number
            </p>
          </div>

          <button
            onClick={() => setCurrentView('store')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            ← Back to Storefront
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. FBE-2026-8819 or 08034458921"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Track
          </button>
        </form>

        {/* Quick Sample Links for easy testing */}
        <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
          <span className="text-[11px] font-mono text-slate-500">Recent Test Orders:</span>
          {orders.slice(0, 3).map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setSearchQuery(o.id);
                setSelectedOrder(o);
              }}
              className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-cyan-500 text-cyan-300 font-mono text-[11px]"
            >
              {o.id} ({o.customerName.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {selectedOrder ? (
        <div className="space-y-6">
          {/* Timeline Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  ORDER #{selectedOrder.id}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  Placed by {selectedOrder.customerName}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedOrder.phone} · Date: {selectedOrder.createdAt.split('T')[0]}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total Amount</span>
                <span className="text-xl font-bold font-mono text-white tabular-nums">
                  ₦{selectedOrder.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                {STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div
                      key={step.status}
                      className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 ${
                        isCurrent
                          ? 'bg-cyan-950/40 border-cyan-500 shadow-md'
                          : isDone
                          ? 'bg-slate-950/80 border-slate-700'
                          : 'bg-slate-950/30 border-slate-900 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">Step 0{idx + 1}</span>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-600" />
                        )}
                      </div>

                      <div>
                        <p className={`text-xs font-bold ${isDone ? 'text-white' : 'text-slate-500'}`}>
                          {step.label}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fulfillment & Payment Verification Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Fulfillment Destination</span>
                </div>
                <p className="text-white font-medium">
                  {selectedOrder.deliveryMethod === 'pickup'
                    ? 'Alaba Showroom Pickup (26 F Line, Alaba Int Market)'
                    : selectedOrder.address}
                </p>
                <p className="text-slate-400 font-mono text-[11px]">
                  State: {selectedOrder.state} {selectedOrder.deliveryFee === 0 ? '(Free Pickup)' : `(Delivery Fee: ₦${selectedOrder.deliveryFee.toLocaleString()})`}
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>Transfer Verification Proof</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {selectedOrder.paymentStatus.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">File:</span>
                  <span className="text-slate-200 truncate max-w-[180px]">
                    {selectedOrder.receiptFileName || 'No receipt attached'}
                  </span>
                </div>
              </div>
            </div>

            {/* Upload proof if missing */}
            {!selectedOrder.receiptFileName && (
              <form onSubmit={handleUploadReceiptForOrder} className="p-4 bg-sky-950/30 border border-cyan-800/40 rounded-xl space-y-3">
                <span className="text-xs font-bold text-cyan-300 block">
                  Upload Missing Transfer Receipt Proof
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    required
                    onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                    className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-cyan-950 file:text-cyan-300"
                  />
                  <input
                    type="text"
                    value={receiptRef}
                    onChange={(e) => setReceiptRef(e.target.value)}
                    placeholder="Transfer reference ID"
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Upload & Verify Receipt
                </button>
              </form>
            )}

            {/* WhatsApp Inquiry for this order */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Need instant update from our warehouse team?</span>
              <a
                href={`https://wa.me/2347013990666?text=${encodeURIComponent(
                  `Hello FASTBUY Alaba, I am inquiring about Order #${selectedOrder.id} (₦${selectedOrder.totalAmount.toLocaleString()}) for ${selectedOrder.customerName}. What is the dispatch status?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Alaba Desk on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs">
          Enter an order tracking number above to see shipment progression.
        </div>
      )}
    </div>
  );
};
