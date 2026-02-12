'use client';

import { useState } from 'react';
import { Upload, Download, FileText, Droplet, Type, Image as ImageIcon } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Toast from '@/app/components/Toast';

export default function PDFWatermarkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(48);
  const [rotation, setRotation] = useState(45);
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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setWatermarkImage(e.target.files[0]);
    }
  };

  const handleAddWatermark = async () => {
    if (!file) return;
    if (watermarkType === 'text' && !watermarkText.trim()) {
      setToast({ message: '请输入水印文字', type: 'error' });
      return;
    }
    if (watermarkType === 'image' && !watermarkImage) {
      setToast({ message: '请选择水印图片', type: 'error' });
      return;
    }
    
    setAdding(true);
    
    try {
      const { PDFDocument, rgb, StandardFonts, degrees } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const pages = pdfDoc.getPages();
      
      if (watermarkType === 'text') {
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        pages.forEach((page) => {
          const { width, height } = page.getSize();
          const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
          
          // 在页面中心添加水印
          page.drawText(watermarkText, {
            x: (width - textWidth) / 2,
            y: height / 2,
            size: fontSize,
            font: font,
            color: rgb(0.5, 0.5, 0.5),
            opacity: opacity,
            rotate: degrees(rotation),
          });
        });
      } else if (watermarkType === 'image' && watermarkImage) {
        const imageBytes = await watermarkImage.arrayBuffer();
        let image;
        
        if (watermarkImage.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else if (watermarkImage.type === 'image/jpeg' || watermarkImage.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          throw new Error('不支持的图片格式，请使用 PNG 或 JPG');
        }
        
        const imageDims = image.scale(0.5);
        
        pages.forEach((page) => {
          const { width, height } = page.getSize();
          
          page.drawImage(image, {
            x: (width - imageDims.width) / 2,
            y: (height - imageDims.height) / 2,
            width: imageDims.width,
            height: imageDims.height,
            opacity: opacity,
            rotate: degrees(rotation),
          });
        });
      }
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `watermarked-${timestamp}.pdf`;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setToast({ message: `成功为 ${totalPages} 页添加水印！文件已开始下载`, type: 'success' });
    } catch (error) {
      console.error('添加水印失败:', error);
      setToast({ message: '添加水印失败：' + (error as Error).message, type: 'error' });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent">
              添加水印
            </h1>
            <p className="text-gray-600 text-lg">为 PDF 添加文字或图片水印，完全免费</p>
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-cyan-400 transition-all">
              <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">选择 PDF 文件</h3>
              <p className="text-gray-600 mb-6">上传需要添加水印的 PDF 文档</p>
              <label className="inline-block bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition-colors cursor-pointer">
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
              <div className="flex items-center gap-4 mb-8 p-4 bg-cyan-50 rounded-lg">
                <FileText className="w-10 h-10 text-cyan-600" />
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
                <label className="block text-sm font-medium mb-3">水印类型</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setWatermarkType('text')}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      watermarkType === 'text'
                        ? 'border-cyan-600 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <Type className="w-6 h-6 text-cyan-600" />
                    <div className="text-left">
                      <div className="font-semibold">文字水印</div>
                      <div className="text-sm text-gray-600">添加文字水印</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setWatermarkType('image')}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      watermarkType === 'image'
                        ? 'border-cyan-600 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <ImageIcon className="w-6 h-6 text-cyan-600" />
                    <div className="text-left">
                      <div className="font-semibold">图片水印</div>
                      <div className="text-sm text-gray-600">添加图片水印</div>
                    </div>
                  </button>
                </div>
              </div>

              {watermarkType === 'text' ? (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">水印文字</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="输入水印文字"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-3">字体大小: {fontSize}px</label>
                    <input
                      type="range"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      min="24"
                      max="72"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">水印图片</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {watermarkImage ? (
                      <div className="flex items-center justify-center gap-4">
                        <ImageIcon className="w-8 h-8 text-cyan-600" />
                        <div>
                          <div className="font-semibold">{watermarkImage.name}</div>
                          <div className="text-sm text-gray-600">
                            {(watermarkImage.size / (1024 * 1024)).toFixed(2)} MB
                          </div>
                        </div>
                        <button
                          onClick={() => setWatermarkImage(null)}
                          className="text-red-600 hover:text-red-700"
                        >
                          删除
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                        <div className="text-gray-600">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                          <p>点击选择图片 (PNG, JPG)</p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-3">透明度: {Math.round(opacity * 100)}%</label>
                  <input
                    type="range"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    min="0.1"
                    max="1"
                    step="0.1"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">旋转角度: {rotation}°</label>
                  <input
                    type="range"
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    min="0"
                    max="360"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={handleAddWatermark}
                disabled={adding}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-4 rounded-xl font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {adding ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    添加中...
                  </>
                ) : (
                  <>
                    <Droplet className="w-5 h-5" />
                    添加水印
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Type className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-semibold mb-2">文字水印</h3>
              <p className="text-sm text-gray-600">
                支持自定义文字和字体大小
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">图片水印</h3>
              <p className="text-sm text-gray-600">
                支持 PNG 和 JPG 图片格式
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Droplet className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">自定义样式</h3>
              <p className="text-sm text-gray-600">
                可调节透明度和旋转角度
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
