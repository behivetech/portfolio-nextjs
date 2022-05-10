import React from 'react';
import PropTypes from 'prop-types';
import ReactRecaptcha from 'react-google-recaptcha';

import getClassName from 'tools/getClassName';
import useRecaptchaVerified from 'hooks/useRecaptchaVerified';

import styles from './Recaptcha.module.scss';

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function Recaptcha({ className, onVerify, show }) {
    const { verifyToken } = useRecaptchaVerified();
    const [rootClassName] = getClassName({
        className,
        rootClass: 'recaptcha',
        modifiers: { show },
        styles,
    });

    function handleChange(token) {
        console.log('RECAPTHA VALUE', token)

        verifyToken(token);
    }

    return (
        <div className={rootClassName}>
            <ReactRecaptcha
                onChange={handleChange}
                sitekey={SITE_KEY}
            />
        </div>
    );
}

Recaptcha.propTypes = {
    className: PropTypes.string,
    /** Callback function which returns boolean if reacaptcha verify passes */
    onVerify: PropTypes.func,
    /** Shows or hide the component */
    show: PropTypes.bool,
};

Recaptcha.defaultProps = {
    onVerify: () => null,
    show: false,
};
