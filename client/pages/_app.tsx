import "../global.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Layout from "../components/layout/Layout";
import Socket from "../components/layout/Socket";
import MUI from "../components/layout/MUI";
import Notify from "../components/layout/Notify";
import { ProviderURQL, useURQL } from "../hooks/useURQL";

const App = ({ Component, pageProps }: { Component: any, pageProps: any }) => {
    const { UrqlClient } = useURQL()

    return (
        <MUI>
            <ProviderURQL value={UrqlClient}>
                <Provider store={store}>
                    <Socket>
                        <Notify>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </Notify>
                    </Socket>
                </Provider>
            </ProviderURQL>
        </MUI>
    );
}

export default App;
