import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import { useAppSelector } from '../hooks/useRedux'

interface LayoutProps {
    children: any
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    const router = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    return (
        <div className='layout'>
            <Head>
                <title>Dynamic title INC...</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <Navbar />
            {
                router.pathname.includes('blog') || router.pathname == '/'
                    ?
                    <div>{children}</div>
                    :
                    <div id="gridOverContent">
                        {
                            token.login &&
                                router.pathname !== '/login'
                                ?
                                <SidebarLeft />
                                :
                                <div id="sidebarLeft" />
                        }
                        <div className='content'>{children}</div>
                        {
                            token.login &&
                                router.pathname !== '/login'
                                ?
                                <SidebarRight />
                                :
                                <div id="sidebarRight" />
                        }
                    </div>
            }
            <Footer />
        </div>
    )
}

export default Layout
