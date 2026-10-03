import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface StackedTextProps {
  hi: string;
  en?: string;
  className?: string;
  hiClassName?: string;
  enClassName?: string;
}

/**
 * Single-Language Text Component:
 * Renders Hindi or English depending on active language setting,
 * avoiding visual clutter and saving vertical layout space.
 */
export const StackedText: React.FC<StackedTextProps> = ({
  hi,
  en,
  className = "",
  hiClassName,
  enClassName,
}) => {
  const { language } = useLanguage();
  const text = language === 'hi' ? hi : (en && en.trim() ? en : hi);

  // In English mode, if enClassName was previously styled as tiny secondary text (e.g. text-slate-400),
  // but hiClassName was the bold primary text (e.g. text-white text-sm font-bold), we prefer hiClassName
  // or a crisp primary style so English text has equal prominent visual hierarchy.
  const appliedClass = language === 'hi'
    ? (hiClassName || className)
    : (hiClassName || enClassName || className);

  return <span className={appliedClass}>{text}</span>;
};
