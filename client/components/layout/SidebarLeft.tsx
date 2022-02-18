import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import { useRouter } from "next/router";
import { getShortDate } from "../../utils/date.utils";
import SchoolIcon from '@mui/icons-material/School';
import Settings from "@mui/icons-material/Settings";
import useTranslation from "next-translate/useTranslation";
import Avatar from "../common/avatar";
import styled from 'styled-components'

const Grid = styled.aside`
    padding: 12px;
    margin-left: auto;
    margin-right: 0;
    width: 100%;
    max-width: 200px;
    @media(max-width: 1468px) {
        display: none;
    }
`

const SidebarLeft = ({ token }: { token: any }) => {
    const router = useRouter()
    const { t } = useTranslation('home')

    return (
        <Grid>
            {
                token &&
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <nav>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => router.push(`/${token.login}`)}>
                                    <ListItemIcon>
                                        <Avatar user={token} size="28px" margin="auto auto auto 0" />
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
                                <ListItemButton onClick={() => router.push(`/${token.login}/workout`)}>
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
        </Grid>
    )
}

export default SidebarLeft;