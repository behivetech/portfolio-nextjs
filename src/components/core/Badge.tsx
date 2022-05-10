import React from 'react';

import getClassName from 'tools/getClassName';

import styles from './Badge.module.scss';

type BadgeProps = {
    className?: string
    children: React.ReactNode
}

export default function Badge({ children, className }: BadgeProps) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'badge',
        styles,
    });

    return <div className={rootClassName}>{children}</div>;
}
