import React, { forwardRef } from 'react';
import getClassName from '@tools/getClassName';
import styles from './IconButton.module.scss';
import Icon from './Icon';


export interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
    flip?: boolean;
    onClick?: () => void;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
    children,
    flip = false,
    onClick,
    ...otherProps
}
, ref) => {
    const [rootClass] = getClassName({
        rootClass: 'iconButton',
        modifiers: { flip },
        styles,
    });

    return (
        <button {...otherProps} className={rootClass} onClick={onClick} >
            {children}
        </button>
    );
})

IconButton.displayName = 'IconButton';
