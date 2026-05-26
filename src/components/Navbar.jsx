/**
 * Navbar.jsx
 * Fixed top navigation with:
 *   • Brand (gradient text)
 *   • Desktop nav links (React Router <NavLink>)
 *   • Language toggle (EN ↔ AR)
 *   • Hamburger for mobile
 * Fully RTL-safe using Tailwind logical properties.
 */

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { navLinks } from '../data';

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8" />
      <path d="M12 3c2.2 2.35 3.3 5.35 3.3 9s-1.1 6.65-3.3 9c-2.2-2.35-3.3-5.35-3.3-9S9.8 5.35 12 3Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.25 14.15A8.5 8.5 0 0 1 9.85 3.75a7 7 0 1 0 10.4 10.4Z" />
    </svg>
  );
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  return localStorage.getItem('portfolio-theme') || 'dark';
}

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [theme,         setTheme]        = useState(getInitialTheme);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Theme toggle management
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = theme;
    html.classList.toggle('dark', theme === 'dark');
    html.classList.toggle('light', theme === 'light');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileOpen]);

  // Close mobile menu
  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-md border-b border-blue-500/20 shadow-lg'
          : 'bg-transparent border-b border-blue-500/10',
      ].join(' ')}
    >
      <nav
        className="mx-auto flex h-[70px] max-w-6xl items-center justify-between gap-6 px-6"
        aria-label={t('Main navigation', 'القائمة الرئيسية')}
      >
        {/* ── Brand ───────────────────────────────────────────── */}
        <NavLink
          to="/"
          onClick={closeMobile}
          className="flex-shrink-0 text-lg font-bold"
          aria-label={t('Home', 'الرئيسية')}
        >
          <span className="gradient-text-brand">
            {t('Web & Mobile Developer', 'مطور تطبيقات وصفحات الويب')}
          </span>
        </NavLink>

        {/* ── Desktop Links ─────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  [
                    'relative px-4 py-2 text-base md:text-lg font-medium rounded-lg transition-colors duration-200',
                    'after:pointer-events-none after:absolute after:bottom-0 after:start-0 after:end-0 after:mx-auto after:origin-center',
                    'after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-rose-500',
                    'after:transition-[width] after:duration-300',
                    isActive
                      ? 'text-white after:w-3/5'
                      : 'text-slate-400 hover:text-white after:w-0 hover:after:w-1/2',
                  ].join(' ')
                }
              >
                {t(link.labelEn, link.labelAr)}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Right Actions ─────────────────────────────────── */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Language Toggle */}
          <button
            onClick={toggle}
            aria-label={t('Switch to Arabic', 'التبديل إلى الإنجليزية')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500/20 hover:text-blue-300 active:scale-95"
          >
            <GlobeIcon />
            <span className="sr-only">{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            aria-label={theme === 'dark' ? t('Switch to light mode', 'التبديل إلى الوضع الفاتح') : t('Switch to dark mode', 'التبديل إلى الوضع الداكن')}
            aria-pressed={theme === 'dark'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500/20 hover:text-blue-300 active:scale-95"
          >
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </button>
{/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t('Toggle menu', 'تبديل القائمة')}
            aria-expanded={mobileOpen}
            className="flex md:hidden flex-col gap-1.5 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative z-[60]"
          >
            <span
              className={[
                'block h-[3px] w-6 rounded-full bg-[#171717] dark:bg-white transition-all duration-300',
                mobileOpen ? 'translate-y-[9px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-[3px] w-6 rounded-full bg-[#171717] dark:bg-white transition-all duration-300',
                mobileOpen ? 'opacity-0 scale-x-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-[3px] w-6 rounded-full bg-[#171717] dark:bg-white transition-all duration-300',
                mobileOpen ? '-translate-y-[9px] -rotate-45' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay & Drawer ─────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop blur overlay (خلفية ضبابية قوية تعزل الموقع تماماً) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-[#F9F6F0]/80 dark:bg-[#0B1120]/90 backdrop-blur-xl md:hidden"
            />

            {/* Slide-in Menu Drawer */}
            <motion.div
              initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 end-0 z-50 w-full max-w-[300px] border-s border-blue-500/20 bg-navy-900/98 shadow-2xl md:hidden flex flex-col h-full"
            >
              {/* Drawer Header */}
              <div className="flex h-[70px] items-center justify-between px-6 border-b border-blue-500/10 flex-shrink-0">
                <NavLink
                  to="/"
                  onClick={closeMobile}
                  className="flex-shrink-0 text-base font-bold"
                  aria-label={t('Home', 'الرئيسية')}
                >
                  <span className="gradient-text-brand">
                    {t('Web & Mobile Developer', 'مطور تطبيقات وصفحات الويب')}
                  </span>
                </NavLink>

                {/* Close (X) Button */}
                <button
                  onClick={closeMobile}
                  aria-label={t('Close menu', 'إغلاق القائمة')}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 hover:bg-white/5 active:scale-95 transition-all"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Drawer Links */}
              <ul className="flex flex-col gap-2 p-6 flex-grow overflow-y-auto">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <NavLink
                      to={link.path}
                      onClick={closeMobile}
                      className={({ isActive }) =>
                        [
                          'block rounded-xl px-4 py-3.5 text-base font-semibold transition-all duration-200',
                          isActive
                            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20 shadow-sm'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white',
                        ].join(' ')
                      }
                    >
                      {t(link.labelEn, link.labelAr)}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Drawer Footer Preferences */}
              <div className="p-6 border-t border-blue-500/10 bg-navy-950/20 flex flex-col gap-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t('Preferences', 'التفضيلات')}
                  </span>
                  <div className="flex items-center gap-3">
                    {/* Language Switch */}
                    <button
                      onClick={toggle}
                      aria-label={t('Switch to Arabic', 'التبديل إلى الإنجليزية')}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 transition-all hover:bg-blue-500/20 active:scale-95"
                    >
                      <GlobeIcon />
                    </button>
                    {/* Theme Switch */}
                    <button
                      type="button"
                      onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                      aria-label={theme === 'dark' ? t('Switch to light mode', 'التبديل إلى الوضع الفاتح') : t('Switch to dark mode', 'التبديل إلى الوضع الداكن')}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 transition-all hover:bg-blue-500/20 active:scale-95"
                    >
                      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
