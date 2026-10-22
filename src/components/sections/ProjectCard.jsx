import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import { GithubIcon } from '../ui/BrandIcons.jsx';

// Shown until a screenshot exists in public/projects/ (or if it fails to load).
export function ImagePlaceholder({ title }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-900"
    >
      <div
        className="absolute inset-0 animate-gradient bg-brand opacity-25 dark:opacity-30"
        style={{ backgroundSize: '300% 100%' }}
      />
      <span className="relative px-6 text-center font-mono text-lg font-semibold text-slate-700/80 dark:text-white/80">
        {title}
      </span>
    </div>
  );
}

const linkClass =
  'inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500 dark:text-accent-300';

// Code / live demo links; renders nothing when the project has neither.
export function ProjectLinks({ github, demo }) {
  if (!github && !demo) return null;
  return (
    <div className="mt-5 flex gap-5 border-t border-slate-200 pt-4 dark:border-slate-800">
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <GithubIcon size={16} /> Code
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <ArrowUpRight size={16} aria-hidden="true" /> Live demo
        </a>
      )}
    </div>
  );
}

export default function ProjectCard({ project }) {
  const { title, tagline, tech, highlights, image, github, demo, featured } = project;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Card
      as="article"
      highlight={featured}
      className="group flex h-full flex-col overflow-hidden !p-0"
    >
      <div className="aspect-[2/1] overflow-hidden border-b border-slate-200/80 bg-slate-100 transition-transform duration-500 group-hover:scale-[1.03] dark:border-slate-800/80 dark:bg-slate-900">
        {image && !imageFailed ? (
          <img
            src={image}
            alt={`Screenshot of ${title}`}
            width="1280"
            height="800"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-contain"
          />
        ) : (
          <ImagePlaceholder title={title} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
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
    </Card>
  );
}
