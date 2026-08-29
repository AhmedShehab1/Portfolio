# my-portfolio

Portfolio + technical blog, built with Astro. Dark/light mode, type-safe
content collections, dual-theme syntax highlighting with copy buttons,
dynamic per-article OG images, and Umami analytics.

## 1. Add your own content

Everything personal lives in one file — edit this first:

```
src/data/profile.ts
```

That's your name, role, tagline, avatar, social links, and the
experience/education "log" entries shown on the homepage.

Then drop a square photo into `public/` (e.g. `public/avatar.jpg`) and
point `SITE.avatar` at it. A placeholder SVG is there for now.

## 2. Write posts

Add a `.md` or `.mdx` file to `src/content/blog/`:

```markdown
---
title: "Your Title"
description: "One sentence for previews and OG cards."
pubDate: 2026-08-29
tags: ["backend", "security"]
---

Your content here. Code blocks get syntax highlighting and a
copy button automatically.
```

The schema is enforced by Zod in `src/content.config.ts` — a missing
`title` or malformed date will fail the build with a clear error rather
than silently breaking a page.

## 3. Run it locally

```bash
npm install
npm run dev
```

## 4. Set up Umami analytics (privacy-friendly, no cookie banner)

1. Go to cloud.umami.is and create a free account.
2. Add your site's domain under **Websites** -> **Add website**.
3. Copy the **Website ID** it gives you.
4. Locally, copy `.env.example` to `.env` and paste it in:
   ```
   PUBLIC_UMAMI_WEBSITE_ID=your-id-here
   ```
5. On Netlify, add the same variable under **Site configuration** ->
   **Environment variables** (so it's set for production builds too).

The tracking script only loads when this variable is set, so there's zero
tracking code shipped until you turn it on. Once live, Umami's dashboard
shows visits, referrers (LinkedIn, WhatsApp, etc.), and a country
breakdown — no cookie banner needed since it doesn't use cookies or
collect personal data.

## 5. Deploy to Netlify

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio"
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On app.netlify.com, **Add new site** -> **Import an existing project**
   -> pick the repo.
3. Netlify auto-detects the build settings from `netlify.toml`
   (`npm run build`, publish `dist`). Add the `PUBLIC_UMAMI_WEBSITE_ID`
   env var here too before the first deploy.
4. Deploy. You'll get a `*.netlify.app` URL in under a minute.

### Connect a custom domain

**Site configuration -> Domain management -> Add a custom domain.**
Easiest path: switch your domain's nameservers to Netlify's (shown on
that screen) — it handles DNS and SSL automatically. Otherwise, set an
`ALIAS`/`ANAME` record on `@` and a `CNAME` on `www`, both pointing to
your `*.netlify.app` address.

Before deploying, also update `site: 'https://yourdomain.com'` in
`astro.config.mjs` — it's used to generate correct URLs in the sitemap,
RSS feed, and OG tags.

## What's already wired up

- **Design system** — dark "ink" mode by default with a light "paper"
  mode toggle, all tokens in `src/styles/global.css`.
- **Content Collections** with Zod schema validation (`src/content.config.ts`).
- **Shiki syntax highlighting**, dual light/dark themes, with a
  hover-to-reveal copy button on every code block
  (`src/components/CopyCodeButtons.astro`).
- **Dynamic OG images** — every post gets its own social-preview card,
  generated at build time from its title/description
  (`src/pages/og/[...slug].ts`), using a locally bundled font so the
  build never depends on an external font CDN.
- **RSS feed** at `/rss.xml`.
- **Sitemap** at `/sitemap-index.xml`.
- **Security headers** and long-term asset caching via `netlify.toml`.

## Publishing routine, day to day

```bash
# write src/content/blog/my-new-post.md
git add .
git commit -m "post: my new post"
git push
```

Netlify picks up the push, rebuilds, and the new post (with its own OG
image) is live in under a minute.
