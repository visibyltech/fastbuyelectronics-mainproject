export type ProductCondition = 'BRAND NEW' | 'UK USED';

export type ProductCategory =
  | 'TVs'
  | 'Air Conditioners'
  | 'Refrigerators'
  | 'Washing Machines'
  | 'Laptops'
  | 'Phones'
  | 'Generators'
  | 'Kitchen Appliances'
  | 'Home Appliances'
  | 'Electronics Accessories';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  condition: ProductCondition;
  price: number;
  originalPrice: number;
  stock: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  keyFeatures: string[];
  specifications: Record<string, string>;
  warranty: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isSpecialDeal?: boolean;
  ukUsedGrade?: 'Grade A+' | 'Grade A' | 'Grade B+';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'placed'
  | 'payment_verified'
  | 'processing'
  | 'dispatched'
  | 'ready_for_pickup'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'buy_now' | 'save_to_buy' | 'bnpl';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  city: string;
  deliveryMethod: 'delivery' | 'pickup';
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentStatus: 'pending_verification' | 'verified' | 'failed';
  orderStatus: OrderStatus;
  receiptUrl?: string;
  receiptFileName?: string;
  transferReference?: string;
  createdAt: string;
  notes?: string;
}

export interface SaveToBuyPayment {
  id: string;
  date: string;
  amount: number;
  receiptUrl?: string;
  receiptFileName?: string;
  reference?: string;
  status: 'pending' | 'verified';
  note?: string;
}

export interface SaveToBuyPlan {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  productId: string;
  productName: string;
  productImage: string;
  productCondition: ProductCondition;
  totalPrice: number;
  depositedAmount: number;
  outstandingBalance: number;
  durationMonths: number;
  paymentFrequency: 'weekly' | 'bi-weekly' | 'monthly';
  installmentAmount: number;
  nextPaymentDate: string;
  deliveryMethod: 'delivery' | 'pickup';
  deliveryAddress: string;
  deliveryState: string;
  status: 'active' | 'completed' | 'cancelled';
  payments: SaveToBuyPayment[];
  createdAt: string;
}

export interface BNPLApplication {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  productId: string;
  productName: string;
  productPrice: number;
  employmentType: 'Employed (Salary Earner)' | 'Business Owner / Trader' | 'Self Employed';
  employerName: string;
  monthlyIncome: number;
  bvnOrNin: string;
  durationMonths: number;
  monthlyInstallment: number;
  interestRate: number;
  status: 'pending_review' | 'approved' | 'rejected';
  repaymentStatus?: 'current' | 'completed' | 'overdue';
  createdAt: string;
}

export interface BankAccountConfig {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  transferInstructions: string;
  whatsappSupportNumber: string;
}

export interface NigerianStateDelivery {
  name: string;
  zone: string;
  fee: number;
  estimatedDays: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productCondition: ProductCondition;
}
