import { Award } from 'lucide-react';
import { certifications } from '../../data/index.js';
import Section from '../ui/Section.jsx';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import { StaggerGroup, StaggerItem } from '../ui/Stagger.jsx';

export default function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="04 · Certifications"
      title="Certifications"
      staggered
      className="bg-slate-50/50 dark:bg-slate-900/30"
    >
      <StaggerGroup as="ul" className="grid gap-5 md:grid-cols-2">
        {certifications.map(
          ({ title, issuer, credentialId, credentialLabel = 'Credential ID', highlight }) => (
            <StaggerItem as="li" key={title} className={highlight ? 'md:col-span-2' : undefined}>
              <Card
                highlight={highlight}
                className="flex h-full gap-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <Award
                  size={24}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-400"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
                    {highlight && <Badge variant="accent">Agentic AI</Badge>}
                  </div>
                  <p className="mt-1 text-sm">{issuer}</p>
                  {credentialId && (
                    <p className="mt-2 break-all font-mono text-xs text-slate-500 dark:text-slate-400">
                      {credentialLabel}: {credentialId}
                    </p>
                  )}
                </div>
              </Card>
            </StaggerItem>
          ),
        )}
      </StaggerGroup>
    </Section>
  );
}
