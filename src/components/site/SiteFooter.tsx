import Link from 'next/link';
import { getClassName } from '@behivetech/get-class-name';

import { profile } from '@/content/profile';
import { site } from '@/content/site';
import { GithubIcon, LinkedInIcon, MailIcon } from './Icons';
import Logo from './Logo';
import ProtectedEmail from './ProtectedEmail';
import { NAV_LINKS } from '@/content/nav';

import styles from './SiteFooter.module.scss';

export default function SiteFooter() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'site-footer',
        styles,
    });

    return (
        <footer className={rootClassName}>
            <div className={getChildClass('inner')}>
                <div className={getChildClass('brand')}>
                    <Logo height={28} className={getChildClass('logo')} />
                    <p>{site.tagline}</p>
                    <p>
                        {site.locality}, {site.region}
                    </p>
                </div>
                <nav aria-label="Footer" className={getChildClass('nav')}>
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link key={href} href={href}>
                            {label}
                        </Link>
                    ))}
                    <Link href="/resume">Resume</Link>
                </nav>
                <div className={getChildClass('links')}>
                    <ProtectedEmail aria-label="Email" icon={<MailIcon />} label="" />
                    <a href={profile.links.linkedin} aria-label="LinkedIn" rel="me noopener" target="_blank">
                        <LinkedInIcon />
                    </a>
                    <a href={profile.links.github} aria-label="GitHub" rel="me noopener" target="_blank">
                        <GithubIcon />
                    </a>
                </div>
            </div>
            <div className={getChildClass('legal')}>
                <p>
                    © {new Date().getFullYear()} {site.company}
                </p>
                <Link href="/farkle" className={getChildClass('farkle')}>
                    Farkle scorer
                </Link>
            </div>
        </footer>
    );
}
