import Link from 'next/link';
import { getClassName } from '@behivetech/get-class-name';

import Logo from './Logo';
import SiteNav from './SiteNav';

import styles from './SiteHeader.module.scss';

export default function SiteHeader() {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'site-header',
        styles,
    });

    return (
        <header className={rootClassName}>
            <div className={getChildClass('inner')}>
                <Link href="/" className={getChildClass('logo')} aria-label="BEhive Tech home">
                    <Logo height={32} />
                </Link>
                <SiteNav />
            </div>
        </header>
    );
}
