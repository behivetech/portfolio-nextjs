import React from 'react';
import {
    Icon as MuiIcon,
    IconProps as MuiIconProps
} from '@mui/material'
import getClassName from 'tools/getClassName';
import styles from './Icon.module.scss';

type IconProps = {
    className?: string,
} & MuiIconProps;

export default function Icon({
    className,
    ...props
}: IconProps) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'icon',
        styles,
    });

    return <MuiIcon {...props} className={`${rootClassName}`} />;
}
