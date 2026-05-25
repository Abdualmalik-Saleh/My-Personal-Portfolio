/**
 * Projects.jsx — Route: /projects
 * Filter tabs + responsive project cards grid.
 * Uses useState for active filter, no routing needed.
 * Project cards have gradient SVG thumbnails, tag pills,
 * GitHub + Live Demo buttons.
 */

import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projects, projectFilters } from '../data';
import GradientCard from '../components/GradientCard';
import SectionWrapper from '../components/SectionWrapper';
import PageHeading from '../components/PageHeading';
import { client, urlFor } from '../sanity';

const projectQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  tags,
  image,
  link
}`;

const projectGradients = [
  ['#051937', '#008793'],
  ['#0f0c29', '#302b63'],
  ['#1a1a2e', '#533483'],
  ['#0b486b', '#2d6b8a'],
  ['#1e0a3c', '#6a0dad'],
  ['#003153', '#023e73'],
];

function mapSanityProject(project, index) {
  const [gradientFrom, gradientTo] = projectGradients[index % projectGradients.length];

  return {
    id: project._id,
    featured: index < 2,
    category: 'all',
    titleEn: project.titleEn || project.titleAr || 'Untitled Project',
    titleAr: project.titleAr || project.titleEn || 'مشروع بدون عنوان',
    descEn: project.descriptionEn || project.descriptionAr || '',
    descAr: project.descriptionAr || project.descriptionEn || '',
    tags: Array.isArray(project.tags) ? project.tags.filter(Boolean) : [],
    github: project.link || '#',
    demo: project.link || '#',
    image: project.image,
    gradientFrom,
    gradientTo,
  };
}

// ── Project thumbnail — SVG tech illustration ─────────────────────────────────
function ProjectThumb({ project }) {
  if (project.image) {
    return (
      <div
        className="relative w-full overflow-hidden bg-navy-900"
        style={{ aspectRatio: '16/9' }}
      >
        <img
          src={urlFor(project.image).width(900).height(506).fit('crop').auto('format').url()}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {project.featured && (
          <span className="absolute end-3 top-3 z-10 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
            Featured
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '16/9' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 640 360"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`bg-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={project.gradientFrom} />
            <stop offset="100%" stopColor={project.gradientTo} />
          </linearGradient>
          <linearGradient id={`grd-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id={`glow-${project.id}`}>
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="640" height="360" fill={`url(#bg-${project.id})`} />

        {/* Grid */}
        {Array.from({ length: 17 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="360"
            stroke="rgba(59,130,246,0.04)" strokeWidth="1" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="640" y2={i * 40}
            stroke="rgba(59,130,246,0.04)" strokeWidth="1" />
        ))}

        {/* Glow circles */}
        <circle cx="160" cy="180" r="120" fill="#3b82f6" opacity="0.06" filter={`url(#glow-${project.id})`} />
        <circle cx="480" cy="180" r="100" fill="#ec4899" opacity="0.06" filter={`url(#glow-${project.id})`} />

        {/* Browser window */}
        <rect x="120" y="55" width="400" height="250" rx="10" fill="rgba(10,20,40,0.9)" stroke={`url(#grd-${project.id})`} strokeWidth="1.5" />
        {/* Chrome bar */}
        <rect x="120" y="55" width="400" height="30" rx="10" fill="rgba(15,28,55,0.98)" />
        <rect x="120" y="73" width="400" height="12" fill="rgba(15,28,55,0.98)" />
        {/* Window dots */}
        <circle cx="142" cy="70" r="4.5" fill="#ef4444" opacity="0.8" />
        <circle cx="157" cy="70" r="4.5" fill="#facc15" opacity="0.8" />
        <circle cx="172" cy="70" r="4.5" fill="#22c55e" opacity="0.8" />
        {/* URL bar */}
        <rect x="192" y="63" width="200" height="14" rx="7" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.25)" strokeWidth="0.5" />
        <text x="292" y="73" fontFamily="monospace" fontSize="7.5" fill="rgba(148,163,184,0.6)" textAnchor="middle">localhost:3000</text>

        {/* Left pane: code */}
        <rect x="130" y="97" width="148" height="198" fill="rgba(5,12,25,0.8)" />
        {[80, 60, 100, 70, 90, 55, 85, 65, 75, 95].map((w, i) => (
          <rect key={i} x="138" y={109 + i * 18} width={w} height="4" rx="2"
            fill={i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#ec4899' : 'rgba(148,163,184,0.4)'}
            opacity="0.7" />
        ))}

        {/* Right pane: chart */}
        <rect x="286" y="97" width="224" height="198" fill="rgba(8,15,30,0.6)" />
        {[55, 90, 45, 115, 75, 60, 100, 70].map((h, i) => (
          <rect key={i} x={296 + i * 25} y={273 - h} width="18" height={h} rx="3"
            fill={`url(#grd-${project.id})`} opacity={0.45 + i * 0.05} />
        ))}
        {/* Chart axis */}
        <line x1="294" y1="274" x2="502" y2="274" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
        {/* Area line */}
        <polyline
          points={[55, 90, 45, 115, 75, 60, 100, 70]
            .map((h, i) => `${305 + i * 25},${273 - h}`)
            .join(' ')}
          fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"
        />

        {/* Circuit decorations */}
        <path d="M 50 310 L 95 310 L 95 265 L 120 265" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="120" cy="265" r="3" fill="#3b82f6" opacity="0.5" />
        <path d="M 520 45 L 560 45 L 560 85" stroke="#ec4899" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="560" cy="85" r="3" fill="#ec4899" opacity="0.5" />
      </svg>

      {/* Featured badge */}
      {project.featured && (
        <span className="absolute end-3 top-3 z-10 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
          Featured
        </span>
      )}
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const { t } = useLanguage();

  return (
    <GradientCard as="article" className="h-full" aria-label={t(project.titleEn, project.titleAr)}>
      <div className="flex h-full flex-col">
      {/* Thumbnail */}
      <ProjectThumb project={project} />

      {/* Body */}
      <div className="flex flex-grow flex-col gap-4 p-6">
        <h3 className="text-xl font-bold text-slate-900 leading-snug dark:text-white">
          {t(project.titleEn, project.titleAr)}
        </h3>

        {(project.descEn || project.descAr) && (
          <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {t(project.descEn, project.descAr)}
          </p>
        )}

        {/* Tech tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label={t('Technologies', 'التقنيات')}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-blue-500/10 px-3 py-0.5 text-xs font-medium text-blue-700 dark:border-blue-500/20 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-auto flex gap-3 pt-1">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('GitHub', 'جيت هاب')} — ${t(project.titleEn, project.titleAr)}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 py-2.5 text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            {t('GitHub', 'جيت هاب')} ↗
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('Live Demo', 'عرض حي')} — ${t(project.titleEn, project.titleAr)}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-blue-500/35 bg-blue-500/10 py-2.5 text-xs font-semibold text-blue-300 transition-all hover:bg-blue-500/20 active:scale-95"
          >
            <span aria-hidden="true">▶</span>
            {t('Live Demo', 'عرض حي')} ↗
          </a>
        </div>
      </div>
      </div>
    </GradientCard>
  );
}

// ── Filter button ─────────────────────────────────────────────────────────────
function FilterBtn({ filter, active, onClick }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={[
        'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
        active
          ? 'bg-gradient-to-r from-blue-500 to-rose-500 text-white shadow-glow-blue'
          : 'border border-blue-500/20 bg-blue-500/8 text-slate-400 hover:border-blue-500/40 hover:text-white',
      ].join(' ')}
    >
      {t(filter.labelEn, filter.labelAr)}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sanityProjects, setSanityProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchError, setHasFetchError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    client
      .fetch(projectQuery)
      .then((data) => {
        if (!isMounted) return;
        setSanityProjects(data.map(mapSanityProject));
        setHasFetchError(false);
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error('Failed to fetch Sanity projects:', error);
        setHasFetchError(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedProjects = useMemo(
    () => (sanityProjects.length > 0 ? sanityProjects : projects),
    [sanityProjects]
  );

  const filtered =
    activeFilter === 'all'
      ? displayedProjects
      : displayedProjects.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper>
      {/* Orbs */}
      <div className="orb -start-40 top-0 h-[500px] w-[500px] bg-blue-600/15" />
      <div className="orb -end-20 bottom-20 h-[400px] w-[400px] bg-rose-600/8" />

      <div className="relative">
        <PageHeading
          badge={t('My Work', 'أعمالي')}
          title={t('Recent Projects', 'المشاريع الأخيرة')}
          subtitle={t(
            "Here are some of the real-world projects I've built using modern web & mobile technologies.",
            'إليك بعض المشاريع الواقعية التي بنيتها باستخدام تقنيات الويب والموبايل الحديثة.'
          )}
        />

        {/* Filter tabs */}
        <div
          className="mb-10 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label={t('Project filters', 'تصفية المشاريع')}
        >
          {projectFilters.map((f) => (
            <FilterBtn
              key={f.id}
              filter={f}
              active={activeFilter === f.id}
              onClick={() => setActiveFilter(f.id)}
            />
          ))}
        </div>

        {isLoading && (
          <p className="mb-8 text-center text-sm text-slate-400">
            {t('Loading projects from Sanity...', 'جاري تحميل المشاريع من Sanity...')}
          </p>
        )}

        {hasFetchError && (
          <p className="mb-8 text-center text-sm text-amber-300">
            {t('Unable to load CMS projects. Showing local projects instead.', 'تعذر تحميل مشاريع CMS. يتم عرض المشاريع المحلية بدلاً من ذلك.')}
          </p>
        )}

        {/* Projects grid — auto-fit adapts to any viewport */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
          role="list"
        >
          {filtered.map((project) => (
            <div
              key={project.id}
              role="listitem"
              className="h-full transition-all duration-300"
            >
              <ProjectCard project={project} />
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-slate-500 py-16">
              {t('No projects in this category yet.', 'لا توجد مشاريع في هذه الفئة بعد.')}
            </p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
