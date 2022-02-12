import "../global.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Layout from "../components/layout/Layout";
import Socket from "../components/layout/Socket";
import { FunctionComponent } from "react";
import MUI from "../components/layout/MUI";
import Notify from "../components/layout/Notify";

interface AppProps {
    Component: any,
    pageProps: any
}

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
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

export default App;
