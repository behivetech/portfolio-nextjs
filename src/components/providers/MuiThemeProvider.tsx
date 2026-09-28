import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

type MuiThemeProviderProps = {
    children: ReactNode
}

// Mirrors src/styles/_colors.scss. These used to come from an SCSS `:export`
// block, which Turbopack (the Next 16 default bundler) does not support.
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#2c1760',
            main: '#9c4dcc',
            dark: '#38006b',
            contrastText: '#fff',
        },
        secondary: {
            light: '#f50057',
            main: '#ff5983',
            dark: '#bb002f',
            contrastText: '#fff',
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
