'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyPassword, login } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 模擬網路延遲
    await new Promise(resolve => setTimeout(resolve, 500));

    if (verifyPassword(password)) {
      login();
      router.push('/admin');
    } else {
      setError('密碼錯誤');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-5xl mb-4">📸</div>
          <CardTitle className="text-2xl">報價系統後台</CardTitle>
          <CardDescription>請輸入管理員密碼</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">密碼</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '登入中...' : '登入'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-stone-50 rounded-lg">
            <p className="text-sm text-stone-500 text-center">
              預設密碼：<code className="bg-stone-200 px-2 py-0.5 rounded">admin123</code>
            </p>
            <p className="text-xs text-stone-400 text-center mt-1">
              上線前請在設定頁面修改密碼
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
