import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import getClassName from 'tools/getClassName';

import styles from './FieldError.module.scss';

export type FieldErrorProps = {
    className?: string
    error?: {
        message?: string
        type?: 'required' | 'unknown'
    }
};

const errorMessages = {
    required: 'This field is required',
    unknown: 'An unknown error has occured',
};

export default function FieldError({ className, error = {type: 'unknown'} }: FieldErrorProps) {
    let errorResult = null;
    const [rootClassName] = getClassName({
        className,
        rootClass: 'field-error',
        styles
    });
    const { message, type } = error;

    if (message) {
        errorResult = message;
    } else {
        errorResult = errorMessages[type || 'unknown'] || errorMessages.unknown;
    }

    return isEmpty(error) ? null : <div className={rootClassName}>{errorResult}</div>;
}
