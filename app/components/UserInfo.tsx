'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, ChevronDown, LogOut, Settings, CreditCard } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  name: string;
  plan: string;
  pagesUsed: number;
  pagesLimit: number;
  inviteCode: string;
  inviteCount: number;
  invitePages: number;
}

export default function UserInfo() {
  const [user, setUser] = useState<UserData | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      // 首先尝试使用本地缓存的用户数据
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        try {
          const parsedUser = JSON.parse(cachedUser);
          setUser(parsedUser);
        } catch (parseError) {
          console.error('解析缓存用户数据失败:', parseError);
          localStorage.removeItem('user');
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
        setUser(userData.user);
        // 更新本地缓存
        localStorage.setItem('user', JSON.stringify(userData.user));
      } else {
        // API调用失败，如果没有缓存数据，清除token
        if (!cachedUser) {
          console.error('获取用户信息失败:', response.status);
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('加载用户数据失败:', error);
      // 网络错误时，如果有缓存数据就使用缓存，否则清除token
      const cachedUser = localStorage.getItem('user');
      if (!cachedUser) {
        localStorage.removeItem('token');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'MONTHLY':
        return '专业版';
      case 'YEARLY':
        return '年度版';
      case 'FREE':
      default:
        return '免费版';
    }
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

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex gap-4 items-center">
        <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">登录</Link>
        <Link href="/extract" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
          免费开始
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
        </div>
        <div className="text-left hidden md:block">
          <div className="text-sm font-medium text-gray-900">
            {user.name || user.email.split('@')[0]}
          </div>
          <div className="text-xs text-gray-500">
            {user.pagesUsed} / {user.pagesLimit} 页
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50">
          {/* 用户基本信息 */}
          <div className="border-b pb-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{user.name || '未设置姓名'}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(user.plan)}`}>
                {getPlanName(user.plan)}
              </span>
              {user.plan === 'FREE' && (
                <Link
                  href="/pricing"
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  升级套餐
                </Link>
              )}
            </div>
          </div>

          {/* 使用情况 */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">页面使用情况</span>
              <span className="text-sm text-gray-600">{user.pagesUsed} / {user.pagesLimit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min((user.pagesUsed / user.pagesLimit) * 100, 100)}%`
                }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              剩余 {Math.max(user.pagesLimit - user.pagesUsed, 0)} 页
            </div>
          </div>

          {/* 邀请信息 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-4">
            <div className="text-sm font-medium text-gray-900 mb-2">邀请奖励</div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>已邀请: {user.inviteCount} 人</span>
              <span>获得: {user.invitePages} 页</span>
            </div>
            <div className="text-xs text-gray-500 mt-1 font-mono">
              邀请码: {user.inviteCode}
            </div>
          </div>

          {/* 菜单选项 */}
          <div className="space-y-1">
            <Link
              href="/profile"
              className="flex items-center gap-3 w-full p-2 text-left rounded-lg hover:bg-gray-50 transition-colors text-sm"
              onClick={() => setShowDropdown(false)}
            >
              <User className="w-4 h-4 text-gray-500" />
              个人资料
            </Link>
            
            <Link
              href="/pricing"
              className="flex items-center gap-3 w-full p-2 text-left rounded-lg hover:bg-gray-50 transition-colors text-sm"
              onClick={() => setShowDropdown(false)}
            >
              <CreditCard className="w-4 h-4 text-gray-500" />
              订阅管理
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 w-full p-2 text-left rounded-lg hover:bg-gray-50 transition-colors text-sm"
              onClick={() => setShowDropdown(false)}
            >
              <Settings className="w-4 h-4 text-gray-500" />
              账户设置
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-2 text-left rounded-lg hover:bg-red-50 transition-colors text-sm text-red-600"
            >
              <LogOut className="w-4 h-4" />
              退出登录
            </button>
          </div>
        </div>
      )}

      {/* 点击外部关闭下拉菜单 */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}