'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@behivetech/atoms.button';
import { getClassName } from '@behivetech/get-class-name';
import { SiteHeader as BhtSiteHeader } from '@behivetech/organisms.site-header';

import { NAV_LINKS } from '@/content/nav';
import { site } from '@/content/site';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

import styles from './SiteHeader.module.scss';

/**
 * The shared site header from the registry, fed this site's links. It keeps
 * the menu open state, so this file is the client boundary for it. Links sit
 * inline once the header is 64rem wide and open in a drawer below that.
 */
export default function SiteHeader() {
    const pathname = usePathname() ?? '';
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'site-header',
        styles,
    });

    return (
        <BhtSiteHeader
            className={rootClassName}
            menuLabel="Menu"
            linkComponent={Link}
            brand={
                <Link href="/" className={getChildClass('logo')} aria-label="BEhive Tech home">
                    <Logo height={32} />
                </Link>
            }
            links={NAV_LINKS.map(({ href, label }) => ({
                href,
                label,
                current: pathname === href || pathname.startsWith(`${href}/`),
            }))}
            actions={
                <>
                    <ThemeToggle />
                    <Button asChild size="sm" className={getChildClass('cta')}>
                        <Link href="/contact">{site.cta.primary}</Link>
                    </Button>
                </>
            }
        />
    );
}
