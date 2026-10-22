# Portfolio Plan & Architecture: Fahrin Kabir Sehrin

All content comes from [`fahrin_kabir_sehrin_cv.md`](./fahrin_kabir_sehrin_cv.md).

**Decisions**
- **Stack:** React + Vite + Tailwind CSS
- **Hosting:** Vercel
- **Public personal data:** email only, plus a "Download CV" button. The phone number, street address, and referee contact details are **not** shown on the web page. The downloadable CV PDF does include them; Sehrin chose to keep it that way.
- **Content source:** the site follows the PDF CV (`public/Fahrin_Kabir_Sehrin_CV.pdf`), which leaves out C/C++ and the HRM minor that appear in the Markdown CV.

---

## 1. Goals & Audience
- **Audience:** internship recruiters (AI and software roles), faculty, and club peers.
- **Goals:** show the projects, show the AI interest and certifications, and make it easy to send an email or download the CV.
- **Success criteria:**
  - Lighthouse score of at least 90 in Performance, Accessibility, Best Practices, and SEO
  - Mobile-first and fully responsive (360px to 1440px+)
  - Loads in under 2s on a typical connection
  - WCAG AA accessible

## 2. Tech Stack
| Concern | Choice |
|---|---|
| Framework | React 18 + Vite (JavaScript; can move to TypeScript later) |
| Styling | Tailwind CSS v3, `darkMode: 'class'` |
| Animation | Framer Motion (subtle scroll-reveal, optional) |
| Icons | lucide-react |
| Contact | `mailto:` link (Formspree form optional later) |
| Hosting | Vercel (GitHub repo, preview deploy for every PR) |
| Quality | ESLint + Prettier |

There is no backend. The site is fully static.

## 3. Information Architecture
A single page with a sticky navbar of anchor links and smooth scrolling.

| # | Section | Content (from CV) |
|---|---|---|
| 1 | **Hero** | Name, title "CSE Student · Aspiring AI Engineer", one-line pitch, CTAs: *View Projects*, *Download CV*; GitHub and LinkedIn icons |
| 2 | **About** | Profile paragraph; Dhaka, Bangladesh (city only); IUB, 2022–2026 |
| 3 | **Skills** | Grouped chips: Languages, Front-End, Back-End & DB, Mobile, Networking, Tools; soft skills as a short line |
| 4 | **Projects** | Card grid of all 6 projects: screenshot, title, tagline, tech badges, 2 highlights. GitHub/demo links are optional and added later. Their buttons only appear once a URL is set. **Featured:** AreaFix BD, CourseMate BD |
| 5 | **Certifications** | 5 cards with issuer and credential ID; Oracle *Agentic AI* highlighted |
| 6 | **Education** | Timeline: BSc CSE (CGPA 3.14), HSC (GPA 5.00), SSC (GPA 5.00) |
| 7 | **Experience** | General Member, Jukti (CSE club at IUB), Sep 2024 – Present |
| 8 | **Contact** | Email `kabirfahrin8@gmail.com`, LinkedIn, GitHub, Download CV; "References available on request" |
| 9 | **Footer** | © year · "Built with React + Tailwind" |

## 4. Architecture

### Folder structure
```
Sehrin_portfolio_main/
├─ docs/                       # CV source + this plan
├─ public/
│  ├─ projects/                # project screenshots (see projects/README.md)
│  ├─ Fahrin_Kabir_Sehrin_CV.pdf
│  ├─ favicon.svg
│  ├─ og-image.png
│  └─ robots.txt
├─ src/
│  ├─ data/                    # single source of truth (derived from the CV)
│  │  ├─ profile.js            # name, title, email, socials, summary, cvUrl
│  │  ├─ skills.js
│  │  ├─ projects.js
│  │  ├─ certifications.js
│  │  ├─ education.js
│  │  └─ experience.js
│  ├─ components/
│  │  ├─ layout/               # Navbar.jsx, Footer.jsx, ThemeToggle.jsx
│  │  ├─ ui/                   # Section.jsx, Card.jsx, Badge.jsx, Button.jsx
│  │  └─ sections/             # Hero, About, Skills, Projects, Certifications,
│  │                           # Education, Experience, Contact (.jsx)
│  ├─ hooks/                   # useTheme.js, useActiveSection.js
│  ├─ App.jsx                  # composes sections in order
│  ├─ main.jsx
│  └─ index.css                # Tailwind directives + base tokens
├─ index.html                  # title, meta, OG tags, JSON-LD
├─ tailwind.config.js
├─ vite.config.js
└─ package.json
```

### Core principle: content and presentation are separate
All text lives in `src/data/`. Components only render it. Updating the portfolio (a new project, certificate, or link) means editing a data file, not the JSX.

```
src/data/*.js  ──►  components/sections/*  ──►  App.jsx  ──►  Vite build  ──►  Vercel
                        ▲
                components/ui/* (Card, Badge, Button, Section)
```

### Data shapes
```js
// profile.js
{ name, title, summary, location: "Dhaka, Bangladesh", email,
  socials: { github, linkedin }, cvUrl: "/Fahrin_Kabir_Sehrin_CV.pdf" }

// projects.js
{ id, title, tagline, tech: [], highlights: [], github?, demo?, image?, featured: bool }

// certifications.js
{ title, issuer, credentialId?, highlight?: bool }

// education.js
{ degree, institution, period, result }

// experience.js
{ role, organization, period, points: [] }

// skills.js
[{ category, items: [] }]
```

### Components
- **Section:** a wrapper with `id`, heading, and consistent spacing (used for anchor nav).
- **Navbar:** sticky, highlights the active section (`useActiveSection` via IntersectionObserver), hamburger menu on mobile.
- **ThemeToggle / useTheme:** light/dark mode. Defaults to the system setting and stores the choice in `localStorage`.
- **Card / Badge / Button:** reusable UI primitives.

## 5. Design System
- **Style:** clean, minimal developer portfolio with plenty of whitespace.
- **Color:** neutral grays plus a moving **violet → fuchsia → cyan** brand gradient. The stops are CSS variables (`--g1`, `--g2`, `--g3`) at the top of `src/index.css`, with deeper stops in light mode for contrast. Change them there to re-theme the site. The gradient is used on the name, section underlines, primary buttons, featured-card borders, the scroll bar and the drifting background blobs (`AuroraBackground.jsx`).
- **Custom cursor:** a glass orb (`GlassCursor.jsx`, styles `.cursor-orb` in `index.css`) that trails the mouse and stretches with speed. Over links and buttons it grows into a clear lens with a fuchsia/cyan rim. It is only active for mouse users who have not asked for reduced motion; touch devices keep the normal cursor.
- **Advanced motion:** hero headline reveal and rotating role, spinning photo halo, scroll progress bar, staggered card entrances (`Stagger.jsx`), 3D tilt and glare on project cards (`Tilt.jsx`), magnetic buttons (`useMagnetic.js`), self-drawing education timeline.
- **Typography:** Inter for body text and headings, JetBrains Mono for small tech accents (Google Fonts).
- **Layout:** `max-w-6xl` centered container, 16px side gutter on mobile; responsive project grid of 1, 2, then 3 columns.
- **Motion:** all of the above respects `prefers-reduced-motion`. CSS animations are cut to a single frame, and the cursor, tilt and magnetic effects are switched off.
- **Accessibility:** semantic landmarks (`header`, `main`, `section`, `footer`), visible focus rings, alt text, AA contrast in both themes.

## 6. SEO & Metadata
- `<title>`, meta description, canonical URL
- Open Graph and Twitter card tags with `og-image.png`
- JSON-LD `Person` schema (name, email, `sameAs`: LinkedIn, GitHub)
- `robots.txt` and `sitemap.xml`, generated at build time
- **Implementation:** the address lives only in `site.config.js`. A small plugin in `vite.config.js` fills `%SITE_URL%` / `%JSON_LD%` in `index.html` and emits `robots.txt` + `sitemap.xml`. The share image is `public/og-image.png` (1200×630) and the iOS home-screen icon is `public/apple-touch-icon.png`.

## 7. Implementation Phases
1. **Setup:** `npm create vite@latest` (React), install Tailwind, ESLint/Prettier, lucide-react, framer-motion; `git init` and push to GitHub.
2. **Data layer:** move all CV content into `src/data/*.js`, leaving out the phone number, address, and referee details.
3. **Layout & UI primitives:** Navbar, Footer, ThemeToggle, Section, Card, Badge, Button.
4. **Sections:** Hero, About, Skills, Projects, Certifications, Education, Experience, Contact.
5. **Polish:** animations, responsive QA (360px to 1440px), dark mode, accessibility pass.
6. **Assets:** CV PDF in `public/`, favicon, OG image, project screenshots.
7. **Deploy** (step-by-step: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)): import the repo into Vercel (Vite preset, build `npm run build`, output `dist`), and add a custom domain if wanted. Then set the real address in **`site.config.js`** (`SITE_URL`). It feeds the canonical URL, share-preview tags, JSON-LD, `robots.txt` and `sitemap.xml`. Commit and push to redeploy.
8. **Post-launch:** add project GitHub/demo links; optionally a blog or Formspree contact form.

## 8. Open Items (content needed)
- [x] PDF version of the CV
- [ ] Project screenshots in `public/projects/`. See [ADDING_PROJECT_IMAGES.md](./ADDING_PROJECT_IMAGES.md)
- [ ] GitHub repo and live demo URLs for each project (later; cards work without them)
- [ ] Professional photo (optional)
- [ ] Preferred accent color and custom domain (if any)

## 9. Verification Checklist
- [ ] `npm run dev` renders all sections with correct CV content
- [ ] No phone number, street address, or referee contact appears in the site
- [ ] Download CV button serves the PDF
- [ ] Navbar links scroll to the right sections; mobile menu works
- [ ] Light/dark mode works and is remembered
- [ ] `npm run build` succeeds
- [ ] Lighthouse score of at least 90 in all categories on the Vercel preview
