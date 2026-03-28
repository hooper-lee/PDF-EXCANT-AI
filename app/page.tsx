'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DisplayEffectModule from './components/DisplayEffectModule';
import WorkingPrincipleModule from './components/WorkingPrincipleModule';
import { useTranslation, useLanguage } from '@/lib/useLanguage';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { language } = useLanguage();
  const t = useTranslation();
  const pricing = t.pricing ?? ({} as Record<string, unknown>);
  const free = (pricing.free as Record<string, unknown>) ?? {};
  const monthly = (pricing.monthly as Record<string, unknown>) ?? {};
  const yearly = (pricing.yearly as Record<string, unknown>) ?? {};
  const freeFeatures = Array.isArray(free.features) ? free.features as string[] : [];
  const monthlyFeatures = Array.isArray(monthly.features) ? monthly.features as string[] : [];
  const yearlyFeatures = Array.isArray(yearly.features) ? yearly.features as string[] : [];

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div key={language} className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      {/* 展示效果：从 PDF 提取到 Excel 的界面展示 */}
      <section className="container mx-auto px-4 pt-12 pb-8">
        <DisplayEffectModule />
      </section>

      {/* 工作原理：PDF Extract AI 三步智能处理 */}
      <WorkingPrincipleModule />

      {/* 定价：与展示/工作原理模块样式统一 */}
      <section className="py-16 bg-white" aria-label="选择方案">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{String(pricing.title ?? '')}</h2>
            <p className="text-lg text-gray-600">{String(pricing.subtitle ?? '')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* 免费版 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">{String(free.name ?? '')}</h3>
              <p className="text-gray-600 mb-6">{String(free.description ?? '')}</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">{String(free.price ?? '')}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {freeFeatures.map((feature, index) => (
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
                {String(free.button ?? '')}
              </Link>
            </div>

            {/* 专业版 */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-md border border-blue-500/30 hover:shadow-lg transition-shadow">
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                {String(monthly.recommended ?? '')}
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">{String(monthly.name ?? '')}</h3>
                <p className="text-blue-100 mb-6">{String(monthly.description ?? '')}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{String(monthly.price ?? '')}</span>
                  <span className="text-blue-100 ml-2">/ 月</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {monthlyFeatures.map((feature, index) => (
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
                  {String(monthly.button ?? '')}
                </Link>
              </div>
            </div>

            {/* 年度版 */}
            <div className="relative bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 shadow-md border border-purple-500/30 hover:shadow-lg transition-shadow">
              <div className="absolute top-4 right-4 bg-green-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                {String(yearly.bestValue ?? '')}
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">{String(yearly.name ?? '')}</h3>
                <p className="text-purple-100 mb-6">{String(yearly.description ?? '')}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{String(yearly.price ?? '')}</span>
                  <span className="text-purple-100 ml-2">/ 年</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {yearlyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className={index === yearlyFeatures.length - 1 ? "font-semibold" : ""}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={isLoggedIn ? "/checkout" : "/login?redirect=checkout"}
                  className="block w-full bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg text-center"
                >
                  {String(yearly.button ?? '')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA：与模块样式统一，主文案突出 */}
      <section className="py-16 bg-gray-50" aria-label="开始使用">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center shadow-md border border-blue-500/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {t.home?.ctaTitle ?? 'Ready to simplify your workflow?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">
              {freeFeatures[0] ?? ''}
            </p>
            <Link
              href="/extract"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              {t.navbar?.getStarted ?? 'Get Started'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
