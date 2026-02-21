'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getQuotes, getConfig } from '@/lib/storage';
import { formatPrice } from '@/lib/pricing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Quote } from '@/types';
import { EVENT_TYPE_LABELS, SERVICE_TYPE_LABELS } from '@/types';

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setQuotes(getQuotes());
  }, []);

  if (!mounted) {
    return <div>載入中...</div>;
  }

  // 計算統計數據
  const totalQuotes = quotes.length;
  const pendingQuotes = quotes.filter(q => q.status === 'pending').length;
  const acceptedQuotes = quotes.filter(q => q.status === 'accepted').length;
  const totalRevenue = quotes
    .filter(q => q.status === 'accepted')
    .reduce((sum, q) => sum + q.grandTotal, 0);

  // 取得最近的報價
  const recentQuotes = quotes.slice(0, 5);

  // 取得設定
  const config = getConfig();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">儀表板</h1>
        <p className="text-stone-500 mt-1">歡迎回來！這是您的報價系統概覽。</p>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-stone-500">
              總報價數
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalQuotes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-stone-500">
              待確認
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{pendingQuotes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-stone-500">
              已成交
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{acceptedQuotes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-stone-500">
              成交金額
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900">
              {formatPrice(totalRevenue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 快捷操作 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/quote" target="_blank">
          <Card className="hover:border-stone-400 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <span className="text-3xl">🔗</span>
              <div>
                <div className="font-medium">開啟報價器</div>
                <div className="text-sm text-stone-500">分享給客戶使用</div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/packages">
          <Card className="hover:border-stone-400 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <span className="text-3xl">📦</span>
              <div>
                <div className="font-medium">管理套餐</div>
                <div className="text-sm text-stone-500">
                  {config.packages.length} 個套餐
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/settings">
          <Card className="hover:border-stone-400 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <span className="text-3xl">⚙️</span>
              <div>
                <div className="font-medium">工作室設定</div>
                <div className="text-sm text-stone-500">基本資訊與條款</div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* 最近報價 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>最近報價</CardTitle>
            <Link
              href="/admin/quotes"
              className="text-sm text-stone-500 hover:text-stone-900"
            >
              查看全部 →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentQuotes.length === 0 ? (
            <div className="text-center py-8 text-stone-500">
              還沒有任何報價記錄
            </div>
          ) : (
            <div className="space-y-4">
              {recentQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="flex items-center justify-between p-4 bg-stone-50 rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{quote.customer.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {quote.id}
                      </Badge>
                    </div>
                    <div className="text-sm text-stone-500">
                      {EVENT_TYPE_LABELS[quote.eventType]} ·{' '}
                      {SERVICE_TYPE_LABELS[quote.serviceType]} ·{' '}
                      {quote.customer.eventDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatPrice(quote.grandTotal)}
                    </div>
                    <StatusBadge status={quote.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: Quote['status'] }) {
  const config = {
    pending: { label: '待確認', className: 'bg-amber-100 text-amber-800' },
    accepted: { label: '已成交', className: 'bg-green-100 text-green-800' },
    expired: { label: '已過期', className: 'bg-stone-100 text-stone-800' },
    cancelled: { label: '已取消', className: 'bg-red-100 text-red-800' },
  };

  const { label, className } = config[status];

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${className}`}>
      {label}
    </span>
  );
}
