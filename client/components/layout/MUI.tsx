import { createTheme, ThemeProvider as ThemeProviderMUI } from "@mui/material/styles";
import { FunctionComponent, useState, useMemo, useEffect } from "react";
import { ColorModeContext } from '../../hooks/useTheme'

interface MUIProps {
    children: any
}

const MUI: FunctionComponent<MUIProps> = ({ children }) => {
    const [mode, setMode]: any = useState('dark')

    const theme = createTheme({
        typography: {
            fontFamily: "Quicksand, sans-serif",
        },
        palette: {
            mode,
        },
    });

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    useEffect(() => setMode(localStorage.getItem('isDarkMode') ? 'dark' : 'light'), [])

    useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.style.setProperty('--theme-background', '#121212')
        } else {
            document.documentElement.style.setProperty('--theme-background', '#ffffff')
        }
    }, [mode])

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProviderMUI theme={theme}>
                {children}
            </ThemeProviderMUI>
        </ColorModeContext.Provider>
    )
}

export default MUI
