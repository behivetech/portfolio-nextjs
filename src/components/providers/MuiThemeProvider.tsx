import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

import {
    colorPrimary,
    colorPrimaryLight,
    colorPrimaryDark,
    colorSecondary,
    colorSecondaryLight,
    colorSecondaryDark,
    colorOnPrimary,
    colorOnSecondary,
} from './MuiThemeProvider.module.scss';

type MuiThemeProviderProps = {
    children: ReactNode
}

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: colorPrimary,
            main: colorPrimaryLight,
            dark: colorPrimaryDark,
            contrastText: colorOnPrimary,
        },
        secondary: {
            light: colorSecondary,
            main: colorSecondaryLight,
            dark: colorSecondaryDark,
            contrastText: colorOnSecondary,
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
