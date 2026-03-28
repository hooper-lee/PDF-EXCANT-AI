'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Calendar, CreditCard, Users, Gift, Copy, CheckCircle, Edit2, Save, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from '@/lib/useLanguage';
import type { OrderStatus, UsageDirection, UsageSource, UserPlan, UserRole } from '@/lib/domain-types';
import { ORDER_STATUS, USAGE_DIRECTION, USAGE_SOURCE, USER_PLAN, USER_ROLE } from '@/lib/domain-types';

interface UserData {
  id: string;
  email: string;
  name: string;
  plan: UserPlan;
  pagesUsed: number;
  pagesLimit: number;
  inviteCode: string;
  inviteCount: number;
  invitePages: number;
  role?: UserRole;
  createdAt: string;
  _count: {
    documents: number;
  };
  orders?: Array<{
    id: string;
    planName: string;
    amount: number;
    status: OrderStatus;
    createdAt: string;
  }>;
}

interface UsageRecordItem {
  id: string;
  source: UsageSource;
  direction: UsageDirection;
  pages: number;
  note?: string | null;
  createdAt: string;
  documentId?: string | null;
  document?: {
    id: string;
    originalName: string;
  } | null;
}

export default function ProfilePage() {
  const t = useTranslation();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [usageRecords, setUsageRecords] = useState<UsageRecordItem[]>([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // 首先尝试使用本地缓存的用户数据
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        try {
          const parsedUser = JSON.parse(cachedUser);
          if (parsedUser?.role === USER_ROLE.ADMIN) {
            window.location.href = '/admin';
            return;
          }
          setUser(parsedUser);
          setEditName(parsedUser.name || '');
        } catch (parseError) {
          console.error('解析缓存用户数据失败:', parseError);
        }
      }

      // 然后尝试从API获取最新数据
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const u = userData.user;
        if (u?.role === USER_ROLE.ADMIN) {
          window.location.href = '/admin';
          return;
        }
        setUser(u);
        setEditName(u.name || '');
        // 更新本地缓存
        localStorage.setItem('user', JSON.stringify(u));
      } else {
        // API调用失败，如果没有缓存数据才跳转登录
        if (!cachedUser) {
          console.error('获取用户信息失败且无缓存数据:', response.status);
          window.location.href = '/login';
        }
      }

      const usageResponse = await fetch('/api/usage-records?limit=10', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (usageResponse.ok) {
        const usageData = await usageResponse.json();
        setUsageRecords(usageData.usageRecords || []);
      }
    } catch (error) {
      console.error('加载用户数据失败:', error);
      // 网络错误时，如果没有缓存数据才跳转登录
      const cachedUser = localStorage.getItem('user');
      if (!cachedUser) {
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveName = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editName }),
      });

      if (response.ok) {
        setUser({ ...user, name: editName });
        setEditing(false);
      } else {
        alert(t.errors.serverError);
      }
    } catch (error) {
      console.error('更新姓名失败:', error);
      alert(t.errors.serverError);
    } finally {
      setSaving(false);
    }
  };

  const copyInviteCode = async () => {
    if (!user?.inviteCode) return;
    
    try {
      await navigator.clipboard.writeText(user.inviteCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  const getPlanName = (plan: UserPlan) => {
    switch (plan) {
      case USER_PLAN.MONTHLY:
        return t.profile.planMonthly;
      case USER_PLAN.YEARLY:
        return t.profile.planYearly;
      case USER_PLAN.FREE:
      default:
        return t.profile.planFree;
    }
  };

  const getPlanColor = (plan: UserPlan) => {
    switch (plan) {
      case USER_PLAN.MONTHLY:
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case USER_PLAN.YEARLY:
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case USER_PLAN.FREE:
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case ORDER_STATUS.COMPLETED:
        return 'bg-green-100 text-green-700';
      case ORDER_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-700';
      case ORDER_STATUS.FAILED:
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getUsageSourceLabel = (source: UsageSource) => {
    switch (source) {
      case USAGE_SOURCE.EXTRACTION:
        return 'AI 提取消耗';
      case USAGE_SOURCE.INVITE_REWARD:
        return '邀请奖励';
      case USAGE_SOURCE.SUBSCRIPTION_GRANT:
        return '订阅发放';
      case USAGE_SOURCE.ADMIN_ADJUST:
        return '管理员调整';
      default:
        return source;
    }
  };

  const getUsageDirectionColor = (direction: UsageDirection) => {
    return direction === USAGE_DIRECTION.IN
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.profile.pageTitle}</h1>
            <p className="text-gray-600">{t.profile.pageSubtitle}</p>
          </div>

          <div className="grid gap-8">
            {/* 基本信息卡片 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{t.profile.basicInfo}</h2>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    {t.profile.edit}
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1">
                      {editing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder={t.profile.namePlaceholder}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            onClick={handleSaveName}
                            disabled={saving}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                          >
                            {saving ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setEditing(false);
                              setEditName(user?.name || '');
                            }}
                            className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="text-xl font-semibold text-gray-900">
                            {user?.name || t.profile.notSetName}
                          </div>
                          <div className="text-gray-600">{user?.email || ''}</div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">邮箱地址</div>
                        <div className="text-gray-900">{user?.email || ''}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">注册时间</div>
                        <div className="text-gray-900">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('zh-CN') : ''}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* 套餐信息 */}
                  <div className={`border-2 rounded-xl p-4 ${user ? getPlanColor(user.plan) : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        <span className="font-semibold">当前套餐</span>
                      </div>
                      <span className="text-lg font-bold">{user ? getPlanName(user.plan) : '加载中...'}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>页面使用情况</span>
                        <span>{user?.pagesUsed || 0} / {user?.pagesLimit || 0}</span>
                      </div>
                      <div className="w-full bg-white/50 rounded-full h-2">
                        <div
                          className="bg-current h-2 rounded-full transition-all"
                          style={{
                            width: `${user ? Math.min((user.pagesUsed / user.pagesLimit) * 100, 100) : 0}%`
                          }}
                        />
                      </div>
                      <div className="text-xs opacity-75">
                        剩余 {user ? Math.max(user.pagesLimit - user.pagesUsed, 0) : 0} 页
                      </div>
                    </div>

                    {user?.plan === USER_PLAN.FREE && (
                      <div className="mt-4 pt-3 border-t border-current/20">
                        <a
                          href="/pricing"
                          className="text-sm font-medium hover:underline"
                        >
                          升级到专业版 →
                        </a>
                      </div>
                    )}
                  </div>

                  {/* 使用统计 */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold text-gray-900">使用统计</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {user?._count?.documents || 0}
                    </div>
                    <div className="text-sm text-gray-600">已处理文档数</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 邀请奖励卡片 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">邀请奖励</h2>
                  <p className="text-green-700">邀请好友注册，双方各获得 100 页免费额度</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">已邀请人数</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{user?.inviteCount || 0}</div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">获得页数</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{user?.invitePages || 0}</div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">我的邀请码</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-gray-100 px-3 py-2 rounded-lg font-mono text-lg font-bold">
                      {user?.inviteCode || 'LOADING...'}
                    </code>
                    <button
                      onClick={copyInviteCode}
                      disabled={!user?.inviteCode}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300"
                      title="复制邀请码"
                    >
                      {copySuccess ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {copySuccess && (
                    <div className="text-xs text-green-600 mt-1">已复制到剪贴板</div>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">如何邀请好友？</h3>
                <ol className="text-sm text-gray-700 space-y-1">
                  <li>1. 复制上方的邀请码</li>
                  <li>2. 分享给您的好友</li>
                  <li>3. 好友注册时输入邀请码</li>
                  <li>4. 双方各获得 100 页免费额度</li>
                </ol>
              </div>
            </div>

            {/* 订单历史 */}
            {usageRecords.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">最近额度流水</h2>
                <div className="space-y-3">
                  {usageRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-gray-100 rounded-xl p-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-gray-900">{getUsageSourceLabel(record.source)}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUsageDirectionColor(record.direction)}`}>
                            {record.direction === USAGE_DIRECTION.IN ? `+${record.pages} 页` : `-${record.pages} 页`}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {record.note || '无备注'}
                        </div>
                        {record.document && (
                          <div className="text-xs text-gray-500 mt-1">
                            文档：{record.document.originalName}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(record.createdAt).toLocaleString('zh-CN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {user?.orders && user.orders.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">订单历史</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">订单ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">套餐</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">金额</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">状态</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">时间</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {user?.orders?.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-sm">{order.id.slice(-8)}</td>
                          <td className="px-4 py-3">{order.planName}</td>
                          <td className="px-4 py-3 font-semibold">${order.amount}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status === ORDER_STATUS.COMPLETED ? '已完成' : 
                               order.status === ORDER_STATUS.PENDING ? '待处理' : 
                               order.status === ORDER_STATUS.FAILED ? '失败' : order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('zh-CN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
