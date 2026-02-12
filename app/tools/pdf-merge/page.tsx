'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Upload, X, ArrowLeft, Download, FileText, Plus } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Toast from '@/app/components/Toast';
import Footer from '@/app/components/Footer';
import { useTranslation } from '@/lib/useLanguage';

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  preview?: string;
}

export default function PDFMergePage() {
  const t = useTranslation();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [merging, setMerging] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    
    addFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
    }));
    
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < files.length) {
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      setFiles(newFiles);
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setToast({ message: t.tools.messages.selectAtLeast2Files, type: 'error' });
      return;
    }

    setMerging(true);
    
    try {
      console.log('开始合并 PDF，文件数量:', files.length);
      
      const { PDFDocument } = await import('pdf-lib');
      
      console.log('库加载成功');
      
      const mergedPdf = await PDFDocument.create();
      console.log('创建新 PDF 文档成功');
      
      for (let i = 0; i < files.length; i++) {
        const fileItem = files[i];
        console.log(`处理第 ${i + 1} 个文件: ${fileItem.name}`);
        
        try {
          const arrayBuffer = await fileItem.file.arrayBuffer();
          console.log(`文件 ${i + 1} 读取成功，大小: ${arrayBuffer.byteLength} 字节`);
          
          const pdf = await PDFDocument.load(arrayBuffer, { 
            ignoreEncryption: true 
          });
          console.log(`文件 ${i + 1} 加载成功，页数: ${pdf.getPageCount()}`);
          
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          console.log(`文件 ${i + 1} 页面复制成功`);
          
          copiedPages.forEach((page) => mergedPdf.addPage(page));
          console.log(`文件 ${i + 1} 页面添加成功`);
        } catch (fileError: any) {
          console.error(`处理文件 ${fileItem.name} 时出错:`, fileError);
          throw new Error(`文件 "${fileItem.name}" 处理失败: ${fileError.message}`);
        }
      }
      
      console.log('所有文件处理完成，开始保存');
      
      const mergedPdfBytes = await mergedPdf.save();
      console.log('PDF 保存成功，大小:', mergedPdfBytes.length);
      
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: 'application/pdf' });
      
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `merged-${timestamp}.pdf`;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('下载开始');
      setToast({ message: t.tools.messages.mergeSuccess, type: 'success' });
    } catch (error: any) {
      console.error('合并失败，详细错误:', error);
      setToast({ 
        message: `${t.tools.messages.processingFailed}: ${error.message || '未知错误'}\n\n请确保：\n1. 所有文件都是有效的 PDF\n2. PDF 文件没有密码保护\n3. 文件没有损坏`, 
        type: 'error' 
      });
    } finally {
      setMerging(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {t.tools.toolNames.pdfMerge}
            </h1>
            <p className="text-gray-600 text-lg">
              {t.tools.descriptions.pdfMerge}，{t.tools.categories.pdfUtils.badge.toLowerCase()}
            </p>
          </div>

          {/* 上传区域 */}
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-blue-400'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.tools.actions.dragDropFiles}</h3>
            <p className="text-gray-600 mb-6">{t.tools.actions.clickToSelect}</p>
            <label className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <input
                type="file"
                multiple
                accept="application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              {t.tools.actions.selectFiles}
            </label>
            <p className="text-sm text-gray-500 mt-4">{t.tools.messages.maxFileSize}</p>
          </div>

          {/* 文件列表 */}
          {files.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t.tools.messages.selectedFiles.replace('{count}', files.length.toString())}</h3>
                <button
                  onClick={() => setFiles([])}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  {t.tools.actions.clearAll}
                </button>
              </div>

              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="w-8 h-8 text-red-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{file.name}</div>
                      <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveFile(index, 'up')}
                        disabled={index === 0}
                        className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title={t.tools.actions.moveUp}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveFile(index, 'down')}
                        disabled={index === files.length - 1}
                        className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title={t.tools.actions.moveDown}
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-2 text-red-600 hover:text-red-700"
                        title={t.tools.actions.remove}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleMerge}
                disabled={merging || files.length < 2}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {merging ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t.tools.actions.merging}
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    {t.tools.actions.startMerge}
                  </>
                )}
              </button>
            </div>
          )}

          {/* 功能说明 */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.features.easyToUse}</h3>
              <p className="text-sm text-gray-600">
                {t.tools.features.easyToUseDesc}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.features.completelyFree}</h3>
              <p className="text-sm text-gray-600">
                {t.tools.features.completelyFreeDesc}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.features.fastDownload}</h3>
              <p className="text-sm text-gray-600">
                {t.tools.features.fastDownloadDesc}
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
