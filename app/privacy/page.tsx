import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function PrivacyPage() {
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
            隐私政策
          </h1>
          
          <div style={{ color: '#6b7280', lineHeight: '1.75', fontSize: '1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>最后更新：2026年2月</strong>
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              1. 信息收集
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              我们收集以下类型的信息：
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>账户信息：邮箱地址、用户名等注册信息</li>
              <li style={{ marginBottom: '0.5rem' }}>使用数据：您上传的文件、使用的功能、处理记录</li>
              <li style={{ marginBottom: '0.5rem' }}>技术信息：IP地址、浏览器类型、设备信息</li>
              <li style={{ marginBottom: '0.5rem' }}>支付信息：通过第三方支付处理商处理，我们不存储完整的支付卡信息</li>
            </ul>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              2. 信息使用
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              我们使用收集的信息用于：
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>提供和改进我们的服务</li>
              <li style={{ marginBottom: '0.5rem' }}>处理您的文档和数据提取请求</li>
              <li style={{ marginBottom: '0.5rem' }}>客户支持和技术支持</li>
              <li style={{ marginBottom: '0.5rem' }}>防止欺诈和滥用</li>
              <li style={{ marginBottom: '0.5rem' }}>发送重要的服务通知</li>
            </ul>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              3. 文件处理和存储
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>重要承诺：</strong>您上传的文件仅用于提供服务，我们承诺：
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>文件在处理完成后24小时内自动删除</li>
              <li style={{ marginBottom: '0.5rem' }}>我们不会查看、分析或使用您的文件内容用于其他目的</li>
              <li style={{ marginBottom: '0.5rem' }}>所有文件传输和存储都经过加密保护</li>
              <li style={{ marginBottom: '0.5rem' }}>我们不会与第三方分享您的文件内容</li>
            </ul>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              4. 信息分享
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              我们不会出售、租赁或交易您的个人信息。我们只在以下情况下分享信息：
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>获得您的明确同意</li>
              <li style={{ marginBottom: '0.5rem' }}>法律要求或法院命令</li>
              <li style={{ marginBottom: '0.5rem' }}>保护我们的权利和安全</li>
              <li style={{ marginBottom: '0.5rem' }}>与可信的服务提供商（如支付处理商）合作提供服务</li>
            </ul>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              5. 数据安全
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              我们采用行业标准的安全措施保护您的信息，包括：
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>SSL/TLS 加密传输</li>
              <li style={{ marginBottom: '0.5rem' }}>数据库加密存储</li>
              <li style={{ marginBottom: '0.5rem' }}>定期安全审计</li>
              <li style={{ marginBottom: '0.5rem' }}>访问控制和监控</li>
            </ul>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              6. 您的权利
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              您有权：
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>访问和更新您的个人信息</li>
              <li style={{ marginBottom: '0.5rem' }}>删除您的账户和相关数据</li>
              <li style={{ marginBottom: '0.5rem' }}>选择退出营销通讯</li>
              <li style={{ marginBottom: '0.5rem' }}>要求数据可携性</li>
            </ul>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              7. Cookie 和跟踪技术
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              我们使用 Cookie 和类似技术来改善用户体验、分析使用情况和提供个性化服务。您可以通过浏览器设置控制 Cookie 的使用。
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              8. 政策更新
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              我们可能会不时更新此隐私政策。重大变更将通过邮件或网站通知您。继续使用服务即表示您接受更新后的政策。
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginTop: '2rem', marginBottom: '1rem' }}>
              9. 联系我们
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              如果您对此隐私政策有任何疑问或需要行使您的权利，请通过我们的支持页面联系我们。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}