import Navbar from './Navbar'
import Footer from './Footer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import { useAppSelector } from '../../hooks/useRedux'
import SidebarRightLoggouted from './SidebarRightLoggouted'
import SidebarLeftLoggouted from './SidebarLeftLoggouted'
import TopNotify from './TopNotify'
import { getShortDate } from '../../utils/date.utils'
import styled from 'styled-components'
import { getCookie, isBrowserValid } from '../../utils/auth.utils'

const Grid = styled.div`
    margin: auto;
    display: grid;
    width: 100%;
    max-width: 1226px;
    grid-template-columns: 250px 726px 250px;
    @media (max-width: 1468px) {
        max-width: 976px;
        grid-template-columns: 726px 250px;
    }
    @media (max-width: 1105px) {
        max-width: 726px;
        grid-template-columns: 726px;
    }
    @media (max-width: 726px) {
        max-width: 100%;
        grid-template-columns: 1fr;
    }
`

const Content = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 702px;
    padding: 12px;
    display: grid;
    min-height: calc(100vh - var(--BothNavHeightAndPadding));
    @media (max-width: 726px) {
        width: calc(100% - 24px);
    }
`

const requiredAuth = [
    '',
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

const Layout = ({ children }: { children: any }) => {
    const router = useRouter()
    const [isAllowedLocation, setIsAllowedLocation] = useState(false)
    const token: any = useAppSelector(state => state.token.value)

    useEffect(() => {
        (async () => {
            if (!await isBrowserValid() && router.pathname != '/not-supported') {
                return router.push('/not-supported')
            }
            const locale = await getCookie('NEXT_LOCALE') // Redirect for PWA's scope
            if (router.locale != locale) {
                return router.push(router.asPath, router.asPath, { locale });
            }
            const tokenValue = JSON.parse(localStorage.getItem('token') as any) // it allow us to dodge the first push, when token is not settled yet
            if (tokenValue && notRequiredAuth.includes(router.pathname)) {
                router.push(`/${tokenValue.login}/nutrition-diary/${getShortDate()}`);
            } else if (!tokenValue && requiredAuth.includes(router.pathname)) {
                router.push('/login')
            } else {
                setIsAllowedLocation(true)
            }
        })()
    }, [token, router])

    return (
        <main>
            <TopNotify />
            {
                isAllowedLocation &&
                <>
                    <Navbar {...{ token }} />
                    {
                        router.pathname.includes('blog') || router.pathname == '/'
                            ?
                            <>{children}</>
                            :
                            <Grid>
                                {
                                    token
                                        ?
                                        notRequiredAuth.filter(route => route == router.pathname).length || router.pathname == '/'
                                            ?
                                            <SidebarLeftLoggouted />
                                            :
                                            <SidebarLeft {...{ token }} />
                                        :
                                        <SidebarLeftLoggouted />
                                }
                                <Content>{children}</Content>
                                {
                                    token
                                        ?
                                        notRequiredAuth.filter(route => route == router.pathname).length || router.pathname == '/'
                                            ?
                                            <SidebarRightLoggouted />
                                            :
                                            <SidebarRight {...{ token }} />
                                        :
                                        <SidebarRightLoggouted />
                                }
                            </Grid>
                    }
                    <Footer {...{ token }} />
                </>
            }
        </main>
    )
}

export default Layout;