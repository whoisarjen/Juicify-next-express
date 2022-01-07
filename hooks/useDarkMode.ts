import { createContext, useContext } from "react";
import { useTheme } from '@mui/material/styles';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

const useDarkMode = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const toggleDarkMode = () => {
        if (theme.palette.mode === 'dark') {
            localStorage.setItem('isDarkMode', JSON.stringify(false))
        } else {
            localStorage.setItem('isDarkMode', JSON.stringify(true))
        }
        colorMode.toggleColorMode()
    }

    return [toggleDarkMode, theme]
}

export {
    useDarkMode,
    ColorModeContext
}