'use client';

import { useEffect, useState } from 'react';
import { getConfig, saveConfig, changePassword, resetConfig } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import type { StudioConfig, ConfigData } from '@/types';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [studio, setStudio] = useState<StudioConfig | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const c = getConfig();
    setConfig(c);
    setStudio(c.studio);
  }, []);

  if (!config || !studio) return <div>載入中...</div>;

  const handleSaveStudio = () => {
    const newConfig = { ...config, studio };
    saveConfig(newConfig);
    setConfig(newConfig);
    toast.success('設定已儲存');
  };

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      toast.error('密碼至少需要 6 個字元');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('兩次密碼不一致');
      return;
    }

    changePassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    toast.success('密碼已更新');
  };

  const handleReset = () => {
    if (!confirm('確定要重設為預設資料？這將清除所有自訂套餐和設定。')) {
      return;
    }

    resetConfig();
    const c = getConfig();
    setConfig(c);
    setStudio(c.studio);
    toast.success('已重設為預設資料');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">工作室設定</h1>
        <p className="text-stone-500 mt-1">管理基本資訊和報價單設定</p>
      </div>

      {/* 基本資訊 */}
      <Card>
        <CardHeader>
          <CardTitle>基本資訊</CardTitle>
          <CardDescription>這些資訊會顯示在報價單上</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>公司/工作室名稱</Label>
              <Input
                value={studio.name}
                onChange={(e) => setStudio({ ...studio, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>聯絡電話</Label>
              <Input
                value={studio.phone}
                onChange={(e) => setStudio({ ...studio, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Line ID</Label>
              <Input
                value={studio.lineId}
                onChange={(e) => setStudio({ ...studio, lineId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email（選填）</Label>
              <Input
                type="email"
                value={studio.email || ''}
                onChange={(e) => setStudio({ ...studio, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>地址（選填）</Label>
            <Input
              value={studio.address || ''}
              onChange={(e) => setStudio({ ...studio, address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>網站（選填）</Label>
            <Input
              value={studio.website || ''}
              onChange={(e) => setStudio({ ...studio, website: e.target.value })}
              placeholder="https://"
            />
          </div>
        </CardContent>
      </Card>

      {/* 報價單設定 */}
      <Card>
        <CardHeader>
          <CardTitle>報價單設定</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>報價有效天數</Label>
            <Input
              type="number"
              value={studio.quoteValidDays}
              onChange={(e) =>
                setStudio({ ...studio, quoteValidDays: parseInt(e.target.value) || 7 })
              }
              className="w-32"
            />
            <p className="text-sm text-stone-500">
              報價單產生後 {studio.quoteValidDays} 天內有效
            </p>
          </div>

          <div className="space-y-2">
            <Label>服務條款（Markdown 格式）</Label>
            <Textarea
              value={studio.terms}
              onChange={(e) => setStudio({ ...studio, terms: e.target.value })}
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label>匯款資訊（選填）</Label>
            <Textarea
              value={studio.bankInfo || ''}
              onChange={(e) => setStudio({ ...studio, bankInfo: e.target.value })}
              rows={3}
              placeholder="銀行名稱：&#10;帳號：&#10;戶名："
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveStudio} size="lg">
          儲存設定
        </Button>
      </div>

      <Separator />

      {/* 修改密碼 */}
      <Card>
        <CardHeader>
          <CardTitle>修改密碼</CardTitle>
          <CardDescription>更改後台登入密碼</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>新密碼</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>確認密碼</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleChangePassword} variant="outline">
            更新密碼
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* 危險區域 */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">危險區域</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">重設為預設資料</div>
              <div className="text-sm text-stone-500">
                這將清除所有自訂套餐、折扣規則和設定
              </div>
            </div>
            <Button variant="destructive" onClick={handleReset}>
              重設資料
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
