'use client';

import { useState, useEffect } from 'react';
import { Users, FileText, DollarSign, TrendingUp, Search, LogOut, UserPlus, Shield, LayoutDashboard, Lock } from 'lucide-react';
import type { OrderStatus, PaymentMethod, SubscriptionStatus, UserPlan, UserRole } from '@/lib/domain-types';
import { ORDER_STATUS, USER_PLAN, USER_ROLE } from '@/lib/domain-types';

type AdminMenu = 'overview' | 'backend' | 'frontend';
const PAGE_SIZE = 10;
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Stats {
  totalUsers: number;
  totalDocuments: number;
  totalPages: number;
  totalRevenue: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  plan: UserPlan;
  pagesUsed: number;
  pagesLimit: number;
  inviteCode: string;
  inviteCount: number;
  invitePages: number;
  invitedBy: string | null;
  createdAt: string;
  _count: {
    documents: number;
    orders?: number;
  };
  inviter?: {
    email: string;
  };
  orders?: Array<{
    id: string;
    planId: UserPlan;
    planName: string;
    amount: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod | null;
    cardLast4: string | null;
    cardBrand: string | null;
    createdAt: string;
    completedAt: string | null;
  }>;
  subscriptions?: Array<{
    id: string;
    status: SubscriptionStatus;
    currentPeriodEnd: string;
    createdAt: string;
  }>;
}

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDocuments: 0,
    totalPages: 0,
    totalRevenue: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [currentAdminUserId, setCurrentAdminUserId] = useState<string | null>(null);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [addAdminError, setAddAdminError] = useState('');
  const [activeMenu, setActiveMenu] = useState<AdminMenu>('overview');
  const [adminSearchEmail, setAdminSearchEmail] = useState('');
  const [adminSearchName, setAdminSearchName] = useState('');
  const [adminPage, setAdminPage] = useState(1);
  const [frontendPlanFilter, setFrontendPlanFilter] = useState('');
  const [frontendPage, setFrontendPage] = useState(1);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordUserId, setPasswordUserId] = useState('');
  const [passwordUserEmail, setPasswordUserEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  /** 强制鉴权：未登录跳转登录页，非管理员跳转 dashboard 并提示无权限；仅管理员才拉取后台数据 */
  const checkAuthAndLoadData = async () => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      router.replace('/admin/login');
      return;
    }

    try {
      const meRes = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (meRes.status === 401 || !meRes.ok) {
        setLoading(false);
        router.replace('/admin/login');
        return;
      }
      const { user } = await meRes.json();
      if (user?.role !== USER_ROLE.ADMIN) {
        setLoading(false);
        router.replace('/dashboard?forbidden=1');
        return;
      }
      setCurrentAdminUserId(user.id);
      await loadData();
    } catch (error) {
      console.error('鉴权或加载失败:', error);
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('token');
      if (!token) return;

      // 加载统计数据
      try {
        const statsResponse = await fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        } else if (statsResponse.status === 403) {
          router.replace('/dashboard?forbidden=1');
          return;
        }
      } catch (error) {
        console.error('Stats request failed:', error);
      }

      // 加载用户列表
      try {
        const usersResponse = await fetch('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData.users || []);
        } else if (usersResponse.status === 403) {
          router.replace('/dashboard?forbidden=1');
          return;
        }
      } catch (error) {
        console.error('Users request failed:', error);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const adminUsers = users.filter((u) => u.role === USER_ROLE.ADMIN);
  const frontendUsers = users.filter((u) => u.role !== USER_ROLE.ADMIN);

  const filteredAdminUsers = adminUsers.filter((u) => {
    const emailMatch = !adminSearchEmail.trim() || u.email.toLowerCase().includes(adminSearchEmail.toLowerCase());
    const nameMatch = !adminSearchName.trim() || (u.name || '').toLowerCase().includes(adminSearchName.toLowerCase());
    return emailMatch && nameMatch;
  });
  const adminTotal = filteredAdminUsers.length;
  const adminPageCount = Math.max(1, Math.ceil(adminTotal / PAGE_SIZE));
  const paginatedAdminUsers = filteredAdminUsers.slice((adminPage - 1) * PAGE_SIZE, adminPage * PAGE_SIZE);

  const filteredFrontendUsers = frontendUsers.filter((user) => {
    const termMatch =
      !searchTerm.trim() ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const planMatch = !frontendPlanFilter || user.plan === frontendPlanFilter;
    return termMatch && planMatch;
  });
  const frontendTotal = filteredFrontendUsers.length;
  const frontendPageCount = Math.max(1, Math.ceil(frontendTotal / PAGE_SIZE));
  const paginatedFrontendUsers = filteredFrontendUsers.slice(
    (frontendPage - 1) * PAGE_SIZE,
    frontendPage * PAGE_SIZE
  );

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  // 套餐对应的页面限制配置
  const planLimits: Record<UserPlan, number> = {
    FREE: 300,
    MONTHLY: 2000,
    YEARLY: 20400,
  };

  // 处理套餐变更时自动更新页面限制
  const handlePlanChange = (newPlan: UserPlan) => {
    if (editingUser) {
      const newLimit = planLimits[newPlan] || editingUser.pagesLimit;
      setEditingUser({ 
        ...editingUser, 
        plan: newPlan,
        pagesLimit: newLimit
      });
    }
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;

    try {
      // Check if we're on the client side
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan: editingUser.plan,
          pagesLimit: editingUser.pagesLimit,
          pagesUsed: editingUser.pagesUsed,
          name: editingUser.name,
        }),
      });

      if (response.ok) {
        // 重新加载数据
        await loadData();
        setShowEditModal(false);
        setEditingUser(null);
        alert('用户信息更新成功');
      } else {
        const errorData = await response.json();
        alert(`更新失败: ${errorData.error}`);
      }
    } catch (error) {
      console.error('更新用户失败:', error);
      alert('更新失败，请稍后重试');
    }
  };

  const handleViewUserDetail = (user: User) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword.length < 6) {
      setPasswordError('密码至少 6 位');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('两次输入的密码不一致');
      return;
    }
    setChangingPassword(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${passwordUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || '修改失败');
        return;
      }
      setShowPasswordModal(false);
      setPasswordUserId('');
      setPasswordUserEmail('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError('修改失败，请稍后重试');
    } finally {
      setChangingPassword(false);
    }
  };

  const openPasswordModal = (user: User) => {
    setPasswordUserId(user.id);
    setPasswordUserEmail(user.email);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setShowPasswordModal(true);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddAdminError('');
    setAddingAdmin(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: newAdminEmail.trim(),
          password: newAdminPassword,
          name: newAdminName.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAddAdminError(data.error || '创建失败');
        return;
      }
      setShowAddAdminModal(false);
      setNewAdminEmail('');
      setNewAdminPassword('');
      setNewAdminName('');
      await loadData();
    } catch (err) {
      setAddAdminError('创建失败，请稍后重试');
    } finally {
      setAddingAdmin(false);
    }
  };

  const getPlanColor = (plan: UserPlan) => {
    switch (plan) {
      case USER_PLAN.MONTHLY:
        return 'bg-blue-100 text-blue-700';
      case USER_PLAN.YEARLY:
        return 'bg-purple-100 text-purple-700';
      case USER_PLAN.FREE:
      default:
        return 'bg-gray-100 text-gray-700';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            PDF Extract AI - 管理后台
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/');
              }}
              className="text-gray-600 hover:text-blue-600 text-sm"
            >
              返回前台
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.replace('/admin/login');
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 text-sm"
              title="退出登录"
            >
              <LogOut className="w-4 h-4" />
              退出
            </button>
          </div>
        </nav>
      </header>

      <main className="flex min-h-[calc(100vh-4rem)]">
        {/* 左侧导航 */}
        <aside className="w-56 bg-white border-r flex-shrink-0">
          <nav className="p-3 space-y-1">
            <button
              type="button"
              onClick={() => setActiveMenu('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                activeMenu === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              概览
            </button>
            <button
              type="button"
              onClick={() => setActiveMenu('backend')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                activeMenu === 'backend' ? 'bg-amber-50 text-amber-800' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Shield className="w-5 h-5" />
              后台用户
            </button>
            <button
              type="button"
              onClick={() => setActiveMenu('frontend')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                activeMenu === 'frontend' ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              前台用户
            </button>
          </nav>
        </aside>

        <div className="flex-1 overflow-auto p-6">
          {/* 概览 */}
          {activeMenu === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">总用户数</span>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-3xl font-bold">{stats.totalUsers}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">总文档数</span>
                  <FileText className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-3xl font-bold">{stats.totalDocuments}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">总页数</span>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-3xl font-bold">{stats.totalPages}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">总收入</span>
                  <DollarSign className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold">¥{stats.totalRevenue}</div>
              </div>
            </div>
          )}

          {/* 后台用户 */}
          {activeMenu === 'backend' && (
            <div className="space-y-4">
              {/* 查询条件 */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">查询条件</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    placeholder="邮箱模糊查询"
                    value={adminSearchEmail}
                    onChange={(e) => { setAdminSearchEmail(e.target.value); setAdminPage(1); }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-44 focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="姓名模糊查询"
                    value={adminSearchName}
                    onChange={(e) => { setAdminSearchName(e.target.value); setAdminPage(1); }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-44 focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddAdminModal(true);
                      setAddAdminError('');
                      setNewAdminEmail('');
                      setNewAdminPassword('');
                      setNewAdminName('');
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    新增管理员
                  </button>
                </div>
              </div>
              {/* 内容列表 */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <h3 className="text-sm font-semibold text-gray-700">内容列表</h3>
                  <p className="text-xs text-gray-500 mt-0.5">可登录管理后台的账号</p>
                </div>
              {loading ? (
                <div className="p-8 text-center text-gray-500 text-sm">加载中...</div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">邮箱</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">姓名</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">注册时间</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {paginatedAdminUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{user.name || '—'}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                            </td>
                            <td className="px-6 py-4 flex gap-3">
                              <button
                                onClick={() => openPasswordModal(user)}
                                className="text-amber-600 hover:text-amber-800 text-sm flex items-center gap-1"
                              >
                                <Lock className="w-3.5 h-3.5" />
                                修改密码
                              </button>
                              <button
                                onClick={() => handleViewUserDetail(user)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                详情
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {adminTotal === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">暂无后台用户，请点击「新增管理员」创建</div>
                  )}
                  {adminTotal > 0 && (
                    <div className="p-4 border-t flex items-center justify-between text-sm text-gray-600">
                      <span>共 {adminTotal} 位管理员</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={adminPage <= 1}
                          onClick={() => setAdminPage((p) => Math.max(1, p - 1))}
                          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
                        >
                          上一页
                        </button>
                        <span>第 {adminPage} / {adminPageCount} 页</span>
                        <button
                          type="button"
                          disabled={adminPage >= adminPageCount}
                          onClick={() => setAdminPage((p) => Math.min(adminPageCount, p + 1))}
                          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
                        >
                          下一页
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
              </div>
            </div>
          )}

          {/* 前台用户 */}
          {activeMenu === 'frontend' && (
            <div className="space-y-4">
              {/* 查询条件 */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">查询条件</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="用户（姓名/邮箱）"
                      value={searchTerm}
                      onChange={(e) => { setSearchTerm(e.target.value); setFrontendPage(1); }}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={frontendPlanFilter}
                    onChange={(e) => { setFrontendPlanFilter(e.target.value); setFrontendPage(1); }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">全部套餐</option>
                    <option value={USER_PLAN.FREE}>免费版</option>
                    <option value={USER_PLAN.MONTHLY}>专业版</option>
                    <option value={USER_PLAN.YEARLY}>年度版</option>
                  </select>
                </div>
              </div>
              {/* 内容列表 */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <h3 className="text-sm font-semibold text-gray-700">内容列表</h3>
                  <p className="text-xs text-gray-500 mt-0.5">网站注册用户，套餐与使用情况</p>
                </div>

              {loading ? (
                <div className="p-12 text-center text-gray-500">加载中...</div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">用户</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">套餐</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">使用情况</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">支付信息</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">邀请统计</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">注册时间</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {paginatedFrontendUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{user.name || '未设置'}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                          {user.inviter && (
                            <div className="text-xs text-blue-600">
                              由 {user.inviter.email} 邀请
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(user.plan)}`}>
                          {user.plan === USER_PLAN.MONTHLY ? '专业版' : user.plan === USER_PLAN.YEARLY ? '年度版' : '免费版'}
                        </span>
                        {user.subscriptions && user.subscriptions.length > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            到期: {new Date(user.subscriptions[0].currentPeriodEnd).toLocaleDateString('zh-CN')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min((user.pagesUsed / user.pagesLimit) * 100, 100)}%`
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {user.pagesUsed} / {user.pagesLimit}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="text-gray-900">
                            订单: {user._count?.orders || 0} 个
                          </div>
                          {user.orders && user.orders.length > 0 && (
                            <div className="space-y-1 mt-1">
                              {user.orders.slice(0, 2).map((order) => (
                                <div key={order.id} className="text-xs">
                                  <span className={`px-1 py-0.5 rounded text-xs ${getStatusColor(order.status)}`}>
                                    {order.status === ORDER_STATUS.COMPLETED ? '已完成' : 
                                     order.status === ORDER_STATUS.PENDING ? '待处理' : 
                                     order.status === ORDER_STATUS.FAILED ? '失败' : order.status}
                                  </span>
                                  <span className="ml-1 text-gray-600">
                                    ${order.amount}
                                  </span>
                                  {order.cardLast4 && (
                                    <span className="ml-1 text-gray-500">
                                      •••• {order.cardLast4}
                                    </span>
                                  )}
                                </div>
                              ))}
                              {user.orders.length > 2 && (
                                <button
                                  onClick={() => handleViewUserDetail(user)}
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  查看更多...
                                </button>
                              )}
                            </div>
                          )}
                          {(!user.orders || user.orders.length === 0) && (
                            <div className="text-xs text-gray-500 mt-1">暂无订单</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="text-gray-900">
                            邀请 {user.inviteCount} 人
                          </div>
                          <div className="text-gray-600">
                            获得 {user.invitePages} 页
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            {user.inviteCode}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => handleViewUserDetail(user)}
                            className="text-green-600 hover:text-green-800 text-sm"
                          >
                            详情
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
                  {frontendTotal === 0 && (
                    <div className="p-12 text-center text-gray-500">
                      {frontendUsers.length === 0 ? '暂无前台注册用户' : '没有找到匹配的用户'}
                    </div>
                  )}
                  {frontendTotal > 0 && (
                    <div className="p-4 border-t flex items-center justify-between text-sm text-gray-600">
                      <span>共 {frontendTotal} 位前台用户</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={frontendPage <= 1}
                          onClick={() => setFrontendPage((p) => Math.max(1, p - 1))}
                          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
                        >
                          上一页
                        </button>
                        <span>第 {frontendPage} / {frontendPageCount} 页</span>
                        <button
                          type="button"
                          disabled={frontendPage >= frontendPageCount}
                          onClick={() => setFrontendPage((p) => Math.min(frontendPageCount, p + 1))}
                          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
                        >
                          下一页
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
              </div>
            </div>
          )}
        </div>

        {/* 修改密码模态框 */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-600" />
                修改登录密码
              </h3>
              <p className="text-sm text-gray-500 mb-4">为 {passwordUserEmail} 设置新密码</p>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">新密码 *</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500"
                    placeholder="至少 6 位"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">确认新密码 *</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500"
                    placeholder="再次输入"
                  />
                </div>
                {passwordError && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {passwordError}
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordUserId('');
                      setPasswordUserEmail('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setPasswordError('');
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
                  >
                    {changingPassword ? '保存中...' : '保存'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 新增管理员模态框 */}
        {showAddAdminModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-600" />
                新增管理员
              </h3>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱 *</label>
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="admin@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">密码 *</label>
                  <input
                    type="password"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="至少 6 位"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名（选填）</label>
                  <input
                    type="text"
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="显示名称"
                  />
                </div>
                {addAdminError && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {addAdminError}
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAdminModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    disabled={addingAdmin}
                    className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
                  >
                    {addingAdmin ? '创建中...' : '创建'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 编辑用户模态框 */}
        {showEditModal && editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">编辑用户信息</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱
                  </label>
                  <input
                    type="email"
                    value={editingUser.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    姓名
                  </label>
                  <input
                    type="text"
                    value={editingUser.name || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    套餐
                  </label>
                  <select
                    value={editingUser.plan}
                    onChange={(e) => handlePlanChange(e.target.value as UserPlan)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={USER_PLAN.FREE}>免费版 (300 页)</option>
                    <option value={USER_PLAN.MONTHLY}>专业版 (2000 页/月)</option>
                    <option value={USER_PLAN.YEARLY}>年度版 (20400 页/年)</option>
                  </select>
                  <div className="text-xs text-gray-500 mt-1">
                    选择套餐会自动更新页面限制
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    页面限制
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={editingUser.pagesLimit}
                      onChange={(e) => setEditingUser({ ...editingUser, pagesLimit: parseInt(e.target.value) || 0 })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const defaultLimit = planLimits[editingUser.plan] || editingUser.pagesLimit;
                        setEditingUser({ ...editingUser, pagesLimit: defaultLimit });
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                      title="重置为套餐默认值"
                    >
                      重置
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {editingUser.plan === USER_PLAN.FREE && '免费版默认: 300 页'}
                    {editingUser.plan === USER_PLAN.MONTHLY && '专业版默认: 2000 页/月'}
                    {editingUser.plan === USER_PLAN.YEARLY && '年度版默认: 20400 页/年'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    已使用页面
                  </label>
                  <input
                    type="number"
                    value={editingUser.pagesUsed}
                    onChange={(e) => setEditingUser({ ...editingUser, pagesUsed: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveUser}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  保存
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 用户详情模态框：后台用户仅显示邮箱/姓名/角色，前台用户显示完整信息 */}
        {showUserDetail && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {selectedUser.role === USER_ROLE.ADMIN ? '后台用户详情' : '用户详情'}
                </h3>
                <button
                  onClick={() => setShowUserDetail(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {selectedUser.role === USER_ROLE.ADMIN ? (
                <div className="bg-gray-50 rounded-lg p-4 max-w-md">
                  <h4 className="font-semibold mb-3">基本信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">邮箱:</span> {selectedUser.email}</div>
                    <div><span className="font-medium">姓名:</span> {selectedUser.name || '未设置'}</div>
                    <div><span className="font-medium">角色:</span> <span className="ml-2 px-2 py-1 rounded text-xs bg-amber-100 text-amber-800">管理员</span></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">基本信息</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">邮箱:</span> {selectedUser.email}</div>
                        <div><span className="font-medium">姓名:</span> {selectedUser.name || '未设置'}</div>
                        <div><span className="font-medium">套餐:</span>
                          <span className={`ml-2 px-2 py-1 rounded text-xs ${getPlanColor(selectedUser.plan)}`}>
                            {selectedUser.plan === USER_PLAN.MONTHLY ? '专业版' : selectedUser.plan === USER_PLAN.YEARLY ? '年度版' : '免费版'}
                          </span>
                        </div>
                        <div><span className="font-medium">页面使用:</span> {selectedUser.pagesUsed} / {selectedUser.pagesLimit}</div>
                        <div><span className="font-medium">注册时间:</span> {new Date(selectedUser.createdAt).toLocaleString('zh-CN')}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">邀请信息</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">邀请码:</span> <code className="bg-white px-2 py-1 rounded">{selectedUser.inviteCode}</code></div>
                        <div><span className="font-medium">邀请人数:</span> {selectedUser.inviteCount}</div>
                        <div><span className="font-medium">获得页面:</span> {selectedUser.invitePages}</div>
                        {selectedUser.inviter && (
                          <div><span className="font-medium">被邀请人:</span> {selectedUser.inviter.email}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 支付历史 */}
              {selectedUser.orders && selectedUser.orders.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">支付历史</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left">订单ID</th>
                          <th className="px-3 py-2 text-left">套餐</th>
                          <th className="px-3 py-2 text-left">金额</th>
                          <th className="px-3 py-2 text-left">支付方式</th>
                          <th className="px-3 py-2 text-left">状态</th>
                          <th className="px-3 py-2 text-left">时间</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedUser.orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-3 py-2 font-mono text-xs">{order.id.slice(-8)}</td>
                            <td className="px-3 py-2">{order.planName}</td>
                            <td className="px-3 py-2">${order.amount}</td>
                            <td className="px-3 py-2">
                              {order.paymentMethod && (
                                <div>
                                  {order.cardBrand} •••• {order.cardLast4}
                                </div>
                              )}
                            </td>
                            <td className="px-3 py-2">
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                                {order.status === ORDER_STATUS.COMPLETED ? '已完成' : 
                                 order.status === ORDER_STATUS.PENDING ? '待处理' : 
                                 order.status === ORDER_STATUS.FAILED ? '失败' : order.status}
                              </span>
                            </td>
                            <td className="px-3 py-2">{new Date(order.createdAt).toLocaleString('zh-CN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

                  {/* 订阅信息 */}
                  {selectedUser.subscriptions && selectedUser.subscriptions.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">订阅信息</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {selectedUser.subscriptions.map((sub) => (
                          <div key={sub.id} className="text-sm space-y-1">
                            <div><span className="font-medium">状态:</span> {sub.status}</div>
                            <div><span className="font-medium">到期时间:</span> {new Date(sub.currentPeriodEnd).toLocaleString('zh-CN')}</div>
                            <div><span className="font-medium">创建时间:</span> {new Date(sub.createdAt).toLocaleString('zh-CN')}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
