'use client';

import { Printer } from 'lucide-react';
import Navbar from '@/app/components/Navbar';

export default function PDFPrintPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Printer className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            打印 PDF
          </h1>
          <p className="text-gray-600 text-lg mb-8">打印 PDF 文档，完全免费</p>
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <p className="text-gray-500">功能开发中，敬请期待...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
