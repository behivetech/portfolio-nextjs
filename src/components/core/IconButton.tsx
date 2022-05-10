import React from 'react';

import getClassName from 'tools/getClassName';

import Icon from './Icon';

import styles from './IconButton.module.scss';

type IconButtonParams = {
    className?: string,
    /**
     * Name of icon to use
     */
    icon: string,
    /**
     * Tells the icon to use the $color-on-primary color
     */
    onPrimary?: boolean,
    /**
     * Tells the icon to use the $color-on-secondary color
     */
    onSecondary?: boolean,
    /**
     * use an alternat html element
     */
    tag?: React.ElementType | string,
    [propName: string]: any
};

export default function IconButton({
    className,
    icon,
    onPrimary = false,
    onSecondary = false,
    tag = 'button',
    ...props
}: IconButtonParams) {
    const [rootClassName] = getClassName({
        className,
        modifiers: { 'on-primary': onPrimary, 'on-secondary': onSecondary },
        rootClass: 'icon-button',
        styles,
    });
    const RootElement = tag;
    return <RootElement {...props} className={rootClassName}><Icon icon={icon} /></RootElement>;
}
