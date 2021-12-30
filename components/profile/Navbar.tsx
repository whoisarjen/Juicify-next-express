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
import Avatar from '@mui/material/Avatar';

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
                    <Avatar
                        sx={{ display: 'grid', margin: 'auto', width: '110px', height: '110px', background: "none !important" }}
                        alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                        src={`https://juicify.app:4000/server/avatar/${user._id}.jpg`}
                    >
                        <Avatar
                            sx={{ display: 'grid', margin: 'auto', width: '110px', height: '110px', background: "none !important" }}
                            alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                            src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.77a8e0c9.png&w=48&q=75"
                        />
                    </Avatar>
                    {/* <img src='https://juicify.app:4000/server/avatar/60ba774fe0ecd72587eeaa29.jpg' alt={`Avatar for ${token.login} knows as ${token.name} ${token.surname}`} /> */}
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
                            token.facebook &&
                            <IconButton onClick={() => window.open(`https://facebook.com/${token.facebook}`, '_blank')} aria-label="Facebook" color="primary">
                                <FacebookIcon />
                            </IconButton>
                        }
                        {
                            token.instagram &&
                            <IconButton onClick={() => window.open(`https://instagram.com/${token.instagram}`, '_blank')} aria-label="Facebook" color="primary">
                                <InstagramIcon />
                            </IconButton>
                        }
                        {
                            token.twitter &&
                            <IconButton onClick={() => window.open(`https://twitter.com/${token.twitter}`, '_blank')} aria-label="Facebook" color="primary">
                                <TwitterIcon />
                            </IconButton>
                        }
                        {
                            token.website &&
                            <IconButton onClick={() => window.open(`${token.website}`, '_blank')} aria-label="Facebook" color="primary">
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