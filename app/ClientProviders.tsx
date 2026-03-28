'use client';

import { LanguageProvider } from '@/lib/useLanguage';
import type { Language } from '@/lib/i18n';

export function ClientProviders({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      {children}
    </LanguageProvider>
  );
}
