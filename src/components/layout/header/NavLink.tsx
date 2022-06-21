import React from 'react';

import getClassName from 'tools/getClassName';

import Link from 'components/core/Link';

import styles from './NavLink.module.scss';

type NavLinkParams = {
    children: string,
    className?: string,
    /** Next prop to point to a page */
    href: string,
    /** Switches between a menu type of link and a normal link */
    menu?: boolean,
    /** Callback funciton that is run when the component is selected */
    onSelect?: (selectedVal: string) => void,
};

NavLink.defaultProps = {
    onSelect: () => null,
};

export default function NavLink({
    children,
    className,
    onSelect = () => null,
    href,
    menu = false,
}: NavLinkParams) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'nav-link',
        styles
    });
    const linkProps = {
        className: rootClassName,
        href
    };

    return (
        <Link {...linkProps} href={href}>
            {children}
        </Link>
    );
}
