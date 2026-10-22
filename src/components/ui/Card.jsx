// Translucent surface that lets the background gradient glow through.
// `highlight` swaps the border for a moving gradient border (featured items).
// `glow` swaps it for a rotating conic border; pair it with a .glow-halo behind the card.
export default function Card({
  as: Tag = 'div',
  highlight = false,
  glow = false,
  className = '',
  children,
}) {
  const surface = glow
    ? 'glow-border'
    : highlight
      ? 'gradient-border shadow-lg shadow-fuchsia-500/10'
      : 'border border-slate-200/80 bg-white/75 dark:border-slate-800/80 dark:bg-slate-900/60';

  return (
    <Tag
      className={`rounded-2xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-accent-500/10 ${surface} ${className}`}
    >
      {children}
    </Tag>
  );
}
