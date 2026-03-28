'use client';

import { useState, useRef, useEffect } from 'react';
import { Printer, Upload, FileText } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import { useTranslation, useLanguage } from '@/lib/useLanguage';

function parsePageRange(range: string, total: number): number[] {
  const pages: number[] = [];
  const parts = range.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map((s) => parseInt(s.trim(), 10));
      if (!Number.isNaN(start) && !Number.isNaN(end) && start <= end && start >= 1 && end <= total) {
        for (let i = start; i <= end; i++) {
          if (!pages.includes(i)) pages.push(i);
        }
      }
    } else {
      const pageNum = parseInt(trimmed, 10);
      if (!Number.isNaN(pageNum) && pageNum >= 1 && pageNum <= total && !pages.includes(pageNum)) {
        pages.push(pageNum);
      }
    }
  }
  return pages.sort((a, b) => a - b);
}

export default function PDFPrintPage() {
  const { language } = useLanguage();
  const t = useTranslation();
  const p = t.tools?.pages?.pdfPrint ?? ({} as Record<string, string>);
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageRange, setPageRange] = useState('');
  const [copies, setCopies] = useState(1);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected || selected.type !== 'application/pdf') return;
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    setBlobUrl(null);
    setFile(selected);
    setPageRange('');
    setCopies(1);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await selected.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdfDoc.getPageCount());
    } catch {
      setTotalPages(0);
    }
  };

  useEffect(() => {
    if (!file) return;
    if (totalPages <= 0) {
      setBlobUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      return;
    }
    let revoked = false;
    setBuilding(true);
    (async () => {
      try {
        const { PDFDocument } = await import('pdf-lib');
        const arrayBuffer = await file.arrayBuffer();
        const sourcePdf = await PDFDocument.load(arrayBuffer);
        const total = sourcePdf.getPageCount();
        const oneBased =
          pageRange.trim().length > 0
            ? parsePageRange(pageRange, total)
            : Array.from({ length: total }, (_, i) => i + 1);
        const indices0 = oneBased.map((n) => n - 1);
        const forCopies: number[] = [];
        const safeCopies = Math.min(Math.max(1, Math.floor(copies)), 99);
        for (let c = 0; c < safeCopies; c++) {
          for (const i of indices0) forCopies.push(i);
        }
        if (forCopies.length === 0) {
          for (let i = 0; i < total; i++) forCopies.push(i);
        }
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(sourcePdf, forCopies);
        copiedPages.forEach((page) => newPdf.addPage(page));
        const pdfBytes = await newPdf.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        if (!revoked) {
          setBlobUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
          });
        } else {
          URL.revokeObjectURL(url);
        }
      } catch {
        const url = URL.createObjectURL(file);
        if (!revoked) setBlobUrl((prev) => (prev ? prev : url));
        else URL.revokeObjectURL(url);
      } finally {
        if (!revoked) setBuilding(false);
      }
    })();
    return () => {
      revoked = true;
    };
  }, [file, totalPages, pageRange, copies]);

  const handleChangeFile = () => {
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    setBlobUrl(null);
    setFile(null);
    setTotalPages(0);
    setPageRange('');
    setCopies(1);
  };

  const handlePrint = () => {
    if (!iframeRef.current?.contentWindow) return;
    try {
      iframeRef.current.contentWindow.print();
    } catch {
      if (blobUrl) window.open(blobUrl, '_blank', 'noopener');
    }
  };

  return (
    <div key={language} className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Printer className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {p.title ?? '打印 PDF'}
            </h1>
            <p className="text-gray-600 text-lg">{p.subtitle ?? '打印 PDF 文档，完全免费'}</p>
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-blue-400 transition-all">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{p.selectFile ?? '选择 PDF 文件'}</h3>
              <p className="text-gray-600 mb-6">{p.uploadDesc ?? '上传需要打印的 PDF 文档'}</p>
              <label className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {p.selectFileBtn ?? '选择文件'}
              </label>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                <FileText className="w-10 h-10 text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{file.name}</div>
                  <div className="text-sm text-gray-600">
                    {(file.size / 1024).toFixed(1)} KB
                    {totalPages > 0 && ` · ${(p.totalPages ?? '共 {total} 页').replace('{total}', String(totalPages))}`}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleChangeFile}
                  className="text-sm text-red-600 hover:text-red-700 shrink-0"
                >
                  {p.changeFile ?? '更换文件'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {p.pageRangeLabel ?? '打印页范围'}
                  </label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder={p.pageRangePlaceholder ?? '全部或输入范围，如 1-3,5,7-10'}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {p.copiesLabel ?? '打印份数'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={copies}
                    onChange={(e) => setCopies(Math.min(99, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 relative" style={{ height: 420 }}>
                {building && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 text-gray-600">
                    <span className="animate-pulse">{p.buildingPreview ?? '生成打印预览中…'}</span>
                  </div>
                )}
                {blobUrl && (
                  <iframe
                    ref={iframeRef}
                    src={blobUrl}
                    title="PDF preview"
                    className="w-full h-full"
                  />
                )}
              </div>

              <p className="text-sm text-gray-500 mb-4">
                {p.printHint ?? '点击下方按钮将打开浏览器打印对话框，选择打印机后即可打印。'}
              </p>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                {p.printButton ?? '打开打印'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
