'use client';

import { FileText, Zap, CheckCircle } from 'lucide-react';
import type { Translations } from '@/lib/i18n';

interface FeaturesShowcaseModuleProps {
  t: Translations;
}

/** 首页 - 功能展示模块（AI 智能提取、快速处理、多格式支持 三卡片） */
export default function FeaturesShowcaseModule({ t }: FeaturesShowcaseModuleProps) {
  return (
    <section className="max-w-4xl mx-auto mb-16" aria-label="功能说明">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            {t.home.features.aiExtraction.title}
          </h3>
          <p className="text-gray-600 text-sm">{t.home.features.aiExtraction.description}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            {t.home.features.fastProcessing.title}
          </h3>
          <p className="text-gray-600 text-sm">{t.home.features.fastProcessing.description}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            {t.home.features.multiFormat.title}
          </h3>
          <p className="text-gray-600 text-sm">{t.home.features.multiFormat.description}</p>
        </div>
      </div>
    </section>
  );
}
