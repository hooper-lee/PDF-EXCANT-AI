'use client';

import React, { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
import { Language, getStoredLanguage, setStoredLanguage, getTranslation, Translations } from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
  /** 服务端传入的初始语言（来自 cookie），保证首屏与切换后一致 */
  initialLanguage?: Language;
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => initialLanguage ?? 'zh');
  const [translations, setTranslations] = useState<Translations>(
    () => getTranslation(initialLanguage ?? 'zh')
  );

  useEffect(() => {
    const storedLang = getStoredLanguage();
    setLanguageState(storedLang);
    setTranslations(getTranslation(storedLang));
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setStoredLanguage(lang);
    setTranslations(getTranslation(lang));
    setLanguageState(lang);
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, t: translations }),
    [language, setLanguage, translations]
  );

  return React.createElement(LanguageContext.Provider, { value }, children);
}

// 简化的hook，用于只需要翻译的组件
export const useTranslation = () => {
  try {
    const context = useContext(LanguageContext);
    if (!context) {
      // 如果没有 context，返回默认的中文翻译
      console.warn('useTranslation used outside of LanguageProvider, using default Chinese translations');
      return getTranslation('zh');
    }
    return context.t;
  } catch (error) {
    console.error('Translation error:', error);
    // 返回默认的中文翻译作为后备
    return getTranslation('zh');
  }
};

// 安全的翻译 hook，带有加载状态
export const useSafeTranslation = () => {
  const [isReady, setIsReady] = useState(false);
  const [translations, setTranslations] = useState(getTranslation('zh'));

  useEffect(() => {
    try {
      const context = useContext(LanguageContext);
      if (context) {
        setTranslations(context.t);
      }
      setIsReady(true);
    } catch (error) {
      console.error('Safe translation error:', error);
      setTranslations(getTranslation('zh'));
      setIsReady(true);
    }
  }, []);

  return { t: translations, isReady };
};