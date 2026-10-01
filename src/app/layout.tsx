import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { profile } from '@/content/profile';
import { site } from '@/content/site';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import { THEME_STORAGE_KEY } from '@/components/site/themeKey';

import '@behivetech/cms.base-styles/tokens.scss';
import '@behivetech/atoms.badge/styles.css';
import '@behivetech/atoms.button/styles.css';
import '@behivetech/atoms.card/styles.css';
import '@behivetech/atoms.stat/styles.css';
import '@behivetech/organisms.hero-banner/styles.css';
import '@behivetech/templates.page/styles.css';

import './globals.scss';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const title = `${site.shortName} | ${site.tagline}`;

export const metadata: Metadata = {
    metadataBase: new URL(profile.siteUrl),
    title: {
        default: title,
        template: `%s | ${site.shortName}`,
    },
    description: site.description,
    applicationName: site.shortName,
    authors: [{ name: profile.name, url: `${profile.siteUrl}/about` }],
    creator: profile.name,
    publisher: site.company,
    keywords: [
        site.company,
        'Full-stack architecture consulting',
        'Node.js consultant',
        'Postgres',
        'Prisma',
        'AI-native engineering',
        'Agentic development workflow',
        'Claude Code',
        'GitHub Copilot',
        'Micro frontends',
        'Design systems',
        'React consultant',
        'Next.js consultant',
        'TypeScript',
        'Electron',
        'Software architect',
        'Principal engineer',
        'Denver',
        profile.name,
    ],
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        url: '/',
        siteName: site.shortName,
        title,
        description: site.description,
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description: site.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
            { url: '/icon.svg', type: 'image/svg+xml' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    category: 'technology',
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f9f9f9' },
        { media: '(prefers-color-scheme: dark)', color: '#131313' },
    ],
    colorScheme: 'light dark',
};

// Applies a saved theme before first paint so there is no flash. The galaxy
// tokens follow the OS when no data-theme is set.
const themeScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body>
                <Script id="theme-init" strategy="beforeInteractive">
                    {themeScript}
                </Script>
                <a className="skip-link" href="#main">
                    Skip to content
                </a>
                <SiteHeader />
                <main id="main">{children}</main>
                <SiteFooter />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
