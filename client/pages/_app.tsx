import "../global.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Layout from "../components/layout/Layout";
import Socket from "../components/layout/Socket";
import MUI from "../components/layout/MUI";
import Notify from "../components/layout/Notify";

interface AppProps {
    Component: any,
    pageProps: any
}

const App = ({ Component, pageProps }: AppProps) => {
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
