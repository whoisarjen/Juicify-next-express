import { FunctionComponent } from "react"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppSelector } from "../../hooks/useRedux";
import Avatar from '@mui/material/Avatar';
import { useRouter } from "next/router";
import { getShortDate } from "../../utils/manageDate";
import SchoolIcon from '@mui/icons-material/School';
import Settings from "@mui/icons-material/Settings";
import { useTheme } from "../../hooks/useTheme";
import useTranslation from "next-translate/useTranslation";

const SidebarLeft: FunctionComponent = () => {
    const router = useRouter()
    const { t } = useTranslation('home')
    const token: any = useAppSelector(state => state.token.value)
    const [getTheme]: any = useTheme()

    return (
        <aside id="sidebarLeft">
            {
                token &&
                token.login &&
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <nav>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/${token.login}`)}>
                                    <ListItemIcon>
                                        <Avatar
                                            sx={{ width: '28px', height: '28px', background: 'transparent' }}
                                            alt={`${token.login} ${token.name} ${token.surname} on Juicify`}
                                            src={`https://${process.env.NEXT_PUBLIC_SERVER}/server/avatar/${token._id}.jpg`}
                                        >
                                            <AccountCircleIcon color="primary" />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/${token.login}/nutrition-diary/${getShortDate()}`)}>
                                    <ListItemIcon>
                                        <BookIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={t('Diary')} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/${token.login}/workout-results`)}>
                                    <ListItemIcon>
                                        <FitnessCenterIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={t('Workout')} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/coach`)}>
                                    <ListItemIcon>
                                        <EmojiEventsIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={t('Coach')} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/blog`)}>
                                    <ListItemIcon>
                                        <SchoolIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={t('Blog')} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/settings`)}>
                                    <ListItemIcon>
                                        <Settings color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={t('Settings')} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            }
        </aside>
    )
}

export default SidebarLeft;