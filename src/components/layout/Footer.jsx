import { Mail } from 'lucide-react';
import { profile } from '../../data/index.js';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons.jsx';

const socialLinks = [
  { href: profile.socials.github, label: 'GitHub', icon: GithubIcon },
  { href: profile.socials.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
  { href: `mailto:${profile.email}`, label: 'Email', icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <ul className="flex items-center gap-2">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                className="inline-flex rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-accent-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-accent-300"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
