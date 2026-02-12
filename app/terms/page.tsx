import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function TermsPage() {
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
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem', textAlign: 'center' }}>
            服务条款
          </h1>
          
          <div style={{ color: '#6b7280', lineHeight: '1.75', fontSize: '1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>最后更新：2026年2月</strong>
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              1. 服务说明
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              PDF Extract AI 是由 TRANSEZ LTD. 提供的在线文档处理和数据提取服务。我们提供 AI 驱动的 PDF 数据提取、文档转换和编辑工具。
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              2. 用户责任
            </h2>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>您必须年满18岁或在法定监护人同意下使用本服务</li>
              <li style={{ marginBottom: '0.5rem' }}>您有责任保护您的账户信息和密码</li>
              <li style={{ marginBottom: '0.5rem' }}>您不得上传包含恶意软件、病毒或非法内容的文件</li>
              <li style={{ marginBottom: '0.5rem' }}>您不得滥用我们的服务或尝试破坏系统安全</li>
            </ul>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              3. 付费服务
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              我们提供免费和付费服务。付费服务的具体条款、价格和计费周期在订阅时明确说明。您可以随时取消订阅，取消后服务将在当前计费周期结束时停止。
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              4. 知识产权
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              本服务的所有内容、功能和技术均为 TRANSEZ LTD. 的知识产权。您上传的文件内容归您所有，我们仅在提供服务期间临时处理这些文件。
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              5. 免责声明
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              我们努力提供准确可靠的服务，但不保证服务的完全准确性或无中断性。您使用本服务的风险由您自行承担。
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              6. 服务变更
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              我们保留随时修改、暂停或终止服务的权利。重大变更将提前通知用户。
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              7. 联系我们
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              如果您对这些条款有任何疑问，请通过我们的支持页面联系我们。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}