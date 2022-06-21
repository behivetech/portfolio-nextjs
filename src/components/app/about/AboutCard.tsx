import React from 'react';

import getClassName from 'tools/getClassName';

import Icon from 'components/core/Icon';

import styles from './AboutCard.module.scss';

type AboutCardParams = {
    children: React.ReactNode,
    className?: string,
    icon?: string,
};

export default function AboutCard({ children, className, icon }: AboutCardParams) {
    const [rootClassName, getChildClass] = getClassName({
        className,
        rootClass: 'about-card',
        styles,
    });

    return (
        <div className={rootClassName}>
            {icon && <Icon className={getChildClass('icon')}>{icon}</Icon>}
            <div className={getChildClass('content')}>{children}</div>
        </div>
    );
}

