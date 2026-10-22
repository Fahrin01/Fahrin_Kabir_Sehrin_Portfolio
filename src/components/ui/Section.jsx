import { m } from 'framer-motion';
import Reveal from './Reveal.jsx';

// Page section with an anchor id, consistent spacing and an optional heading.
// The heading fades in on scroll and its gradient underline draws itself.
// The body fades in too, unless `staggered` is set because the section animates its own items.
export default function Section({
  id,
  title,
  eyebrow,
  staggered = false,
  className = '',
  children,
}) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={`scroll-mt-20 py-16 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {title && (
          <Reveal as="header" className="mb-10">
            {eyebrow && (
              <p className="mb-2 font-mono text-sm text-accent-600 dark:text-accent-400">
                {eyebrow}
              </p>
            )}
            <h2
              id={`${id}-title`}
              className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
            >
              {title}
            </h2>
            <m.span
              aria-hidden="true"
              className="mt-4 block h-1 w-20 origin-left animate-gradient rounded-full bg-brand"
              style={{ backgroundSize: '300% 100%' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </Reveal>
        )}
        {staggered ? children : <Reveal delay={0.1}>{children}</Reveal>}
      </div>
    </section>
  );
}
