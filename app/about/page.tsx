import Link from 'next/link';
import { ArrowLeft, Shield, Users, Zap, Globe } from 'lucide-react';
import Footer from '../components/Footer';

export default function AboutPage() {
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
        {/* 标题部分 */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
            关于 PDF Extract AI
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            我们致力于为用户提供最智能、最便捷的 PDF 处理和数据提取解决方案
          </p>
        </div>

        {/* 公司介绍 */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#111827', marginBottom: '1.5rem', textAlign: 'center' }}>
            我们的使命
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.75', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            PDF Extract AI 是一个创新的在线平台，结合了人工智能技术和传统 PDF 处理工具。
            我们的目标是帮助用户轻松地从各种文档中提取结构化数据，提高工作效率，节省宝贵时间。
          </p>
        </div>

        {/* 核心价值 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          marginBottom: '4rem'
        }}>
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
              <Zap style={{ width: '2rem', height: '2rem', color: '#2563eb' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              智能高效
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
              采用先进的 AI 技术，自动识别和提取文档中的结构化数据，大幅提升工作效率
            </p>
          </div>

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
              <Shield style={{ width: '2rem', height: '2rem', color: '#16a34a' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              安全可靠
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
              采用企业级安全标准，确保您的文档和数据安全，所有处理过程均在安全环境中进行
            </p>
          </div>

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
              <Users style={{ width: '2rem', height: '2rem', color: '#d97706' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              用户至上
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
              以用户需求为中心，持续优化产品体验，提供专业的客户支持服务
            </p>
          </div>

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
              backgroundColor: '#f3e8ff', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <Globe style={{ width: '2rem', height: '2rem', color: '#7c3aed' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              全球服务
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
              支持多种语言和格式，为全球用户提供一致的高质量服务体验
            </p>
          </div>
        </div>

        {/* 产品特色 */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#111827', marginBottom: '2rem', textAlign: 'center' }}>
            产品特色
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                🤖 AI 智能提取
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                利用先进的机器学习算法，自动识别和提取 PDF 及图片中的表格、文本和数据，转换为结构化的 Excel 格式。
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                🛠️ 丰富工具集
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                提供 15+ 种 PDF 处理工具，包括合并、拆分、压缩、转换等，满足各种文档处理需求。
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                ⚡ 快速处理
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                优化的处理引擎，确保文档处理速度快、质量高，大文件也能快速完成处理。
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                🔒 隐私保护
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                严格的隐私保护政策，上传的文件会在处理完成后自动删除，确保您的数据安全。
              </p>
            </div>
          </div>
        </div>

        {/* 联系信息 */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#111827', marginBottom: '2rem', textAlign: 'center' }}>
            联系我们
          </h2>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1rem' }}>
              如果您有任何问题或建议，欢迎通过我们的支持页面联系我们
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <strong style={{ color: '#111827' }}>公司：</strong>
                <span style={{ color: '#6b7280' }}>TRANSEZ LTD.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}