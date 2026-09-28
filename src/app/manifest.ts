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
        icons: [{ src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }],
    };
}
