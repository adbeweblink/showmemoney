import { create } from 'zustand';
import type {
  EventType,
  ServiceType,
  Package,
  PostProductionPlan,
  AddOnItem,
  CustomerInfo,
  Discount,
} from '@/types';
import { calculatePrice, type PriceCalculation } from './pricing';

interface QuoteState {
  // 步驟控制
  currentStep: number;

  // 選擇狀態
  eventType: EventType | null;
  serviceType: ServiceType | null;
  selectedPackage: Package | null;
  photoPostProduction: PostProductionPlan | null;
  videoPostProduction: PostProductionPlan | null;
  addOns: Map<string, { item: AddOnItem; quantity: number }>;
  customer: Partial<CustomerInfo>;

  // 計算結果
  calculation: PriceCalculation | null;

  // Actions - 步驟
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Actions - 選擇
  setEventType: (type: EventType) => void;
  setServiceType: (type: ServiceType) => void;
  selectPackage: (pkg: Package) => void;
  setPhotoPostProduction: (plan: PostProductionPlan | null) => void;
  setVideoPostProduction: (plan: PostProductionPlan | null) => void;
  setAddOnQuantity: (item: AddOnItem, quantity: number) => void;
  updateCustomer: (info: Partial<CustomerInfo>) => void;

  // Actions - 計算
  recalculate: (discounts: Discount[]) => void;

  // Actions - 重置
  reset: () => void;
}

const initialState = {
  currentStep: 1,
  eventType: null,
  serviceType: null,
  selectedPackage: null,
  photoPostProduction: null,
  videoPostProduction: null,
  addOns: new Map(),
  customer: {},
  calculation: null,
};

export const useQuoteStore = create<QuoteState>((set, get) => ({
  ...initialState,

  // 步驟控制
  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 7) {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  // 選擇 - 活動類型
  setEventType: (type) => set({
    eventType: type,
    serviceType: null,
    selectedPackage: null,
    photoPostProduction: null,
    videoPostProduction: null,
    addOns: new Map(),
    calculation: null,
  }),

  // 選擇 - 服務類型
  setServiceType: (type) => set({
    serviceType: type,
    selectedPackage: null,
    photoPostProduction: null,
    videoPostProduction: null,
    addOns: new Map(),
    calculation: null,
  }),

  // 選擇 - 套餐
  selectPackage: (pkg) => set({ selectedPackage: pkg }),

  // 選擇 - 後製方案
  setPhotoPostProduction: (plan) => set({ photoPostProduction: plan }),
  setVideoPostProduction: (plan) => set({ videoPostProduction: plan }),

  // 選擇 - 加購項目
  setAddOnQuantity: (item, quantity) => {
    const addOns = new Map(get().addOns);
    if (quantity <= 0) {
      addOns.delete(item.id);
    } else {
      addOns.set(item.id, { item, quantity });
    }
    set({ addOns });
  },

  // 更新客戶資料
  updateCustomer: (info) => set({
    customer: { ...get().customer, ...info }
  }),

  // 重新計算價格
  recalculate: (discounts) => {
    const state = get();
    const calculation = calculatePrice({
      selectedPackage: state.selectedPackage,
      photoPostProduction: state.photoPostProduction,
      videoPostProduction: state.videoPostProduction,
      addOns: state.addOns,
      serviceType: state.serviceType ?? 'photo',
      eventDate: state.customer.eventDate ?? null,
      discounts,
    });
    set({ calculation });
  },

  // 重置
  reset: () => set(initialState),
}));
