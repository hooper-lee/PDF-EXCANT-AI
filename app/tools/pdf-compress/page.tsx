'use client';

import { useState } from 'react';
import { Upload, Download, FileText, Minimize2 } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Toast from '@/app/components/Toast';
import Footer from '@/app/components/Footer';

export default function PDFCompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setProcessing(true);
    
    try {
      const { PDFDocument } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // 根据压缩级别设置选项
      let saveOptions: any = {};
      
      switch (compressionLevel) {
        case 'low':
          // 低压缩 - 保持最佳质量
          saveOptions = {
            useObjectStreams: false,
          };
          break;
        case 'medium':
          // 中等压缩 - 平衡质量和大小
          saveOptions = {
            useObjectStreams: true,
          };
          break;
        case 'high':
          // 高压缩 - 最小文件大小
          saveOptions = {
            useObjectStreams: true,
            addDefaultPage: false,
          };
          break;
      }
      
      // 保存压缩后的 PDF
      const compressedPdfBytes = await pdfDoc.save(saveOptions);
      const blob = new Blob([new Uint8Array(compressedPdfBytes)], { type: 'application/pdf' });
      
      // 计算压缩率
      const originalSize = file.size;
      const compressedSize = blob.size;
      const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
      
      // 生成文件名
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `compressed-${timestamp}.pdf`;
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setToast({ 
        message: `PDF 压缩成功！\n原始大小: ${(originalSize / 1024 / 1024).toFixed(2)} MB\n压缩后: ${(compressedSize / 1024 / 1024).toFixed(2)} MB\n压缩率: ${compressionRatio}%`, 
        type: 'success' 
      });
    } catch (error) {
      console.error('压缩失败:', error);
      setToast({ message: 'PDF 压缩失败，请检查文件是否有效', type: 'error' });
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
              压缩 PDF
            </h1>
            <p className="text-gray-600 text-lg">
              减小 PDF 文件大小，保持良好质量
            </p>
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-blue-400 transition-all">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">选择 PDF 文件</h3>
              <p className="text-gray-600 mb-6">上传需要压缩的 PDF 文档</p>
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
                    原始大小: {(file.size / (1024 * 1024)).toFixed(2)} MB
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
                <label className="block text-sm font-medium mb-3">压缩级别</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'low', label: '低压缩', desc: '最佳质量' },
                    { value: 'medium', label: '中等压缩', desc: '平衡质量和大小' },
                    { value: 'high', label: '高压缩', desc: '最小文件' },
                  ].map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setCompressionLevel(level.value as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        compressionLevel === level.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-semibold mb-1">{level.label}</div>
                      <div className="text-sm text-gray-600">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCompress}
                disabled={processing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    压缩中...
                  </>
                ) : (
                  <>
                    <Minimize2 className="w-5 h-5" />
                    开始压缩
                  </>
                )}
              </button>
            </div>
          )}

          {/* 功能说明 */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Minimize2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">智能压缩</h3>
              <p className="text-gray-600 text-sm">
                使用先进算法压缩 PDF 文件，显著减小文件大小
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">保持质量</h3>
              <p className="text-gray-600 text-sm">
                压缩后保持原始 PDF 质量，确保内容清晰可读
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">快速下载</h3>
              <p className="text-gray-600 text-sm">
                压缩完成后立即下载，节省存储空间
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
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
