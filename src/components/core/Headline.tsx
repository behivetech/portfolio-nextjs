import React from 'react';

import getClassName from 'tools/getClassName';

import styles from './Headline.module.scss';

type HeadlineParams = {
    children: React.ReactNode
    className?: string,
    /** Level of the h tag such as h1, h2, h3 from 1-6 which will be default size prop if not set */
    level?: 1 | 2 | 3 | 4 | 5 | 6
    /** Desired css size from 1-6 which overides the level prop */
    size?: 1 | 2 | 3 | 4 | 5 | 6
};

export default function Headline({ children, className, level = 2, size }: HeadlineParams) {
    const Component: Reeact.ReactNode = `h${level}`;
    const [rootClassName] = getClassName({
        className,
        modifiers: { [`h${size || level}`]: true },
        rootClass: 'headline',
        styles,
    });

    return <Component className={rootClassName}>{children}</Component>;
}
