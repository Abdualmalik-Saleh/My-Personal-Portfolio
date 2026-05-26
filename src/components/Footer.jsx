/**
 * Footer.jsx
 * Brand | Nav links | Social icons | Copyright
 * RTL-safe via logical properties.
 */

import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { navLinks } from '../data';
import { FaEnvelope, FaWhatsapp, FaPhoneAlt, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blue-500/10 bg-navy-900/50 backdrop-blur-sm">
      {/* Gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Brand */}
          <NavLink to="/" className="text-base font-bold">
            <span className="gradient-text-brand">
              {t('Web & Mobile Developer', 'مطور تطبيقات وصفحات الويب')}
            </span>
          </NavLink>

          {/* Footer nav */}
          <nav aria-label={t('Footer navigation', 'تنقل التذييل')}>
            <ul className="flex flex-wrap items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.path}
                    className="rounded-md px-3 py-1 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                  >
                    {t(link.labelEn, link.labelAr)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

         {/* Socials - ألوان العلامة التجارية مع إشعاع نيون متدرج عند التمرير */}
          <div className="flex items-center gap-6">
            {/* Email - Red */}
            <a
              href="mailto:your_email@gmail.com"
              aria-label="Email"
              className="group relative flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <span className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80"></span>
              <span className="relative z-10 text-2xl text-[#EA4335] transition-colors duration-300 group-hover:text-white">
                <FaEnvelope />
              </span>
            </a>

            {/* WhatsApp - Green */}
            <a
              href="https://wa.me/966565521753"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="group relative flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <span className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80"></span>
              <span className="relative z-10 text-2xl text-[#25D366] transition-colors duration-300 group-hover:text-white">
                <FaWhatsapp />
              </span>
            </a>

            {/* Phone Call - Blue */}
            <a
              href="tel:+966565521753"
              aria-label="Phone"
              className="group relative flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <span className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80"></span>
              <span className="relative z-10 text-2xl text-[#3B82F6] transition-colors duration-300 group-hover:text-white">
                <FaPhoneAlt />
              </span>
            </a>

            {/* GitHub - Adapts to Light/Dark */}
            <a
              href="https://github.com/Abdualmalik-Saleh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group relative flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <span className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80"></span>
              <span className="relative z-10 text-2xl text-slate-800 dark:text-slate-200 transition-colors duration-300 group-hover:text-white">
                <FaGithub />
              </span>
            </a>

            {/* LinkedIn - Blue */}
            <a
              href="www.linkedin.com/in/dev-abdulmalik-al-salemi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group relative flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <span className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80"></span>
              <span className="relative z-10 text-2xl text-[#0A66C2] transition-colors duration-300 group-hover:text-white">
                <FaLinkedin />
              </span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-white/5" />

        {/* Copyright */}
        <p className="mt-4 text-center text-sm text-slate-500">
          {t(
            `Copyright © ${year} Abdulmalik Al-Salemi | All Rights Reserved`,
            `حقوق النشر © ${year} عبدالملك السالمي | جميع الحقوق محفوظة`
          )}
        </p>
      </div>
    </footer>
  );
}
