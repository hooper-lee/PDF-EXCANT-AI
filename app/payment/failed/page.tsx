'use client';

import { useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft, CreditCard, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useTranslation } from '@/lib/useLanguage';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || '支付处理失败';
  const planId = searchParams.get('planId') || 'monthly';
  const t = useTranslation();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* 失败图标 */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>

        {/* 标题和描述 */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.paymentFailed.title}</h1>
        <p className="text-xl text-gray-600 mb-8">
          {t.paymentFailed.subtitle}
        </p>

        {/* 错误信息 */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-red-800 mb-2">{t.paymentFailed.errorDetails}</h3>
          <p className="text-red-700">{error}</p>
        </div>

        {/* 常见问题和解决方案 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-left">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{t.paymentFailed.commonIssues}</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t.paymentFailed.cardInfoError}</h4>
                <p className="text-gray-600 text-sm">{t.paymentFailed.cardInfoErrorDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t.paymentFailed.insufficientFunds}</h4>
                <p className="text-gray-600 text-sm">{t.paymentFailed.insufficientFundsDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t.paymentFailed.bankRestriction}</h4>
                <p className="text-gray-600 text-sm">{t.paymentFailed.bankRestrictionDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{t.paymentFailed.networkIssue}</h4>
                <p className="text-gray-600 text-sm">{t.paymentFailed.networkIssueDesc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 测试卡号提示 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">{t.paymentFailed.testEnvironment}</h3>
          <p className="text-yellow-700 text-sm mb-3">
            {t.paymentFailed.testEnvironmentDesc}
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center bg-yellow-100 px-3 py-2 rounded">
              <span className="font-mono">4242 4242 4242 4242</span>
              <span className="text-green-600">✓ 成功</span>
            </div>
            <div className="flex justify-between items-center bg-yellow-100 px-3 py-2 rounded">
              <span className="font-mono">4000 0000 0000 0002</span>
              <span className="text-red-600">✗ 被拒绝</span>
            </div>
            <div className="flex justify-between items-center bg-yellow-100 px-3 py-2 rounded">
              <span className="font-mono">4000 0000 0000 0119</span>
              <span className="text-red-600">✗ 处理错误</span>
            </div>
          </div>
          <p className="text-yellow-600 text-xs mt-3">
            有效期使用任何未来日期，CVC使用任意3位数字
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/checkout?plan=${planId}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            {t.paymentFailed.retryPayment}
          </Link>
          
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t.paymentFailed.selectOtherPlan}
          </Link>
        </div>

        {/* 客服联系 */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">{t.paymentFailed.needHelp}</h3>
          <p className="text-gray-600 text-sm mb-4">
            {t.paymentFailed.needHelpDesc}
          </p>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <CreditCard className="w-4 h-4" />
            {t.paymentFailed.contactSupport}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <Suspense fallback={
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">正在加载...</p>
          </div>
        </div>
      }>
        <PaymentFailedContent />
      </Suspense>
      <Footer />
    </div>
  );
}