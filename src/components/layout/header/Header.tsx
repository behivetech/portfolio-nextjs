import React from 'react';

// tools
import getClassName from 'tools/getClassName';

// core
import Link from 'components/core/Link';
import Button from 'components/core/Button';

// layout
import HeaderNav from './HeaderNav';
import HeaderNavMenu from './HeaderNavMenu';
import GithubIcon from './GithubIcon';
import LinkedInIcon from './LinkedInIcon';
import Logo from './Logo';

import styles from './Header.module.scss';

type HeaderParams = {
    className?: string
    /** Indicates whether the header should be fixed or not */
    fixed?: boolean
};

/**
    This component renders the main header and the nav within it.
*/

export default function Header({ className, fixed = false }: HeaderParams) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        modifiers: { fixed },
        rootClass: 'header',
        styles,
    });

    // Have to set an inline style on the logo. SVGs don't really work with classNames
    return (
        <header className={rootClassName}>
            <Link href="/" className={getChildClass('logo')}>
                <Logo />
            </Link>
            <HeaderNav className={getChildClass('nav')} />
            <div className={getChildClass('right')}>
                <Button
                    aria-label="linkedin"
                    className={getChildClass('svg-link')}
                    href="https://www.linkedin.com/in/bruce-smith-67bb05b/"
                ><LinkedInIcon />
                </Button>
                <Button
                    aria-label="github"
                    className={getChildClass('svg-link')}
                    href="https://github.com/bruqui/"
                >
                    <GithubIcon />
                </Button>
                <HeaderNavMenu className={getChildClass('nav-menu')} />
            </div>
        </header>
    );
}

