'use client';

import { useState } from 'react';
import { Upload, Download, FileText, Hash } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Toast from '@/app/components/Toast';

export default function PDFPageNumberPage() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right' | 'top-left'>('bottom-center');
  const [startNumber, setStartNumber] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [adding, setAdding] = useState(false);
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

  const getPosition = (position: string, pageWidth: number, pageHeight: number, textWidth: number) => {
    const margin = 30;
    
    switch (position) {
      case 'bottom-center':
        return { x: (pageWidth - textWidth) / 2, y: margin };
      case 'bottom-right':
        return { x: pageWidth - textWidth - margin, y: margin };
      case 'bottom-left':
        return { x: margin, y: margin };
      case 'top-center':
        return { x: (pageWidth - textWidth) / 2, y: pageHeight - margin - fontSize };
      case 'top-right':
        return { x: pageWidth - textWidth - margin, y: pageHeight - margin - fontSize };
      case 'top-left':
        return { x: margin, y: pageHeight - margin - fontSize };
      default:
        return { x: (pageWidth - textWidth) / 2, y: margin };
    }
  };

  const handleAddPageNumbers = async () => {
    if (!file) return;
    setAdding(true);
    
    try {
      const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      
      pages.forEach((page, index) => {
        const pageNumber = startNumber + index;
        const text = pageNumber.toString();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const { width, height } = page.getSize();
        
        const pos = getPosition(position, width, height, textWidth);
        
        page.drawText(text, {
          x: pos.x,
          y: pos.y,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `numbered-pages-${timestamp}.pdf`;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setToast({ message: `成功为 ${totalPages} 页添加页码！文件已开始下载`, type: 'success' });
    } catch (error) {
      console.error('添加页码失败:', error);
      setToast({ message: '添加页码失败，请检查文件是否有效', type: 'error' });
    } finally {
      setAdding(false);
    }
  };

  const positionOptions = [
    { value: 'bottom-center', label: '底部居中' },
    { value: 'bottom-right', label: '底部右侧' },
    { value: 'bottom-left', label: '底部左侧' },
    { value: 'top-center', label: '顶部居中' },
    { value: 'top-right', label: '顶部右侧' },
    { value: 'top-left', label: '顶部左侧' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              添加页码
            </h1>
            <p className="text-gray-600 text-lg">为 PDF 添加页码，完全免费</p>
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-blue-400 transition-all">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">选择 PDF 文件</h3>
              <p className="text-gray-600 mb-6">上传需要添加页码的 PDF 文档</p>
              <label className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
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
              <div className="flex items-center gap-4 mb-8 p-4 bg-blue-50 rounded-lg">
                <FileText className="w-10 h-10 text-blue-600" />
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

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-3">页码位置</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {positionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">起始页码</label>
                  <input
                    type="number"
                    value={startNumber}
                    onChange={(e) => setStartNumber(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">字体大小: {fontSize}px</label>
                <input
                  type="range"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  min="8"
                  max="24"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>8px</span>
                  <span>16px</span>
                  <span>24px</span>
                </div>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">预览设置</h3>
                <div className="text-sm text-blue-800">
                  <p>位置: {positionOptions.find(p => p.value === position)?.label}</p>
                  <p>起始页码: {startNumber}</p>
                  <p>字体大小: {fontSize}px</p>
                  <p>页码范围: {startNumber} - {startNumber + totalPages - 1}</p>
                </div>
              </div>

              <button
                onClick={handleAddPageNumbers}
                disabled={adding}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {adding ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    添加中...
                  </>
                ) : (
                  <>
                    <Hash className="w-5 h-5" />
                    添加页码
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Hash className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">灵活定位</h3>
              <p className="text-sm text-gray-600">
                支持6种页码位置选择
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">自定义起始</h3>
              <p className="text-sm text-gray-600">
                可设置任意起始页码
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">字体调节</h3>
              <p className="text-sm text-gray-600">
                可调节页码字体大小
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
