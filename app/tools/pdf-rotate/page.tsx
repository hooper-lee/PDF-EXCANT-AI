'use client';

import { useState } from 'react';
import { Upload, RotateCw, FileText, Download } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Toast from '@/app/components/Toast';

export default function PDFRotatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    setProcessing(true);
    
    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      // 旋转所有页面
      pages.forEach(page => {
        page.setRotation(degrees(rotation));
      });
      
      // 保存旋转后的 PDF
      const rotatedPdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(rotatedPdfBytes)], { type: 'application/pdf' });
      
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `rotated-${timestamp}.pdf`;
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setToast({ message: 'PDF 旋转成功！文件已开始下载', type: 'success' });
    } catch (error) {
      console.error('旋转失败:', error);
      setToast({ message: 'PDF 旋转失败，请检查文件是否有效', type: 'error' });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              旋转 PDF
            </h1>
            <p className="text-gray-600 text-lg">旋转 PDF 页面方向，完全免费</p>
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-blue-400 transition-all">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">选择 PDF 文件</h3>
              <p className="text-gray-600 mb-6">上传需要旋转的 PDF 文档</p>
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
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
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
                <label className="block text-sm font-medium mb-3">旋转角度</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 90, label: '顺时针 90°', icon: '↻' },
                    { value: 180, label: '180°', icon: '↻↻' },
                    { value: 270, label: '逆时针 90°', icon: '↺' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setRotation(option.value as 90 | 180 | 270)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        rotation === option.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRotate}
                disabled={processing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    旋转中...
                  </>
                ) : (
                  <>
                    <RotateCw className="w-5 h-5" />
                    开始旋转
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <RotateCw className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">灵活旋转</h3>
              <p className="text-sm text-gray-600">
                支持 90°、180°、270° 旋转
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">保持质量</h3>
              <p className="text-sm text-gray-600">
                旋转后保持原始 PDF 质量
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">快速下载</h3>
              <p className="text-sm text-gray-600">
                旋转完成后立即下载
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
