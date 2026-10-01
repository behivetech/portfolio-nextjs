import { type ReactNode } from 'react';
import { getClassName } from '@behivetech/get-class-name';
import { HeroBanner, type HeroBannerCta } from '@behivetech/organisms.hero-banner';

import styles from './PageHero.module.scss';

type PageHeroProps = {
    eyebrow?: string;
    headline: string;
    subtext?: string;
    ctas?: HeroBannerCta[];
    /** Larger treatment for the home page */
    size?: 'default' | 'large';
    children?: ReactNode;
};

export default function PageHero({ eyebrow, headline, subtext, ctas, size = 'default', children }: PageHeroProps) {
    const [rootClassName, getChildClass] = getClassName({
        rootClass: 'page-hero',
        modifiers: { large: size === 'large' },
        styles,
    });

    return (
        <HeroBanner align="left" className={rootClassName} headline={headline} subtext={subtext} ctaButtons={ctas}>
            {eyebrow && <p className={getChildClass('eyebrow')}>{eyebrow}</p>}
            {children}
        </HeroBanner>
    );
}
