import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { projects } from '../../data/index.js';
import Section from '../ui/Section.jsx';
import Badge from '../ui/Badge.jsx';
import Tilt from '../ui/Tilt.jsx';
import { StaggerGroup, StaggerItem } from '../ui/Stagger.jsx';
import ProjectCard, { ImagePlaceholder, ProjectLinks } from './ProjectCard.jsx';

// Featured projects first, otherwise keep the CV order.
const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

const pad = (n) => String(n).padStart(2, '0');

// Scroll progress through the pinned area -> open panel. The first slice keeps every bar
// collapsed on the right, then each project opens in turn.
const indexAt = (progress) =>
  Math.min(ordered.length - 1, Math.floor(progress * (ordered.length + 1)) - 1);

function ProjectBar({ index, project, open, onOpen }) {
  const { title, tagline, tech, highlights, image, github, demo, featured } = project;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = image && !imageFailed;

  return (
    <article
      tabIndex={0}
      aria-expanded={open}
      aria-label={title}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      style={{ flexGrow: open ? 1 : 0 }}
      className={`relative h-full shrink-0 basis-[4.5rem] cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-[flex-grow,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500 motion-reduce:transition-none ${
        open
          ? 'gradient-border shadow-xl shadow-fuchsia-500/10'
          : 'border border-slate-200/80 bg-white/75 hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900/60'
      }`}
    >
      {/* collapsed: a slim bar with a thumbnail and the title running down it */}
      <div
        aria-hidden={open}
        className={`absolute inset-y-0 left-0 flex w-[4.5rem] flex-col items-center gap-4 py-5 transition-opacity duration-300 ${
          open ? 'pointer-events-none opacity-0' : 'opacity-100 delay-200'
        }`}
      >
        <span className="font-mono text-xs text-accent-600 dark:text-accent-400">
          {pad(index + 1)}
        </span>
        <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent-500/40">
          {showImage ? (
            <img
              src={image}
              alt=""
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="block h-full w-full bg-brand" />
          )}
        </span>
        <span className="min-h-0 flex-1 rotate-180 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-slate-700 [writing-mode:vertical-rl] dark:text-slate-200">
          {title}
        </span>
      </div>

      {/* expanded: full details. Fixed width so the text doesn't reflow while the panel grows. */}
      <div
        aria-hidden={!open}
        className={`absolute inset-y-0 left-0 flex w-[34rem] flex-col p-6 transition-all duration-500 xl:w-[42rem] ${
          open ? 'translate-x-0 opacity-100 delay-300' : 'pointer-events-none -translate-x-6 opacity-0'
        }`}
      >
        <div className="mb-5 h-44 shrink-0 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 dark:border-slate-800/80 dark:bg-slate-900 xl:h-52">
          {showImage ? (
            <img
              src={image}
              alt={`Screenshot of ${title}`}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-contain"
            />
          ) : (
            <ImagePlaceholder title={title} />
          )}
        </div>

        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h3>
          {featured && <Badge variant="accent">Featured</Badge>}
        </div>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{tagline}</p>

        <ul className="mb-5 list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-accent-500">
          {highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technologies">
          {tech.map((item) => (
            <li key={item}>
              <Badge variant="accent">{item}</Badge>
            </li>
          ))}
        </ul>

        <ProjectLinks github={github} demo={demo} />
      </div>
    </article>
  );
}

// Desktop: the bars pin in view while the section scrolls past, opening one by one.
// Hovering a bar opens it straight away.
function ProjectBars() {
  const ref = useRef(null);
  const lastScrollIndex = useRef(-1);
  const [active, setActive] = useState(-1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    // only react when scrolling crosses into another project, so a hover isn't overridden
    const next = indexAt(progress);
    if (next !== lastScrollIndex.current) {
      lastScrollIndex.current = next;
      setActive(next);
    }
  });

  return (
    <div ref={ref} style={{ height: `calc(34rem + ${ordered.length * 40}vh)` }}>
      <div className="sticky top-[calc(50vh-17rem)] flex h-[34rem] justify-end gap-3">
        {ordered.map((project, i) => (
          <ProjectBar
            key={project.id}
            index={i}
            project={project}
            open={i === active}
            onOpen={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="03 · Projects" title="Things I’ve built" staggered>
      <div className="hidden lg:block">
        <ProjectBars />
      </div>

      {/* small screens keep the card grid; slim bars don't fit */}
      <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:hidden">
        {ordered.map((project) => (
          <StaggerItem key={project.id}>
            <Tilt className="h-full">
              <ProjectCard project={project} />
            </Tilt>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
