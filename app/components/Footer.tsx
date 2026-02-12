'use client';

import Link from 'next/link';

export default function Footer() {
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
              AI 提取工具
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/extract" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  AI PDF 提取
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/ai-image-extract" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  AI 图片提取
                </Link>
              </li>
            </ul>
          </div>

          {/* PDF 常用工具 */}
          <div>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              PDF 常用工具
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
                  合并 PDF
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-split" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  拆分 PDF
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-compress" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  压缩 PDF
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-rotate" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  旋转 PDF
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-print" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  打印 PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* 转换与导出 */}
          <div>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              转换与导出
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/excel-to-pdf" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Excel 转 PDF
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/jpg-to-pdf" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  JPG 转 PDF
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-to-jpg" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  PDF 转 JPG
                </Link>
              </li>
            </ul>
          </div>

          {/* 编辑工具 */}
          <div>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              编辑工具
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-edit" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  编辑 PDF
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-extract-pages" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  提取页面
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-page-number" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  添加页码
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-watermark" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  添加水印
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/tools/pdf-delete-pages" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  删除页面
                </Link>
              </li>
            </ul>
          </div>

          {/* 客户支持 */}
          <div>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              客户支持
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/support" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  支持
                </Link>
              </li>
            </ul>
          </div>

          {/* 关于我们 */}
          <div>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              关于我们
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/privacy" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  隐私政策
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href="/terms" 
                  style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem'
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  服务条款
                </Link>
              </li>
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