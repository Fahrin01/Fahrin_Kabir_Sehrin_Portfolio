import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer.js';

const spring = { stiffness: 220, damping: 20 };

// 3D tilt toward the mouse with a soft light glare. Mouse users only; static otherwise.
export default function Tilt({ max = 8, className = '', children }) {
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();
  const enabled = finePointer && !reduceMotion;

  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(0, spring);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.22), transparent 45%)`;

  if (!enabled) return <div className={className}>{children}</div>;

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * max * 2);
    rotateY.set((px - 0.5) * max * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  return (
    <m.div
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: glare, opacity: glareOpacity }}
      />
    </m.div>
  );
}
