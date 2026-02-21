import type { ConfigData, Package, PostProductionPlan, AddOnItem, Discount, StudioConfig } from '@/types';

// 工作室基本資訊
export const defaultStudioConfig: StudioConfig = {
  name: '圲億行銷設計有限公司',
  phone: '0958-980460',
  lineId: 'luckcegg',
  quoteValidDays: 14,
  terms: `## 服務條款

1. **訂金**：確認檔期需支付 30% 訂金
2. **尾款**：活動結束後 7 日內支付尾款
3. **取消政策**：
   - 活動前 30 天取消：退還 80% 訂金
   - 活動前 14 天取消：退還 50% 訂金
   - 活動前 7 天內取消：不退還訂金
4. **交件時間**：
   - 照片：活動後 14 個工作天
   - 影片：活動後 30 個工作天
5. **版權**：成品可供客戶自由使用，攝影師保留作品集使用權`,
};

// 套餐資料
export const defaultPackages: Package[] = [
  // ========== 家庭活動 - 拍照 ==========
  {
    id: 'family-photo-basic',
    eventType: 'family',
    serviceType: 'photo',
    name: '家庭基本方案',
    description: '適合抓周、生日派對等小型家庭活動',
    basePrice: 8000,
    includedItems: [
      { name: '拍攝時數', quantity: 2, unit: '小時' },
      { name: '攝影師', quantity: 1, unit: '位' },
      { name: '精修照片', quantity: 30, unit: '張' },
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'family-photo-standard',
    eventType: 'family',
    serviceType: 'photo',
    name: '家庭標準方案',
    description: '完整記錄家庭活動，含更多精修照片',
    basePrice: 15000,
    includedItems: [
      { name: '拍攝時數', quantity: 4, unit: '小時' },
      { name: '攝影師', quantity: 1, unit: '位' },
      { name: '精修照片', quantity: 60, unit: '張' },
    ],
    isActive: true,
    sortOrder: 2,
  },
  // ========== 家庭活動 - 錄影 ==========
  {
    id: 'family-video-basic',
    eventType: 'family',
    serviceType: 'video',
    name: '家庭錄影基本方案',
    description: '記錄精彩時刻，含簡單剪輯',
    basePrice: 12000,
    includedItems: [
      { name: '拍攝時數', quantity: 2, unit: '小時' },
      { name: '攝影師', quantity: 1, unit: '位' },
      { name: '成品影片', quantity: 3, unit: '分鐘', note: '精華剪輯' },
    ],
    isActive: true,
    sortOrder: 1,
  },
  // ========== 家庭活動 - 拍照+錄影 ==========
  {
    id: 'family-both-standard',
    eventType: 'family',
    serviceType: 'both',
    name: '家庭全紀錄方案',
    description: '照片影片雙重記錄，完整保存回憶',
    basePrice: 22000,
    includedItems: [
      { name: '拍攝時數', quantity: 3, unit: '小時' },
      { name: '攝影師', quantity: 2, unit: '位', note: '1 拍照 + 1 錄影' },
      { name: '精修照片', quantity: 50, unit: '張' },
      { name: '成品影片', quantity: 5, unit: '分鐘' },
    ],
    isActive: true,
    sortOrder: 1,
  },

  // ========== 活動攝影 - 拍照 ==========
  {
    id: 'event-photo-basic',
    eventType: 'event',
    serviceType: 'photo',
    name: '活動基本方案',
    description: '適合小型論壇、發表會',
    basePrice: 15000,
    includedItems: [
      { name: '拍攝時數', quantity: 4, unit: '小時' },
      { name: '攝影師', quantity: 1, unit: '位' },
      { name: '精修照片', quantity: 80, unit: '張' },
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'event-photo-standard',
    eventType: 'event',
    serviceType: 'photo',
    name: '活動標準方案',
    description: '適合中型活動、記者會、展覽',
    basePrice: 28000,
    includedItems: [
      { name: '拍攝時數', quantity: 8, unit: '小時' },
      { name: '攝影師', quantity: 2, unit: '位' },
      { name: '精修照片', quantity: 150, unit: '張' },
    ],
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'event-photo-premium',
    eventType: 'event',
    serviceType: 'photo',
    name: '活動尊榮方案',
    description: '大型活動完整紀錄，多角度拍攝',
    basePrice: 45000,
    includedItems: [
      { name: '拍攝時數', quantity: 10, unit: '小時' },
      { name: '攝影師', quantity: 3, unit: '位' },
      { name: '精修照片', quantity: 250, unit: '張' },
      { name: '即時出圖', quantity: 1, unit: '組', note: '活動現場即時修圖' },
    ],
    isActive: true,
    sortOrder: 3,
  },
  // ========== 活動攝影 - 錄影 ==========
  {
    id: 'event-video-basic',
    eventType: 'event',
    serviceType: 'video',
    name: '活動錄影基本方案',
    description: '精華紀錄，適合內部存檔',
    basePrice: 20000,
    includedItems: [
      { name: '拍攝時數', quantity: 4, unit: '小時' },
      { name: '攝影師', quantity: 1, unit: '位' },
      { name: '成品影片', quantity: 5, unit: '分鐘' },
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'event-video-standard',
    eventType: 'event',
    serviceType: 'video',
    name: '活動錄影標準方案',
    description: '完整記錄，含專業剪輯',
    basePrice: 38000,
    includedItems: [
      { name: '拍攝時數', quantity: 8, unit: '小時' },
      { name: '攝影師', quantity: 2, unit: '位' },
      { name: '成品影片', quantity: 10, unit: '分鐘' },
      { name: '花絮影片', quantity: 1, unit: '支', note: '30 秒社群版' },
    ],
    isActive: true,
    sortOrder: 2,
  },
  // ========== 活動攝影 - 拍照+錄影 ==========
  {
    id: 'event-both-standard',
    eventType: 'event',
    serviceType: 'both',
    name: '活動全紀錄方案',
    description: '照片影片雙軌記錄，適合重要活動',
    basePrice: 50000,
    includedItems: [
      { name: '拍攝時數', quantity: 8, unit: '小時' },
      { name: '攝影師', quantity: 3, unit: '位', note: '2 拍照 + 1 錄影' },
      { name: '精修照片', quantity: 120, unit: '張' },
      { name: '成品影片', quantity: 8, unit: '分鐘' },
    ],
    isActive: true,
    sortOrder: 1,
  },

  // ========== 音樂會攝影 - 拍照 ==========
  {
    id: 'concert-photo-basic',
    eventType: 'concert',
    serviceType: 'photo',
    name: '演出基本方案',
    description: '適合 Live House、小型演出',
    basePrice: 18000,
    includedItems: [
      { name: '拍攝時數', quantity: 3, unit: '小時' },
      { name: '攝影師', quantity: 1, unit: '位' },
      { name: '精修照片', quantity: 60, unit: '張' },
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'concert-photo-standard',
    eventType: 'concert',
    serviceType: 'photo',
    name: '演唱會標準方案',
    description: '中大型演唱會、音樂祭',
    basePrice: 35000,
    includedItems: [
      { name: '拍攝時數', quantity: 5, unit: '小時' },
      { name: '攝影師', quantity: 2, unit: '位' },
      { name: '精修照片', quantity: 120, unit: '張' },
    ],
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'concert-photo-premium',
    eventType: 'concert',
    serviceType: 'photo',
    name: '演唱會尊榮方案',
    description: '大型演唱會、多場次巡演',
    basePrice: 65000,
    includedItems: [
      { name: '拍攝時數', quantity: 8, unit: '小時' },
      { name: '攝影師', quantity: 3, unit: '位' },
      { name: '精修照片', quantity: 200, unit: '張' },
      { name: '即時出圖', quantity: 1, unit: '組', note: '演出中即時發布' },
    ],
    isActive: true,
    sortOrder: 3,
  },
  // ========== 音樂會攝影 - 錄影 ==========
  {
    id: 'concert-video-basic',
    eventType: 'concert',
    serviceType: 'video',
    name: '演出錄影基本方案',
    description: '單機位完整記錄',
    basePrice: 25000,
    includedItems: [
      { name: '拍攝時數', quantity: 3, unit: '小時' },
      { name: '攝影師', quantity: 1, unit: '位' },
      { name: '成品影片', quantity: 1, unit: '首', note: '單曲完整版' },
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'concert-video-standard',
    eventType: 'concert',
    serviceType: 'video',
    name: '演唱會錄影標準方案',
    description: '多機位專業拍攝',
    basePrice: 55000,
    includedItems: [
      { name: '拍攝時數', quantity: 5, unit: '小時' },
      { name: '攝影師', quantity: 3, unit: '位' },
      { name: '成品影片', quantity: 15, unit: '分鐘', note: '精華剪輯' },
    ],
    isActive: true,
    sortOrder: 2,
  },
  // ========== 音樂會攝影 - 拍照+錄影 ==========
  {
    id: 'concert-both-premium',
    eventType: 'concert',
    serviceType: 'both',
    name: '演唱會全紀錄方案',
    description: '照片影片完整紀錄，專業團隊',
    basePrice: 85000,
    includedItems: [
      { name: '拍攝時數', quantity: 6, unit: '小時' },
      { name: '攝影團隊', quantity: 5, unit: '位', note: '2 拍照 + 3 錄影' },
      { name: '精修照片', quantity: 150, unit: '張' },
      { name: '成品影片', quantity: 20, unit: '分鐘' },
      { name: '花絮影片', quantity: 1, unit: '支', note: '60 秒社群版' },
    ],
    isActive: true,
    sortOrder: 1,
  },

  // ========== 婚禮婚紗 - 拍照 ==========
  {
    id: 'wedding-photo-basic',
    eventType: 'wedding',
    serviceType: 'photo',
    name: '婚禮基本方案',
    description: '半天婚禮紀錄',
    basePrice: 25000,
    includedItems: [
      { name: '拍攝時數', quantity: 5, unit: '小時' },
      { name: '攝影師', quantity: 1, unit: '位' },
      { name: '精修照片', quantity: 150, unit: '張' },
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'wedding-photo-standard',
    eventType: 'wedding',
    serviceType: 'photo',
    name: '婚禮標準方案',
    description: '全天婚禮完整紀錄',
    basePrice: 42000,
    includedItems: [
      { name: '拍攝時數', quantity: 10, unit: '小時' },
      { name: '攝影師', quantity: 2, unit: '位' },
      { name: '精修照片', quantity: 300, unit: '張' },
    ],
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'wedding-photo-premium',
    eventType: 'wedding',
    serviceType: 'photo',
    name: '婚禮尊榮方案',
    description: '雙儀式完整紀錄',
    basePrice: 68000,
    includedItems: [
      { name: '拍攝時數', quantity: 14, unit: '小時' },
      { name: '攝影師', quantity: 2, unit: '位' },
      { name: '精修照片', quantity: 500, unit: '張' },
      { name: '相本製作', quantity: 1, unit: '本', note: '30 頁精裝' },
    ],
    isActive: true,
    sortOrder: 3,
  },
  // ========== 婚禮婚紗 - 錄影 ==========
  {
    id: 'wedding-video-basic',
    eventType: 'wedding',
    serviceType: 'video',
    name: '婚禮錄影基本方案',
    description: '精華紀錄影片',
    basePrice: 30000,
    includedItems: [
      { name: '拍攝時數', quantity: 5, unit: '小時' },
      { name: '攝影師', quantity: 1, unit: '位' },
      { name: '成品影片', quantity: 8, unit: '分鐘', note: '精華版' },
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'wedding-video-standard',
    eventType: 'wedding',
    serviceType: 'video',
    name: '婚禮錄影標準方案',
    description: '完整儀式記錄',
    basePrice: 55000,
    includedItems: [
      { name: '拍攝時數', quantity: 10, unit: '小時' },
      { name: '攝影師', quantity: 2, unit: '位' },
      { name: '成品影片', quantity: 15, unit: '分鐘', note: '完整版' },
      { name: '快剪快播', quantity: 3, unit: '分鐘', note: '當日播放' },
    ],
    isActive: true,
    sortOrder: 2,
  },
  // ========== 婚禮婚紗 - 拍照+錄影 ==========
  {
    id: 'wedding-both-standard',
    eventType: 'wedding',
    serviceType: 'both',
    name: '婚禮雙紀錄方案',
    description: '照片影片雙軌記錄',
    basePrice: 75000,
    includedItems: [
      { name: '拍攝時數', quantity: 10, unit: '小時' },
      { name: '攝影團隊', quantity: 3, unit: '位', note: '2 拍照 + 1 錄影' },
      { name: '精修照片', quantity: 250, unit: '張' },
      { name: '成品影片', quantity: 12, unit: '分鐘' },
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'wedding-both-premium',
    eventType: 'wedding',
    serviceType: 'both',
    name: '婚禮頂級全紀錄',
    description: '最完整的婚禮紀錄方案',
    basePrice: 120000,
    includedItems: [
      { name: '拍攝時數', quantity: 14, unit: '小時' },
      { name: '攝影團隊', quantity: 5, unit: '位', note: '3 拍照 + 2 錄影' },
      { name: '精修照片', quantity: 450, unit: '張' },
      { name: '成品影片', quantity: 20, unit: '分鐘' },
      { name: '快剪快播', quantity: 5, unit: '分鐘' },
      { name: '相本製作', quantity: 1, unit: '本', note: '40 頁精裝' },
    ],
    isActive: true,
    sortOrder: 2,
  },
];

// 後製方案
export const defaultPostProductionPlans: PostProductionPlan[] = [
  // 拍照後製
  {
    id: 'photo-basic',
    serviceType: 'photo',
    name: '基本修圖',
    description: '亮度對比調整、基本色彩校正',
    price: 0,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'photo-standard',
    serviceType: 'photo',
    name: '精緻修圖',
    description: '進階調色、膚質處理、背景優化',
    price: 3000,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'photo-premium',
    serviceType: 'photo',
    name: '高級修圖',
    description: '雜誌級修圖、合成處理、特效加工',
    price: 8000,
    isActive: true,
    sortOrder: 3,
  },
  // 錄影後製
  {
    id: 'video-basic',
    serviceType: 'video',
    name: '基本剪輯',
    description: '剪接、上字卡、簡單轉場',
    price: 0,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'video-standard',
    serviceType: 'video',
    name: '專業剪輯',
    description: '調色、配樂、動態字幕、特效轉場',
    price: 8000,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'video-premium',
    serviceType: 'video',
    name: '影視級製作',
    description: '電影調色、原創配樂、動畫特效',
    price: 20000,
    isActive: true,
    sortOrder: 3,
  },
];

// 加購項目
export const defaultAddOns: AddOnItem[] = [
  // 人力
  {
    id: 'extra-photographer',
    category: 'staffing',
    name: '加派攝影師',
    unit: '位/場',
    unitPrice: 8000,
    eventTypes: ['event', 'concert', 'family', 'wedding'],
    serviceTypes: ['photo', 'both'],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'extra-videographer',
    category: 'staffing',
    name: '加派錄影師',
    unit: '位/場',
    unitPrice: 10000,
    eventTypes: ['event', 'concert', 'family', 'wedding'],
    serviceTypes: ['video', 'both'],
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'assistant',
    category: 'staffing',
    name: '攝影助理',
    unit: '位/場',
    unitPrice: 3000,
    eventTypes: ['event', 'concert', 'family', 'wedding'],
    serviceTypes: ['photo', 'video', 'both'],
    isActive: true,
    sortOrder: 3,
  },
  // 時數
  {
    id: 'extra-hour',
    category: 'shooting',
    name: '加時費用',
    unit: '小時',
    unitPrice: 3000,
    eventTypes: ['event', 'concert', 'family', 'wedding'],
    serviceTypes: ['photo', 'video', 'both'],
    isActive: true,
    sortOrder: 1,
  },
  // 設備
  {
    id: 'drone',
    category: 'equipment',
    name: '空拍機',
    unit: '場',
    unitPrice: 8000,
    eventTypes: ['event', 'concert', 'wedding'],
    serviceTypes: ['photo', 'video', 'both'],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'gimbal',
    category: 'equipment',
    name: '穩定器',
    unit: '場',
    unitPrice: 3000,
    eventTypes: ['event', 'concert', 'family', 'wedding'],
    serviceTypes: ['video', 'both'],
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'lighting',
    category: 'equipment',
    name: '專業燈光組',
    unit: '組',
    unitPrice: 5000,
    eventTypes: ['event', 'family', 'wedding'],
    serviceTypes: ['photo', 'video', 'both'],
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'slider',
    category: 'equipment',
    name: '軌道滑軌',
    unit: '場',
    unitPrice: 4000,
    eventTypes: ['event', 'concert', 'wedding'],
    serviceTypes: ['video', 'both'],
    isActive: true,
    sortOrder: 4,
  },
  // 後製加購
  {
    id: 'extra-photo',
    category: 'postProduction',
    name: '加修照片',
    unit: '張',
    unitPrice: 150,
    minQuantity: 10,
    eventTypes: ['event', 'concert', 'family', 'wedding'],
    serviceTypes: ['photo', 'both'],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'extra-video-minute',
    category: 'postProduction',
    name: '加長影片',
    unit: '分鐘',
    unitPrice: 2000,
    eventTypes: ['event', 'concert', 'family', 'wedding'],
    serviceTypes: ['video', 'both'],
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'rush-delivery',
    category: 'postProduction',
    name: '急件處理',
    unit: '案',
    unitPrice: 5000,
    eventTypes: ['event', 'concert', 'family', 'wedding'],
    serviceTypes: ['photo', 'video', 'both'],
    isActive: true,
    sortOrder: 3,
  },
];

// 折扣規則
export const defaultDiscounts: Discount[] = [
  {
    id: 'early-bird-30',
    name: '早鳥優惠 30 天',
    type: 'percentage',
    value: 10,
    conditions: {
      earlyBirdDays: 30,
    },
    isActive: true,
  },
  {
    id: 'early-bird-60',
    name: '早鳥優惠 60 天',
    type: 'percentage',
    value: 15,
    conditions: {
      earlyBirdDays: 60,
    },
    isActive: true,
  },
  {
    id: 'combo-discount',
    name: '拍照+錄影組合優惠',
    type: 'percentage',
    value: 5,
    conditions: {
      serviceTypes: ['both'],
    },
    isActive: true,
  },
  {
    id: 'over-50k',
    name: '滿 5 萬折 3000',
    type: 'fixed',
    value: 3000,
    conditions: {
      minTotal: 50000,
    },
    isActive: true,
  },
  {
    id: 'over-100k',
    name: '滿 10 萬折 8000',
    type: 'fixed',
    value: 8000,
    conditions: {
      minTotal: 100000,
    },
    isActive: true,
  },
];

// 完整預設設定
export const defaultConfigData: ConfigData = {
  studio: defaultStudioConfig,
  packages: defaultPackages,
  postProductionPlans: defaultPostProductionPlans,
  addOns: defaultAddOns,
  discounts: defaultDiscounts,
};
