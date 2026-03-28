'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/useLanguage';

export default function Footer() {
  const t = useTranslation();
  const f = t.footer ?? ({} as Record<string, string>);
  return (
    <footer style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* AI 提取工具 */}
          <div>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              {f.aiTools}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/extract" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.aiPdfExtract}</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/tools/ai-image-extract" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.aiImageExtract}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              {f.pdfTools}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-merge" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  {f.mergePdf}
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/pdf-split" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.splitPdf}</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/pdf-compress" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.compressPdf}</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/pdf-rotate" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.rotatePdf}</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/pdf-print" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.printPdf}</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>{f.convertExport}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/excel-to-pdf" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.excelToPdf}</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/jpg-to-pdf" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.jpgToPdf}</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/pdf-to-jpg" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.pdfToJpg}</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>{f.editTools}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/pdf-edit" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.editPdf}</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/pdf-extract-pages" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.extractPages}</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/pdf-page-number" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.addPageNumber}</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/pdf-watermark" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.addWatermark}</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/tools/pdf-delete-pages" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.deletePages}</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>{f.customerSupport}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/support" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.support}</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>{f.aboutUs}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/privacy" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.privacyPolicy}</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link href="/terms" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-blue-600 transition-colors">{f.termsOfService}</Link></li>
            </ul>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div style={{ 
          borderTop: '1px solid #e5e7eb', 
          paddingTop: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '0.875rem', 
            color: '#6b7280' 
          }}>
            © 2026 PDF Extract AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}