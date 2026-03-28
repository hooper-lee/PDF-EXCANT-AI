'use client';

import { FileText, MessageSquare, Table2 } from 'lucide-react';
import { useTranslation } from '@/lib/useLanguage';

/** 首页 - 工作原理模块：PDF Extract AI 三步智能处理 */
export default function WorkingPrincipleModule() {
  const t = useTranslation();
  const home = t.home ?? ({} as Record<string, string>);
  const steps = [
    { step: 1, icon: FileText, title: home.step1Title ?? '', description: home.step1Desc ?? '' },
    { step: 2, icon: MessageSquare, title: home.step2Title ?? '', description: home.step2Desc ?? '' },
    { step: 3, icon: Table2, title: home.step3Title ?? '', description: home.step3Desc ?? '' },
  ];
  return (
    <section className="py-16 bg-white" aria-label="工作原理">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {home.howItWorksTitle ?? 'How PDF Extract AI Works'}
          </h2>
          <p className="text-lg text-gray-600">
            {home.howItWorksSubtitle ?? ''}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ step, icon: Icon, title, description }) => (
            <div
              key={step}
              className="relative bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <span className="absolute top-4 left-4 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {step}
              </span>
              <div className="mt-2 mb-4 flex justify-center">
                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-7 h-7 text-amber-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
