import Link from 'next/link';
import { Button } from '@behivetech/atoms.button';
import { getClassName } from '@behivetech/get-class-name';

import styles from './SiteHeader.module.scss';

const NAV_LINKS = [
    { href: '/#about', label: 'About' },
    { href: '/#expertise', label: 'Expertise' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#contact', label: 'Contact' },
];

export default function SiteHeader() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'site-header',
        styles,
    });

    return (
        <header className={rootClassName}>
            <div className={getChildClass('inner')}>
                <Link href="/" className={getChildClass('logo')} aria-label="BEhive Tech home">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/behivetech.svg" alt="BEhive Tech" width={174} height={26} />
                </Link>
                <nav aria-label="Primary" className={getChildClass('nav')}>
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link key={href} href={href} className={getChildClass('link')}>
                            {label}
                        </Link>
                    ))}
                </nav>
                <Button asChild size="sm">
                    <Link href="/resume">Resume</Link>
                </Button>
            </div>
        </header>
    );
}
