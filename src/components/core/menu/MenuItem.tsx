import React, { useState } from 'react';

import getClassName from 'tools/getClassName';

import styles from './MenuItem.module.scss';

export type MenuItemParams = {
    children: React.ReactNode,
    className?: string,
    selected?: boolean
} & React.HTMLAttributes<HTMLUListElement>

export default function MenuItem({ children, className, selected = false }: MenuItemParams) {
    const [rootClassName] = getClassName({
        className,
        modifiers: {
            selected
        },
        rootClass: 'menu-item',
        styles,
    });

    return (
        <li className={rootClassName}>
            {children}
        </li>
    );
}
