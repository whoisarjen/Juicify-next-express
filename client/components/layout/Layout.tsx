import Navbar from './Navbar'
import Footer from './Footer'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import { useAppSelector } from '../../hooks/useRedux'
import SidebarRightLoggouted from './SidebarRightLoggouted'
import SidebarLeftLoggouted from './SidebarLeftLoggouted'

interface LayoutProps {
    children: any
}

const except = [
    '/',
    '/login',
    '/regsiter',
    '/reset-password'
]

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    const router = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    return (
        <div className='layout'>
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
                                    except.filter(route => route == router.pathname).length
                                        ?
                                        <div />
                                        :
                                        <SidebarLeft />
                                )
                                :
                                (
                                    except.filter(route => route == router.pathname).length
                                        ?
                                        <div />
                                        :
                                        <SidebarLeftLoggouted />
                                )
                        }
                        <div className='content'>{children}</div>
                        {
                            token.login
                                ?
                                (
                                    except.filter(route => route == router.pathname).length
                                        ?
                                        <div />
                                        :
                                        <SidebarRight />
                                )
                                :
                                (
                                    except.filter(route => route == router.pathname).length
                                        ?
                                        <div />
                                        :
                                        <SidebarRightLoggouted />
                                )
                        }
                    </div>
            }
            <Footer />
        </div>
    )
}

export default Layout
