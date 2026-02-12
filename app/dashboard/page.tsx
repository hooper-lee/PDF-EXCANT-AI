'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Trash2, Clock, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useTranslation } from '@/lib/useLanguage';

interface Document {
  id: string;
  originalName: string;
  pageCount: number;
  status: string;
  createdAt: string;
  outputUrl?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const t = useTranslation();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserAndDocuments();
  }, []);

  const loadUserAndDocuments = async () => {
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
        setUser(userData);
      } else {
        router.push('/login');
        return;
      }

      // 获取文档列表
      const docsResponse = await fetch('/api/documents', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (docsResponse.ok) {
        const data = await docsResponse.json();
        setDocuments(data.documents || []);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.dashboard.confirmDelete)) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setDocuments(documents.filter(doc => doc.id !== id));
      }
    } catch (error) {
      console.error('删除失败:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
            ) : documents.length === 0 ? (
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
                          文件数
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                          工作簿
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
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <span className="font-medium text-gray-900">{doc.originalName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {doc.pageCount}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <FileText className="w-4 h-4" />
                              <span>New Workbook</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {new Date(doc.createdAt).toLocaleString('zh-CN')}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/extract?docId=${doc.id}`}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                              >
                                查看
                              </Link>
                              <button
                                onClick={() => handleDelete(doc.id)}
                                className="text-red-600 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                                title="删除"
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
                  每页显示：30 &nbsp;&nbsp; 显示 1 - {documents.length} 条，共 {documents.length} 条
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