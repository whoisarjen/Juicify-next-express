import "../styles/global.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Layout from "../components/layout/Layout";
import Socket from "../components/layout/Socket";
import { FunctionComponent } from "react";
import MUI from "../components/layout/MUI";
import Notify from "../components/layout/Notify";

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
