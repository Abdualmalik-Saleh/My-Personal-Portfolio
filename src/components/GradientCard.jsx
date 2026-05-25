/**
 * GradientCard — Atomic Component
 *
 * Wraps children in a card that has:
 *   • A 1 px gradient border (blue → violet → rose)
 *   • A dark inner background
 *   • Optional hover lift + glow
 *
 * Props:
 *   children   — card content
 *   className  — extra Tailwind classes applied to the outer wrapper
 *   noHover    — disables the hover lift effect
 *   as         — HTML element or component (default: "div")
 */
export default function GradientCard({ children, className = '', noHover = false, as: Tag = 'div' }) {
  return (
    <Tag
      className={[
        // Layout & background
        'relative rounded-2xl p-px',
        // Gradient border via background
        'bg-gradient-to-br from-blue-500 via-violet-500 to-rose-500',
        // Shadow / glow
        'shadow-md dark:shadow-none',
        // Hover animation (unless noHover)
        !noHover && 'transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg dark:hover:shadow-glow-card-hover',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Inner surface */}
      <div className="relative rounded-[calc(1rem-1px)] bg-white dark:bg-[#0f1a30] h-full w-full overflow-hidden">
        {children}
      </div>
    </Tag>
  );
}
