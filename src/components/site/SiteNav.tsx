'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@behivetech/atoms.button';
import { getClassName } from '@behivetech/get-class-name';

import { NAV_LINKS } from '@/content/nav';
import { site } from '@/content/site';
import { CloseIcon, MenuIcon } from './Icons';
import ThemeToggle from './ThemeToggle';

import styles from './SiteNav.module.scss';

/** Primary navigation: inline links on wider screens, a toggled panel on phones. */
export default function SiteNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const panelId = useId();
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'site-nav',
        modifiers: { open },
        styles,
    });

    // Close the panel on Escape; link clicks close it directly.
    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <div className={rootClassName}>
            <nav id={panelId} aria-label="Primary" className={getChildClass('panel')}>
                {NAV_LINKS.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={getChildClass('link')}
                        aria-current={pathname === href ? 'page' : undefined}
                        onClick={() => setOpen(false)}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
            <ThemeToggle className={getChildClass('theme')} />
            <Button asChild size="sm" className={getChildClass('cta')}>
                <Link href="/contact">{site.cta.primary}</Link>
            </Button>
            <button
                type="button"
                className={getChildClass('menu-button')}
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((value) => !value)}
            >
                {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
        </div>
    );
}
