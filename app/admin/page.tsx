'use client';

import { useState, useEffect } from 'react';
import { Users, FileText, DollarSign, TrendingUp, Search } from 'lucide-react';
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
  plan: string;
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
    planId: string;
    planName: string;
    amount: number;
    status: string;
    paymentMethod: string | null;
    cardLast4: string | null;
    cardBrand: string | null;
    createdAt: string;
    completedAt: string | null;
  }>;
  subscriptions?: Array<{
    id: string;
    status: string;
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Check if we're on the client side
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      console.log('Loading admin data with token:', token ? 'exists' : 'missing');
      
      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      // 加载统计数据
      try {
        const statsResponse = await fetch('/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Stats response status:', statsResponse.status);
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          console.log('Stats data:', statsData);
          setStats(statsData);
        } else {
          const errorData = await statsResponse.json().catch(() => ({ error: 'Unknown error' }));
          console.error('Stats error:', errorData);
        }
      } catch (error) {
        console.error('Stats request failed:', error);
      }

      // 加载用户列表
      try {
        const usersResponse = await fetch('/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Users response status:', usersResponse.status);
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          console.log('Users data:', usersData);
          setUsers(usersData.users || []);
        } else {
          const errorData = await usersResponse.json().catch(() => ({ error: 'Unknown error' }));
          console.error('Users error:', errorData);
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

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  // 套餐对应的页面限制配置
  const planLimits = {
    'FREE': 300,
    'MONTHLY': 2000,
    'YEARLY': 20400
  };

  // 处理套餐变更时自动更新页面限制
  const handlePlanChange = (newPlan: string) => {
    if (editingUser) {
      const newLimit = planLimits[newPlan as keyof typeof planLimits] || editingUser.pagesLimit;
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

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'MONTHLY':
        return 'bg-blue-100 text-blue-700';
      case 'YEARLY':
        return 'bg-purple-100 text-purple-700';
      case 'FREE':
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'FAILED':
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
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gray-600 hover:text-blue-600"
          >
            返回前台
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">用户列表</h2>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索用户..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">
              <div className="mb-4">加载中...</div>
              <div className="text-sm">
                <div>Token: {typeof window !== 'undefined' && localStorage.getItem('token') ? '存在' : '不存在'}</div>
                <div className="mt-2">
                  <Link href="/login" className="text-blue-600 hover:text-blue-800">
                    如果长时间加载，请点击这里重新登录
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                      用户
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                      套餐
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                      使用情况
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                      支付信息
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                      邀请统计
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                      注册时间
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.map((user) => (
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
                          {user.plan === 'MONTHLY' ? '专业版' : user.plan === 'YEARLY' ? '年度版' : '免费版'}
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
                                    {order.status === 'COMPLETED' ? '已完成' : 
                                     order.status === 'PENDING' ? '待处理' : 
                                     order.status === 'FAILED' ? '失败' : order.status}
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
          )}

          {filteredUsers.length === 0 && !loading && (
            <div className="p-12 text-center text-gray-500">
              没有找到用户
            </div>
          )}

          {filteredUsers.length > 0 && (
            <div className="p-4 border-t text-sm text-gray-600">
              共 {filteredUsers.length} 个用户
            </div>
          )}
        </div>

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
                    onChange={(e) => handlePlanChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="FREE">免费版 (300 页)</option>
                    <option value="MONTHLY">专业版 (2000 页/月)</option>
                    <option value="YEARLY">年度版 (20400 页/年)</option>
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
                        const defaultLimit = planLimits[editingUser.plan as keyof typeof planLimits] || editingUser.pagesLimit;
                        setEditingUser({ ...editingUser, pagesLimit: defaultLimit });
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                      title="重置为套餐默认值"
                    >
                      重置
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {editingUser.plan === 'FREE' && '免费版默认: 300 页'}
                    {editingUser.plan === 'MONTHLY' && '专业版默认: 2000 页/月'}
                    {editingUser.plan === 'YEARLY' && '年度版默认: 20400 页/年'}
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

        {/* 用户详情模态框 */}
        {showUserDetail && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">用户详情</h3>
                <button
                  onClick={() => setShowUserDetail(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 基本信息 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">基本信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">邮箱:</span> {selectedUser.email}</div>
                    <div><span className="font-medium">姓名:</span> {selectedUser.name || '未设置'}</div>
                    <div><span className="font-medium">套餐:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${getPlanColor(selectedUser.plan)}`}>
                        {selectedUser.plan === 'MONTHLY' ? '专业版' : selectedUser.plan === 'YEARLY' ? '年度版' : '免费版'}
                      </span>
                    </div>
                    <div><span className="font-medium">页面使用:</span> {selectedUser.pagesUsed} / {selectedUser.pagesLimit}</div>
                    <div><span className="font-medium">注册时间:</span> {new Date(selectedUser.createdAt).toLocaleString('zh-CN')}</div>
                  </div>
                </div>

                {/* 邀请信息 */}
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
                                {order.status === 'COMPLETED' ? '已完成' : 
                                 order.status === 'PENDING' ? '待处理' : 
                                 order.status === 'FAILED' ? '失败' : order.status}
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
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
