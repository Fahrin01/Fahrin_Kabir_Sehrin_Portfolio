import { useEffect, useState } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer.js';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary';

// Glass orb that trails the mouse, stretches along the direction of travel,
// and turns fuchsia/cyan over links and buttons. Styles live in index.css (.cursor-orb).
// Only rendered for mouse users who haven't asked for reduced motion.
export default function GlassCursor() {
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();
  const enabled = finePointer && !reduceMotion;
  return enabled ? <Orb /> : null;
}

function Orb() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Exact pointer position (drives the small dot) …
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // … and a softer, trailing copy for the orb.
  const springX = useSpring(x, { stiffness: 450, damping: 32, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 450, damping: 32, mass: 0.6 });

  // Squash & stretch: stretch along the movement direction, relax when the mouse stops.
  const rotate = useMotionValue(0);
  const counterRotate = useTransform(rotate, (r) => -r);
  const stretchTarget = useMotionValue(0);
  const stretch = useSpring(stretchTarget, { stiffness: 300, damping: 20 });
  const scaleX = useTransform(stretch, (s) => 1 + s);
  const scaleY = useTransform(stretch, (s) => 1 - s * 0.45);

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor');

    const last = { x: 0, y: 0, started: false, settle: 0 };

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      if (last.started) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const speed = Math.hypot(dx, dy);
        if (speed > 1) rotate.set((Math.atan2(dy, dx) * 180) / Math.PI);
        stretchTarget.set(Math.min(speed / 60, 0.45));
        clearTimeout(last.settle);
        last.settle = setTimeout(() => stretchTarget.set(0), 60);
      }
      last.x = e.clientX;
      last.y = e.clientY;
      last.started = true;
    };

    const onOver = (e) => setHovering(Boolean(e.target.closest?.(INTERACTIVE)));
    const onLeaveWindow = (e) => {
      if (!e.relatedTarget) setVisible(false);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onLeaveWindow, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      clearTimeout(last.settle);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onLeaveWindow);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [x, y, rotate, stretchTarget]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* trailing glass orb */}
      <m.div
        className="absolute left-0 top-0"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      >
        {/* rotate → stretch → rotate back: stretches along the travel direction
            while the glass highlight stays fixed in the upper-left */}
        <m.div style={{ rotate }}>
          <m.div style={{ scaleX, scaleY }}>
            <m.div style={{ rotate: counterRotate }}>
              <div className="cursor-orb" data-hover={hovering} data-pressed={pressed} />
            </m.div>
          </m.div>
        </m.div>
      </m.div>
      {/* precise center dot */}
      <m.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-brand transition-opacity"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hovering ? 0 : 1,
        }}
      />
    </div>
  );
}
