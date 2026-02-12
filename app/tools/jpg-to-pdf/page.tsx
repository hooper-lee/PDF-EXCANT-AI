'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Download } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Toast from '@/app/components/Toast';
import Footer from '@/app/components/Footer';

interface UploadedImage {
  id: string;
  file: File;
  name: string;
  preview: string;
}

export default function JPGToPDFPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [converting, setConverting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await addImages(files);
    }
  };

  const addImages = async (files: File[]) => {
    const newImages: UploadedImage[] = [];
    
    for (const file of files) {
      const preview = URL.createObjectURL(file);
      newImages.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        preview,
      });
    }
    
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    const image = images.find(img => img.id === id);
    if (image) {
      URL.revokeObjectURL(image.preview);
    }
    setImages(images.filter(img => img.id !== id));
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      setToast({ message: '请至少上传一张图片', type: 'error' });
      return;
    }

    setConverting(true);
    
    try {
      const { PDFDocument } = await import('pdf-lib');
      
      const pdfDoc = await PDFDocument.create();
      
      for (const image of images) {
        const arrayBuffer = await image.file.arrayBuffer();
        let embeddedImage;
        
        if (image.file.type === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(arrayBuffer);
        } else {
          embeddedImage = await pdfDoc.embedJpg(arrayBuffer);
        }
        
        const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: embeddedImage.width,
          height: embeddedImage.height,
        });
      }
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `images-to-pdf-${timestamp}.pdf`;
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setToast({ message: '图片转 PDF 成功！文件已开始下载', type: 'success' });
    } catch (error) {
      console.error('转换失败:', error);
      setToast({ message: '图片转 PDF 失败，请检查文件是否有效', type: 'error' });
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              JPG 转 PDF
            </h1>
            <p className="text-gray-600 text-lg">将图片转换为 PDF，完全免费</p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-purple-400 transition-all mb-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">选择图片文件</h3>
            <p className="text-gray-600 mb-6">支持 JPG、PNG 格式</p>
            <label className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileSelect}
                className="hidden"
              />
              选择图片
            </label>
          </div>

          {images.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">已选择 {images.length} 张图片</h3>
                <button
                  onClick={() => setImages([])}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  清空全部
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="text-xs text-gray-600 mt-1 truncate">{image.name}</div>
                  </div>
                ))}
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
                    转换为 PDF
                  </>
                )}
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">多图合并</h3>
              <p className="text-sm text-gray-600">
                支持多张图片合并为一个 PDF
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">保持质量</h3>
              <p className="text-sm text-gray-600">
                转换后保持原始图片质量
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">快速下载</h3>
              <p className="text-sm text-gray-600">
                转换完成后立即下载
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
