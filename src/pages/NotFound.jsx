/**
 * NotFound.jsx — Route: * (404)
 */

import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center gap-6 px-6 text-center">
      {/* Decorative orb */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />

      <span className="text-[120px] font-black leading-none gradient-text select-none">
        404
      </span>

      <h1 className="text-3xl font-extrabold text-white">
        {t('Page Not Found', 'الصفحة غير موجودة')}
      </h1>

      <p className="max-w-md text-base text-slate-400">
        {t(
          "The page you're looking for doesn't exist or has been moved.",
          'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
        )}
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 px-8 py-3 text-sm font-bold text-white shadow-glow-blue transition-all hover:opacity-90 active:scale-95"
      >
        ← {t('Back to Home', 'العودة للرئيسية')}
      </Link>
    </div>
  );
}
