import * as React from 'react';

// tools
import getClassName from 'tools/getClassName';

// layout
import Footer from './Footer';
import Header from './header';
import Main from './Main';
import SEO, { SEOParams } from '../app/SEO';

// Import order is important here to insure styles are overridden by the following scss file.
import styles from './Layout.module.scss';

export type LayoutParams = {
    children: React.ReactNode,
    className?: string,
    /** Props for the Main component which is the div that wraps the main content. */
    mainProps?: { [propName: string]: any },
} & SEOParams;

/**
    Main layout component for the site. Passes on if the header should be fixed
    and if the main container for the site should be full width or a smaller fixed
    width.
*/

export default function Layout({ description, children, className, mainProps, title }: LayoutParams) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'layout',
        styles,
    });

    return (
        <section className={rootClassName}>
            <SEO description={description} title={title} />
            <Header className={getChildClass('header')} />
            <Main className={getChildClass('main')} {...mainProps}>
                {children}
            </Main>
            <Footer className={getChildClass('footer')} />
        </section>
    );
}

