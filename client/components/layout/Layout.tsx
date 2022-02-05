import Navbar from './Navbar'
import Footer from './Footer'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import { useAppSelector } from '../../hooks/useRedux'
import SidebarRightLoggouted from './SidebarRightLoggouted'
import SidebarLeftLoggouted from './SidebarLeftLoggouted'
import TopNotify from './TopNotify'
import { getShortDate } from '../../utils/manageDate'
import { readToken } from '../../utils/checkAuth'
import { useCookies } from 'react-cookie'

interface LayoutProps {
    children: any
}

const requiredAuth = [
    '/settings',
    '/workout',
    '/statistics',
    '/macronutrients',
    '/coach',
    '/barcode'
]

const notRequiredAuth = [
    '/login',
    '/register',
    '/reset-password'
]

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    const router = useRouter()
    const [cookies] = useCookies();
    const [allowLoading, setAllowLoading] = useState(false)
    const token: any = useAppSelector(state => state.token.value)

    useEffect(() => {
        if (cookies.token && notRequiredAuth.includes(router.pathname)) {
            router.push(`/${readToken(cookies.token).login}/nutrition-diary/${getShortDate()}`);
        }

        if (!cookies.token && requiredAuth.includes(router.pathname)) {
            router.push('/login')
        }
        setAllowLoading(true)
    }, [])

    return (
        <main className='layout'>
            <TopNotify />
            {
                allowLoading &&
                <>
                    <Navbar />
                    {
                        router.pathname.includes('blog') || router.pathname == '/'
                            ?
                            <div>{children}</div>
                            :
                            <div id="gridOverContent">
                                {
                                    token.login
                                        ?
                                        (
                                            notRequiredAuth.filter(route => route == router.pathname).length || router.pathname == '/'
                                                ?
                                                <SidebarLeftLoggouted />
                                                :
                                                <SidebarLeft />
                                        )
                                        :
                                        <SidebarLeftLoggouted />
                                }
                                <div className='content'>{children}</div>
                                {
                                    token.login
                                        ?
                                        (
                                            notRequiredAuth.filter(route => route == router.pathname).length || router.pathname == '/'
                                                ?
                                                <SidebarRightLoggouted />
                                                :
                                                <SidebarRight />
                                        )
                                        :
                                        <SidebarRightLoggouted />
                                }
                            </div>
                    }
                    <Footer />
                </>
            }
        </main>
    )
}

export default Layout
