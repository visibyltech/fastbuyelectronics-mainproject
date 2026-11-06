import React, { useEffect, useState } from 'react';
import {
  X,
  Copy,
  Check,
  Upload,
  CreditCard,
  PiggyBank,
  CheckCircle,
  Truck,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  FileText,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_STATES, STORE_INFO } from '../data/mockData';
import { Order, SaveToBuyPlan, BNPLApplication } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    clearCart,
    bankConfig,
    placeOrder,
    createSaveToBuyPlan,
    submitBNPLApplication,
    checkoutPreselectedProduct,
    checkoutDefaultMode,
    addToast,
    setCurrentView
  } = useApp();

  const [activeMode, setActiveMode] = useState<'buy_now' | 'save_to_buy' | 'bnpl'>(checkoutDefaultMode);

  useEffect(() => {
    if (isCheckoutOpen) setActiveMode(checkoutDefaultMode);
  }, [isCheckoutOpen, checkoutDefaultMode]);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [selectedState, setSelectedState] = useState(NIGERIAN_STATES[0].name);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [notes, setNotes] = useState('');

  // Payment proof details
  const [copiedBank, setCopiedBank] = useState(false);
  const [transferReference, setTransferReference] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  // Save to Buy state
  const [stbDurationMonths, setStbDurationMonths] = useState(3);
  const [stbFrequency, setStbFrequency] = useState<'weekly' | 'bi-weekly' | 'monthly'>('monthly');
  const [customDepositPercent, setCustomDepositPercent] = useState(30);

  // BNPL state
  const [employmentType, setEmploymentType] = useState<'Employed (Salary Earner)' | 'Business Owner / Trader' | 'Self Employed'>('Employed (Salary Earner)');
  const [employerName, setEmployerName] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(350000);
  const [bvnOrNin, setBvnOrNin] = useState('');
  const [bnplTenureMonths, setBnplTenureMonths] = useState(6);

  // Completed State
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [confirmedPlan, setConfirmedPlan] = useState<SaveToBuyPlan | null>(null);
  const [confirmedBNPL, setConfirmedBNPL] = useState<BNPLApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  // Compute products involved
  const items = checkoutPreselectedProduct
    ? [{ product: checkoutPreselectedProduct, quantity: 1 }]
    : cart;

  const subtotal = checkoutPreselectedProduct
    ? checkoutPreselectedProduct.price
    : cartSubtotal;

  const stateData = NIGERIAN_STATES.find((s) => s.name === selectedState) || NIGERIAN_STATES[0];
  const deliveryFee = deliveryMethod === 'pickup' ? 0 : stateData.fee;
  const totalAmount = subtotal + deliveryFee;

  // Save to Buy calculations
  const minDeposit = Math.round(subtotal * 0.3);
  const actualDeposit = Math.round(subtotal * (customDepositPercent / 100));
  const stbBalance = Math.max(0, subtotal - actualDeposit);

  const totalInstallments =
    stbFrequency === 'weekly'
      ? stbDurationMonths * 4
      : stbFrequency === 'bi-weekly'
      ? stbDurationMonths * 2
      : stbDurationMonths;

  const installmentAmount = Math.ceil(stbBalance / Math.max(1, totalInstallments));

  // BNPL calculations (6% interest flat per 3 months)
  const interestRate = (bnplTenureMonths / 3) * 0.05;
  const totalBnplAmount = Math.round(subtotal * (1 + interestRate));
  const monthlyBnplInstallment = Math.round(totalBnplAmount / bnplTenureMonths);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankConfig.accountNumber);
    setCopiedBank(true);
    addToast({
      type: 'success',
      title: 'Account Number Copied!',
      message: `${bankConfig.accountNumber} copied to clipboard.`
    });
    setTimeout(() => setCopiedBank(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      const url = URL.createObjectURL(file);
      setReceiptPreview(url);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !phone) {
      addToast({
        type: 'warning',
        title: 'Missing Details',
        message: 'Please provide customer name and phone number'
      });
      return;
    }

    if ((activeMode === 'buy_now' || activeMode === 'save_to_buy') && !receiptFile) {
      addToast({ type: 'warning', title: 'Payment Receipt Required', message: 'Please upload your bank transfer receipt before submitting.' });
      return;
    }

    if (deliveryMethod === 'delivery' && (!address || !city)) {
      addToast({
        type: 'warning',
        title: 'Delivery Address Required',
        message: 'Please enter your city/LGA and full street address for delivery'
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (activeMode === 'buy_now') {
        const newOrder = placeOrder({
          customerName,
          phone,
          email: email || `${phone}@customer.fastbuy.ng`,
          address: deliveryMethod === 'pickup' ? 'Alaba Showroom 26 F Line' : address,
          state: selectedState,
          city: deliveryMethod === 'pickup' ? 'Ojo / Alaba' : city,
          deliveryMethod,
          paymentMethod: 'buy_now',
          items,
          subtotal,
          deliveryFee,
          totalAmount,
          paymentStatus: receiptFile ? 'pending_verification' : 'pending_verification',
          orderStatus: 'placed',
          receiptFileName: receiptFile ? receiptFile.name : '',
          receiptUrl: receiptPreview || '',
          transferReference: transferReference || `TRF-${Math.floor(100000 + Math.random() * 900000)}`,
          notes
        });

        if (!checkoutPreselectedProduct) clearCart();
        setConfirmedOrder(newOrder);
      } else if (activeMode === 'save_to_buy') {
        const targetProduct = items[0]?.product || checkoutPreselectedProduct;
        if (!targetProduct) return;

        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const newPlan = createSaveToBuyPlan(
          {
            customerName,
            phone,
            email: email || `${phone}@customer.fastbuy.ng`,
            productId: targetProduct.id,
            productName: targetProduct.name,
            productImage: targetProduct.images[0],
            productCondition: targetProduct.condition,
            totalPrice: targetProduct.price,
            durationMonths: stbDurationMonths,
            paymentFrequency: stbFrequency,
            installmentAmount,
            nextPaymentDate: nextMonth.toISOString().split('T')[0],
            deliveryMethod,
            deliveryAddress: deliveryMethod === 'pickup' ? 'Alaba Store Pickup' : `${city}, ${address}`,
            deliveryState: selectedState
          },
          actualDeposit,
          receiptFile ? receiptFile.name : '',
          receiptPreview || '',
          transferReference || `STB-INIT-${Math.floor(1000 + Math.random() * 9000)}`
        );

        if (!checkoutPreselectedProduct) clearCart();
        setConfirmedPlan(newPlan);
      } else if (activeMode === 'bnpl') {
        const targetProduct = items[0]?.product || checkoutPreselectedProduct;
        if (!targetProduct) return;

        const newBNPL = submitBNPLApplication({
          customerName,
          phone,
          email: email || `${phone}@customer.fastbuy.ng`,
          productId: targetProduct.id,
          productName: targetProduct.name,
          productPrice: targetProduct.price,
          employmentType,
          employerName: employerName || 'Self Employed / Trader',
          monthlyIncome,
          bvnOrNin: bvnOrNin,
          durationMonths: bnplTenureMonths,
          monthlyInstallment: monthlyBnplInstallment,
          interestRate: Math.round(interestRate * 100)
        });

        if (!checkoutPreselectedProduct) clearCart();
        setConfirmedBNPL(newBNPL);
      }

      setIsSubmitting(false);
    }, 800);
  };

  const handleReset = () => {
    setConfirmedOrder(null);
    setConfirmedPlan(null);
    setConfirmedBNPL(null);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-950/90 backdrop-blur-md flex items-start sm:items-center justify-center p-0 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl min-w-0 min-h-[100dvh] sm:min-h-0 bg-slate-900 border-0 sm:border sm:border-slate-800 rounded-none sm:rounded-2xl shadow-2xl overflow-hidden my-0 sm:my-4">
        {/* Modal Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4 border-b border-slate-800 bg-slate-950">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-white">
              {confirmedOrder || confirmedPlan || confirmedBNPL ? 'Order Confirmation' : 'Secure FastBuy Checkout'}
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-400">
              FASTBUY ELECTRONICS · Secure order payment
            </p>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed State Views */}
        {confirmedOrder && (
          <div className="p-8 space-y-6 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/50">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Order Placed Successfully
              </span>
              <h3 className="text-2xl font-bold font-display text-white">
                Thank You, {confirmedOrder.customerName}!
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Order Tracking ID: <span className="text-cyan-400 font-bold text-sm">{confirmedOrder.id}</span>
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Amount:</span>
                <span className="font-mono font-bold text-white tabular-nums">₦{confirmedOrder.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fulfillment Method:</span>
                <span className="text-cyan-300 font-medium">
                  {confirmedOrder.deliveryMethod === 'pickup' ? 'Free Alaba Store Pickup (26 F Line)' : `Nationwide Delivery (${confirmedOrder.state})`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Proof:</span>
                <span className="text-emerald-400 font-medium">
                  {confirmedOrder.receiptFileName} (Uploaded)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-amber-400 font-mono font-bold">Awaiting Alaba Finance Clearance</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/2347013990666?text=${encodeURIComponent(
                  `Hello FASTBUY Alaba, I just submitted Order #${confirmedOrder.id} for ₦${confirmedOrder.totalAmount.toLocaleString()} under the name ${confirmedOrder.customerName}. Please confirm receipt.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>Notify Alaba Desk on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  handleReset();
                  setCurrentView('order_tracking');
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2"
              >
                <span>Track Order Live</span>
              </button>
            </div>
          </div>
        )}

        {confirmedPlan && (
          <div className="p-8 space-y-6 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-950/50">
              <PiggyBank className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Save To Buy Plan Activated
              </span>
              <h3 className="text-2xl font-bold font-display text-white">
                Savings Plan #{confirmedPlan.id} Created!
              </h3>
              <p className="text-xs text-slate-400">
                Item reserved: <strong className="text-white">{confirmedPlan.productName}</strong>
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Product Price:</span>
                <span className="font-mono font-bold text-white tabular-nums">₦{confirmedPlan.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Deposit Paid Today:</span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums">₦{confirmedPlan.depositedAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Remaining Balance:</span>
                <span className="font-mono font-bold text-cyan-300 tabular-nums">₦{confirmedPlan.outstandingBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Installment Schedule:</span>
                <span className="text-slate-200 font-mono">
                  ₦{confirmedPlan.installmentAmount.toLocaleString()} / {confirmedPlan.paymentFrequency}
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-xl text-left text-xs text-amber-200">
              <strong>Notice:</strong> Your item is securely tagged and stored at 26 F Line, Alaba International. Goods are released for delivery or store pickup once the final installment is paid in full.
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  handleReset();
                  setCurrentView('save_to_buy_dashboard');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Go to Save To Buy Dashboard
              </button>
            </div>
          </div>
        )}

        {confirmedBNPL && (
          <div className="p-8 space-y-6 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-blue-950/80 border border-blue-500/50 flex items-center justify-center mx-auto text-blue-400 shadow-xl shadow-blue-950/50">
              <CreditCard className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                BNPL Application Received
              </span>
              <h3 className="text-2xl font-bold font-display text-white">
                Application #{confirmedBNPL.id} Under Review
              </h3>
              <p className="text-xs text-slate-400">
                Evaluation for {confirmedBNPL.productName} ({confirmedBNPL.durationMonths} Months Tenure)
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Applicant:</span>
                <span className="text-white font-semibold">{confirmedBNPL.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Repayment:</span>
                <span className="text-cyan-400 font-mono font-bold">₦{confirmedBNPL.monthlyInstallment.toLocaleString()} / month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tenure:</span>
                <span className="text-slate-200">{confirmedBNPL.durationMonths} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-amber-400 font-mono font-bold">In Review (Alaba Credit Desk)</span>
              </div>
            </div>

            <button
              onClick={() => {
                handleReset();
                setCurrentView('bnpl_dashboard');
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            >
              View BNPL Dashboard
            </button>
          </div>
        )}

        {/* Main Form (When not confirmed) */}
        {!confirmedOrder && !confirmedPlan && !confirmedBNPL && (
          <form onSubmit={handleSubmitOrder} className="p-3 sm:p-6 overflow-y-auto max-h-[calc(100dvh-60px)] sm:max-h-[82vh] space-y-4 sm:space-y-6">
            {/* Independent payment method cards */}
            <section className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Choose how you want to pay</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button type="button" onClick={() => setActiveMode('buy_now')} aria-pressed={activeMode === 'buy_now'}
                  className={`min-w-0 min-h-[92px] rounded-xl border p-2 sm:p-3 flex flex-col items-center justify-center gap-2 text-center transition-all ${activeMode === 'buy_now' ? 'border-cyan-400 bg-cyan-950/60 ring-1 ring-cyan-400/40 text-white shadow-lg shadow-cyan-950/30' : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500'}`}>
                  <CreditCard className={`h-5 w-5 ${activeMode === 'buy_now' ? 'text-cyan-300' : 'text-slate-400'}`} />
                  <span className="text-[10px] sm:text-xs font-extrabold leading-tight">Buy Now,<br/>Pay Now</span>
                  <span className="text-[9px] leading-tight text-slate-400">Full payment</span>
                </button>
                <button type="button" onClick={() => setActiveMode('save_to_buy')} aria-pressed={activeMode === 'save_to_buy'}
                  className={`min-w-0 min-h-[92px] rounded-xl border p-2 sm:p-3 flex flex-col items-center justify-center gap-2 text-center transition-all ${activeMode === 'save_to_buy' ? 'border-cyan-400 bg-cyan-950/60 ring-1 ring-cyan-400/40 text-white shadow-lg shadow-cyan-950/30' : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500'}`}>
                  <PiggyBank className={`h-5 w-5 ${activeMode === 'save_to_buy' ? 'text-cyan-300' : 'text-slate-400'}`} />
                  <span className="text-[10px] sm:text-xs font-extrabold leading-tight">Save to Buy</span>
                  <span className="text-[9px] leading-tight text-slate-400">30% deposit</span>
                </button>
                <button type="button" onClick={() => setActiveMode('bnpl')} aria-pressed={activeMode === 'bnpl'}
                  className={`min-w-0 min-h-[92px] rounded-xl border p-2 sm:p-3 flex flex-col items-center justify-center gap-2 text-center transition-all ${activeMode === 'bnpl' ? 'border-cyan-400 bg-cyan-950/60 ring-1 ring-cyan-400/40 text-white shadow-lg shadow-cyan-950/30' : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500'}`}>
                  <FileText className={`h-5 w-5 ${activeMode === 'bnpl' ? 'text-cyan-300' : 'text-slate-400'}`} />
                  <span className="text-[10px] sm:text-xs font-extrabold leading-tight">Buy Now,<br/>Pay Later</span>
                  <span className="text-[9px] leading-tight text-slate-400">Apply for credit</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-400">{activeMode === 'buy_now' ? 'Pay the full amount by bank transfer and upload your receipt.' : activeMode === 'save_to_buy' ? 'Start with at least 30% and complete the balance in installments.' : 'Submit an application for review and choose a repayment period.'}</p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Customer details & Delivery (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Chukwuma Obi"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08012345678"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="chukwuma@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Fulfillment Selection */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <h3 className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
                    Delivery or Showroom Pickup
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        deliveryMethod === 'delivery'
                          ? 'bg-cyan-950/40 border-cyan-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="fulfillment"
                        checked={deliveryMethod === 'delivery'}
                        onChange={() => setDeliveryMethod('delivery')}
                        className="mt-0.5 text-cyan-500 focus:ring-0"
                      />
                      <div>
                        <div className="font-semibold text-xs flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Nationwide Delivery</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">Dispatched to your home or office</p>
                      </div>
                    </label>

                    <label
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        deliveryMethod === 'pickup'
                          ? 'bg-cyan-950/40 border-cyan-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="fulfillment"
                        checked={deliveryMethod === 'pickup'}
                        onChange={() => setDeliveryMethod('pickup')}
                        className="mt-0.5 text-cyan-500 focus:ring-0"
                      />
                      <div>
                        <div className="font-semibold text-xs flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Alaba Store Pickup</span>
                        </div>
                        <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Free pickup (26 F Line)</p>
                      </div>
                    </label>
                  </div>

                  {deliveryMethod === 'delivery' ? (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Destination State *</label>
                        <select
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        >
                          {NIGERIAN_STATES.map((st) => (
                            <option key={st.name} value={st.name}>
                              {st.name} (₦{st.fee.toLocaleString()} · Est. {st.estimatedDays})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">City / Local Government Area *</label>
                        <input
                          type="text"
                          required={deliveryMethod === 'delivery'}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Ikeja, Lagos"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Street Address / Landmark *</label>
                        <input
                          type="text"
                          required={deliveryMethod === 'delivery'}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. 12 Adeola Odeku St, Victoria Island"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                      <p className="text-white font-semibold">FASTBUY Official Alaba Pickup Desk</p>
                      <p className="text-slate-400 text-[11px]">{STORE_INFO.address}</p>
                      <p className="text-cyan-400 font-mono text-[11px] pt-1">
                        Open Mon-Sat 8:00 AM - 6:00 PM · Direct warehouse testing before loading
                      </p>
                    </div>
                  )}
                </div>

                {/* Additional instructions */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Special Order Instructions</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call before dispatch, test with 2.5kVA generator before pickup..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Right Column: Mode-Specific Payment Breakdown (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Mode 1: BUY NOW, PAY NOW details */}
                {activeMode === 'buy_now' && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        Business Bank Account
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">Instant Verification</span>
                    </div>

                    {/* Configurable Bank Details Box */}
                    <div className="bg-slate-900/90 border border-cyan-800/50 rounded-xl p-3.5 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Bank:</span>
                        <span className="font-bold text-white">{bankConfig.bankName}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Account Name:</span>
                        <span className="font-semibold text-slate-200 text-right text-[11px]">{bankConfig.accountName}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-800">
                        <span className="text-slate-400 text-xs">Account Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-extrabold text-cyan-400 tracking-wider">
                            {bankConfig.accountNumber}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyAccount}
                            className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300 hover:text-white"
                            title="Copy Account Number"
                          >
                            {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono">{bankConfig.branch}</p>
                    </div>

                    {/* Receipt Upload & Transfer Reference */}
                    <div className="space-y-2.5 pt-1">
                      <label className="block text-xs font-semibold text-white">
                        Upload Payment Receipt / Teller Screenshot *
                      </label>
                      <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-900/40 transition-colors">
                        <Upload className="w-5 h-5 text-cyan-400 mb-1" />
                        <span className="text-xs text-slate-300 font-medium">
                          {receiptFile ? receiptFile.name : 'Click to select payment receipt'}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-0.5">PNG, JPG, PDF up to 10MB</span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>

                      {receiptPreview && (
                        <div className="p-2 bg-slate-900 rounded-lg flex items-center justify-between text-xs text-slate-300">
                          <span className="truncate max-w-[200px]">Attached: {receiptFile?.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400">Ready</span>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Transfer Narration / Reference ID</label>
                        <input
                          type="text"
                          value={transferReference}
                          onChange={(e) => setTransferReference(e.target.value)}
                          placeholder="e.g. ZEN-NIP-991823 / Transfer Session ID"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 2: SAVE TO BUY details */}
                {activeMode === 'save_to_buy' && (
                  <div className="bg-slate-950 border border-cyan-800/40 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        Save To Buy Calculator
                      </span>
                      <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded">
                        Min. 30% Deposit
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* Deposit Slider */}
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Initial Deposit ({customDepositPercent}%):</span>
                          <span className="font-mono font-bold text-cyan-300 tabular-nums">
                            ₦{actualDeposit.toLocaleString()}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="80"
                          step="5"
                          value={customDepositPercent}
                          onChange={(e) => setCustomDepositPercent(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span>30% Minimum</span>
                          <span>50%</span>
                          <span>80%</span>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-400 text-[11px] mb-1">Savings Duration</label>
                          <select
                            value={stbDurationMonths}
                            onChange={(e) => setStbDurationMonths(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                          >
                            <option value={1}>1 Month</option>
                            <option value={2}>2 Months</option>
                            <option value={3}>3 Months</option>
                            <option value={6}>6 Months</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-400 text-[11px] mb-1">Payment Frequency</label>
                          <select
                            value={stbFrequency}
                            onChange={(e) => setStbFrequency(e.target.value as any)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                          >
                            <option value="weekly">Weekly</option>
                            <option value="bi-weekly">Bi-Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      </div>

                      {/* Installment breakdown card */}
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
                        <div className="flex justify-between text-slate-400">
                          <span>Total Item Price:</span>
                          <span className="text-white font-bold">₦{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-emerald-400">
                          <span>Deposit Today:</span>
                          <span className="font-bold">₦{actualDeposit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Outstanding Balance:</span>
                          <span className="text-cyan-300 font-bold">₦{stbBalance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-cyan-400 pt-1 border-t border-slate-800 text-xs">
                          <span>{stbFrequency.toUpperCase()} Installment:</span>
                          <span className="font-extrabold">₦{installmentAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Deposit Bank Transfer Info */}
                      <div className="p-2.5 bg-sky-950/40 border border-cyan-800/40 rounded-lg space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300">Transfer Deposit To:</span>
                          <span className="text-cyan-300 font-bold font-mono">{bankConfig.accountNumber}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          {bankConfig.bankName} · {bankConfig.accountName}
                        </p>
                      </div>

                      {/* Receipt upload for deposit */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-200 mb-1">
                          Upload 30% Deposit Receipt
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-cyan-950 file:text-cyan-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 3: BUY NOW, PAY LATER details */}
                {activeMode === 'bnpl' && (
                  <div className="bg-slate-950 border border-blue-800/40 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                        BNPL Credit Application
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Carbon / CredPal / CDcare Ready</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 text-[11px] mb-1">Employment / Business Type *</label>
                        <select
                          value={employmentType}
                          onChange={(e) => setEmploymentType(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        >
                          <option value="Employed (Salary Earner)">Employed (Salary Earner)</option>
                          <option value="Business Owner / Trader">Business Owner / Trader</option>
                          <option value="Self Employed">Self Employed Professional</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-400 text-[11px] mb-1">Employer / Shop Name</label>
                          <input
                            type="text"
                            value={employerName}
                            onChange={(e) => setEmployerName(e.target.value)}
                            placeholder="Company or Business"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 text-[11px] mb-1">Monthly Income (₦)</label>
                          <input
                            type="number"
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-400 text-[11px] mb-1">BVN or NIN (Identity Verification)</label>
                          <input
                            type="text"
                            value={bvnOrNin}
                            onChange={(e) => setBvnOrNin(e.target.value)}
                            placeholder="11-digit verification"
                            maxLength={11}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 text-[11px] mb-1">Repayment Tenure</label>
                          <select
                            value={bnplTenureMonths}
                            onChange={(e) => setBnplTenureMonths(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                          >
                            <option value={3}>3 Months</option>
                            <option value={6}>6 Months</option>
                            <option value={9}>9 Months</option>
                            <option value={12}>12 Months</option>
                          </select>
                        </div>
                      </div>

                      {/* BNPL Repayment Preview */}
                      <div className="p-3 bg-blue-950/30 border border-blue-900/50 rounded-xl space-y-1 font-mono text-[11px]">
                        <div className="flex justify-between text-slate-400">
                          <span>Principal:</span>
                          <span className="text-white">₦{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Flat Financing Rate:</span>
                          <span className="text-cyan-400">{(interestRate * 100).toFixed(0)}%</span>
                        </div>
                        <div className="flex justify-between text-blue-300 pt-1 border-t border-slate-800 text-xs font-bold">
                          <span>Monthly Repayment:</span>
                          <span>₦{monthlyBnplInstallment.toLocaleString()} / mo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Summary Strip */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Items Subtotal:</span>
                    <span className="font-mono text-white tabular-nums">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Delivery Fee:</span>
                    <span className="font-mono text-cyan-300 tabular-nums">
                      {deliveryFee === 0 ? 'FREE (Store Pickup)' : `₦${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                    <span>Total Amount:</span>
                    <span className="font-mono text-cyan-400 tabular-nums">₦{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-950/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing with Alaba Desk...</span>
                  ) : activeMode === 'buy_now' ? (
                    <>
                      <span>Confirm Order & Submit Receipt</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : activeMode === 'save_to_buy' ? (
                    <>
                      <PiggyBank className="w-4 h-4" />
                      <span>Start Save To Buy Plan (Deposit ₦{actualDeposit.toLocaleString()})</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Submit BNPL Credit Application</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
