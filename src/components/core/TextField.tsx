import React, { InputHTMLAttributes, useState } from 'react';
import {
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps
} from '@mui/material';

import getClassName from 'tools/getClassName';

import FieldError, { FieldErrorProps } from './FieldError';

type TextFieldProps = {
    className?: string,
    /** Error to be shown with the field from validation */
    fieldError?: FieldErrorProps['error'],
    fullWidth?: boolean
    textarea?: boolean
} & MuiTextFieldProps

export default function TextField({
    className,
    fieldError,
    fullWidth = true,
    textarea=false,
    ...props
}: TextFieldProps) {
    const [rootClassName] = getClassName({
        className,
        rootClass: 'text-field',
    });

    return (
        <MuiTextField
            {...props}
            className={rootClassName}
            error={!!fieldError}
            fullWidth={fullWidth}
            helperText={!!fieldError
                ? <FieldError error={fieldError} />
                : props.helperText
            }
            multiline={textarea}
            rows={textarea ? 3 : undefined}
        />
    );
}
