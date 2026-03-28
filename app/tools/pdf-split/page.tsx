'use client';

import { useState } from 'react';
import { Upload, Download, FileText, Scissors } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Toast from '@/app/components/Toast';
import Footer from '@/app/components/Footer';
import { useTranslation } from '@/lib/useLanguage';

export default function PDFSplitPage() {
  const t = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<'pages' | 'range'>('pages');
  const [pageRanges, setPageRanges] = useState('1-3, 5, 7-10');
  const [pagesPerFile, setPagesPerFile] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    
    setProcessing(true);
    
    try {
      const { PDFDocument } = await import('pdf-lib');
      const JSZip = (await import('jszip')).default;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();
      
      const zip = new JSZip();
      
      if (splitMode === 'pages') {
        // 按页数拆分
        let fileIndex = 1;
        for (let i = 0; i < totalPages; i += pagesPerFile) {
          const newPdf = await PDFDocument.create();
          const endPage = Math.min(i + pagesPerFile, totalPages);
          
          for (let j = i; j < endPage; j++) {
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [j]);
            newPdf.addPage(copiedPage);
          }
          
          const pdfBytes = await newPdf.save();
          zip.file(`part-${fileIndex}.pdf`, pdfBytes);
          fileIndex++;
        }
      } else {
        // 按范围拆分
        const ranges = pageRanges.split(',').map(r => r.trim());
        
        for (let i = 0; i < ranges.length; i++) {
          const range = ranges[i];
          const newPdf = await PDFDocument.create();
          
          if (range.includes('-')) {
            const [start, end] = range.split('-').map(n => parseInt(n.trim()) - 1);
            for (let j = start; j <= Math.min(end, totalPages - 1); j++) {
              const [copiedPage] = await newPdf.copyPages(pdfDoc, [j]);
              newPdf.addPage(copiedPage);
            }
          } else {
            const pageNum = parseInt(range) - 1;
            if (pageNum >= 0 && pageNum < totalPages) {
              const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum]);
              newPdf.addPage(copiedPage);
            }
          }
          
          const pdfBytes = await newPdf.save();
          zip.file(`part-${i + 1}.pdf`, pdfBytes);
        }
      }
      
      // 生成 ZIP 文件并下载
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `split-${timestamp}.zip`;
      
      // 创建下载链接
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setToast({ message: t.tools.messages.splitSuccess, type: 'success' });
    } catch (error) {
      console.error('拆分失败:', error);
      setToast({ message: t.tools.messages.invalidFileOrRange, type: 'error' });
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
              {t.tools.toolNames.pdfSplit}
            </h1>
            <p className="text-gray-600 text-lg">
              {t.tools.descriptions.pdfSplit}，{t.tools.categories.pdfUtils.badge.toLowerCase()}
            </p>
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-blue-400 transition-all">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.tools.actions.dragDropFile}</h3>
              <p className="text-gray-600 mb-6">{t.tools.descriptions.pdfSplit}</p>
              <label className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {t.tools.actions.selectFile}
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
                  {t.tools.actions.changeFile}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">拆分模式</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSplitMode('pages')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        splitMode === 'pages'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-semibold mb-1">{t.tools.splitModes.byPages}</div>
                      <div className="text-sm text-gray-600">{t.tools.splitModes.byPagesDesc}</div>
                    </button>
                    <button
                      onClick={() => setSplitMode('range')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        splitMode === 'range'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-semibold mb-1">{t.tools.splitModes.byRange}</div>
                      <div className="text-sm text-gray-600">{t.tools.splitModes.byRangeDesc}</div>
                    </button>
                  </div>
                </div>

                {splitMode === 'pages' ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.tools.splitModes.pagesPerFile}</label>
                    <input
                      type="number"
                      min="1"
                      value={pagesPerFile}
                      onChange={(e) => setPagesPerFile(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.tools.splitModes.pageRanges}</label>
                    <input
                      type="text"
                      value={pageRanges}
                      onChange={(e) => setPageRanges(e.target.value)}
                      placeholder={t.tools.splitModes.pageRangesPlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {t.tools.splitModes.pageRangesHelp}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleSplit}
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t.tools.actions.splitting}
                    </>
                  ) : (
                    <>
                      <Scissors className="w-5 h-5" />
                      {t.tools.actions.startSplit}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Scissors className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.features.flexibleSplit}</h3>
              <p className="text-sm text-gray-600">
                {t.tools.features.flexibleSplitDesc}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.features.maintainQuality}</h3>
              <p className="text-sm text-gray-600">
                {t.tools.features.maintainQualityDesc}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.features.batchDownload}</h3>
              <p className="text-sm text-gray-600">
                {t.tools.features.batchDownloadDesc}
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
