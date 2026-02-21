/**
 * 資料儲存層
 * 開發階段使用 localStorage
 * 上線後可改為 Vercel KV
 */

import type { ConfigData, Quote } from '@/types';
import { defaultConfigData } from './data';

const STORAGE_KEYS = {
  CONFIG: 'quote_config',
  QUOTES: 'quote_records',
  ADMIN_PASSWORD: 'admin_password',
};

// ========== 設定資料 ==========

export function getConfig(): ConfigData {
  if (typeof window === 'undefined') {
    return defaultConfigData;
  }

  const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultConfigData;
    }
  }
  return defaultConfigData;
}

export function saveConfig(config: ConfigData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
}

export function resetConfig(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(defaultConfigData));
}

// ========== 報價記錄 ==========

export function getQuotes(): Quote[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEYS.QUOTES);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveQuote(quote: Quote): void {
  if (typeof window === 'undefined') return;

  const quotes = getQuotes();
  const existingIndex = quotes.findIndex(q => q.id === quote.id);

  if (existingIndex >= 0) {
    quotes[existingIndex] = quote;
  } else {
    quotes.unshift(quote);
  }

  localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
}

export function getQuoteById(id: string): Quote | null {
  const quotes = getQuotes();
  return quotes.find(q => q.id === id) ?? null;
}

export function deleteQuote(id: string): void {
  if (typeof window === 'undefined') return;

  const quotes = getQuotes().filter(q => q.id !== id);
  localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
}

// ========== 報價編號生成 ==========

export function generateQuoteId(): string {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');

  // 取得今日的報價數量
  const quotes = getQuotes();
  const todayQuotes = quotes.filter(q => q.id.startsWith(`Q-${dateStr}`));
  const count = todayQuotes.length + 1;

  return `Q-${dateStr}-${String(count).padStart(3, '0')}`;
}

// ========== 管理員密碼 ==========

const DEFAULT_PASSWORD = 'admin123'; // 預設密碼，上線前請修改

export function verifyPassword(password: string): boolean {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
  const currentPassword = stored || DEFAULT_PASSWORD;

  return password === currentPassword;
}

export function changePassword(newPassword: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
}

// ========== 登入狀態（使用 sessionStorage）==========

const SESSION_KEY = 'admin_session';

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function login(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SESSION_KEY, 'true');
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SESSION_KEY);
}
