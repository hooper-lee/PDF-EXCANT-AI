'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import UserInfo from './UserInfo';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '@/lib/useLanguage';

export default function Navbar() {
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  
  let t;
  try {
    t = useTranslation();
  } catch (error) {
    console.error('Navbar translation error:', error);
    // 使用默认翻译作为后备
    t = {
      navbar: {
        brand: 'PDF Extract AI',
        features: '功能',
        pricing: '定价',
        support: '支持',
        login: '登录',
        signup: '注册',
        getStarted: '开始使用',
      },
      tools: {
        toolNames: {
          aiPdfExtract: 'AI PDF 提取',
          aiImageExtract: 'AI 图片提取',
          pdfMerge: '合并 PDF',
          pdfSplit: '拆分 PDF',
          pdfCompress: '压缩 PDF',
          pdfRotate: '旋转 PDF',
          pdfPrint: '打印 PDF',
          excelToPdf: 'Excel 转 PDF',
          jpgToPdf: 'JPG 转 PDF',
          pdfToJpg: 'PDF 转 JPG',
          pdfEdit: '编辑 PDF',
          pdfExtractPages: '提取页面',
          pdfPageNumber: '添加页码',
          pdfWatermark: '添加水印',
          pdfDeletePages: '删除页面',
        },
        descriptions: {
          aiPdfExtract: '智能提取 PDF 数据到 Excel',
          aiImageExtract: '从图片中提取结构化数据',
          pdfMerge: '将多个 PDF 合并为一个',
          pdfSplit: '将 PDF 拆分成多个文件',
          pdfCompress: '减小 PDF 文件大小',
          pdfRotate: '旋转 PDF 页面',
          pdfPrint: '打印 PDF 文档',
          excelToPdf: '将 Excel 转换为 PDF',
          jpgToPdf: '将图片转换为 PDF',
          pdfToJpg: '将 PDF 转换为图片',
          pdfEdit: '编辑 PDF 内容',
          pdfExtractPages: '提取 PDF 页面',
          pdfPageNumber: '为 PDF 添加页码',
          pdfWatermark: '为 PDF 添加水印',
          pdfDeletePages: '删除 PDF 页面',
        }
      }
    };
  }

  const aiTools = [
    { name: t.tools.toolNames.aiPdfExtract, href: '/extract', description: t.tools.descriptions.aiPdfExtract },
    { name: t.tools.toolNames.aiImageExtract, href: '/tools/ai-image-extract', description: t.tools.descriptions.aiImageExtract },
  ];

  const pdfTools = [
    { name: t.tools.toolNames.pdfMerge, href: '/tools/pdf-merge', description: t.tools.descriptions.pdfMerge },
    { name: t.tools.toolNames.pdfSplit, href: '/tools/pdf-split', description: t.tools.descriptions.pdfSplit },
    { name: t.tools.toolNames.pdfCompress, href: '/tools/pdf-compress', description: t.tools.descriptions.pdfCompress },
    { name: t.tools.toolNames.pdfRotate, href: '/tools/pdf-rotate', description: t.tools.descriptions.pdfRotate },
    { name: t.tools.toolNames.pdfPrint, href: '/tools/pdf-print', description: t.tools.descriptions.pdfPrint },
  ];

  const convertTools = [
    { name: t.tools.toolNames.excelToPdf, href: '/tools/excel-to-pdf', description: t.tools.descriptions.excelToPdf },
    { name: t.tools.toolNames.jpgToPdf, href: '/tools/jpg-to-pdf', description: t.tools.descriptions.jpgToPdf },
    { name: t.tools.toolNames.pdfToJpg, href: '/tools/pdf-to-jpg', description: t.tools.descriptions.pdfToJpg },
  ];

  const editTools = [
    { name: t.tools.toolNames.pdfEdit, href: '/tools/pdf-edit', description: t.tools.descriptions.pdfEdit },
    { name: t.tools.toolNames.pdfExtractPages, href: '/tools/pdf-extract-pages', description: t.tools.descriptions.pdfExtractPages },
    { name: t.tools.toolNames.pdfPageNumber, href: '/tools/pdf-page-number', description: t.tools.descriptions.pdfPageNumber },
    { name: t.tools.toolNames.pdfWatermark, href: '/tools/pdf-watermark', description: t.tools.descriptions.pdfWatermark },
    { name: t.tools.toolNames.pdfDeletePages, href: '/tools/pdf-delete-pages', description: t.tools.descriptions.pdfDeletePages },
  ];

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setShowToolsDropdown(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowToolsDropdown(false);
    }, 300);
    setDropdownTimeout(timeout);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {t.navbar.brand}
          </Link>
          
          <div className="flex gap-8 items-center">
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                {t.common.tools}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showToolsDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`absolute top-full left-0 mt-2 w-[800px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 -translate-x-1/4 transition-all duration-200 ${
                  showToolsDropdown 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      {t.tools.categories.aiTools.name}
                    </h3>
                    <div className="space-y-2">
                      {aiTools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="block p-2 rounded-lg hover:bg-blue-50 transition-colors group"
                        >
                          <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                            {tool.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {tool.description}
                          </div>
                        </Link>
                      ))}
                      <div className="mt-2 pt-2 border-t">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                          {t.tools.categories.aiTools.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      {t.tools.categories.pdfUtils.name}
                    </h3>
                    <div className="space-y-2">
                      {pdfTools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="block p-2 rounded-lg hover:bg-green-50 transition-colors group"
                        >
                          <div className="text-sm font-medium text-gray-900 group-hover:text-green-600">
                            {tool.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {tool.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      {t.tools.categories.convert.name}
                    </h3>
                    <div className="space-y-2">
                      {convertTools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="block p-2 rounded-lg hover:bg-purple-50 transition-colors group"
                        >
                          <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600">
                            {tool.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {tool.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      {t.tools.categories.edit.name}
                    </h3>
                    <div className="space-y-2">
                      {editTools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="block p-2 rounded-lg hover:bg-orange-50 transition-colors group"
                        >
                          <div className="text-sm font-medium text-gray-900 group-hover:text-orange-600">
                            {tool.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {tool.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t text-center">
                  <p className="text-xs text-gray-500">
                    <span className="text-green-600 font-medium">{t.tools.categories.pdfUtils.badge}</span> 无需登录即可使用 · 
                    <span className="text-blue-600 font-medium ml-2">{t.tools.categories.aiTools.name}</span> 需要订阅专业版
                  </p>
                </div>
              </div>
            </div>

            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t.navbar.pricing}</Link>
            <Link href="/tools" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">所有{t.common.tools}</Link>
            <Link href="/support" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t.navbar.support}</Link>
            
            {/* Language Selector */}
            <LanguageSelector />
          </div>

          <UserInfo />
        </div>
      </nav>
    </header>
  );
}
