import type { MetadataRoute } from 'next';

import { profile } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${profile.name} | BEhive Tech`,
        short_name: 'BEhive Tech',
        description: profile.heroStatement,
        start_url: '/',
        display: 'browser',
        background_color: '#131313',
        theme_color: '#131313',
        icons: [
            { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
    };
}
