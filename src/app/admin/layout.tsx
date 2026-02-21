'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { isLoggedIn, logout } from '@/lib/storage';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/admin', label: '儀表板', icon: '📊' },
  { href: '/admin/packages', label: '套餐管理', icon: '📦' },
  { href: '/admin/addons', label: '加購項目', icon: '➕' },
  { href: '/admin/discounts', label: '折扣規則', icon: '🏷️' },
  { href: '/admin/quotes', label: '報價記錄', icon: '📋' },
  { href: '/admin/settings', label: '工作室設定', icon: '⚙️' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    if (mounted && !loggedIn && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [mounted, loggedIn, pathname, router]);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    router.push('/admin/login');
  };

  // 登入頁面不需要 layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // 等待 client-side hydration
  if (!mounted || !loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-stone-500">載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📸</span>
              <span className="font-semibold text-stone-800">報價系統後台</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-stone-600 hover:text-stone-900"
              >
                查看前台 →
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                登出
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-56 shrink-0">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-700 hover:bg-stone-100'
                      }
                    `}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
