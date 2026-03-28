'use client';

import { FileSpreadsheet } from 'lucide-react';
import Navbar from '@/app/components/Navbar';

export default function PDFToExcelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileSpreadsheet className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            PDF 转 Excel
          </h1>
          <p className="text-gray-600 text-lg mb-8">将 PDF 转换为 Excel，完全免费</p>
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <p className="text-gray-500">功能开发中，敬请期待...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
