import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle, FileText, HelpCircle } from 'lucide-react';
import Footer from '../components/Footer';

export default function SupportPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* 顶部导航 */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1.5rem' }}>
          <Link 
            href="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: '#6b7280', 
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
          >
            <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
            <span style={{ fontWeight: '500' }}>返回首页</span>
          </Link>
        </div>
      </header>

      {/* 主要内容 */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
            客户支持
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            我们致力于为您提供最好的服务体验。如果您有任何问题或需要帮助，请随时联系我们。
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* 邮件支持 */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '1rem', 
            padding: '2rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '4rem', 
              height: '4rem', 
              backgroundColor: '#dbeafe', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <Mail style={{ width: '2rem', height: '2rem', color: '#2563eb' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              邮件支持
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              发送邮件给我们，我们会在24小时内回复您的问题
            </p>
            <a 
              href="#"
              style={{ 
                color: '#9ca3af', 
                textDecoration: 'none', 
                fontWeight: '500',
                fontSize: '1rem',
                cursor: 'not-allowed'
              }}
            >
              暂未开放
            </a>
          </div>

          {/* 在线客服 */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '1rem', 
            padding: '2rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '4rem', 
              height: '4rem', 
              backgroundColor: '#dcfce7', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <MessageCircle style={{ width: '2rem', height: '2rem', color: '#16a34a' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              在线客服
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              工作时间：周一至周五 9:00-18:00
            </p>
            <button style={{ 
              backgroundColor: '#16a34a', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '0.5rem', 
              border: 'none', 
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              开始对话
            </button>
          </div>

          {/* 帮助文档 */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '1rem', 
            padding: '2rem', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '4rem', 
              height: '4rem', 
              backgroundColor: '#fef3c7', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <FileText style={{ width: '2rem', height: '2rem', color: '#d97706' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              帮助文档
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              查看详细的使用指南和常见问题解答
            </p>
            <Link 
              href="/help"
              style={{ 
                color: '#d97706', 
                textDecoration: 'none', 
                fontWeight: '500'
              }}
            >
              查看文档
            </Link>
          </div>
        </div>

        {/* 常见问题 */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <HelpCircle style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: 0 }}>
              常见问题
            </h2>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>
                如何使用 AI 提取功能？
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                上传您的 PDF 文件或图片，输入提取规则（可选），点击"开始转换"即可。AI 会自动识别并提取数据到 Excel 表格中。
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>
                支持哪些文件格式？
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                我们支持 PDF、JPG、PNG、Excel 等常见格式。AI 提取功能支持 PDF 和图片格式。
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>
                免费版有什么限制？
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                免费版提供 300 页的一次性额度，可以使用所有免费工具。AI 提取功能需要订阅专业版。
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>
                如何取消订阅？
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                您可以随时在账户设置中取消订阅，取消后仍可使用到当前计费周期结束。
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}