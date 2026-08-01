/**
 * Mervason Core Domain Models & Type Definitions
 */

export type UserRole = 'client' | 'merchant' | 'admin';

export type OperatingCity = 'Yaoundé' | 'Douala' | 'Autre';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  phoneNumber?: string;
  city?: OperatingCity;
  createdAt: string;
  updatedAt?: string;
}

export type StoreStatus = 'active' | 'suspended';

export interface Store {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  whatsappNumber: string;
  city: OperatingCity;
  address?: string;
  isVerified: boolean;
  status: StoreStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  storeId: string;
  ownerId: string;
  name: string;
  description: string;
  price: number;
  currency: 'XAF';
  categoryId: string;
  images: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description?: string;
  order: number;
}

export type PlanId = 'free' | 'standard' | 'pro';

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  tagline: string;
  priceMonthlyXAF: number;
  maxStores: number;
  maxProductsPerStore: number;
  isPopular?: boolean;
  features: string[];
}

export type SubscriptionStatus = 'active' | 'cancelled' | 'expired';

export interface Subscription {
  id: string;
  merchantId: string;
  planId: PlanId;
  status: SubscriptionStatus;
  startDate: string;
  endDate?: string;
}

export type PaymentProvider = 'mtn_momo' | 'orange_money' | 'card';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface PaymentRecord {
  id: string;
  merchantId: string;
  planId: PlanId;
  amountXAF: number;
  provider: PaymentProvider;
  status: PaymentStatus;
  createdAt: string;
}

export interface SystemNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  requiredRole?: UserRole;
}
