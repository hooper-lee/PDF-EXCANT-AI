'use client';

import Link from 'next/link';
import { FileText, CreditCard, Calendar, Star } from 'lucide-react';
import { useTranslation } from '@/lib/useLanguage';

function safeIncludes(s: unknown, sub: string): boolean {
  return typeof s === 'string' && s.length > 0 && (s as string).indexOf(sub) !== -1;
}

/** 首页 - 展示效果模块：从PDF提取到Excel的界面展示（严格按设计图） */
export default function DisplayEffectModule() {
  const t = useTranslation();
  const home = t?.home ?? ({} as Record<string, string>);
  const heroTitleRaw = home?.heroTitle;
  const heroTitle = typeof heroTitleRaw === 'string' ? heroTitleRaw : '';
  const tabs = [home.tabInvoice ?? 'Invoice', home.tabPurchaseOrder ?? 'Purchase Order', home.tabQuotation ?? 'Quotation', home.tabMore ?? 'More...'];
  const options = [home.optionDateFormat ?? '', home.optionAmountWithTax ?? '', home.optionFileHint ?? ''].filter(Boolean);
  const showHighlight = safeIncludes(heroTitleRaw, 'PDF') && safeIncludes(heroTitleRaw, 'Excel');
  return (
    <section className="max-w-5xl mx-auto mb-20" aria-label="展示效果">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {showHighlight && heroTitle ? (
            <>
              {heroTitle.split(/\s*PDF\s*/)[0]}
              <span className="text-red-500">PDF</span>
              {heroTitle.split(/\s*PDF\s*/)[1]?.split(/\s*Excel\s*/)[0]}
              <span className="text-green-600">Excel</span>
              {(heroTitle.split(/\s*Excel\s*/)[1] ?? '')}
            </>
          ) : (
            heroTitle || 'Extract data from PDF to Excel'
          )}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          {home.heroSubtitle ?? ''}
        </p>
        <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-400" />
            {home.noCreditCard ?? ''}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            {home.pagesFree ?? ''}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-white hover:border-blue-400 transition-colors flex flex-col items-center justify-center min-h-[320px]">
            <div className="flex gap-1 mb-6">
              <div className="w-10 h-12 bg-red-100 rounded-sm transform -rotate-6" />
              <div className="w-10 h-12 bg-green-100 rounded-sm transform rotate-0" />
              <div className="w-10 h-12 bg-blue-100 rounded-sm transform rotate-6" />
            </div>
            <p className="text-gray-700 font-medium mb-2">{home.dragDropHere ?? ''}</p>
            <p className="text-sm text-gray-500 mb-6">{home.supportedFormats ?? ''}</p>
            <Link
              href="/extract"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              {home.browseFiles ?? ''}
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex border-b border-gray-200 bg-gray-50">
              {tabs.map((tab, i) => (
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
            <div className="p-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b">{home.tableInvoiceNo ?? ''}</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b">{home.tableDate ?? ''}</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b">{home.tableBillTo ?? ''}</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b">{home.tableAmount ?? ''}</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b">{home.tableTotal ?? ''}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3, 4, 5, 6, 7].map((row) => (
                      <tr key={row} className="hover:bg-gray-50/50">
                        {[1, 2, 3, 4, 5].map((col) => (
                          <td key={col} className="px-3 py-2 text-gray-500">—</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 space-y-4">
              <label className="block text-sm font-medium text-gray-700">{home.requirementsLabel ?? ''}</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={home.requirementsPlaceholder ?? ''}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  readOnly
                  aria-label="需求输入"
                />
                <Link
                  href="/extract"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors shrink-0"
                >
                  <Star className="w-4 h-4" />
                  {home.startConversion ?? ''}
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {options.map((label) => (
                  <span key={label} className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full cursor-default">
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
