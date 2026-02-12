'use client';

import { useState } from 'react';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Toast from '@/app/components/Toast';
import Footer from '@/app/components/Footer';

export default function ExcelToPDFPage() {
  const [file, setFile] = useState<File | null>(null);
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
      const XLSX = await import('xlsx');
      const { PDFDocument, rgb } = await import('pdf-lib');
      
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      const pdfDoc = await PDFDocument.create();
      
      // 遍历所有工作表
      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        if (jsonData.length === 0) continue;
        
        // 创建新页面
        const page = pdfDoc.addPage([595, 842]); // A4 size
        const { width, height } = page.getSize();
        
        // 设置字体大小和行高
        const fontSize = 10;
        const lineHeight = 15;
        const margin = 50;
        const cellPadding = 5;
        
        // 计算列宽
        const maxCols = Math.max(...jsonData.map(row => row.length));
        const colWidth = (width - 2 * margin) / maxCols;
        
        // 添加标题
        page.drawText(`工作表: ${sheetName}`, {
          x: margin,
          y: height - margin,
          size: 14,
          color: rgb(0, 0, 0),
        });
        
        let currentY = height - margin - 30;
        
        // 绘制表格数据
        for (let rowIndex = 0; rowIndex < Math.min(jsonData.length, 40); rowIndex++) {
          const row = jsonData[rowIndex];
          
          for (let colIndex = 0; colIndex < Math.min(row.length, 8); colIndex++) {
            const cellValue = String(row[colIndex] || '');
            const x = margin + colIndex * colWidth + cellPadding;
            const y = currentY;
            
            // 绘制单元格边框
            page.drawRectangle({
              x: margin + colIndex * colWidth,
              y: y - cellPadding,
              width: colWidth,
              height: lineHeight,
              borderColor: rgb(0.8, 0.8, 0.8),
              borderWidth: 0.5,
            });
            
            // 绘制文本（截断过长的文本）
            const maxLength = Math.floor(colWidth / 6);
            const displayText = cellValue.length > maxLength 
              ? cellValue.substring(0, maxLength - 3) + '...' 
              : cellValue;
            
            page.drawText(displayText, {
              x,
              y,
              size: fontSize,
              color: rgb(0, 0, 0),
            });
          }
          
          currentY -= lineHeight;
          
          // 如果页面空间不够，创建新页面
          if (currentY < margin + 50) {
            break;
          }
        }
        
        // 如果数据太多，添加提示
        if (jsonData.length > 40) {
          page.drawText(`注意: 仅显示前 40 行数据`, {
            x: margin,
            y: currentY - 20,
            size: 8,
            color: rgb(0.5, 0.5, 0.5),
          });
        }
      }
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      
      const timestamp = new Date().toISOString().slice(0, 10);
      const fileName = `excel-to-pdf-${timestamp}.pdf`;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setToast({ message: 'Excel 转 PDF 成功！文件已开始下载', type: 'success' });
    } catch (error) {
      console.error('转换失败:', error);
      setToast({ message: 'Excel 转 PDF 失败，请检查文件是否有效', type: 'error' });
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
              Excel 转 PDF
            </h1>
            <p className="text-gray-600 text-lg">将 Excel 转换为 PDF，完全免费</p>
          </div>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:border-purple-400 transition-all">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">选择 Excel 文件</h3>
              <p className="text-gray-600 mb-6">支持 .xlsx, .xls 格式</p>
              <label className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                选择文件
              </label>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-8 p-4 bg-purple-50 rounded-lg">
                <FileSpreadsheet className="w-10 h-10 text-purple-600" />
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

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">转换说明</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 支持多个工作表转换</li>
                  <li>• 每个工作表转换为一页 PDF</li>
                  <li>• 大表格会自动调整以适应页面</li>
                  <li>• 超过 40 行的数据会被截断</li>
                </ul>
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
                <FileSpreadsheet className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">多工作表支持</h3>
              <p className="text-sm text-gray-600">
                自动转换所有工作表
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">保持格式</h3>
              <p className="text-sm text-gray-600">
                尽可能保持原始表格格式
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">快速转换</h3>
              <p className="text-sm text-gray-600">
                快速生成 PDF 文档
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