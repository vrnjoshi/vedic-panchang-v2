import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (hi: string, en?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode; defaultLanguage?: Language }> = ({
  children,
  defaultLanguage = 'hi',
}) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const t = (hi: string, en?: string): string => {
    if (language === 'hi') return hi;
    return en && en.trim() ? en : hi;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageToggle: React.FC<{ className?: string; size?: 'sm' | 'md' }> = ({
  className = '',
  size = 'md',
}) => {
  const { language, setLanguage } = useLanguage();
  const py = size === 'sm' ? 'py-0.5' : 'py-1';
  const px = size === 'sm' ? 'px-1.5' : 'px-2';
  const text = size === 'sm' ? 'text-[11px]' : 'text-xs';

  return (
    <div className={`inline-flex items-center rounded-lg bg-black/40 p-0.5 border border-white/10 ${text} ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLanguage('hi');
        }}
        className={`${px} ${py} rounded-md transition-all font-medium ${
          language === 'hi'
            ? 'bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
            : 'text-slate-400 hover:text-white'
        }`}
        title="हिन्दी चुनें (Select Hindi)"
      >
        हिन्दी
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLanguage('en');
        }}
        className={`${px} ${py} rounded-md transition-all font-medium ${
          language === 'en'
            ? 'bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
            : 'text-slate-400 hover:text-white'
        }`}
        title="Select English"
      >
        English
      </button>
    </div>
  );
};
