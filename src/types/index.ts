// 活動類型
export type EventType = 'event' | 'concert' | 'family' | 'wedding';

// 服務類型
export type ServiceType = 'photo' | 'video' | 'both';

// 項目類別
export type ItemCategory = 'shooting' | 'equipment' | 'postProduction' | 'staffing';

// 活動類型對照
export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  event: '活動攝影',
  concert: '音樂會攝影',
  family: '家庭活動',
  wedding: '婚禮婚紗',
};

// 服務類型對照
export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  photo: '拍照',
  video: '錄影',
  both: '拍照+錄影',
};

// 套餐定義
export interface Package {
  id: string;
  eventType: EventType;
  serviceType: ServiceType;
  name: string;
  description: string;
  basePrice: number;
  includedItems: PackageItem[];
  isActive: boolean;
  sortOrder: number;
}

export interface PackageItem {
  name: string;
  quantity: number;
  unit: string;
  note?: string;
}

// 後製方案
export interface PostProductionPlan {
  id: string;
  serviceType: 'photo' | 'video';
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  sortOrder: number;
}

// 加購項目
export interface AddOnItem {
  id: string;
  category: ItemCategory;
  name: string;
  unit: string;
  unitPrice: number;
  minQuantity?: number;
  maxQuantity?: number;
  eventTypes: EventType[];
  serviceTypes: ServiceType[];
  isActive: boolean;
  sortOrder: number;
}

// 折扣規則
export interface Discount {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  conditions: DiscountCondition;
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
}

export interface DiscountCondition {
  minTotal?: number;
  earlyBirdDays?: number;
  packageIds?: string[];
  serviceTypes?: ServiceType[];
}

// 客戶資料
export interface CustomerInfo {
  name: string;
  phone: string;
  eventDate: string;
  eventLocation?: string;
  notes?: string;
}

// 報價記錄
export interface Quote {
  id: string;
  createdAt: string;
  expiresAt: string;

  customer: CustomerInfo;

  eventType: EventType;
  serviceType: ServiceType;

  selectedPackage: {
    packageId: string;
    packageName: string;
    basePrice: number;
  };

  postProduction: {
    photo?: {
      planId: string;
      planName: string;
      price: number;
    };
    video?: {
      planId: string;
      planName: string;
      price: number;
    };
  };

  addOns: {
    itemId: string;
    itemName: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
  }[];

  subtotal: number;
  discounts: {
    discountId: string;
    name: string;
    amount: number;
  }[];
  totalDiscount: number;
  grandTotal: number;

  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
}

// 工作室設定
export interface StudioConfig {
  name: string;
  phone: string;
  lineId: string;
  email?: string;
  address?: string;
  website?: string;

  quoteValidDays: number;
  terms: string;
  bankInfo?: string;
}

// 完整設定資料
export interface ConfigData {
  studio: StudioConfig;
  packages: Package[];
  postProductionPlans: PostProductionPlan[];
  addOns: AddOnItem[];
  discounts: Discount[];
}
