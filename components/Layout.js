import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { readToken } from "../utils/checkAuth";
import { setToken } from "../redux/features/tokenSlice";
import { setIsOnline } from "../redux/features/onlineSlice";

const Layout = ({ children }) => {
    const [cookies] = useCookies();
    const dispatch = useDispatch();

    useEffect(() => {
        if (cookies.token) {
            dispatch(setToken(cookies.token));
            const socket = io("http://localhost:4000", {
                query: `user_ID=${readToken(cookies.token)._id}`,
            });
        }
    }, [cookies.token]);

    useEffect(() => {
        dispatch(setIsOnline(navigator.onLine))
        window.addEventListener('online', () => dispatch(setIsOnline(true)));
        window.addEventListener('offline', () => dispatch(setIsOnline(false)));
    }, [])

    return (
        <div className="layout">
            <Head>
                <title>Dynamic title INC...</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
