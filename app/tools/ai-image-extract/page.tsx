'use client';

import { Sparkles } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

export default function AIImageExtractPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            AI 图片提取
          </h1>
          <p className="text-gray-600 text-lg mb-8">从图片中提取结构化数据</p>
          
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-8">
            <div className="mb-6">
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                付费功能
              </span>
            </div>
            <p className="text-gray-500 mb-6">此功能需要订阅专业版才能使用</p>
            <Link
              href="/pricing"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              查看定价
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold mb-2">智能识别</h3>
              <p className="text-sm text-gray-600">
                AI 自动识别图片中的文本和数据
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold mb-2">结构化输出</h3>
              <p className="text-sm text-gray-600">
                自动转换为 Excel 表格格式
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold mb-2">高准确率</h3>
              <p className="text-sm text-gray-600">
                使用先进的 OCR 和 AI 技术
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
