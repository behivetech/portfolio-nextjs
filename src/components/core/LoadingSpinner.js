import React from 'react';
import PropTypes from 'prop-types';

import getClassName from 'tools/getClassName';

import Icon from './Icon';

import styles from './LoadingSpinner.module.scss';

export default function LoadingSpinner({className, medium, onDark, small}) {
    const [rootClassName] = getClassName({
        className,
        modifiers: {
            medium,
            'on-primary': onDark,
            small,
        },
        rootClass: 'loading-spinner',
        styles,
    });

    return <Icon className={rootClassName}>synch</Icon>;
}

LoadingSpinner.propTypes = {
    className: PropTypes.string,
    medium: PropTypes.bool,
    onDark: PropTypes.bool,
    small: PropTypes.bool,
};
