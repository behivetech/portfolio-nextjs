import React from 'react';
import {
    Button as MuiButton,
    ButtonProps as MuiButtonProps,
    ExtendButtonBase,
    ButtonTypeMap,
} from '@mui/material';

import getClassName from 'tools/getClassName';

type ButtonProps = {
    className?: string
    variant?: MuiButtonProps['variant']
} & ExtendButtonBase<ButtonTypeMap<{}, "button">>

export default function Button({ className, variant = 'contained', ...props }: ButtonProps) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'button',
    });

    return (
        <MuiButton
            {...props}
            className={rootClassName}
            variant={variant}
        />
    )
}
