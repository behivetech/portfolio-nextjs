import React from 'react';

import getClassName from 'tools/getClassName';

import styles from './CenteredContent.module.scss';

type CenteredContentParams = {
    className: string,
    componentRef?: React.RefObject<HTMLElement>,
    children: React.ReactNode,
} & React.AllHTMLAttributes<HTMLSelectElement>;

/**
    Just a styled component that centers content within the page.
*/
export default function CenteredContent({children, className, componentRef, ...restProps}: CenteredContentParams) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'centered-content',
        styles,
    });

    return (
        <section {...restProps} className={rootClassName} ref={componentRef}>
            {children}
        </section>
    );
}
