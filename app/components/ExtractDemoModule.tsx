'use client';

import Link from 'next/link';
import { FileText, Upload, ArrowRight } from 'lucide-react';
import type { Translations } from '@/lib/i18n';

interface ExtractDemoModuleProps {
  t: Translations;
  isLoggedIn: boolean;
}

/** 首页 - 文档处理与提取效果展示模块（上传区 + 预览 + 开始转换） */
export default function ExtractDemoModule({ t, isLoggedIn }: ExtractDemoModuleProps) {
  return (
    <section className="max-w-5xl mx-auto mb-16" aria-label="提取演示">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* 左侧：PDF 上传区域 */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.extract.dragDropFiles}</h3>
              <p className="text-sm text-gray-600 mb-4">{t.extract.supportedFormats}</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {t.extract.clickToUpload}
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">发票示例.pdf</span>
                    <span className="text-xs text-gray-500">2.3 MB</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：Excel 预览 */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">提取结果预览</h3>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                  已完成
                </span>
              </div>

              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">发票号码</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">日期</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">金额</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-900">INV-2024-001</td>
                      <td className="px-3 py-2 text-gray-600">2024-01-15</td>
                      <td className="px-3 py-2 text-gray-900 font-medium">$1,250.00</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-900">INV-2024-002</td>
                      <td className="px-3 py-2 text-gray-600">2024-01-16</td>
                      <td className="px-3 py-2 text-gray-900 font-medium">$890.50</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-900">INV-2024-003</td>
                      <td className="px-3 py-2 text-gray-600">2024-01-17</td>
                      <td className="px-3 py-2 text-gray-900 font-medium">$2,100.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 开始转换按钮 */}
        <div className="mt-8 text-center">
          <Link
            href={isLoggedIn ? '/extract' : '/login'}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t.extract.startConversion}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-500 mt-3">{t.pricing.free.features[0]}</p>
        </div>
      </div>
    </section>
  );
}
