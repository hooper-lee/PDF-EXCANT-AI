'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Lock, Bell, Shield, Trash2, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from '@/lib/useLanguage';
import type { UserPlan, UserRole } from '@/lib/domain-types';
import { USER_ROLE } from '@/lib/domain-types';

interface UserData {
  id: string;
  email: string;
  name: string;
  plan: UserPlan;
  pagesUsed: number;
  pagesLimit: number;
  role?: UserRole;
}

export default function SettingsPage() {
  const t = useTranslation();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
          setFormData({
            ...formData,
            name: parsedUser.name || '',
            email: parsedUser.email,
          });
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
        setFormData({
          ...formData,
          name: u.name || '',
          email: u.email,
        });
        // 更新本地缓存
        localStorage.setItem('user', JSON.stringify(u));
      } else {
        // API调用失败，如果没有缓存数据才跳转登录
        if (!cachedUser) {
          console.error('获取用户信息失败且无缓存数据:', response.status);
          window.location.href = '/login';
        }
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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.user);
        alert(t.common.success);
      } else {
        alert(t.errors.serverError);
      }
    } catch (error) {
      console.error('更新个人信息失败:', error);
      alert(t.errors.serverError);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert(t.errors.passwordMismatch);
      return;
    }
    if (formData.newPassword.length < 6) {
      alert(t.signup.passwordMinLength);
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (response.ok) {
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        alert(t.common.success);
      } else {
        const errorData = await response.json();
        alert(errorData.error || t.errors.serverError);
      }
    } catch (error) {
      console.error('修改密码失败:', error);
      alert(t.errors.serverError);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm(t.settings.deleteConfirmPrompt)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        alert(t.common.success);
        window.location.href = '/';
      } else {
        alert(t.errors.serverError);
      }
    } catch (error) {
      console.error('删除账户失败:', error);
      alert(t.errors.serverError);
    }
  };

  const tabs = [
    { id: 'profile', name: t.settings.profileTab, icon: User },
    { id: 'security', name: t.settings.securityTab, icon: Shield },
    { id: 'notifications', name: t.settings.notificationsTab, icon: Bell },
    { id: 'danger', name: t.settings.dangerTab, icon: AlertTriangle },
  ];

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.settings.pageTitle}</h1>
            <p className="text-gray-600">{t.settings.pageSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* 侧边栏导航 */}
            <div className="md:col-span-1">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* 主要内容区域 */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* 个人信息 */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.settings.personalInfo}</h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.settings.name}
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t.settings.namePlaceholder}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.settings.email}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          disabled
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">{t.settings.emailReadonly}</p>
                      </div>

                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? t.settings.saving : t.settings.saveChanges}
                      </button>
                    </form>
                  </div>
                )}

                {/* 安全设置 */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.settings.security}</h2>
                    <form onSubmit={handleChangePassword} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.settings.currentPassword}
                        </label>
                        <input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t.settings.currentPasswordPlaceholder}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.settings.newPassword}
                        </label>
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t.settings.newPasswordPlaceholder}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.settings.confirmPassword}
                        </label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t.settings.confirmPasswordPlaceholder}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? t.settings.changing : t.settings.changePassword}
                      </button>
                    </form>
                  </div>
                )}

                {/* 通知设置 */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.settings.notifications}</h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{t.settings.emailNotifications}</h3>
                          <p className="text-sm text-gray-600">{t.settings.emailNotificationsDesc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{t.settings.planExpiryReminder}</h3>
                          <p className="text-sm text-gray-600">{t.settings.planExpiryReminderDesc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{t.settings.usageReminder}</h3>
                          <p className="text-sm text-gray-600">{t.settings.usageReminderDesc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 危险操作 */}
                {activeTab === 'danger' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.settings.dangerZone}</h2>
                    <div className="space-y-6">
                      <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Trash2 className="w-6 h-6 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-red-900 mb-2">{t.settings.deleteAccount}</h3>
                            <p className="text-red-700 mb-4">
                              {t.settings.deleteAccountDesc}
                            </p>
                            <button
                              onClick={() => setShowDeleteConfirm(true)}
                              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                              {t.settings.deleteAccountButton}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t.settings.confirmDeleteTitle}</h3>
                <p className="text-sm text-gray-600">{t.settings.confirmDeleteSubtitle}</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              {t.settings.confirmDeleteBody}
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-1">
              <li>• {t.settings.confirmDeleteList1}</li>
              <li>• {t.settings.confirmDeleteList2}</li>
              <li>• {t.settings.confirmDeleteList3}</li>
              <li>• {t.settings.confirmDeleteList4}</li>
            </ul>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                {t.settings.confirmDeleteButton}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                {t.settings.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
