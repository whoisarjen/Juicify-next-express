import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";
import Socket from "../components/Socket";
import { FunctionComponent } from "react";

interface MyAppProps {
    Component: any,
    pageProps: any
}

const theme = createTheme({
    typography: {
        fontFamily: "Quicksand, sans-serif",
    },
    // palette: {
    //     primary: {
    //         main: '#d32f2f'
    //     }
    // }
});

const MyApp: FunctionComponent<MyAppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Socket>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Socket>
            </Provider>
        </ThemeProvider>
    );
}

export default MyApp;
