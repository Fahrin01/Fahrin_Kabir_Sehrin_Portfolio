import { GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { profile } from '../../data/index.js';
import Section from '../ui/Section.jsx';
import Card from '../ui/Card.jsx';

const facts = [
  { icon: MapPin, label: 'Based in', value: profile.location },
  { icon: GraduationCap, label: 'Studying', value: `BSc CSE · ${profile.university}` },
  { icon: Sparkles, label: 'Looking for', value: 'Internship in AI or software engineering' },
];

export default function About() {
  return (
    <Section id="about" eyebrow="01 · About" title="About me">
      <div className="grid gap-10 lg:grid-cols-5">
        <p className="text-lg leading-relaxed lg:col-span-3">{profile.summary}</p>
        <Card as="ul" className="space-y-5 lg:col-span-2">
          {facts.map(({ icon: Icon, label, value }) => (
            <li key={label} className="flex gap-3">
              <Icon
                size={20}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-400"
              />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <p className="font-medium text-slate-900 dark:text-white">{value}</p>
              </div>
            </li>
          ))}
        </Card>
      </div>
    </Section>
  );
}
