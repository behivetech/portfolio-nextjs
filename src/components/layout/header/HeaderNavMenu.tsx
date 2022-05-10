import React, {useState} from 'react';

// tools
import getClassName from 'tools/getClassName';

// core
import {MenuItem, SimpleMenu} from 'components/core/menu';
import IconButton from 'components/core/IconButton';
import getLinks from './getLinks';

import NavLink from './NavLink';

type HeaderNavMenuParams = {
    className?: string,
    selected?: boolean
}
export default function HeaderNavMenu({ className, selected = false }: HeaderNavMenuParams) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'header-nav-menu',
    });
    const [selectedVal, setSelectedVal] = useState('');

    function handleSelect(newSelectedVal: string) {
        setSelectedVal(newSelectedVal);
    }

    return (
        <nav className={rootClassName}>
            <SimpleMenu
                className={getChildClass('menu')}
                handle={(
                    <IconButton
                        className={getChildClass('icon')}
                        tabIndex={0}
                        icon="menu"
                        aria-label="nav menu"
                        title="site navigation"
                        onPrimary
                    />
                )}
                style={{minWidth: '12.5rem'}}
            >
                {getLinks().map((link) => (
                    <MenuItem
                        key={link.children}
                        selected={[link.href].includes(selectedVal)}
                    >
                        <NavLink {...link} onSelect={handleSelect} menu />
                    </MenuItem>
                ))}
            </SimpleMenu>
        </nav>
    );
}
