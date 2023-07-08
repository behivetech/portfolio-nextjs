import * as React from 'react';

import getClassName from '@tools/getClassName';

import LinkNextJs, {LinkProps} from 'next/link';

import styles from  './Link.module.scss';

export type LinkParams = {
    children: React.ReactNode,
    className?: string,
    target?: string
} & LinkProps;

export default function Link({ children, className, ...restProps}: LinkParams) {
    const [rootClassName] = getClassName({ className, rootClass: 'link', styles});

    return (
        <LinkNextJs className={className} {...restProps}>{children}</LinkNextJs>
    );
}

