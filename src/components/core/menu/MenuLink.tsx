import React, { useState } from 'react';

import Link, {LinkParams} from 'components/core/Link';
import MenuItem, {MenuItemParams} from './MenuItem';
import getClassName from 'tools/getClassName';

type MenuLinkParams = LinkParams & MenuItemParams;

export default function MenuLink({ children, className, href }: MenuLinkParams) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'menu-link',
    });

    return (
        <MenuItem className={rootClassName}>
            <Link href={href}>{children}</Link>
        </MenuItem>
    );
}
