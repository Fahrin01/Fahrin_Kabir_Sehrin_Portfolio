import { m } from 'framer-motion';

// Fades content up into place the first time it scrolls into view.
// Respects prefers-reduced-motion through <MotionConfig reducedMotion="user"> in App.
export default function Reveal({ as = 'div', delay = 0, className = '', children }) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      // Trigger as soon as the top edge is 60px into view. A percentage-based
      // amount would leave tall blocks (e.g. the project grid on phones) blank too long.
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </Tag>
  );
}
