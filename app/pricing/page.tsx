'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useTranslation } from '@/lib/useLanguage';

export default function PricingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{t.pricing.title}</h1>
            <p className="text-xl text-gray-600">{t.pricing.subtitle}</p>
          </div>

          {/* 套餐卡片 - 3列布局 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 免费版 */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{t.pricing.free.name}</h3>
                <p className="text-gray-600 mb-6">{t.pricing.free.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{t.pricing.free.price}</span>
                  <span className="text-gray-600 ml-2">一次性</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {t.pricing.free.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/extract"
                  className="block w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  {t.pricing.free.button}
                </Link>
              </div>
            </div>

            {/* 专业版 */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl overflow-hidden relative hover:shadow-2xl transition-shadow">
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                {t.pricing.monthly.recommended}
              </div>
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{t.pricing.monthly.name}</h3>
                <p className="text-blue-100 mb-6">{t.pricing.monthly.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{t.pricing.monthly.price}</span>
                  <span className="text-blue-100 ml-2">/ 月</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {t.pricing.monthly.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={isLoggedIn ? "/checkout" : "/login?redirect=checkout"}
                  className="block w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg text-center"
                >
                  {t.pricing.monthly.button}
                </Link>
              </div>
            </div>

            {/* 年度版 */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden relative hover:shadow-2xl transition-shadow">
              <div className="absolute top-4 right-4 bg-green-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                {t.pricing.yearly.bestValue}
              </div>
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{t.pricing.yearly.name}</h3>
                <p className="text-purple-100 mb-6">{t.pricing.yearly.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{t.pricing.yearly.price}</span>
                  <span className="text-purple-100 ml-2">/ 年</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {t.pricing.yearly.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={isLoggedIn ? "/checkout" : "/login?redirect=checkout"}
                  className="block w-full bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg text-center"
                >
                  {t.pricing.yearly.button}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
