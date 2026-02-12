'use client';

import { useState } from 'react';
import { Upload, Download, FileText, Trash2 } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Toast from '@/app/components/Toast';

export default function PDFDeletePagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      try {
        const { PDFDocument } = await import('pdf-lib');
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdfDoc.getPageCount());
      } catch (error) {
        setToast({ message: '无法读取 PDF 文件', type: 'error' });
      }
    }
  };

  const parsePageRange = (range: string, total: number): number[] => {
    const pages: number[] = [];
    const parts = range.split(',');
    
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(s => parseInt(s.trim()));
        if (start && end && start <= end && start >= 1 && end <= total) {
          for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i);
          }
        }
      } else {
        const pageNum = parseInt(trimmed);
        if (pageNum >= 1 && pageNum <= total && !pages.includes(pageNum)) {
          pages.push(pageNum);
        }
      }
    }
    
    return pages.sort((a, b) => a - b);
  };

  const handleDelete = async () => {
    if (!file || !pageRange.trim()) return;
    setDeleting(true);
    
    try {
      const { PDFDocument } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      
      const pagesToDelete = parsePageRange(pageRange, totalPages);
      
      if (pagesToDelete.length === 0) {
        setToast({ message: '请输入有效的页面范围', type: 'error' });
        return;
      }
      
      if (pagesToDelete.length >= totalPages) {
        setToast({ message: '不能删除所有页面', type: 'error' });
        return;
      }
      
      // 创建要保留的页面索引数组
      const pagesToKeep: number[] = [];
      for (let i = 1; i <= totalPages; i++) {
        if (!pagesToDelete.includes(i)) {
          pagesToKeep.push(i - 1); // 转换为0基索引
        }
      }
      
      const newPdf = await PDFDocument.create();
      
      // 复制要保留的页面
      const copiedPages = await newPdf.copyPages(sourcePdf, pagesToKeep);
      copiedPages.forEach(page => newPdf.addPage(page));
      
      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `deleted-pages-${timestamp}.pdf`;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      const remainingPages = totalPages - pagesToDelete.length;
      setToast({ message: `成功删除 ${pagesToDelete.length} 页！剩余 ${remainingPages} 页`, type: 'success' });
    } catch (error) {
      console.error('删除失败:', error);
      setToast({ message: '页面删除失败，请检查文件和页面范围', type: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              删除页面
            </h1>
            <p className="text-gray-600 text-lg">删除 PDF 指定页面，完全免费</p>
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-red-400 transition-all">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">选择 PDF 文件</h3>
              <p className="text-gray-600 mb-6">上传需要删除页面的 PDF 文档</p>
              <label className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                选择文件
              </label>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-8 p-4 bg-red-50 rounded-lg">
                <FileText className="w-10 h-10 text-red-600" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{file.name}</div>
                  <div className="text-sm text-gray-600">
                    总共 {totalPages} 页 • {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  更换文件
                </button>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">注意事项</p>
                    <p>删除操作不可逆，请确认要删除的页面范围。不能删除所有页面。</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">要删除的页面范围</label>
                <input
                  type="text"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="例如: 1,3,5-8,10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <div className="mt-2 text-sm text-gray-600">
                  <p>支持格式：</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>单页：1,3,5</li>
                    <li>范围：1-5,8-10</li>
                    <li>混合：1,3-5,8,10-12</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleDelete}
                disabled={deleting || !pageRange.trim()}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    删除中...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    删除页面
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">精确删除</h3>
              <p className="text-sm text-gray-600">
                支持单页和范围删除
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">保持质量</h3>
              <p className="text-sm text-gray-600">
                剩余页面质量不变
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">安全操作</h3>
              <p className="text-sm text-gray-600">
                防止删除所有页面
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
