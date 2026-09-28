# behivetech.com

Personal site and resume for Bruce Ultra. Next.js 16 (App Router), React 19,
SCSS modules, and `@behivetech/*` components from
[bht-galaxy](https://github.com/behivetech/bht-galaxy) themed with the
Material Design 3 tokens in `@behivetech/cms.base-styles`.

## Editing content

All copy (summary, experience, skills, education) lives in
[`src/content/profile.ts`](src/content/profile.ts). The home page, `/resume`,
SEO metadata, JSON-LD, and share image all read from it.

The email address is intentionally **not** in `profile.ts`; it lives in
[`src/components/site/ProtectedEmail.tsx`](src/components/site/ProtectedEmail.tsx)
and is only assembled in the browser to keep it out of scraped HTML.

## Development

```bash
npm install     # needs a GitHub token with read:packages for @behivetech (see below)
npm run dev
npm run build
```

`@behivetech/*` packages come from GitHub Packages (`.npmrc`). Locally your
`~/.npmrc` needs `//npm.pkg.github.com/:_authToken=<token>`. On Vercel, add an
`NPM_RC` environment variable containing both lines:

```
@behivetech:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<token with read:packages>
```

## Routes

- `/` home, `/resume` printable resume (Print / Save as PDF)
- `/opengraph-image`, `/twitter-image` generated 1200×630 share cards
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`
- `/farkle` Farkle scorer (Pages Router + MUI; left as-is)
