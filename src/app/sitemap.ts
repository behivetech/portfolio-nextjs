import type { MetadataRoute } from 'next';

import { profile } from '@/content/profile';

const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/services', priority: 0.9 },
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
