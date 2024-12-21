import React, { createContext, useState } from 'react';
import axios from 'axios';

interface RecaptchaProviderProps {
    children: React.ReactNode;
}

interface Context {
    verifyToken: (token: string) => void;
    verified: boolean;
}

const DEFAULT_CONTEXT: Context = {
    verifyToken: () => null,
    verified: false,
};

export const RecaptchaContext = createContext(DEFAULT_CONTEXT);

export default function RecaptchaProvider({ children }: RecaptchaProviderProps) {
    const [verified, setVerified] = useState(false);

    function fetcher(url: string, token: string) {
        return axios.post(url, { token })
    }

    async function verifyToken(token: string) {
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

