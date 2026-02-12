import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (en: string, ar: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Update font family based on language
    if (language === 'ar') {
      document.body.style.fontFamily = "'Alexandria', sans-serif";
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
    }
  }, [language, dir]);

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'ar' : 'en');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (en: string, ar: string) => {
    return language === 'en' ? en : ar;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
