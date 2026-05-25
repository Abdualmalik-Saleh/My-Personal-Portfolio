/**
 * PageHeading — Atomic Component
 * Renders the consistent section badge + title + optional subtitle
 * that appears at the top of every page section.
 *
 * Props:
 *   badge     — short uppercase label above the title
 *   title     — main heading text
 *   subtitle  — smaller description text (optional)
 */
export default function PageHeading({ badge, title, subtitle }) {
  return (
    <div className="mb-16 flex flex-col items-center text-center gap-3">
      {/* Badge */}
      {badge && (
        <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
          {badge}
        </span>
      )}

      {/* Title */}
      <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
