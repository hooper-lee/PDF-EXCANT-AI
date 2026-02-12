'use client';

import Link from 'next/link';
import { FileText, CreditCard, Calendar, Star } from 'lucide-react';

/** 首页 - 展示效果模块：从PDF提取到Excel的界面展示（严格按设计图） */
export default function DisplayEffectModule() {
  return (
    <section className="max-w-5xl mx-auto mb-20" aria-label="展示效果">
      {/* 区块标题 */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          从
          <span className="text-red-500">PDF</span>
          中提取数据到您的
          <span className="text-green-600">Excel</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          通过 AI 去除 PDF 中无用的数据，AI 会根据你的需要内容进行提取数据
        </p>
        <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-400" />
            无需信用卡
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            30 页免费
          </span>
        </div>
      </div>

      {/* 主内容：上传区 + 预览区 */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 左侧：拖放上传 */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-white hover:border-blue-400 transition-colors flex flex-col items-center justify-center min-h-[320px]">
            <div className="flex gap-1 mb-6">
              <div className="w-10 h-12 bg-red-100 rounded-sm transform -rotate-6" />
              <div className="w-10 h-12 bg-green-100 rounded-sm transform rotate-0" />
              <div className="w-10 h-12 bg-blue-100 rounded-sm transform rotate-6" />
            </div>
            <p className="text-gray-700 font-medium mb-2">拖放文件到这里</p>
            <p className="text-sm text-gray-500 mb-6">PDF / 图片 / JSON</p>
            <Link
              href="/extract"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              浏览文件
            </Link>
          </div>

          {/* 右侧：Excel 预览与需求输入 */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* 文档类型标签 */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              {['发票', '采购单', '报价单', '更多...'].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-4 py-3 text-sm font-medium ${
                    i === 0 ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* 表格预览 */}
            <div className="p-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b">发票号码</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b">日期</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b">账单寄送至</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b">金额</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b">总计</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3, 4, 5, 6, 7].map((row) => (
                      <tr key={row} className="hover:bg-gray-50/50">
                        {[1, 2, 3, 4, 5].map((col) => (
                          <td key={col} className="px-3 py-2 text-gray-500">
                            —
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* 需求输入 + 开始转换 */}
            <div className="p-4 border-t border-gray-100 space-y-4">
              <label className="block text-sm font-medium text-gray-700">告诉我你的任何要求</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="例如：提取发票中的金额和日期"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  readOnly
                  aria-label="需求输入"
                />
                <Link
                  href="/extract"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors shrink-0"
                >
                  <Star className="w-4 h-4" />
                  开始转换
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  '日期使用 YY-MM-DD 格式',
                  '金额需要把税额也算上',
                  '在最后一列后面告诉我是哪个文件',
                ].map((label) => (
                  <span
                    key={label}
                    className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full cursor-default"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
