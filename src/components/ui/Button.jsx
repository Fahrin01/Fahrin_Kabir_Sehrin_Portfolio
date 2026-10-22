import { m } from 'framer-motion';
import { useMagnetic } from '../../hooks/useMagnetic.js';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[box-shadow,color,border-color,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500';

const variants = {
  primary: 'btn-gradient',
  secondary:
    'border border-slate-300 bg-white/60 text-slate-800 backdrop-blur hover:border-fuchsia-500 hover:text-fuchsia-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-fuchsia-400 dark:hover:text-fuchsia-300',
};

// Renders a link when `href` is given, otherwise a button. Gently follows the mouse (magnetic).
export default function Button({
  href,
  variant = 'primary',
  icon: Icon,
  className = '',
  children,
  ...props
}) {
  const magnetic = useMagnetic();
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {Icon && <Icon size={18} aria-hidden="true" />}
      {children}
    </>
  );

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <m.a
        href={href}
        className={classes}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...magnetic}
        {...props}
      >
        {content}
      </m.a>
    );
  }

  return (
    <m.button type="button" className={classes} {...magnetic} {...props}>
      {content}
    </m.button>
  );
}
