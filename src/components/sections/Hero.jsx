import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { profile } from '../../data/index.js';
import Button from '../ui/Button.jsx';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons.jsx';

const socials = [
  { href: profile.socials.github, label: 'GitHub', icon: GithubIcon },
  { href: profile.socials.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
];

const ease = [0.22, 1, 0.36, 1];
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
// Heading lines slide up from behind a mask.
const lineUp = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.8, ease } },
};

function RotatingRole() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <m.p
      variants={fadeUp}
      className="mt-4 text-xl font-medium text-slate-600 dark:text-slate-300 sm:text-2xl"
    >
      {/* screen readers get the stable title instead of the rotating words */}
      <span className="sr-only">{profile.title}</span>
      <span aria-hidden="true">
        CSE Student ·{' '}
        <span className="inline-flex overflow-hidden align-bottom">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={profile.roles[index]}
              className="inline-block font-semibold text-accent-700 dark:text-accent-300"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              {profile.roles[index]}
            </m.span>
          </AnimatePresence>
        </span>
      </span>
    </m.p>
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <m.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:flex-row-reverse lg:items-center lg:justify-between lg:pt-32"
      >
        {/* photo with a spinning gradient halo, gently floating */}
        <m.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } },
          }}
          className="shrink-0"
        >
          <div className="relative motion-safe:animate-float">
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-full opacity-80 blur-md motion-safe:animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, var(--g1), var(--g2), var(--g3), var(--g1))',
              }}
            />
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width="640"
              height="640"
              className="relative h-32 w-32 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 sm:h-40 sm:w-40 lg:h-72 lg:w-72"
            />
          </div>
        </m.div>

        <div>
          {/* <m.p
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-1.5 font-mono text-sm text-accent-700 dark:text-accent-300"
          >
            <MapPin size={16} aria-hidden="true" />
            {profile.location}
          </m.p> */}

          <h1
            id="hero-title"
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl"
          >
            <span className="block overflow-hidden pb-1">
              <m.span variants={lineUp} className="block">
                Hi, I’m
              </m.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <m.span variants={lineUp} className="text-gradient block">
                {profile.name}.
              </m.span>
            </span>
          </h1>

          <RotatingRole />

          <m.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed">
            {profile.pitch}
          </m.p>

          <m.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#projects" icon={ArrowDown}>
              View Projects
            </Button>
            <Button href={profile.cvUrl} variant="secondary" icon={Download} download>
              Download CV
            </Button>
            <ul className="ml-1 flex items-center gap-1">
              {socials.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex rounded-full p-2.5 text-slate-500 transition hover:-translate-y-0.5 hover:bg-white/70 hover:text-fuchsia-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-fuchsia-300"
                  >
                    <Icon size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
