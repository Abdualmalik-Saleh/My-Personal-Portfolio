/**
 * SectionWrapper — Atomic Component
 * Enforces consistent vertical padding and max-width centering
 * for every page section.
 *
 * Props:
 *   id        — section id (used by in-page / ScrollSpy)
 *   className — extra classes for the <section>
 *   children
 */
export default function SectionWrapper({ id, className = '', children }) {
  return (
    <section
      id={id}
      className={['relative overflow-hidden py-24', className].filter(Boolean).join(' ')}
    >
      <div className="container mx-auto max-w-6xl px-6">
        {children}
      </div>
    </section>
  );
}
