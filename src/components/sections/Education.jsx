import { m } from 'framer-motion';
import { education } from '../../data/index.js';
import Section from '../ui/Section.jsx';

const ease = [0.22, 1, 0.36, 1];

// Entries appear one after another, in step with the timeline line drawing down.
const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.45, delayChildren: 0.2 } },
};
const entry = {
  hidden: { opacity: 0, x: -32, filter: 'blur(6px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
};
// the timeline dot pops in just before its entry finishes sliding in
const dot = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: 'spring', stiffness: 400, damping: 15, delay: 0.15 } },
};

export default function Education() {
  return (
    <Section id="education" eyebrow="05 · Education" title="Education" staggered>
      <div className="relative pl-8">
        {/* timeline line draws itself downward on scroll */}
        <m.span
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-0.5 origin-top rounded-full"
          style={{ background: 'linear-gradient(180deg, var(--g1), var(--g2), var(--g3))' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{ duration: 1.4, ease }}
        />
        <m.ol
          className="space-y-10"
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          {education.map(({ degree, note, institution, period, result }) => (
            <m.li key={degree} variants={entry} className="relative">
              <m.span
                aria-hidden="true"
                variants={dot}
                className="absolute -left-[2.45rem] top-1 h-4 w-4 rounded-full border-4 border-white bg-brand shadow-[0_0_12px_rgb(217_70_239/0.6)] dark:border-slate-950"
              />
              <p className="font-mono text-sm text-accent-700 dark:text-accent-300">{period}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                {degree}
              </h3>
              {note && <p className="text-sm text-slate-500 dark:text-slate-400">{note}</p>}
              <p className="mt-1">{institution}</p>
              <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{result}</p>
            </m.li>
          ))}
        </m.ol>
      </div>
    </Section>
  );
}
