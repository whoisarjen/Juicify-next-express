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
import Avatar from '../common/Avatar';

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
                    <Avatar user={user} />
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
                        {
                            user.facebook &&
                            <IconButton onClick={() => window.open(`https://facebook.com/${user.facebook}`, '_blank')} aria-label="Facebook" color="primary">
                                <FacebookIcon />
                            </IconButton>
                        }
                        {
                            user.instagram &&
                            <IconButton onClick={() => window.open(`https://instagram.com/${user.instagram}`, '_blank')} aria-label="Facebook" color="primary">
                                <InstagramIcon />
                            </IconButton>
                        }
                        {
                            user.twitter &&
                            <IconButton onClick={() => window.open(`https://twitter.com/${user.twitter}`, '_blank')} aria-label="Facebook" color="primary">
                                <TwitterIcon />
                            </IconButton>
                        }
                        {
                            user.website &&
                            <IconButton onClick={() => window.open(`${user.website}`, '_blank')} aria-label="Facebook" color="primary">
                                <WebIcon />
                            </IconButton>
                        }
                    </div>
                </div>
            </div>
            <TabsInterface tab={tab} />
        </>
    )
}

export default Navbar;