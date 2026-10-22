import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '../../data/index.js';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import ThemeToggle from './ThemeToggle.jsx';

const linkBase =
  'rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500';
const linkIdle = 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white';
const linkActive = 'text-accent-700 dark:text-accent-300';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(navLinks.map((link) => link.id));

  // Close the mobile menu with Escape or when the screen grows to desktop size.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const media = window.matchMedia('(min-width: 768px)');
    const onResize = () => media.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    media.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      media.removeEventListener('change', onResize);
    };
  }, [open]);

  const linkClass = (id) => `${linkBase} ${activeId === id ? linkActive : linkIdle}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a
          href="#top"
          className="font-mono text-base font-semibold text-slate-900 dark:text-white"
          onClick={() => setOpen(false)}
        >
          {profile.name.split(' ')[0]}
          <span className="text-gradient">.</span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={linkClass(id)}
                  aria-current={activeId === id ? 'true' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="border-t border-slate-200 px-4 py-3 dark:border-slate-800 md:hidden"
        >
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block ${linkClass(id)}`}
                aria-current={activeId === id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
