import { useReducedMotion, useSpring } from 'framer-motion';
import { useFinePointer } from './useFinePointer.js';

const spring = { stiffness: 250, damping: 15, mass: 0.4 };

// Pulls an element slightly toward the mouse while hovered.
// Returns motion values and handlers to spread onto an `m.*` element.
export function useMagnetic(strength = 0.25) {
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  if (!finePointer || reduceMotion) return {};

  return {
    style: { x, y },
    onPointerMove: (e) => {
      if (e.pointerType !== 'mouse') return;
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    },
    onPointerLeave: () => {
      x.set(0);
      y.set(0);
    },
  };
}
