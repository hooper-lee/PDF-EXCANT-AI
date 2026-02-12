'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, CreditCard, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useTranslation } from '@/lib/useLanguage';

interface OrderDetails {
  id: string;
  planName: string;
  amount: number;
  currency: string;
  status: string;
  cardLast4?: string;
  cardBrand?: string;
  billingName?: string;
  completedAt: string;
  user: {
    plan: string;
    pagesLimit: number;
    pagesUsed: number;
  };
}

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const t = useTranslation();
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) {
      setError('订单ID缺失');
      setLoading(false);
      return;
    }

    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`/api/payment/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('获取订单详情失败');
      }

      const data = await response.json();
      setOrderDetails(data);
    } catch (error) {
      console.error('获取订单详情错误:', error);
      setError('获取订单详情失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">{t.paymentSuccess.subtitle}</p>
        </div>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">出现错误</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回对话列表
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 成功标题 */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.paymentSuccess.title}</h1>
          <p className="text-xl text-gray-600">
            {t.paymentSuccess.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 订单详情 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.paymentSuccess.orderDetails}</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">{t.paymentSuccess.orderId}</span>
                <span className="font-mono text-sm text-gray-900">{orderDetails.id}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">{t.paymentSuccess.plan}</span>
                <span className="font-semibold text-gray-900">{orderDetails.planName}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">{t.paymentSuccess.amount}</span>
                <span className="font-bold text-2xl text-green-600">
                  ${orderDetails.amount}
                </span>
              </div>
              
              {orderDetails.cardLast4 && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">{t.paymentSuccess.paymentMethod}</span>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">
                      {orderDetails.cardBrand} •••• {orderDetails.cardLast4}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">{t.paymentSuccess.paymentTime}</span>
                <span className="text-gray-900">
                  {new Date(orderDetails.completedAt).toLocaleString('zh-CN')}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">{t.paymentSuccess.status}</span>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  {t.paymentSuccess.completed}
                </span>
              </div>
            </div>
          </div>

          {/* 账户信息 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.paymentSuccess.accountInfo}</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{t.paymentSuccess.currentPlan}</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  {orderDetails.user.plan === 'FREE' ? '免费版' : 
                   orderDetails.user.plan === 'MONTHLY' ? '专业版' : '年度版'}
                </p>
                <p className="text-gray-600">
                  页面额度：{orderDetails.user.pagesLimit.toLocaleString()} 页
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{t.paymentSuccess.usage}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.paymentSuccess.used}</span>
                    <span className="font-medium">{orderDetails.user.pagesUsed} 页</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.paymentSuccess.remaining}</span>
                    <span className="font-medium text-green-600">
                      {(orderDetails.user.pagesLimit - orderDetails.user.pagesUsed).toLocaleString()} 页
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min((orderDetails.user.pagesUsed / orderDetails.user.pagesLimit) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/extract"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              {t.paymentSuccess.startUsing}
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              {t.paymentSuccess.viewDashboard}
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            如有任何问题，请联系我们的客服团队
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
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
        <PaymentSuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}