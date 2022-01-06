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
import { useAppSelector } from "../hooks/useRedux";
import Avatar from '@mui/material/Avatar';
import { useRouter } from "next/router";
import { getShortDate } from "../utils/manageDate";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Settings from "@mui/icons-material/Settings";

const SidebarLeft: FunctionComponent = () => {
    const router = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    return (
        <div id="sidebarLeft">
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
                                            sx={{ width: '28px', height: '28px' }}
                                            alt={`${token.login} ${token.name} ${token.surname} on Juicify`}
                                            src={`https://juicify.app:4000/server/avatar/${token._id}.jpg`}
                                        >
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/${token.login}/nutrition-diary/${getShortDate()}`)}>
                                    <ListItemIcon>
                                        <BookIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Diary" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/${token.login}/workout-results`)}>
                                    <ListItemIcon>
                                        <FitnessCenterIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Workout" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/coach`)}>
                                    <ListItemIcon>
                                        <EmojiEventsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Coach" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/blog`)}>
                                    <ListItemIcon>
                                        <AutoStoriesIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Blog" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/settings`)}>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            }
        </div >
    )
}

export default SidebarLeft;