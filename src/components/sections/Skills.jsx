import { skills, softSkills } from '../../data/index.js';
import Section from '../ui/Section.jsx';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import { StaggerGroup, StaggerItem } from '../ui/Stagger.jsx';

// Card with a light running round its border and a soft halo, like the profile photo.
// The halo brightens on hover.
function SkillCard({ title, items }) {
  return (
    <div className="group relative h-full transition-transform duration-300 hover:-translate-y-1">
      <div
        aria-hidden="true"
        className="glow-halo absolute -inset-0.5 rounded-2xl opacity-35 transition-opacity duration-300 group-hover:opacity-70"
      />
      <Card glow className="relative h-full">
        <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">{title}</h3>
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 · Skills"
      title="Skills & tools"
      staggered
      className="bg-slate-50/50 dark:bg-slate-900/30"
    >
      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ category, items }) => (
          <StaggerItem key={category}>
            <SkillCard title={category} items={items} />
          </StaggerItem>
        ))}
        {/* full row so it doesn't sit alone after the six categories */}
        <StaggerItem className="sm:col-span-2 lg:col-span-3">
          <SkillCard title="Soft Skills" items={softSkills} />
        </StaggerItem>
      </StaggerGroup>
    </Section>
  );
}
