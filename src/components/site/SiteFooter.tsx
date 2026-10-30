import Link from 'next/link';
import { getClassName } from '@behivetech/get-class-name';
import { SiteFooter as BhtSiteFooter } from '@behivetech/organisms.site-footer';

import { NAV_LINKS } from '@/content/nav';
import { profile } from '@/content/profile';
import { site } from '@/content/site';
import { registry } from '@/content/work';
import { MailIcon } from './Icons';
import Logo from './Logo';
import ProtectedEmail from './ProtectedEmail';

import styles from './SiteFooter.module.scss';

const GROUPS = [
    {
        title: 'Site',
        links: [...NAV_LINKS, { href: '/resume', label: 'Resume' }],
    },
    {
        title: 'Elsewhere',
        links: [
            { href: registry.links.site, label: 'Component registry' },
            { href: profile.links.github, label: 'GitHub' },
            { href: profile.links.linkedin, label: 'LinkedIn' },
        ],
    },
];

/** The shared site footer from the registry, fed this site's links and brand. */
export default function SiteFooter() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'site-footer',
        styles,
    });

    return (
        <BhtSiteFooter
            className={rootClassName}
            linkComponent={Link}
            groups={GROUPS}
            brand={
                <div className={getChildClass('brand')}>
                    <Logo height={28} className={getChildClass('logo')} />
                    <p>{site.tagline}</p>
                    <p>
                        {site.locality}, {site.region}
                    </p>
                </div>
            }
            legal={
                <div className={getChildClass('legal')}>
                    <span>
                        © {new Date().getFullYear()} {site.company}
                    </span>
                    <Link href="/farkle" className={getChildClass('farkle')}>
                        Farkle scorer
                    </Link>
                </div>
            }
        >
            <ProtectedEmail className={getChildClass('email')} icon={<MailIcon size={18} />} label="Email me" />
        </BhtSiteFooter>
    );
}
