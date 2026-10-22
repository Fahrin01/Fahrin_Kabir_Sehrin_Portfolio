import { Users } from 'lucide-react';
import { experience } from '../../data/index.js';
import Section from '../ui/Section.jsx';
import Card from '../ui/Card.jsx';

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="06 · Experience"
      title="Leadership & volunteering"
      className="bg-slate-50/50 dark:bg-slate-900/30"
    >
      <div className="space-y-5">
        {experience.map(({ role, organization, period, points }) => (
          <Card key={`${role}-${organization}`} as="article" className="flex gap-4">
            <Users
              size={24}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-400"
            />
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {role} · {organization}
                </h3>
                <p className="font-mono text-sm text-accent-700 dark:text-accent-300">{period}</p>
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed marker:text-accent-500">
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
