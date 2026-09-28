import Link from 'next/link';
import { getClassName } from '@behivetech/get-class-name';

import { profile } from '@/content/profile';
import { GithubIcon, LinkedInIcon, MailIcon } from './Icons';
import ProtectedEmail from './ProtectedEmail';

import styles from './SiteFooter.module.scss';

export default function SiteFooter() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'site-footer',
        styles,
    });

    return (
        <footer className={rootClassName}>
            <div className={getChildClass('inner')}>
                <p>
                    © {new Date().getFullYear()} {profile.name} · BEhive Tech LLC
                </p>
                <div className={getChildClass('links')}>
                    <ProtectedEmail aria-label="Email" icon={<MailIcon />} label="" />
                    <a href={profile.links.linkedin} aria-label="LinkedIn" rel="me noopener" target="_blank">
                        <LinkedInIcon />
                    </a>
                    <a href={profile.links.github} aria-label="GitHub" rel="me noopener" target="_blank">
                        <GithubIcon />
                    </a>
                    <Link href="/farkle" className={getChildClass('farkle')}>
                        Farkle scorer
                    </Link>
                </div>
            </div>
        </footer>
    );
}
