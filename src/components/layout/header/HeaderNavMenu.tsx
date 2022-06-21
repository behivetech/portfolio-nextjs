import React, { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';

// tools
import getClassName from 'tools/getClassName';

// core
import Icon from 'components/core/Icon';
import getLinks from './getLinks';

import NavLink from './NavLink';

type HeaderNavMenuParams = {
    className?: string,
    selected?: boolean
}

export default function HeaderNavMenu({ className, selected = false }: HeaderNavMenuParams) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const [selectedVal, setSelectedVal] = useState('');
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'header-nav-menu',
    });

    function handleSelect(newSelectedVal: string) {
        setSelectedVal(newSelectedVal);
    }

    function handleIconClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <nav className={rootClassName}>
            <IconButton
                id="basic-button"
                aria-controls={menuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={handleIconClick}
                size="small"
            >
                <Icon
                    className={getChildClass('icon')}
                    tabIndex={0}
                    aria-label="nav menu"
                    title="site navigation"
                    sx={{ color: 'white', minHeight: '24px' }}
                >menu-rounded</Icon>
            </IconButton>
            <Menu
                className={getChildClass('menu')}
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}            >
                {getLinks().map((link) => (
                    <MenuItem
                        key={link.children}
                        selected={[link.href].includes(selectedVal)}
                    >
                        <NavLink {...link} onSelect={handleSelect} menu />
                    </MenuItem>
                ))}
            </Menu>
        </nav >
    );
}
