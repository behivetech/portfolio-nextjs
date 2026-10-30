import type { MetadataRoute } from 'next';

import { profile } from '@/content/profile';

const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/services', priority: 0.9 },
    { path: '/work', priority: 0.8 },
    { path: '/work/component-registry', priority: 0.7 },
    { path: '/work/agent-team', priority: 0.7 },
    { path: '/approach', priority: 0.8 },
    { path: '/about', priority: 0.8 },
    { path: '/contact', priority: 0.9 },
    { path: '/resume', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return routes.map(({ path, priority }) => ({
        url: `${profile.siteUrl}${path}`,
        lastModified,
        changeFrequency: 'monthly',
        priority,
    }));
}
