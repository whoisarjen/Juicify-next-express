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

interface LayoutProps {
    children: any
}

const requiredAuth = [
    '/',
    '/settings',
    '/workout',
    '/statistics',
    '/macronutrients',
    '/coach',
    '/barcode'
]

const notRequiredAuth = [
    '/',
    '/login',
    '/register',
    '/reset-password'
]

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    const router = useRouter()
    const [allowLoading, setAllowLoading] = useState(false)
    const token: any = useAppSelector(state => state.token.value)

    useEffect(() => {
        const tokenValue = JSON.parse(localStorage.getItem('token') as any) // it allow us to dodge the first push, when token is not settled yet
        if (tokenValue && notRequiredAuth.includes(router.pathname)) {
            router.push(`/${tokenValue.login}/nutrition-diary/${getShortDate()}`);
        } else if (!tokenValue && requiredAuth.includes(router.pathname)) {
            router.push('/login')
        } else {
            setAllowLoading(true)
        }
    }, [token, router])

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
                                    token &&
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
                                    token &&
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
