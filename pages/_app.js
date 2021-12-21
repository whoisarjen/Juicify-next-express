import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";
import Socket from "../components/Socket";

const theme = createTheme({
    typography: {
        fontFamily: "Quicksand, sans-serif",
    },
    // palette: {
    // primary: {
    // main: 'rgb(252, 97, 70)'
    // }
    // }
});

function MyApp({ Component, pageProps }) {
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
