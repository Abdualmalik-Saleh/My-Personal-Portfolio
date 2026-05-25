/**
 * LanguageContext.jsx
 * Manages bilingual state: English (LTR) ↔ Arabic (RTL).
 * Sets document.documentElement lang + dir on every toggle.
 * Persists choice to localStorage.
 */

import { createContext, useContext, useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Context definition
// ─────────────────────────────────────────────────────────────────────────────
const LanguageContext = createContext(null);

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('portfolio-lang') || 'en'
  );

  const isRTL = lang === 'ar';

  // Sync <html lang dir> and body font on every change
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.body.style.fontFamily = isRTL
      ? "'Cairo', system-ui, sans-serif"
      : "'Outfit', system-ui, sans-serif";
    localStorage.setItem('portfolio-lang', lang);
  }, [lang, isRTL]);

  const toggle = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'));

  /** t(enText, arText) — inline translation helper */
  const t = (enText, arText) => (lang === 'ar' ? arText : enText);

  return (
    <LanguageContext.Provider value={{ lang, isRTL, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
