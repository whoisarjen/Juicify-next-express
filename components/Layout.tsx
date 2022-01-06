import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'

interface LayoutProps {
    children: any
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    const router = useRouter()

    return (
        <div className='layout'>
            <Head>
                <title>Dynamic title INC...</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <Navbar />
            <div id="gridOverContent">
                <SidebarLeft />
                <div className={router.pathname.includes('blog') ? '' : 'content'}>{children}</div>
                <SidebarRight />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
