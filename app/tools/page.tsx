'use client';

import Link from 'next/link';
import { 
  FileText, 
  Scissors, 
  Minimize2, 
  RotateCw, 
  Printer,
  Image,
  Edit,
  Layers,
  Hash,
  Droplet,
  Trash2,
  Sparkles
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useTranslation } from '@/lib/useLanguage';

export default function ToolsPage() {
  const t = useTranslation();

  const toolCategories = [
    {
      name: t.tools.categories.aiTools.name,
      description: t.tools.categories.aiTools.description,
      color: 'blue',
      badge: t.tools.categories.aiTools.badge,
      tools: [
        {
          name: t.tools.toolNames.aiPdfExtract,
          description: t.tools.descriptions.aiPdfExtract,
          icon: Sparkles,
          href: '/extract',
          color: 'blue',
        },
        {
          name: t.tools.toolNames.aiImageExtract,
          description: t.tools.descriptions.aiImageExtract,
          icon: Image,
          href: '/tools/ai-image-extract',
          color: 'blue',
        },
      ],
    },
    {
      name: t.tools.categories.pdfUtils.name,
      description: t.tools.categories.pdfUtils.description,
      color: 'green',
      badge: t.tools.categories.pdfUtils.badge,
      tools: [
        {
          name: t.tools.toolNames.pdfMerge,
          description: t.tools.descriptions.pdfMerge,
          icon: Layers,
          href: '/tools/pdf-merge',
          color: 'green',
        },
        {
          name: t.tools.toolNames.pdfSplit,
          description: t.tools.descriptions.pdfSplit,
          icon: Scissors,
          href: '/tools/pdf-split',
          color: 'green',
        },
        {
          name: t.tools.toolNames.pdfCompress,
          description: t.tools.descriptions.pdfCompress,
          icon: Minimize2,
          href: '/tools/pdf-compress',
          color: 'green',
        },
        {
          name: t.tools.toolNames.pdfRotate,
          description: t.tools.descriptions.pdfRotate,
          icon: RotateCw,
          href: '/tools/pdf-rotate',
          color: 'green',
        },
        {
          name: t.tools.toolNames.pdfPrint,
          description: t.tools.descriptions.pdfPrint,
          icon: Printer,
          href: '/tools/pdf-print',
          color: 'green',
        },
      ],
    },
    {
      name: t.tools.categories.convert.name,
      description: t.tools.categories.convert.description,
      color: 'purple',
      badge: t.tools.categories.convert.badge,
      tools: [
        {
          name: t.tools.toolNames.excelToPdf,
          description: t.tools.descriptions.excelToPdf,
          icon: FileText,
          href: '/tools/excel-to-pdf',
          color: 'purple',
        },
        {
          name: t.tools.toolNames.jpgToPdf,
          description: t.tools.descriptions.jpgToPdf,
          icon: Image,
          href: '/tools/jpg-to-pdf',
          color: 'purple',
        },
        {
          name: t.tools.toolNames.pdfToJpg,
          description: t.tools.descriptions.pdfToJpg,
          icon: Image,
          href: '/tools/pdf-to-jpg',
          color: 'purple',
        },
      ],
    },
    {
      name: t.tools.categories.edit.name,
      description: t.tools.categories.edit.description,
      color: 'orange',
      badge: t.tools.categories.edit.badge,
      tools: [
        {
          name: t.tools.toolNames.pdfEdit,
          description: t.tools.descriptions.pdfEdit,
          icon: Edit,
          href: '/tools/pdf-edit',
          color: 'orange',
        },
        {
          name: t.tools.toolNames.pdfExtractPages,
          description: t.tools.descriptions.pdfExtractPages,
          icon: FileText,
          href: '/tools/pdf-extract-pages',
          color: 'orange',
        },
        {
          name: t.tools.toolNames.pdfPageNumber,
          description: t.tools.descriptions.pdfPageNumber,
          icon: Hash,
          href: '/tools/pdf-page-number',
          color: 'orange',
        },
        {
          name: t.tools.toolNames.pdfWatermark,
          description: t.tools.descriptions.pdfWatermark,
          icon: Droplet,
          href: '/tools/pdf-watermark',
          color: 'orange',
        },
        {
          name: t.tools.toolNames.pdfDeletePages,
          description: t.tools.descriptions.pdfDeletePages,
          icon: Trash2,
          href: '/tools/pdf-delete-pages',
          color: 'orange',
        },
      ],
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      hover: 'hover:bg-blue-100',
      badge: 'bg-yellow-100 text-yellow-800',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      hover: 'hover:bg-green-100',
      badge: 'bg-green-100 text-green-800',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      hover: 'hover:bg-purple-100',
      badge: 'bg-purple-100 text-purple-800',
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      hover: 'hover:bg-orange-100',
      badge: 'bg-orange-100 text-orange-800',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {t.tools.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="space-y-12">
            {toolCategories.map((category) => {
              const colors = colorClasses[category.color as keyof typeof colorClasses];
              
              return (
                <div key={category.name} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {category.name}
                      </h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${colors.badge}`}>
                      {category.badge}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.tools.map((tool) => {
                      const Icon = tool.icon;
                      const toolColors = colorClasses[tool.color as keyof typeof colorClasses];
                      
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className={`p-6 rounded-xl border-2 ${toolColors.border} ${toolColors.bg} ${toolColors.hover} transition-all group`}
                        >
                          <div className={`w-12 h-12 ${toolColors.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <Icon className={`w-6 h-6 ${toolColors.text}`} />
                          </div>
                          <h3 className={`font-semibold text-gray-900 mb-2 group-hover:${toolColors.text}`}>
                            {tool.name}
                          </h3>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">{t.tools.upgrade.title}</h2>
            <p className="text-blue-100 mb-6 text-lg">
              {t.tools.upgrade.subtitle}
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              {t.tools.upgrade.viewPricing}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
