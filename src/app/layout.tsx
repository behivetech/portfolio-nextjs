import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { profile } from '@/content/profile';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import '@behivetech/cms.base-styles/tokens.scss';
import '@behivetech/atoms.badge/styles.css';
import '@behivetech/atoms.button/styles.css';
import '@behivetech/atoms.card/styles.css';
import '@behivetech/atoms.stat/styles.css';
import '@behivetech/organisms.hero-banner/styles.css';
import '@behivetech/templates.page/styles.css';

import './globals.scss';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const title = `${profile.name} | ${profile.title}`;
const description = `${profile.title} with 20+ years designing modular, scalable platforms: micro frontends, design systems, and AI-native engineering workflows with Claude Code and agentic pipelines. ${profile.location}.`;

export const metadata: Metadata = {
    metadataBase: new URL(profile.siteUrl),
    title: {
        default: title,
        template: `%s | ${profile.name}`,
    },
    description,
    applicationName: 'BEhive Tech',
    authors: [{ name: profile.name, url: profile.siteUrl }],
    creator: profile.name,
    publisher: 'BEhive Tech LLC',
    keywords: [
        profile.name,
        'Software Architect',
        'Principal Engineer',
        'Staff Engineer',
        'Frontend Architect',
        'AI-native engineering',
        'Agentic coding',
        'Claude Code',
        'Micro frontends',
        'Design systems',
        'React',
        'TypeScript',
        'Next.js',
        'Denver',
        'BEhive Tech',
    ],
    alternates: { canonical: '/' },
    openGraph: {
        type: 'profile',
        firstName: 'Bruce',
        lastName: 'Ultra',
        url: '/',
        siteName: 'BEhive Tech',
        title,
        description,
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    icons: {
        icon: [{ url: '/favicon.ico' }, { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }],
    },
    category: 'technology',
};

export const viewport: Viewport = {
    themeColor: '#131313',
    colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            data-theme="dark"
            className={inter.variable}
        >
            <body>
                <a className="skip-link" href="#main">
                    Skip to content
                </a>
                <SiteHeader />
                <main id="main">{children}</main>
                <SiteFooter />
            </body>
        </html>
    );
}
