import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import Socket from "../components/Socket";
import { FunctionComponent, useState, useEffect, useMemo } from "react";
import { createTheme, ThemeProvider as ThemeProviderMUI } from "@mui/material/styles";
import { ColorModeContext } from '../hooks/useDarkMode'

interface MyAppProps {
    Component: any,
    pageProps: any
}

const MyApp: FunctionComponent<MyAppProps> = ({ Component, pageProps }) => {
    const [mode, setMode]: any = useState('light')

    const theme = createTheme({
        typography: {
            fontFamily: "Quicksand, sans-serif",
        },
        palette: {
            mode
        },
    });

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    useEffect(() => setMode(JSON.parse(localStorage.getItem('isDarkMode')) ? 'dark' : 'light'), [])

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProviderMUI theme={theme}>
                <Provider store={store}>
                    <Socket>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </Socket>
                </Provider>
            </ThemeProviderMUI>
        </ColorModeContext.Provider>
    );
}

export default MyApp;
