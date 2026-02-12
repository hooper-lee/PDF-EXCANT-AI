'use client';

import { useState } from 'react';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Toast from '@/app/components/Toast';

export default function PDFToJPGPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [converting, setConverting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setConverting(true);
    
    try {
      // 使用 pdf.js 来渲染 PDF 页面为图片
      const pdfjsLib = await import('pdfjs-dist');
      const JSZip = (await import('jszip')).default;
      
      // 设置 worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      const zip = new JSZip();
      const totalPages = pdf.numPages;
      
      // 根据质量设置分辨率
      const scale = quality === 'high' ? 2.0 : quality === 'medium' ? 1.5 : 1.0;
      
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });
        
        // 创建 canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // 渲染页面到 canvas
        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas
        }).promise;
        
        // 转换为 blob
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.9);
        });
        
        // 添加到 ZIP
        zip.file(`page-${pageNum}.jpg`, blob);
      }
      
      // 生成 ZIP 文件并下载
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `pdf-to-jpg-${timestamp}.zip`;
      
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setToast({ message: `PDF 转换成功！已生成 ${totalPages} 张图片`, type: 'success' });
    } catch (error) {
      console.error('转换失败:', error);
      setToast({ message: 'PDF 转 JPG 失败，请检查文件是否有效', type: 'error' });
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              PDF 转 JPG
            </h1>
            <p className="text-gray-600 text-lg">将 PDF 转换为图片，完全免费</p>
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-purple-400 transition-all">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">选择 PDF 文件</h3>
              <p className="text-gray-600 mb-6">上传需要转换的 PDF 文档</p>
              <label className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
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
              <div className="flex items-center gap-4 mb-8 p-4 bg-purple-50 rounded-lg">
                <ImageIcon className="w-10 h-10 text-purple-600" />
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
                <label className="block text-sm font-medium mb-3">图片质量</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'low', label: '标准质量', desc: '较小文件' },
                    { value: 'medium', label: '高质量', desc: '平衡大小和质量' },
                    { value: 'high', label: '超高质量', desc: '最佳效果' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setQuality(option.value as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        quality === option.value
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="font-semibold mb-1">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleConvert}
                disabled={converting}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {converting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    转换中...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    开始转换
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">高质量转换</h3>
              <p className="text-sm text-gray-600">
                保持原始 PDF 的清晰度
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">批量下载</h3>
              <p className="text-sm text-gray-600">
                所有页面打包为 ZIP 下载
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">多种质量</h3>
              <p className="text-sm text-gray-600">
                根据需求选择图片质量
              </p>
            </div>
          </div>
        </div>
      </div>
      </main>

      <div className="mt-auto shrink-0">
        <Footer />
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