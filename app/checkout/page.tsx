'use client';

import { useState } from 'react';
import { ArrowLeft, Check, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [country, setCountry] = useState('CN');

  const plans = [
    {
      id: 'monthly',
      name: '专业版',
      description: '适合有定期需求的专业人士',
      price: 9.9,
      period: '/ 月',
      recommended: true,
      features: ['2000 页 / 月', '约 $0.005 / 页', '数据导出不限制', '优先支持']
    },
    {
      id: 'yearly',
      name: '年度版',
      description: '适合重度使用的企业用户',
      price: 107,
      period: '/ 年',
      features: ['20400 页 / 年', '约 $0.005 / 页', '数据导出不限制', '优先支持', '节省 10% 费用']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      if (!email || !cardNumber || !expiryDate || !cvc || !cardholderName) {
        throw new Error('请填写所有必填字段');
      }

      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          planId: selectedPlan,
          email,
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiryDate,
          cvc,
          cardholderName,
          country
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || '支付处理失败');
      }

      router.push(`/payment/success?orderId=${data.orderId}`);

    } catch (error: any) {
      setError(error.message || '处理失败，请稍后重试');
    } finally {
      setProcessing(false);
    }
  };

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">完成订阅</h1>
            <p className="text-xl text-gray-600">选择您的方案并完成支付</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">选择方案</h2>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPlan === plan.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                        {plan.recommended && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">推荐</span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600 text-sm">{plan.period}</span>
                      </div>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">需要免费版？</h3>
                  <p className="text-xs text-blue-600 mb-3">免费版无需支付，直接开始使用</p>
                  <Link
                    href="/extract"
                    className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    免费开始使用
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">订单信息</h2>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{currentPlan.name}</h3>
                    <p className="text-gray-600">{currentPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${currentPlan.price}</div>
                    <div className="text-gray-600">{currentPlan.period}</div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span>总计</span>
                    <span className="text-blue-600">${currentPlan.price}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">支付方式</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">银行卡信息</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 1234 1234 1234"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">月份/年份</label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                      <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">持卡人姓名</label>
                    <input
                      type="text"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      placeholder="全名"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50"
                  >
                    <div className="flex items-center justify-center gap-2">
                      {processing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          处理中...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          立即支付 ${currentPlan.price}
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/pricing" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>查看所有方案</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
