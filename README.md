# behivetech.com

Consulting site for BEhive Tech LLC (Bruce Ultra). Next.js 16 (App Router),
React 19, SCSS modules, and `@behivetech/*` components from the
[Behive Tech component registry](https://platform.behivetech.com/behivetech) themed with the
Material Design 3 tokens in `@behivetech/cms.base-styles`. Light and dark
themes follow the OS, with a toggle in the header.

## Editing content

- [`src/content/site.ts`](src/content/site.ts): everything on the marketing
  pages (tagline, services, approach, about, Calendly events). Search for
  `TODO(bruce)` for items still waiting on input.
- [`src/content/profile.ts`](src/content/profile.ts): the resume, used by
  `/resume`, the About page proof points, and the JSON-LD.
- [`src/content/work.ts`](src/content/work.ts): the two projects under `/work`
  (the component registry and the AI agent team), including the links to the
  live registry at platform.behivetech.com.
- [`src/content/nav.ts`](src/content/nav.ts): header and footer navigation.

The email address is intentionally **not** in either content file; it lives in
[`src/components/site/ProtectedEmail.tsx`](src/components/site/ProtectedEmail.tsx)
and is only assembled in the browser to keep it out of scraped HTML.

## Routes

- `/` home, `/services`, `/approach`, `/about`, `/contact` (embedded Calendly)
- `/work`, `/work/component-registry`, `/work/agent-team` the two projects
- `/resume` printable resume (Print / Save as PDF)
- `/opengraph-image`, `/twitter-image` generated 1200×630 share cards
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`
- `/farkle` Farkle scorer (Pages Router + MUI; left as-is)

## Development

```bash
npm install
npm run dev
npm run build
npm run lint && npm run typecheck
```

`@behivetech/*` packages are published to the public npm registry, so no
registry configuration or token is needed locally or on Vercel. They are the
components of the [Behive Tech registry](https://platform.behivetech.com/behivetech);
the site header, footer, hero, cards, buttons, badges and stats all come from
it, with the site's own styling layered on through `className`.

Analytics: `@vercel/analytics` and `@vercel/speed-insights` are wired in the
root layout and only report when deployed on Vercel. Calendly bookings are
tracked as a `booking` event.
