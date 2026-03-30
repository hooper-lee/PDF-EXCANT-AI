'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Clock, Plus, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useTranslation } from '@/lib/useLanguage';
import { USER_ROLE } from '@/lib/domain-types';

interface ExtractSession {
  id: string;
  name: string;
  prompt?: string | null;
  parseRule?: string | null;
  selectedTemplateId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslation();
  const [sessions, setSessions] = useState<ExtractSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState('');
  const [user, setUser] = useState<any>(null);
  const [showForbidden, setShowForbidden] = useState(false);

  useEffect(() => {
    if (searchParams.get('forbidden') === '1') {
      setShowForbidden(true);
      window.history.replaceState({}, '', '/dashboard');
    }
    loadUserAndSessions();
  }, []);

  const loadUserAndSessions = async () => {
    try {
      // 检查登录状态
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // 获取用户信息
      const userResponse = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        const u = userData.user ?? userData;
        if (u?.role === USER_ROLE.ADMIN) {
          router.replace('/admin');
          return;
        }
        setUser(u);
      } else {
        router.push('/login');
        return;
      }

      // 获取会话列表
      const sessionsResponse = await fetch('/api/extract-sessions', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (sessionsResponse.ok) {
        const data = await sessionsResponse.json();
        setSessions(data?.data?.sessions || data?.sessions || []);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sessionId: string) => {
    if (!confirm('确定删除这个会话吗？')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      setDeletingId(sessionId);
      const response = await fetch(`/api/extract-sessions/${sessionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error?.message || payload?.error || '删除会话失败');
      }

      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    } catch (error) {
      console.error('删除会话失败:', error);
      alert(error instanceof Error ? error.message : '删除会话失败');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {showForbidden && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-center justify-between">
              <span>您没有权限访问管理后台，仅管理员可进入。</span>
              <button type="button" onClick={() => setShowForbidden(false)} className="text-amber-600 hover:text-amber-800">关闭</button>
            </div>
          )}
          {/* 页面标题 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.dashboard.title}</h1>
              <p className="text-gray-600">
                {t.dashboard.subtitle.replace('{used}', String(user?.pagesUsed || 0)).replace('{limit}', String(user?.pagesLimit || 300))}
              </p>
            </div>
            <Link
              href="/extract"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              {t.dashboard.newConversation}
            </Link>
          </div>

          {/* 对话列表 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-500">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                加载中...
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">还没有任何对话</h3>
                <p className="text-gray-500 mb-6">开始您的第一个 AI 数据提取对话</p>
                <Link
                  href="/extract"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  开始提取
                </Link>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                          对话
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                          提示词
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                          模式
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                          创建时间
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sessions.map((session) => (
                        <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <span className="font-medium text-gray-900">{session.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 max-w-xs">
                            <span className="line-clamp-1">
                              {session.prompt?.trim() || session.parseRule?.trim() || '未填写'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <FileText className="w-4 h-4" />
                              <span>{session.selectedTemplateId ? '模板提取' : '自由输入'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {new Date(session.updatedAt || session.createdAt).toLocaleString('zh-CN')}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/extract?sessionId=${session.id}`}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                              >
                                查看
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleDelete(session.id)}
                                disabled={deletingId === session.id}
                                className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="删除会话"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 分页信息 */}
                <div className="px-6 py-4 border-t bg-gray-50 text-sm text-gray-600">
                  每页显示：30 &nbsp;&nbsp; 显示 1 - {sessions.length} 条，共 {sessions.length} 条
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
