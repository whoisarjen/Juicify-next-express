import { createContext, useContext } from "react";
import { useTheme as useThemeDefault } from '@mui/material/styles';

const THEME_VALUE = {
    LIGHT: {
        PRIMARY: '#1976d2'
    },
    DARK: {
        PRIMARY: '#3e98c7'
    }
}

const ColorModeContext = createContext({ toggleColorMode: () => { } });

const useTheme = () => {
    const theme = useThemeDefault();
    const colorMode = useContext(ColorModeContext);

    const toggleDarkMode = () => {
        if (theme.palette.mode === 'dark') {
            localStorage.setItem('isDarkMode', JSON.stringify(false))
        } else {
            localStorage.setItem('isDarkMode', JSON.stringify(true))
        }
        colorMode.toggleColorMode()
    }

    const getTheme = (what) => THEME_VALUE[theme.palette.mode.toUpperCase()][what]

    return [getTheme, toggleDarkMode, theme]
}

export {
    useTheme,
    ColorModeContext
}