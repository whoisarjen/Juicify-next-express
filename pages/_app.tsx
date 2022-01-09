import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import Socket from "../components/Socket";
import { FunctionComponent } from "react";
import MUI from "../components/MUI";
import Notify from "../components/Notify";

interface MyAppProps {
    Component: any,
    pageProps: any
}

const MyApp: FunctionComponent<MyAppProps> = ({ Component, pageProps }) => {
    return (
        <MUI>
            <Provider store={store}>
                <Socket>
                    <Notify>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </Notify>
                </Socket>
            </Provider>
        </MUI>
    );
}

export default MyApp;
