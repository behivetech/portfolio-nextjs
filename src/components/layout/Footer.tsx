import React from 'react';

import getClassName from 'tools/getClassName';

import styles from './Footer.module.scss';

type FooterParams = {
    className?: string,
};

/**
    Main footer component for the site.
*/
export default function Footer({ className }: FooterParams) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'footer',
        styles,
    });

    return (
        <footer className={rootClassName}>
            © {new Date().getFullYear()}, BEhiveTech.com{' '}
        </footer>
    );
}
