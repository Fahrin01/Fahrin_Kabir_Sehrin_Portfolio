// Slowly drifting gradient blobs behind the whole page. Pure CSS animation
// (soft radial gradients, no filter: blur) to keep it cheap to render.
const blobs = [
  { color: 'var(--g1)', className: '-left-[15%] -top-[10%] h-[60vmax] w-[60vmax]', delay: '0s' },
  { color: 'var(--g2)', className: '-right-[20%] top-[20%] h-[55vmax] w-[55vmax]', delay: '-8s' },
  {
    color: 'var(--g3)',
    className: '-bottom-[25%] left-[20%] h-[50vmax] w-[50vmax]',
    delay: '-16s',
  },
];

export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {blobs.map(({ color, className, delay }) => (
        <div
          key={color}
          className={`absolute rounded-full opacity-[0.18] motion-safe:animate-blob dark:opacity-[0.22] ${className}`}
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, transparent 65%)`,
            animationDelay: delay,
          }}
        />
      ))}
    </div>
  );
}
