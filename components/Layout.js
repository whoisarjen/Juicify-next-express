import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useSocket from '../hooks/useSocket'
import { setIsOnline } from '../redux/features/onlineSlice'

const Layout = ({ children }) => {
    const dispatch = useDispatch()
    useSocket()

    useEffect(() => {
        dispatch(setIsOnline(navigator.onLine))
        window.addEventListener('online', () => dispatch(setIsOnline(true)))
        window.addEventListener('offline', () => dispatch(setIsOnline(false)))
    }, [])

    return (
        <div className='layout'>
            <Head>
                <title>Dynamic title INC...</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <Navbar />
            <div className='content'>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout
