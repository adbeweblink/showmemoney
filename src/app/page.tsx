'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    image: '/images/event.png',
    title: '活動攝影',
    description: '論壇、記者會、尾牙、展覽',
    price: '15,000 起',
  },
  {
    image: '/images/concert.png',
    title: '音樂會攝影',
    description: '演唱會、Live House、音樂祭',
    price: '18,000 起',
  },
  {
    image: '/images/family.png',
    title: '家庭活動',
    description: '抓周、生日、全家福',
    price: '8,000 起',
  },
  {
    image: '/images/wedding.png',
    title: '婚禮婚紗',
    description: '結婚、訂婚、婚紗',
    price: '25,000 起',
  },
];

const features = [
  {
    icon: '📸',
    title: '專業拍照',
    description: '高品質相片，完整記錄精彩時刻',
  },
  {
    icon: '🎬',
    title: '專業錄影',
    description: '動態影像，留住感動瞬間',
  },
  {
    icon: '✨',
    title: '專業後製',
    description: '精緻修圖剪輯，呈現最佳效果',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="專業攝影服務"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/60 to-stone-900/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-40">
          <div className="text-center text-white">
            <h1 className="mb-4 drop-shadow-lg flex justify-center">
              <Image
                src="/images/company-name-white.png"
                alt="圲億行銷設計"
                width={320}
                height={48}
                className="h-12 sm:h-16 w-auto"
                priority
              />
            </h1>
            <p className="text-xl sm:text-2xl mb-2 text-amber-200">
              專業活動攝影 · 用影像說故事
            </p>
            <p className="text-stone-300 mb-10 max-w-xl mx-auto">
              從家庭聚會到大型音樂會，我們用心記錄每個珍貴時刻
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" className="text-lg px-8 py-6 bg-amber-500 hover:bg-amber-600 text-white shadow-lg">
                  立即報價
                </Button>
              </Link>
              <a href="https://line.me/ti/p/~luckcegg" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white/20">
                  💬 Line 聯繫
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-4">
            服務項目
          </h2>
          <p className="text-center text-stone-500 mb-12">
            多元攝影服務，滿足您的各種需求
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link key={service.title} href="/quote">
                <Card className="hover-lift bg-white overflow-hidden cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-5 text-center">
                    <h3 className="text-xl font-semibold text-stone-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-stone-500 text-sm mb-3">
                      {service.description}
                    </p>
                    <div className="text-amber-600 font-bold text-lg">
                      NT$ {service.price}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/70">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-12">
            為什麼選擇我們
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-stone-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-amber-100 to-rose-100 border-none shadow-xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">
                立即取得報價
              </h2>
              <p className="text-stone-600 mb-8">
                透過我們的線上報價系統，即時了解服務費用，輕鬆規劃您的活動預算
              </p>
              <Link href="/quote">
                <Button size="lg" className="text-lg px-10 py-6 bg-amber-600 hover:bg-amber-700">
                  開始報價 →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-stone-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 justify-center md:justify-start">
                <Image
                  src="/images/company-name-white.png"
                  alt="圲億行銷設計"
                  width={160}
                  height={24}
                  className="h-6 w-auto"
                />
                <span>有限公司</span>
              </h3>
              <p className="text-stone-300">
                專業活動攝影團隊，用心記錄每個重要時刻
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">聯絡方式</h3>
              <div className="space-y-2 text-stone-300">
                <p>📞 0958-980460</p>
                <p>💬 Line ID: luckcegg</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">快速連結</h3>
              <div className="space-y-2">
                <Link href="/quote" className="block text-stone-300 hover:text-white transition-colors">
                  線上報價
                </Link>
                <Link href="/admin" className="block text-stone-300 hover:text-white transition-colors">
                  管理後台
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-700 text-center text-stone-400">
            <p className="flex items-center justify-center gap-1">
              © 2024{' '}
              <Image
                src="/images/company-name-white.png"
                alt="圲億行銷設計"
                width={120}
                height={18}
                className="h-4 w-auto inline-block"
              />
              有限公司. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
