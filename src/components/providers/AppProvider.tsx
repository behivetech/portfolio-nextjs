import React from 'react';

import MuiThemeProvider from './MuiThemeProvider';
import RecaptchaProvider from './RecaptchaProvider';

type AppProviderProps = {
    children: React.ReactNode
}

export default function AppProvider({children}: AppProviderProps) {
    return (
        <MuiThemeProvider>
            <RecaptchaProvider><>{children}</></RecaptchaProvider>
        </MuiThemeProvider>
    )
}
