import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      {/* Massive 404 with floating animation */}
      <motion.div
        className="text-8xl md:text-9xl font-black gradient-text select-none"
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        404
      </motion.div>

      {/* Heading */}
      <h1 className="text-3xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
        {t('Page Not Found', 'الصفحة غير موجودة')}
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
        {t(
          "The page you are looking for doesn't exist or has been moved.",
          "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
        )}
      </p>

      {/* Primary CTA Button */}
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-rose-500 px-8 py-3 text-base font-bold text-white shadow-glow-blue transition-all hover:opacity-90 active:scale-95"
      >
        {t('Back to Home', 'العودة للرئيسية')}
      </Link>
    </div>
  );
}
