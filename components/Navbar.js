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
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { t } = useTranslation('home')
    const [anchorEl, setAnchorEl] = useState(null);
    const logoAlt = useSelector((state) => state.config.logoAlt)
    const logoAdress = useSelector((state) => state.config.logoAdress)
    const open = Boolean(anchorEl);
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    return (
        <nav className="navbar">
            <ul>
                <li><Link href="/"><Avatar alt={logoAlt} src={logoAdress}/></Link></li>
                <li><Link href="/">{t('Home')}</Link></li>
                <li><Link href="/blog">{t('Blog')}</Link></li>
                <li><Link href="/contact">{t('Contact')}</Link></li>
                <li><Link href="/login">{t('Sign in')}</Link></li>
                <li>
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar alt="Juicify.app" src="https://juicify.app:4000/server/avatar/60ba774fe0ecd72587eeaa29.jpg"/>
                    </IconButton>
                </li>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
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
                    <MenuItem>
                    <Avatar /> Profile
                    </MenuItem>
                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Nutrition diary
                    </MenuItem>
                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Workout
                    </MenuItem>

                    <Divider />

                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                    </MenuItem>
                    <MenuItem>
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