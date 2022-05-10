import React, { createContext, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';

const DEFAULT_CONTEXT = {
    verifyToken: () => null,
    verified: false,
};

export const RecaptchaContext = createContext(DEFAULT_CONTEXT);

export default function RecaptchaProvider({ children }) {
    const [verified, setVerified] = useState(false);

    function fetcher(url, token) {
        return axios.post(url, { token })
    }

    async function verifyToken(token) {
        const { data } = await fetcher('/api/recaptcha', token)

        console.log({ data })
        setVerified(data.success)
    }


    const context = {
        verifyToken,
        verified,
    };

    return (
        <RecaptchaContext.Provider value={context}>{children}</RecaptchaContext.Provider>
    );
}

RecaptchaProvider.propTypes = {
    children: PropTypes.node,
};
