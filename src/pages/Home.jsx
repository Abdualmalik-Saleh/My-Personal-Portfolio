/**
 * Home.jsx — Route: /
 * Hero section with:
 *   • Animated gradient name
 *   • CTA buttons
 *   • Stats row
 *   • Floating tech-icon portrait
 *   • Inline Testimonials teaser
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCss3Alt, FaHtml5, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiFigma, SiJavascript, SiMongodb } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { profile } from '../data';
import { client } from '../sanity';
import GradientCard from '../components/GradientCard';

const MotionLink = motion(Link);

// متغيرات الحركة لدخول عناصر الهيرو بتتابع أنيق
const heroTextVariants = {
  hidden: { opacity: 1 },
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// حركة ناعمة لكل عنصر داخل الهيرو
const heroItemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1.2,
    },
  },
};

// ── Floating tech badge ───────────────────────────────────────────────────────
function FloatBadge({ icon, color, className, delay = 0 }) {
  return (
    <motion.div
      className={[
        'tech-orbit-badge absolute flex h-14 w-14 items-center justify-center rounded-full',
        'border border-blue-500/30 bg-[#042F2E] dark:bg-navy-800 text-3xl shadow-lg',
        className,
      ].join(' ')}
      style={{ color }}
      aria-hidden="true"
      animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
      whileHover={{
        scale: 1.15,
        rotate: 10,
        boxShadow: `0 0 34px ${color}66`,
      }}
      transition={{
        repeat: Infinity,
        duration: Math.random() * 3 + 5,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {icon}
    </motion.div>
  );
}

// ── Star rating ───────────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'text-amber-400' : 'text-slate-600'}>
          ★
        </span>
      ))}
    </div>
  );
}

// ── Testimonial mini-card ─────────────────────────────────────────────────────
function TestimonialCard({ testimonial }) {
  const { t } = useLanguage();
  return (
    <GradientCard className="flex-1 min-w-[260px]">
      <div className="p-6 flex flex-col gap-3">
        <Stars count={testimonial.rating} />
        <p className="text-base leading-relaxed text-slate-300 line-clamp-3 italic">
          "{t(testimonial.feedbackEn, testimonial.feedbackAr)}"
        </p>
        <p className="text-base font-bold gradient-text">
          {t(testimonial.clientNameEn, testimonial.clientNameAr)}
        </p>
        <time className="text-sm font-medium text-slate-500">{testimonial.date}</time>
      </div>
    </GradientCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const { t } = useLanguage();
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type == "testimonial"]')
      .then((data) => {
        setTestimonialsData(data);
        setIsTestimonialsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch testimonials:', err);
        setIsTestimonialsLoading(false);
      });
  }, []);

  return (
    <>
      {/* تحريك ناعم للقسم الرئيسي */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
      {/* ═══════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[calc(100vh-70px)] flex items-center overflow-hidden"
        aria-label={t('Hero section', 'القسم الرئيسي')}
      >
        {/* Ambient background orbs */}
        <div className="orb -left-40 top-0 h-[500px] w-[500px] bg-blue-600/20" />
        <div className="orb -right-20 top-20 h-[400px] w-[400px] bg-violet-600/15" />
        <div className="orb bottom-0 left-1/3 h-[300px] w-[300px] bg-rose-600/10" />

        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

            {/* ── Left: Text ─────────────────────────────────── */}
            <motion.div
              className="flex flex-col gap-6 text-start"
              variants={heroTextVariants}
              initial="hidden"
              animate="show"
            >
              {/* Greeting */}
              <motion.p
                variants={heroItemVariants}
                className="text-base font-medium text-slate-400 md:text-lg"
              >
                {t("Hi, I'm", 'مرحباً، أنا')}
              </motion.p>

              {/* Name */}
              <motion.h1
                variants={heroItemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight gradient-text leading-tight"
              >
                {t(profile.nameEn, profile.nameAr)}
              </motion.h1>

              {/* Role badge */}
              <motion.span
                variants={heroItemVariants}
                className="self-start rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-base font-medium text-blue-300"
              >
                {t(profile.roleEn, profile.roleAr)}
              </motion.span>

              {/* Tagline */}
              <motion.p
                variants={heroItemVariants}
                className="max-w-md text-lg md:text-xl lg:text-2xl leading-relaxed font-medium text-slate-300"
              >
                {t(profile.taglineEn, profile.taglineAr)}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={heroItemVariants}
                className="flex flex-wrap gap-4"
              >
                <MotionLink
                  to="/projects"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 34px rgba(59, 130, 246, 0.42)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-rose-500 px-8 py-3 text-base font-medium text-white shadow-glow-blue transition-all duration-200 hover:opacity-90"
                >
                  {t('View Projects', 'عرض المشاريع')}
                </MotionLink>
                <MotionLink
                  to="/contact"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 28px rgba(59, 130, 246, 0.22)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-transparent px-8 py-3 text-base font-medium text-blue-400 transition-all duration-200 hover:bg-blue-500/10"
                >
                  {t("Let's Collaborate", 'لنتعاون معاً')}
                  <span aria-hidden="true">↗</span>
                </MotionLink>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={heroItemVariants}
                className="mt-2 flex items-center gap-6 border-t border-blue-500/10 pt-6"
              >
                {profile.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="text-xl font-bold gradient-text md:text-2xl">
                      {t(stat.valueEn, stat.valueAr)}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      {t(stat.labelEn, stat.labelAr)}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Portrait + Floating Icons ──────────── */}
            <div className="flex justify-center">
              <div className="relative h-[340px] w-[340px] md:h-[400px] md:w-[400px]">
                {/* Portrait ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-rose-500 p-[3px] shadow-glow-blue"
                  animate={{ scale: [1, 1.03, 1], filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                >
                  <div className="h-full w-full rounded-full bg-navy-800 overflow-hidden flex items-center justify-center">
                    {/* Developer avatar SVG placeholder */}
                    <svg
                      viewBox="0 0 320 320"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
                      aria-label={t(profile.nameEn, profile.nameAr)}
                    >
                      <defs>
                        <linearGradient id="av-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1e3a5f" />
                          <stop offset="100%" stopColor="#2d1b4e" />
                        </linearGradient>
                        <linearGradient id="av-grd" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                      <circle cx="160" cy="160" r="160" fill="#0f1a30" />
                      <circle cx="160" cy="130" r="80" fill="url(#av-bg)" />
                      <ellipse cx="160" cy="310" rx="110" ry="90" fill="url(#av-bg)" />
                      <circle cx="160" cy="130" r="77" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
                      <circle cx="142" cy="122" r="8" fill="rgba(148,163,184,0.75)" />
                      <circle cx="178" cy="122" r="8" fill="rgba(148,163,184,0.75)" />
                      <path d="M 140 155 Q 160 175 180 155" stroke="rgba(148,163,184,0.8)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                      <path d="M 85 118 Q 88 55 160 55 Q 232 55 235 118 Q 210 95 160 95 Q 110 95 85 118Z" fill="rgba(25,45,85,0.9)" />
                      {/* Code tag */}
                      <rect x="95" y="250" width="130" height="30" rx="8" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
                      <text x="160" y="270" fontFamily="monospace" fontSize="11" fill="#60a5fa" textAnchor="middle">&lt;/developer&gt;</text>
                    </svg>
                  </div>
                </motion.div>

                {/* Floating tech badges */}
                <FloatBadge icon={<FaReact />} color="#61dafb" className="top-[4%] end-[8%]" delay={0} />
                <FloatBadge icon={<SiJavascript />} color="#f7df1e" className="top-[30%] -start-[6%]" delay={0.35} />
                <FloatBadge icon={<FaNodeJs />} color="#68a063" className="bottom-[29%] -start-[4%]" delay={0.75} />
                <FloatBadge icon={<FaCss3Alt />} color="#264de4" className="bottom-[6%] end-[14%]" delay={1.1} />
                <FloatBadge icon={<FaHtml5 />} color="#e34c26" className="top-[55%] -end-[4%]" delay={1.45} />
                <FloatBadge icon={<SiMongodb />} color="#47a248" className="top-[1%] start-[18%]" delay={1.8} />
                <FloatBadge icon={<SiFigma />} color="#a259ff" className="bottom-[6%] start-[20%]" delay={2.15} />
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 start-1/2 -translate-x-1/2 flex h-10 w-6 justify-center rounded-full border-2 border-blue-500/30 pt-1.5"
          aria-hidden="true"
        >
          <div className="h-2 w-1 rounded-full bg-gradient-to-b from-blue-500 to-rose-500 animate-bounce" />
        </div>
      </section>
      </motion.div>

      {/* تحريك ناعم لقسم آراء العملاء */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS TEASER
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="orb -right-20 top-10 h-[400px] w-[400px] bg-violet-600/10" />

        <div className="container mx-auto max-w-6xl px-6 relative">
          {/* Heading */}
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm font-medium uppercase tracking-widest text-blue-400">
              {t('Client Reviews', 'آراء العملاء')}
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {t('Testimonials', 'الشهادات')}
            </h2>
            <p className="max-w-xl text-lg text-slate-400">
              {t(
                "Feedback from clients and collaborators I've worked with on real projects.",
                'آراء العملاء والمتعاونين الذين عملت معهم في مشاريع حقيقية.'
              )}
            </p>
          </div>

          {/* Cards grid */}
          {isTestimonialsLoading ? (
            <div className="text-center w-full py-8 text-slate-500">Loading reviews...</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {testimonialsData.map((testimonial) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>
      </motion.div>

      {/* تحريك ناعم لقسم التواصل */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
      {/* ═══════════════════════════════════════════════════════
          CTA BANNER
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="orb left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 bg-blue-600/10" />
        <div className="container mx-auto max-w-3xl px-6 text-center relative">
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            {t("Let's Build Something", 'لنبني شيئاً')}
            <span className="block gradient-text">
              {t('Amazing Together', 'رائعاً معاً')}
            </span>
          </h2>
          <p className="mb-8 text-lg text-slate-400">
            {t(
              "Have a project in mind? I'm available for freelance work and open to new opportunities.",
              'هل لديك مشروع في ذهنك؟ أنا متاح للعمل الحر ومنفتح على فرص جديدة.'
            )}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 px-10 py-4 text-base font-bold text-white shadow-glow-blue transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
          >
            {t("Get In Touch", 'تواصل معي')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      </motion.div>
    </>
  );
}
