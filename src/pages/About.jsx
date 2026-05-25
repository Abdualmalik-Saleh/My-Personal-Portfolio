/**
 * About.jsx — Route: /about
 * Two-column layout:
 *   LEFT  — Portrait in gradient-border card
 *   RIGHT — Bio text, info grid, availability badge, Download Resume CTA
 * Below: Skills & Technologies grid (animated progress bars)
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { profile } from '../data';
import { client, urlFor } from '../sanity';
import GradientCard from '../components/GradientCard';
import SectionWrapper from '../components/SectionWrapper';
import PageHeading from '../components/PageHeading';



// ── Skill card ────────────────────────────────────────────────────────────────
function SkillCard({ skill }) {
  const { t } = useLanguage();
  const barRef = useRef(null);

  // Animate bar when it enters the viewport
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = skill.percentage + '%';
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [skill.percentage]);

  return (
    <GradientCard>
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        {/* Icon — Sanity image */}
        <div
          className="flex h-20 w-20 items-center justify-center transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {skill.icon ? (
            <img src={urlFor(skill.icon).url()} alt="Icon" className="w-12 h-12 object-contain" />
          ) : null}
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {t(skill.titleEn, skill.titleAr)}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {t(skill.descEn, skill.descAr)}
        </p>

        {/* Progress bar */}
        <div className="w-full">
          <div className="mb-1.5 flex justify-between text-xs font-medium">
            <span className="text-slate-600 dark:text-slate-500">{t('Proficiency', 'المستوى')}</span>
            <span className="text-blue-400">{skill.percentage}%</span>
          </div>
          <div
            className="h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
            role="progressbar"
            aria-valuenow={skill.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${t(skill.titleEn, skill.titleAr)} ${skill.percentage}%`}
          >
            <div
              ref={barRef}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-rose-500 transition-[width] duration-1000 ease-out"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
    </GradientCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function About() {
  const { t } = useLanguage();
  const [skillsData, setSkillsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .fetch('*[_type == "skill"]')
      .then((data) => {
        setSkillsData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch skills:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          ABOUT ME — Two-column
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        {/* Orbs */}
        <div className="orb -start-40 top-0 h-[500px] w-[500px] bg-blue-600/15" />
        <div className="orb -end-20 bottom-0 h-[400px] w-[400px] bg-rose-600/10" />

        <div className="grid grid-cols-1 items-center gap-12 relative lg:grid-cols-[1fr_1.3fr]">

          {/* ── Portrait ──────────────────────────────────────── */}
          <div className="flex justify-center lg:justify-start">
            <GradientCard className="w-full max-w-[360px]" noHover>
              <div className="overflow-hidden rounded-[calc(1rem-1px)]">
                {/* SVG avatar */}
                <svg
                  viewBox="0 0 400 500"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full"
                  aria-label={t(profile.nameEn, profile.nameAr)}
                >
                  <defs>
                    <linearGradient id="ab-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0f1a30" />
                      <stop offset="100%" stopColor="#1a0d3c" />
                    </linearGradient>
                    <linearGradient id="ab-body" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a5f" />
                      <stop offset="100%" stopColor="#2d1b4e" />
                    </linearGradient>
                    <linearGradient id="ab-grd" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <radialGradient id="ab-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Background */}
                  <rect width="400" height="500" fill="url(#ab-bg)" />
                  {/* Glow */}
                  <circle cx="200" cy="200" r="180" fill="url(#ab-glow)" />
                  {/* Body */}
                  <ellipse cx="200" cy="510" rx="150" ry="130" fill="url(#ab-body)" />
                  {/* Head */}
                  <circle cx="200" cy="185" r="100" fill="url(#ab-body)" />
                  <circle cx="200" cy="185" r="97" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
                  {/* Face */}
                  <circle cx="178" cy="175" r="10" fill="rgba(148,163,184,0.75)" />
                  <circle cx="222" cy="175" r="10" fill="rgba(148,163,184,0.75)" />
                  <path d="M 175 210 Q 200 232 225 210" stroke="rgba(148,163,184,0.8)" strokeWidth="4" fill="none" strokeLinecap="round" />
                  {/* Hair */}
                  <path d="M 108 175 Q 112 88 200 88 Q 288 88 292 175 Q 260 145 200 145 Q 140 145 108 175Z" fill="rgba(20,40,80,0.9)" />
                  {/* Collar / shirt */}
                  <path d="M 120 360 Q 140 330 200 325 Q 260 330 280 360 L 310 500 L 90 500Z" fill="rgba(15,26,48,0.9)" />
                  {/* Code badge */}
                  <rect x="120" y="405" width="160" height="38" rx="10" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />
                  <text x="200" y="429" fontFamily="monospace" fontSize="13" fill="#60a5fa" textAnchor="middle">&lt;/developer&gt;</text>
                  {/* Blue rim light */}
                  <circle cx="200" cy="185" r="100" fill="none" stroke="url(#ab-grd)" strokeWidth="0.5" opacity="0.4" />
                </svg>
              </div>
            </GradientCard>
          </div>

          {/* ── Text content ──────────────────────────────────── */}
          <div className="flex flex-col gap-5 text-start">
            {/* Badge */}
            <span className="self-start rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
              {t('Who Am I', 'من أنا')}
            </span>

            {/* Title */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {t('About Me', 'عن نفسي')}
            </h1>

            {/* Bio paragraphs */}
            <p className="text-base leading-relaxed text-slate-400">
              {t(profile.aboutP1En, profile.aboutP1Ar)}
            </p>
            <p className="text-base leading-relaxed text-slate-400">
              {t(profile.aboutP2En, profile.aboutP2Ar)}
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-blue-500/20 dark:bg-[#0f1a30]">
              {(t(profile.infoEn, profile.infoAr) === profile.infoEn
                ? profile.infoEn
                : profile.infoAr
              ).map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-500">
                    {item.label}
                  </span>
                  <span
                    className={[
                      'text-sm font-semibold',
                      item.label === 'Availability' || item.label === 'التوافر'
                        ? 'text-emerald-400'
                        : 'text-slate-900 dark:text-white',
                    ].join(' ')}
                  >
                    {item.label === 'Availability' || item.label === 'التوافر' ? (
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block h-2 w-2 animate-pulse-glow rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                        {item.value}
                      </span>
                    ) : (
                      item.value
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Download Resume */}
            <a
              href="#"
              className="self-start inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 px-8 py-3 text-sm font-semibold text-white shadow-glow-blue transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
              download
            >
              {t('Download Resume', 'تحميل السيرة الذاتية')}
              <span aria-hidden="true">⬇</span>
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          SKILLS & TECHNOLOGIES
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <div className="orb -start-20 top-0 h-[400px] w-[400px] bg-blue-600/10" />

        <div className="relative">
          <PageHeading
            badge={t('My Stack', 'مجموعة أدواتي')}
            title={t('Skills & Technologies', 'المهارات والتقنيات')}
            subtitle={t(
              'I work with modern tools and technologies to build fast, scalable and efficient web applications.',
              'أعمل مع أدوات وتقنيات حديثة لبناء تطبيقات ويب سريعة وقابلة للتوسع وفعالة.'
            )}
          />

          {isLoading ? (
            <div className="text-center py-10 text-slate-400">Loading skills...</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skillsData.map((skill) => (
                <SkillCard key={skill._id} skill={skill} />
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════════════════ */}
      <SectionWrapper>
        <div className="relative flex flex-col items-center gap-6 text-center">
          <div className="orb left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 bg-blue-600/10" />
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            {t('Want to work together?', 'تريد العمل معاً؟')}
          </h2>
          <p className="max-w-lg text-base text-slate-400">
            {t(
              "I'm open to freelance opportunities and full-time positions. Let's have a chat.",
              'أنا منفتح على فرص العمل الحر والمناصب بدوام كامل. دعنا نتحدث.'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 px-8 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
            >
              {t("Let's Talk", 'تواصل معي')}
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 px-8 py-3 text-sm font-semibold text-blue-400 transition-all hover:bg-blue-500/10 active:scale-95"
            >
              {t('See My Work', 'شاهد أعمالي')}
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
