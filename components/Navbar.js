import Link from 'next/link'
import Avatar from '@mui/material/Avatar';
import useTranslation from 'next-translate/useTranslation'
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'
import { removeToken } from '../redux/features/tokenSlice'

const Navbar = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation('home')
    const [anchorEl, setAnchorEl] = useState(null);
    const logoAlt = useSelector((state) => state.config.logoAlt)
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const logoAdress = useSelector((state) => state.config.logoAdress)
    const open = Boolean(anchorEl);

    const handleCloseExtraMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenExtraMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        dispatch(removeToken())
        removeCookie('token')
        removeCookie('refresh_token')
        router.push('/login')
    }

    return (
        <nav className="navbar">
            <ul>
                <li><Link href="/"><Avatar alt={logoAlt} src={logoAdress}/></Link></li>
                <li><Link href="/">{t('Home')}</Link></li>
                <li><Link href="/blog">{t('Blog')}</Link></li>
                <li><Link href="/contact">{t('Contact')}</Link></li>
                <li><Link href="/login">{t('Sign in')}</Link></li>
                <li>
                    <IconButton onClick={handleOpenExtraMenu} size="small" sx={{ ml: 2 }}>
                        <Avatar alt="Juicify.app" src="https://juicify.app:4000/server/avatar/60ba774fe0ecd72587eeaa29.jpg"/>
                    </IconButton>
                </li>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseExtraMenu}
                    onClick={handleCloseExtraMenu}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Link href="/profile">
                        <a>
                            <MenuItem>
                                <Avatar /> Profile
                            </MenuItem>
                        </a>
                    </Link>
                    <Link href="/nutrition-diary">
                        <a>
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Diary
                            </MenuItem>
                        </a>
                    </Link>
                    <Link href="/workout-plans">
                        <a>
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Plans
                            </MenuItem>
                        </a>
                    </Link>
                    <Link href="/workout-results">
                        <a>
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Results
                            </MenuItem>
                        </a>
                    </Link>

                    <Divider />

                    <Link href="/settings">
                        <a>
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                        </a>
                    </Link>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </ul>
        </nav>
    );
}
 
export default Navbar;