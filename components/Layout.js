import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
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
