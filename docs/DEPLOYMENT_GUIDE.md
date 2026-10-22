# Deployment Guide: GitHub + Vercel

This guide takes the portfolio from your computer to a live website. You only do the full setup once. After that, every `git push` updates the site automatically.

**Time needed:** about 15–20 minutes the first time.

---

## Before you start

You need:
- A **GitHub** account: <https://github.com/signup>
- A **Vercel** account. Sign up at <https://vercel.com/signup> using **"Continue with GitHub"**, which connects the two for you.

Then check that the site builds on your computer. Open a terminal in the project folder (`F:\Sehrin_study\Sehrin_portfolio_main`) and run:

```bash
npm run build
```

It should end with `✓ built in …`. If it shows an error, fix that first, because Vercel runs this same command.

Optional: run `npm run preview` and open <http://localhost:4173> to see the exact version that will go live.

---

## Step 1: Create a GitHub repository

1. Go to <https://github.com/new>.
2. **Repository name:** e.g. `portfolio` or `fahrin-portfolio`.
3. **Public or Private:** either works with Vercel.
   - Public: anyone can see the code. Recruiters sometimes like this.
   - Private: only you can see the code. The live website is still public either way.
   - Note: the repository includes your CV PDF (with phone, address and referee details). If the repo is public, so is that file. It is also public through the website's Download CV button.
4. **Do NOT** tick "Add a README", ".gitignore" or "license". The project already has its files, and adding them here causes a conflict when you push.
5. Click **Create repository**.

GitHub now shows a page with setup commands. Copy the repository URL. It looks like:
`https://github.com/Fahrin01/portfolio.git`

---

## Step 2: Push the project to GitHub

In the terminal, inside the project folder:

```bash
# check there are no unsaved changes (should say "nothing to commit")
git status

# link your local project to the GitHub repository (use YOUR URL)
git remote add origin https://github.com/Fahrin01/portfolio.git

# upload everything
git push -u origin main
```

The first push may open a browser window asking you to sign in to GitHub. Approve it.

Refresh the repository page on GitHub. You should see the folders `docs`, `public` and `src`, plus files like `package.json`.

> If `git status` lists changed files, save them first:
> `git add -A` then `git commit -m "Describe the change"`, then push.

---

## Step 3: Deploy on Vercel

1. Go to <https://vercel.com/new>.
2. Under **Import Git Repository**, find your portfolio repo and click **Import**.
   - Don't see it? Click **Adjust GitHub App Permissions** and give Vercel access to that repository.
3. Check the settings. Vercel detects them automatically, so you shouldn't need to change anything:

   | Setting | Value |
   |---|---|
   | Framework Preset | **Vite** |
   | Root Directory | `./` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

4. **Project Name:** this becomes your web address, `<project-name>.vercel.app`.
   Use `fahrin-kabir-sehrin` to match the placeholder already in the site, or choose another name and update it in Step 4.
5. Click **Deploy** and wait about a minute.

When it finishes, Vercel shows **Congratulations** and your live address, for example `https://fahrin-kabir-sehrin.vercel.app`. Open it. 🎉

---

## Step 4: Set the real web address

The share previews (LinkedIn/WhatsApp), Google tags and sitemap need the site's real address. It is stored in one place.

1. Open **`site.config.js`** in the project root.
2. Change the address to your real one: no trailing slash, and keep the quotes:

   ```js
   export const SITE_URL = 'https://your-project-name.vercel.app';
   ```

3. Save, then push the change:

   ```bash
   git add site.config.js
   git commit -m "Set live site URL"
   git push
   ```

Vercel rebuilds automatically within a minute or two.

> If the Vercel address is already `https://fahrin-kabir-sehrin.vercel.app`, this file is already correct and you can skip this step.

---

## Step 5: Check the live site

Open your live address and go through this list:

- [ ] All sections show: About, Skills, Projects, Certifications, Education, Experience, Contact
- [ ] Your photo appears at the top
- [ ] **Download CV** downloads the PDF (try both buttons)
- [ ] Menu links jump to the right sections; the ☰ menu works on your phone
- [ ] Dark mode button works and is remembered after refreshing
- [ ] Email link opens your mail app
- [ ] GitHub and LinkedIn icons open the right profiles
- [ ] **Share preview:** paste your URL into <https://www.linkedin.com/post-inspector/> and check that the card with your photo and name appears
- [ ] Open it on your actual phone

**Optional speed/quality score:** in Chrome, open the site, press `F12`, go to the **Lighthouse** tab, then **Analyze page load**. The goal is 90+ in every category.

---

## Updating the site later

Every change follows the same pattern: **edit → commit → push**. Vercel redeploys automatically.

```bash
git add -A
git commit -m "Describe what you changed"
git push
```

Common updates:

| What | Where |
|---|---|
| Add project screenshots | `public/projects/`. See [ADDING_PROJECT_IMAGES.md](./ADDING_PROJECT_IMAGES.md) |
| Add project GitHub / demo links | `github:` / `demo:` in `src/data/projects.js` |
| New project | add an entry to `src/data/projects.js` |
| New certificate | `src/data/certifications.js` |
| Skills | `src/data/skills.js` |
| About text, email, social links | `src/data/profile.js` |
| New CV | replace `public/Fahrin_Kabir_Sehrin_CV.pdf` (keep the same file name) |
| New photo | replace `public/profile.jpg`, then ask for a new square crop for `public/profile-avatar.jpg` (and `public/og-image.png`) |

Tip: run `npm run dev` before pushing to check changes locally at <http://localhost:5173>.

Every push also gets its own preview link in the Vercel dashboard (**Deployments** tab). If something breaks, open an older deployment and click **⋯ → Promote to Production** to roll back instantly.

---

## Optional: custom domain

If you buy a domain (e.g. `fahrinkabir.com` from Namecheap, Porkbun or Cloudflare):

1. Vercel dashboard → your project → **Settings → Domains → Add**.
2. Enter the domain and follow Vercel's instructions to add the DNS records at your domain provider. HTTPS is set up automatically.
3. Update `SITE_URL` in `site.config.js` to the new domain (Step 4) and push.

## Optional: appear on Google sooner

1. Go to <https://search.google.com/search-console> and add your site (URL prefix → your live address).
2. Verify ownership. The **HTML tag** method is easiest: add the `<meta>` tag it gives you to `index.html` inside `<head>`, push, then click Verify.
3. Under **Sitemaps**, submit `sitemap.xml`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `git push` asks for a password and rejects it | GitHub no longer accepts account passwords. Let the browser sign-in window finish, or install **GitHub Desktop** / Git Credential Manager and try again. |
| `remote origin already exists` | Run `git remote set-url origin <your-repo-url>` instead of `git remote add`. |
| `failed to push … rejected (fetch first)` | The GitHub repo was created with a README. Run `git pull origin main --allow-unrelated-histories`, then `git push`. |
| Vercel build fails | Open the deployment's **Build Logs**. Run `npm run build` locally; if it fails there too, fix that error first. |
| Repo not listed in Vercel | Vercel → **Adjust GitHub App Permissions** → allow the repository. |
| Download CV gives 404 | The file must be exactly `public/Fahrin_Kabir_Sehrin_CV.pdf` (same capital letters). |
| LinkedIn shows an old or missing preview | Check `SITE_URL` is correct, then re-inspect the URL in Post Inspector to refresh LinkedIn's cache. |
| Changes not showing | Wait 1–2 minutes for the deploy, then hard-refresh with `Ctrl + F5`. |
