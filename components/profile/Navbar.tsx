import { FunctionComponent } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import styles from '../../styles/profile.module.css'
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WebIcon from '@mui/icons-material/Web';
import { useRouter } from "next/router";
import TabsInterface from './TabsInterface'

interface NavbarProps {
    user: any,
    tab: number
}

const Navbar: FunctionComponent<NavbarProps> = ({ user, tab }) => {
    const router = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.navbarAvatar}>
                    <img src='https://juicify.app:4000/server/avatar/60ba774fe0ecd72587eeaa29.jpg' alt={`Avatar for ${token.login} knows as ${token.name} ${token.surname}`} />
                </div>
                <div className={styles.navbarContent}>
                    <div>
                        <h2>{user.login}</h2>
                        {
                            user.login == token.login ?
                                (
                                    <IconButton onClick={() => router.push('/settings')} sx={{ margin: 'auto' }} aria-label="settings" color="primary">
                                        <SettingsIcon />
                                    </IconButton>
                                ) : (
                                    <div />
                                )
                        }
                    </div>
                    <div>{user.name} {user.surname}</div>
                    <div>{user.description}</div>
                    <div>
                        <IconButton onClick={() => window.open('https://www.codexworld.com', '_blank')} aria-label="Facebook" color="primary">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton onClick={() => window.open('https://www.codexworld.com', '_blank')} aria-label="Instagram" color="primary">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton onClick={() => window.open('https://www.codexworld.com', '_blank')} aria-label="Twitter" color="primary">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton onClick={() => window.open('https://www.codexworld.com', '_blank')} aria-label="Website" color="primary">
                            <WebIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <TabsInterface tab={tab} />
        </>
    )
}

export default Navbar;