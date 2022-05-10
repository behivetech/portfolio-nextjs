import React from 'react';

import getClassName from 'tools/getClassName';
import getLinks from './getLinks';

import NavLink from './NavLink';

/**
    Main navigation for the site in the header.
*/

type HeaderNavParams = {
    className?: string,
};

export default function HeaderNav({ className }: HeaderNavParams) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'header-nav',
    });

    return (
        <nav className={rootClassName}>
            {getLinks().map((link) => (
                <NavLink key={`link_${link.children}`} {...link} />
            ))}
        </nav>
    );
}
