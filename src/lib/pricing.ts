import type {
  Package,
  PostProductionPlan,
  AddOnItem,
  Discount,
  ServiceType
} from '@/types';

export interface AppliedDiscount {
  id: string;
  name: string;
  amount: number;
}

export interface PriceCalculation {
  packagePrice: number;
  postProductionPrice: number;
  addOnsPrice: number;
  subtotal: number;
  discounts: AppliedDiscount[];
  totalDiscount: number;
  grandTotal: number;
}

export interface CalculatePriceInput {
  selectedPackage: Package | null;
  photoPostProduction: PostProductionPlan | null;
  videoPostProduction: PostProductionPlan | null;
  addOns: Map<string, { item: AddOnItem; quantity: number }>;
  serviceType: ServiceType;
  eventDate: string | null;
  discounts: Discount[];
}

export function calculatePrice(input: CalculatePriceInput): PriceCalculation {
  const {
    selectedPackage,
    photoPostProduction,
    videoPostProduction,
    addOns,
    serviceType,
    eventDate,
    discounts,
  } = input;

  // 1. 套餐價格
  const packagePrice = selectedPackage?.basePrice ?? 0;

  // 2. 後製方案價格
  let postProductionPrice = 0;
  if (serviceType === 'photo' || serviceType === 'both') {
    postProductionPrice += photoPostProduction?.price ?? 0;
  }
  if (serviceType === 'video' || serviceType === 'both') {
    postProductionPrice += videoPostProduction?.price ?? 0;
  }

  // 3. 加購項目價格
  let addOnsPrice = 0;
  addOns.forEach(({ item, quantity }) => {
    addOnsPrice += item.unitPrice * quantity;
  });

  // 4. 小計
  const subtotal = packagePrice + postProductionPrice + addOnsPrice;

  // 5. 計算折扣
  const appliedDiscounts: AppliedDiscount[] = [];
  let totalDiscount = 0;

  // 計算活動距今天數
  const daysUntilEvent = eventDate
    ? Math.ceil((new Date(eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  // 找出適用的折扣（只取最優惠的一個百分比折扣）
  let bestPercentageDiscount: { discount: Discount; amount: number } | null = null;
  const fixedDiscounts: { discount: Discount; amount: number }[] = [];

  for (const discount of discounts) {
    if (!discount.isActive) continue;

    const isApplicable = checkDiscountConditions(
      discount,
      subtotal,
      serviceType,
      selectedPackage?.id,
      daysUntilEvent
    );

    if (!isApplicable) continue;

    const amount = discount.type === 'percentage'
      ? Math.round(subtotal * discount.value / 100)
      : discount.value;

    if (discount.type === 'percentage') {
      if (!bestPercentageDiscount || amount > bestPercentageDiscount.amount) {
        bestPercentageDiscount = { discount, amount };
      }
    } else {
      fixedDiscounts.push({ discount, amount });
    }
  }

  // 套用最佳百分比折扣
  if (bestPercentageDiscount) {
    appliedDiscounts.push({
      id: bestPercentageDiscount.discount.id,
      name: bestPercentageDiscount.discount.name,
      amount: bestPercentageDiscount.amount,
    });
    totalDiscount += bestPercentageDiscount.amount;
  }

  // 套用固定折扣（只取最大的一個）
  if (fixedDiscounts.length > 0) {
    const bestFixed = fixedDiscounts.reduce((best, current) =>
      current.amount > best.amount ? current : best
    );
    appliedDiscounts.push({
      id: bestFixed.discount.id,
      name: bestFixed.discount.name,
      amount: bestFixed.amount,
    });
    totalDiscount += bestFixed.amount;
  }

  // 6. 總價
  const grandTotal = Math.max(0, subtotal - totalDiscount);

  return {
    packagePrice,
    postProductionPrice,
    addOnsPrice,
    subtotal,
    discounts: appliedDiscounts,
    totalDiscount,
    grandTotal,
  };
}

function checkDiscountConditions(
  discount: Discount,
  subtotal: number,
  serviceType: ServiceType,
  packageId: string | undefined,
  daysUntilEvent: number
): boolean {
  const { conditions } = discount;

  // 滿額條件
  if (conditions.minTotal && subtotal < conditions.minTotal) {
    return false;
  }

  // 早鳥條件
  if (conditions.earlyBirdDays && daysUntilEvent < conditions.earlyBirdDays) {
    return false;
  }

  // 服務類型條件
  if (conditions.serviceTypes?.length && !conditions.serviceTypes.includes(serviceType)) {
    return false;
  }

  // 特定套餐條件
  if (conditions.packageIds?.length && packageId && !conditions.packageIds.includes(packageId)) {
    return false;
  }

  return true;
}

// 格式化金額
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
