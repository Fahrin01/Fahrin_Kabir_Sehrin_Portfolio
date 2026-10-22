import { Download, Mail } from 'lucide-react';
import { profile } from '../../data/index.js';
import Section from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons.jsx';

export default function Contact() {
  return (
    <Section id="contact" eyebrow="07 · Contact" title="Let’s work together">
      <div className="max-w-2xl">
        <p className="text-lg leading-relaxed">
          I’m looking for internship opportunities in AI and software engineering. If you have a
          role, a project or just a question, my inbox is open.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-6 inline-block break-all font-mono text-lg font-medium text-accent-700 hover:underline dark:text-accent-300 sm:text-xl"
        >
          {profile.email}
        </a>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`mailto:${profile.email}`} icon={Mail}>
            Send an email
          </Button>
          <Button href={profile.cvUrl} variant="secondary" icon={Download} download>
            Download CV
          </Button>
          <Button href={profile.socials.linkedin} variant="secondary" icon={LinkedinIcon}>
            LinkedIn
          </Button>
          <Button href={profile.socials.github} variant="secondary" icon={GithubIcon}>
            GitHub
          </Button>
        </div>

        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">{profile.referencesNote}</p>
      </div>
    </Section>
  );
}
