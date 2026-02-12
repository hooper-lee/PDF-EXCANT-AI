'use client';

import { useState } from 'react';
import { Upload, Download, FileText, Scissors } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Toast from '@/app/components/Toast';

export default function PDFExtractPagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [extracting, setExtracting] = useState(false);
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

  const handleExtract = async () => {
    if (!file || !pageRange.trim()) return;
    setExtracting(true);
    
    try {
      const { PDFDocument } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      
      const pagesToExtract = parsePageRange(pageRange, totalPages);
      
      if (pagesToExtract.length === 0) {
        setToast({ message: '请输入有效的页面范围', type: 'error' });
        return;
      }
      
      const newPdf = await PDFDocument.create();
      
      // 复制指定页面
      const copiedPages = await newPdf.copyPages(sourcePdf, pagesToExtract.map(p => p - 1));
      copiedPages.forEach(page => newPdf.addPage(page));
      
      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `extracted-pages-${timestamp}.pdf`;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setToast({ message: `成功提取 ${pagesToExtract.length} 页！文件已开始下载`, type: 'success' });
    } catch (error) {
      console.error('提取失败:', error);
      setToast({ message: '页面提取失败，请检查文件和页面范围', type: 'error' });
    } finally {
      setExtracting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              提取页面
            </h1>
            <p className="text-gray-600 text-lg">提取 PDF 指定页面，完全免费</p>
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-orange-400 transition-all">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">选择 PDF 文件</h3>
              <p className="text-gray-600 mb-6">上传需要提取页面的 PDF 文档</p>
              <label className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer">
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
              <div className="flex items-center gap-4 mb-8 p-4 bg-orange-50 rounded-lg">
                <FileText className="w-10 h-10 text-orange-600" />
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

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">页面范围</label>
                <input
                  type="text"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="例如: 1,3,5-8,10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                onClick={handleExtract}
                disabled={extracting || !pageRange.trim()}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {extracting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    提取中...
                  </>
                ) : (
                  <>
                    <Scissors className="w-5 h-5" />
                    提取页面
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Scissors className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">灵活提取</h3>
              <p className="text-sm text-gray-600">
                支持单页和范围提取
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">保持质量</h3>
              <p className="text-sm text-gray-600">
                原始质量无损提取
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">快速处理</h3>
              <p className="text-sm text-gray-600">
                快速生成新的 PDF
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
