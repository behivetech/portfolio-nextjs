import React, { useState } from 'react';

import getClassName from 'tools/getClassName';

import styles from './SimpleMenu.module.scss';

type SimpleMenuParams = {
    children: React.ReactNode,
    className?: string,
    handle: React.ReactNode,
    open?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function SimpleMenu({children, className, handle, open = false}: SimpleMenuParams) {
    const [openState, setOpenState] = useState(open)
    const [rootClassName, getChildClass] = getClassName({
        className,
        modifiers: {
            open
        },
        rootClass: 'simple-menu',
        styles,
    });

    return (
        <div className={rootClassName}>
            {handle}
            <ul className={getChildClass('popup')}>
                {children}
            </ul>
        </div>
    );
}
