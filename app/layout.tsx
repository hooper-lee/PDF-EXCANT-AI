import "./globals.css";
import { cookies } from 'next/headers';
import { ClientProviders } from './ClientProviders';
import { parseLanguageFromCookie } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

// 避免静态生成导致根路径异常，统一按请求渲染
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialLanguage: Language = 'zh';
  try {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get('language')?.value;
    initialLanguage = parseLanguageFromCookie(langCookie);
  } catch (_) {
    // 解析失败时使用默认语言，避免整站 404
  }
  return (
    <html lang={initialLanguage === 'zh' ? 'zh-CN' : initialLanguage} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientProviders initialLanguage={initialLanguage}>{children}</ClientProviders>
      </body>
    </html>
  );
}
