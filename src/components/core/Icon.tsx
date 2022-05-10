import React from 'react';

import getClassName from 'tools/getClassName';
import styles from './Icon.module.scss';

type IconParams = {
    className?: string,
    /** The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. */
    icon: string,
    /** Adds class to use the MDC theme on-primary text color */
    onPrimary?: boolean,
    /** Adds class to use the MDC theme on-secondary text color */
    onSecondary?: boolean,
};

export default function Icon({
    className,
    icon = 'menu',
    onPrimary = false,
    onSecondary = false,
    ...props
}: IconParams) {
    const [rootClassName] = getClassName({
        className,
        modifiers: {
            'on-primary': onPrimary,
            'on-secondary': onSecondary,
        },
        rootClass: 'icon',
        styles,
    });

    return <span className={`${rootClassName} material-icons`}>{icon}</span>;
}
