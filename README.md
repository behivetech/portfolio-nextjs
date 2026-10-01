# behivetech.com

Consulting site for BEhive Tech LLC (Bruce Ultra). Next.js 16 (App Router),
React 19, SCSS modules, and `@behivetech/*` components from
[bht-galaxy](https://github.com/behivetech/bht-galaxy) themed with the
Material Design 3 tokens in `@behivetech/cms.base-styles`. Light and dark
themes follow the OS, with a toggle in the header.

## Editing content

- [`src/content/site.ts`](src/content/site.ts): everything on the marketing
  pages (tagline, services, approach, about, Calendly events). Search for
  `TODO(bruce)` for items still waiting on input.
- [`src/content/profile.ts`](src/content/profile.ts): the resume, used by
  `/resume`, the About page proof points, and the JSON-LD.
- [`src/content/nav.ts`](src/content/nav.ts): header and footer navigation.

The email address is intentionally **not** in either content file; it lives in
[`src/components/site/ProtectedEmail.tsx`](src/components/site/ProtectedEmail.tsx)
and is only assembled in the browser to keep it out of scraped HTML.

## Routes

- `/` home, `/services`, `/approach`, `/about`, `/contact` (embedded Calendly)
- `/resume` printable resume (Print / Save as PDF)
- `/opengraph-image`, `/twitter-image` generated 1200×630 share cards
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`
- `/farkle` Farkle scorer (Pages Router + MUI; left as-is)

## Development

```bash
npm install     # needs a GitHub token with read:packages for @behivetech (see below)
npm run dev
npm run build
npm run lint && npm run typecheck
```

`@behivetech/*` packages come from GitHub Packages (`.npmrc`). Locally your
`~/.npmrc` needs `//npm.pkg.github.com/:_authToken=<token>`. On Vercel, add a
`GH_PACKAGES_TOKEN` environment variable (all environments) whose value is just a
GitHub personal access token (classic) with the `read:packages` scope. The
`installCommand` in `vercel.json` appends the auth line to `.npmrc` before
`npm install` runs, so no multi-line variable is needed.

Analytics: `@vercel/analytics` and `@vercel/speed-insights` are wired in the
root layout and only report when deployed on Vercel. Calendly bookings are
tracked as a `booking` event.
