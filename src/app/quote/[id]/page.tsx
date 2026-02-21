'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { getQuoteById, getConfig } from '@/lib/storage';
import { formatPrice } from '@/lib/pricing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Quote, ConfigData } from '@/types';
import { EVENT_TYPE_LABELS, SERVICE_TYPE_LABELS } from '@/types';

// 生成報價純文字（方便複製到 Line / Email）
function generateQuoteText(quote: Quote, config: ConfigData): string {
  const lines: string[] = [
    `【${config.studio.name}】報價單`,
    `報價單號：${quote.id}`,
    ``,
    `📅 活動資訊`,
    `• 類型：${EVENT_TYPE_LABELS[quote.eventType]}（${SERVICE_TYPE_LABELS[quote.serviceType]}）`,
    `• 日期：${quote.customer.eventDate}`,
    quote.customer.eventLocation ? `• 地點：${quote.customer.eventLocation}` : '',
    ``,
    `👤 客戶資訊`,
    `• 姓名：${quote.customer.name}`,
    `• 電話：${quote.customer.phone}`,
    quote.customer.notes ? `• 備註：${quote.customer.notes}` : '',
    ``,
    `💰 報價明細`,
    `• 套餐：${quote.selectedPackage.packageName}　${formatPrice(quote.selectedPackage.basePrice)}`,
  ];

  if (quote.postProduction.photo && quote.postProduction.photo.price > 0) {
    lines.push(`• 拍照後製：${quote.postProduction.photo.planName}　+${formatPrice(quote.postProduction.photo.price)}`);
  }
  if (quote.postProduction.video && quote.postProduction.video.price > 0) {
    lines.push(`• 錄影後製：${quote.postProduction.video.planName}　+${formatPrice(quote.postProduction.video.price)}`);
  }

  quote.addOns.forEach((addon) => {
    lines.push(`• ${addon.itemName} × ${addon.quantity}　+${formatPrice(addon.subtotal)}`);
  });

  lines.push(``, `────────────`);
  lines.push(`小計：${formatPrice(quote.subtotal)}`);

  quote.discounts.forEach((d) => {
    lines.push(`${d.name}：-${formatPrice(d.amount)}`);
  });

  lines.push(``, `✨ 總計：${formatPrice(quote.grandTotal)}`);
  lines.push(``, `有效期限至：${new Date(quote.expiresAt).toLocaleDateString('zh-TW')}`);
  lines.push(``, `📞 聯繫方式`);
  lines.push(`電話：${config.studio.phone}`);
  lines.push(`Line：${config.studio.lineId}`);

  return lines.filter(Boolean).join('\n');
}

export default function QuoteDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setConfig(getConfig());
    const q = getQuoteById(id);
    setQuote(q);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>載入中...</div>
      </div>
    );
  }

  if (!quote || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className="text-5xl mb-4">😕</div>
            <h1 className="text-xl font-bold mb-2">找不到報價單</h1>
            <p className="text-stone-500 mb-4">
              報價單 {id} 不存在或已過期
            </p>
            <Link href="/quote">
              <Button>建立新報價</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isExpired = new Date(quote.expiresAt) < new Date();
  const createdDate = new Date(quote.createdAt).toLocaleDateString('zh-TW');
  const expiresDate = new Date(quote.expiresAt).toLocaleDateString('zh-TW');

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">📸</div>
          <h1 className="text-2xl font-bold">{config.studio.name}</h1>
          <p className="text-stone-500">
            {config.studio.phone} | Line: {config.studio.lineId}
          </p>
        </div>

        {/* Quote Card */}
        <Card className="mb-6 print-card">
          <CardContent className="p-6">
            {/* Quote Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-sm text-stone-500">報價單號</div>
                <div className="text-xl font-bold">{quote.id}</div>
              </div>
              <div className="text-right">
                <StatusBadge status={quote.status} isExpired={isExpired} />
                <div className="text-sm text-stone-500 mt-1">
                  建立日期：{createdDate}
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Customer Info */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <span>👤</span> 客戶資訊
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm bg-stone-50 p-4 rounded-lg">
                <div>
                  <span className="text-stone-500">姓名：</span>
                  {quote.customer.name}
                </div>
                <div>
                  <span className="text-stone-500">電話：</span>
                  {quote.customer.phone}
                </div>
                <div>
                  <span className="text-stone-500">活動日期：</span>
                  {quote.customer.eventDate}
                </div>
                <div>
                  <span className="text-stone-500">地點：</span>
                  {quote.customer.eventLocation || '-'}
                </div>
              </div>
              {quote.customer.notes && (
                <div className="mt-2 text-sm bg-stone-50 p-4 rounded-lg">
                  <span className="text-stone-500">備註：</span>
                  {quote.customer.notes}
                </div>
              )}
            </div>

            <Separator className="my-4" />

            {/* Service Info */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <span>📋</span> 服務內容
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <Badge>{EVENT_TYPE_LABELS[quote.eventType]}</Badge>
                  <Badge variant="outline">{SERVICE_TYPE_LABELS[quote.serviceType]}</Badge>
                </div>
                <div className="bg-stone-50 p-4 rounded-lg">
                  <div className="font-medium">{quote.selectedPackage.packageName}</div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Price Breakdown */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <span>💰</span> 報價明細
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>套餐費用</span>
                  <span>{formatPrice(quote.selectedPackage.basePrice)}</span>
                </div>

                {quote.postProduction.photo && quote.postProduction.photo.price > 0 && (
                  <div className="flex justify-between">
                    <span>拍照後製：{quote.postProduction.photo.planName}</span>
                    <span>+{formatPrice(quote.postProduction.photo.price)}</span>
                  </div>
                )}

                {quote.postProduction.video && quote.postProduction.video.price > 0 && (
                  <div className="flex justify-between">
                    <span>錄影後製：{quote.postProduction.video.planName}</span>
                    <span>+{formatPrice(quote.postProduction.video.price)}</span>
                  </div>
                )}

                {quote.addOns.map((addon) => (
                  <div key={addon.itemId} className="flex justify-between">
                    <span>
                      {addon.itemName} × {addon.quantity}
                    </span>
                    <span>+{formatPrice(addon.subtotal)}</span>
                  </div>
                ))}

                <Separator className="my-2" />

                <div className="flex justify-between">
                  <span>小計</span>
                  <span>{formatPrice(quote.subtotal)}</span>
                </div>

                {quote.discounts.map((d) => (
                  <div key={d.discountId} className="flex justify-between text-green-600">
                    <span>{d.name}</span>
                    <span>-{formatPrice(d.amount)}</span>
                  </div>
                ))}

                <Separator className="my-2" />

                <div className="flex justify-between text-xl font-bold">
                  <span>總計</span>
                  <span>{formatPrice(quote.grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* Validity */}
            <div className={`p-4 rounded-lg text-center text-sm ${
              isExpired ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
            }`}>
              {isExpired ? (
                <>此報價單已於 {expiresDate} 過期</>
              ) : (
                <>此報價單有效期限至 {expiresDate}</>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-3 no-print">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              const text = generateQuoteText(quote, config);
              navigator.clipboard.writeText(text);
              toast.success('已複製報價內容，可貼到 Line');
            }}
          >
            💬 複製內容
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              const text = generateQuoteText(quote, config);
              const subject = encodeURIComponent(`${config.studio.name} 報價單 ${quote.id}`);
              const body = encodeURIComponent(text);
              window.open(`mailto:?subject=${subject}&body=${body}`);
            }}
          >
            ✉️ Email
          </Button>
          <Button
            className="flex-1"
            onClick={() => window.print()}
          >
            🖨️ 列印
          </Button>
        </div>

        {/* Terms */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="font-medium mb-3">服務條款</h3>
            <div className="text-sm text-stone-600 whitespace-pre-wrap">
              {config.studio.terms}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="mt-6 text-center text-sm text-stone-500 no-print">
          <p>如有任何問題，請聯繫我們：</p>
          <p className="font-medium text-stone-700 mt-1">
            📞 {config.studio.phone} | 💬 Line: {config.studio.lineId}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
  isExpired,
}: {
  status: Quote['status'];
  isExpired: boolean;
}) {
  if (isExpired && status === 'pending') {
    return <Badge variant="destructive">已過期</Badge>;
  }

  const config = {
    pending: { label: '待確認', variant: 'secondary' as const },
    accepted: { label: '已確認', variant: 'default' as const },
    expired: { label: '已過期', variant: 'destructive' as const },
    cancelled: { label: '已取消', variant: 'outline' as const },
  };

  const { label, variant } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}
