import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        root: __dirname,
    },
    sassOptions: {
        loadPaths: [path.join(__dirname, 'src/styles')],
        // Farkle's legacy stylesheets still use @import and lighten(); silence until they're migrated.
        silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
    },
};

export default nextConfig;
