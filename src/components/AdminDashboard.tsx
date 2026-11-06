import React, { useState } from 'react';
import {
  ShieldCheck,
  Package,
  PiggyBank,
  CreditCard,
  Building,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Eye,
  Save,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory, ProductCondition, BankAccountConfig } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    saveToBuyPlans,
    verifySaveToBuyPayment,
    bnplApplications,
    updateBNPLStatus,
    bankConfig,
    updateBankConfig,
    setCurrentView,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'save_to_buy' | 'products' | 'bank_config' | 'bnpl'>('orders');

  // Orders search & filter
  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<'all' | 'placed' | 'processing' | 'dispatched' | 'delivered'>('all');

  // Bank config editing state
  const [bankForm, setBankForm] = useState<BankAccountConfig>({ ...bankConfig });

  // Add Product Modal state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('TVs');
  const [newProdCondition, setNewProdCondition] = useState<ProductCondition>('BRAND NEW');
  const [newProdPrice, setNewProdPrice] = useState<number>(350000);
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState<number>(420000);
  const [newProdStock, setNewProdStock] = useState<number>(10);
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdWarranty, setNewProdWarranty] = useState('1 Year Alaba Store Warranty');

  // Metrics
  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalSTBDeposits = saveToBuyPlans.reduce((sum, p) => sum + p.depositedAmount, 0);
  const pendingOrders = orders.filter((o) => o.paymentStatus === 'pending_verification').length;

  const handleSaveBankConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateBankConfig(bankForm);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdBrand || newProdPrice <= 0) {
      addToast({
        type: 'warning',
        title: 'Incomplete Details',
        message: 'Please provide valid name, brand and price'
      });
      return;
    }

    addProduct({
      name: newProdName,
      brand: newProdBrand,
      category: newProdCategory,
      condition: newProdCondition,
      price: newProdPrice,
      originalPrice: newProdOriginalPrice || newProdPrice,
      stock: newProdStock,
      rating: 4.8,
      reviewCount: 1,
      images: ['/src/assets/images/hero_flagship_electronics_1793977432202.jpg'],
      description: newProdDescription || 'High quality electronics tested at Alaba International Market.',
      keyFeatures: [
        '100% Tested & Verified at 26 F Line Alaba',
        'Tropicalized for Nigerian power and heat',
        'Pure copper wiring and robust transformer'
      ],
      specifications: {
        'Origin': 'Alaba Direct Storefront',
        'Condition': newProdCondition,
        'Inspection Date': new Date().toISOString().split('T')[0]
      },
      warranty: newProdWarranty,
      isFeatured: true
    });

    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdBrand('');
  };

  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== 'all' && o.orderStatus !== orderFilter) return false;
    if (orderSearch) {
      const q = orderSearch.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-xs mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Alaba Store Management Console</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
            FASTBUY Electronics Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Control center for inventory, customer orders, payment verification, and bank details.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('store')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
        >
          Return to Customer Storefront →
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
          <span className="text-xs text-slate-400">Total Store Revenue</span>
          <p className="text-xl font-bold font-mono text-white tabular-nums">
            ₦{totalSales.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-400 font-mono">
            {orders.length} order(s) processed
          </span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
          <span className="text-xs text-slate-400">Save To Buy Deposits</span>
          <p className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
            ₦{totalSTBDeposits.toLocaleString()}
          </p>
          <span className="text-[11px] text-cyan-300 font-mono">
            {saveToBuyPlans.length} active installment plan(s)
          </span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
          <span className="text-xs text-slate-400">Pending Receipt Checks</span>
          <p className="text-xl font-bold font-mono text-amber-400 tabular-nums">
            {pendingOrders}
          </p>
          <span className="text-[11px] text-slate-400 font-mono">
            Awaiting finance clearance
          </span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
          <span className="text-xs text-slate-400">Active Catalog SKUs</span>
          <p className="text-xl font-bold font-mono text-white tabular-nums">
            {products.length}
          </p>
          <span className="text-[11px] text-slate-400 font-mono">
            Brand New & UK Used
          </span>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Orders & Payment Receipts ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('save_to_buy')}
          className={`px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
            activeTab === 'save_to_buy'
              ? 'bg-cyan-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Save To Buy Plans ({saveToBuyPlans.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Product Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('bank_config')}
          className={`px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
            activeTab === 'bank_config'
              ? 'bg-cyan-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Bank Account Settings
        </button>

        <button
          onClick={() => setActiveTab('bnpl')}
          className={`px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
            activeTab === 'bnpl'
              ? 'bg-cyan-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          BNPL Applications ({bnplApplications.length})
        </button>
      </div>

      {/* Tab 1: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search by Order ID or phone..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter:</span>
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white"
              >
                <option value="all">All Orders</option>
                <option value="placed">Placed / Awaiting Verification</option>
                <option value="processing">Processing at Alaba</option>
                <option value="dispatched">Dispatched / Ready for Pickup</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Order ID & Date</th>
                  <th className="py-3 px-4">Customer & Contact</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Fulfillment</th>
                  <th className="py-3 px-4">Receipt Proof</th>
                  <th className="py-3 px-4">Status & Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono">
                      <span className="text-cyan-400 font-bold block">{order.id}</span>
                      <span className="text-slate-500 text-[10px]">{order.createdAt.split('T')[0]}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-white block">{order.customerName}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{order.phone}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-slate-300 font-medium">
                        {order.items.map((i) => `${i.product.name.slice(0, 24)}... (x${i.quantity})`).join(', ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                      ₦{order.totalAmount.toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-cyan-300 block">
                        {order.deliveryMethod === 'pickup' ? 'Alaba Store Pickup' : `Delivery (${order.state})`}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {order.receiptFileName ? (
                        <div className="space-y-0.5">
                          <span className="text-emerald-400 font-mono text-[11px] block truncate max-w-[130px]">
                            {order.receiptFileName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">Ref: {order.transferReference || 'N/A'}</span>
                        </div>
                      ) : (
                        <span className="text-amber-400 text-[11px]">No Receipt Yet</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value as any,
                              e.target.value === 'placed' ? 'pending_verification' : 'verified'
                            )
                          }
                          className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none"
                        >
                          <option value="placed">Placed (Pending)</option>
                          <option value="payment_verified">Payment Verified</option>
                          <option value="processing">Bench Testing</option>
                          <option value="dispatched">Dispatched / Pickup Ready</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Save To Buy Plans */}
      {activeTab === 'save_to_buy' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Plan ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Reserved Item</th>
                  <th className="py-3 px-4">Total Price</th>
                  <th className="py-3 px-4">Deposited</th>
                  <th className="py-3 px-4">Outstanding</th>
                  <th className="py-3 px-4">Next Payment</th>
                  <th className="py-3 px-4">Handover Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                {saveToBuyPlans.map((plan) => {
                  const percent = Math.min(100, Math.round((plan.depositedAmount / plan.totalPrice) * 100));
                  return (
                    <tr key={plan.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-cyan-400">{plan.id}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-white block">{plan.customerName}</span>
                        <span className="text-slate-400 font-mono text-[11px]">{plan.phone}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-200">{plan.productName}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                        ₦{plan.totalPrice.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-400 tabular-nums font-bold">
                        ₦{plan.depositedAmount.toLocaleString()} ({percent}%)
                      </td>
                      <td className="py-3 px-4 font-mono text-cyan-300 tabular-nums">
                        ₦{plan.outstandingBalance.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">{plan.nextPaymentDate}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            plan.status === 'completed'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {plan.status === 'completed' ? 'RELEASED' : 'SECURED AT ALABA'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Products Catalog Manager */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">All Store SKUs</h3>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product to Store</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Product Name & Category</th>
                  <th className="py-3 px-4">Condition</th>
                  <th className="py-3 px-4">Price (₦)</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Warranty</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-10 h-10 object-contain rounded bg-slate-950 p-1 shrink-0"
                        />
                        <div>
                          <span className="font-semibold text-white block">{prod.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {prod.brand} · {prod.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          prod.condition === 'BRAND NEW'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {prod.condition}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                      ₦{prod.price.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <span className={prod.stock > 0 ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                        {prod.stock} units
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-400">{prod.warranty}</td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Configurable Bank Account Settings (CRITICAL REQUIREMENT) */}
      {activeTab === 'bank_config' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl mx-auto space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-xs mb-2">
              <Building className="w-3.5 h-3.5" />
              <span>Configurable Checkout Bank Details</span>
            </div>
            <h3 className="text-lg font-bold text-white">Store Settlement Bank Account</h3>
            <p className="text-xs text-slate-400">
              Update your Nigerian business bank account. These details will be dynamically presented on customer checkout for Buy Now Pay Now and Save To Buy initial deposits.
            </p>
          </div>

          <form onSubmit={handleSaveBankConfig} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Bank Name *</label>
              <input
                type="text"
                required
                value={bankForm.bankName}
                onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Account Name *</label>
              <input
                type="text"
                required
                value={bankForm.accountName}
                onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Account Number (10 Digits NUBAN) *</label>
              <input
                type="text"
                required
                maxLength={10}
                value={bankForm.accountNumber}
                onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-cyan-400 font-mono font-bold text-sm focus:border-cyan-500 focus:outline-none tracking-wider"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Branch / Location</label>
              <input
                type="text"
                value={bankForm.branch}
                onChange={(e) => setBankForm({ ...bankForm, branch: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">WhatsApp Customer Support Line</label>
              <input
                type="text"
                value={bankForm.whatsappSupportNumber}
                onChange={(e) => setBankForm({ ...bankForm, whatsappSupportNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-xs focus:border-cyan-500 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Bank Account Details</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 5: BNPL Credit Applications */}
      {activeTab === 'bnpl' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Applicant & Contact</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Tenure & Monthly</th>
                  <th className="py-3 px-4">Income & Employment</th>
                  <th className="py-3 px-4">BVN / NIN</th>
                  <th className="py-3 px-4">Credit Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                {bnplApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400">{app.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-white block">{app.customerName}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{app.phone}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-200">{app.productName}</td>
                    <td className="py-3 px-4 font-mono">
                      <span className="font-bold text-white block">
                        ₦{app.monthlyInstallment.toLocaleString()} / mo
                      </span>
                      <span className="text-slate-500 text-[10px]">{app.durationMonths} Months</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-300 font-mono block">₦{app.monthlyIncome.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-500">{app.employmentType}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">{app.bvnOrNin}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          app.status === 'approved'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : app.status === 'rejected'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {app.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {app.status === 'pending_review' && (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => updateBNPLStatus(app.id, 'approved')}
                            className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateBNPLStatus(app.id, 'rejected')}
                            className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add New Product */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Add New Product to Alaba Catalog</h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Sony Bravia 75 Inch 4K HDR Smart TV"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Brand *</label>
                  <input
                    type="text"
                    required
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    placeholder="e.g. Sony, LG, Daikin"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="TVs">TVs</option>
                    <option value="Air Conditioners">Air Conditioners</option>
                    <option value="Refrigerators">Refrigerators</option>
                    <option value="Washing Machines">Washing Machines</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Phones">Phones</option>
                    <option value="Generators">Generators</option>
                    <option value="Kitchen Appliances">Kitchen Appliances</option>
                    <option value="Home Appliances">Home Appliances</option>
                    <option value="Electronics Accessories">Electronics Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Condition *</label>
                  <select
                    value={newProdCondition}
                    onChange={(e) => setNewProdCondition(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="BRAND NEW">BRAND NEW</option>
                    <option value="UK USED">UK USED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (₦) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Warranty Term</label>
                <input
                  type="text"
                  value={newProdWarranty}
                  onChange={(e) => setNewProdWarranty(e.target.value)}
                  placeholder="e.g. 2 Years Manufacturer Warranty"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  placeholder="Key features and technical summary"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Publish SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
