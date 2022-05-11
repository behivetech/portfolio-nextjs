import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

import styles from './MuiThemeProvider.module.scss';

type MuiThemeProviderProps = {
    children: ReactNode
}

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: styles.colorPrimary,
            main: styles.colorPrimaryLight,
            dark: styles.colorPrimaryDark,
            contrastText: styles.colorOnPrimary,
        },
        secondary: {
            light: styles.colorSecondary,
            main: styles.colorSecondaryLight,
            dark: styles.colorSecondaryDark,
            contrastText: styles.colorOnSecondary,
        },
    },
});

export default function MuiThemeProvider({ children }: MuiThemeProviderProps) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}
