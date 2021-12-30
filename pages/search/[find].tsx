import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import SearchBox from "../../components/common/SearchBox";
import Spinner from "../../components/common/Spinner";
import useSearch from '../../hooks/useSearch'
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';

const Search: FunctionComponent = () => {
    const router = useRouter()
    const [{ data, isLoading }] = useSearch(router.query.find, 'users')

    return (
        <div className="search">
            <SearchBox />
            {
                isLoading ?
                    (
                        <Spinner />
                    ) : (

                        <List sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '12px' }}>
                            {
                                data.map(user =>
                                    <ListItemButton onClick={() => router.push(`/${user.login}`)}>
                                        <ListItemAvatar>
                                            <Avatar
                                                sx={{ background: "none !important" }}
                                                alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                                                src={`https://juicify.app:4000/server/avatar/${user._id}.jpg`}
                                            >
                                                <Avatar
                                                    sx={{ background: "none !important" }}
                                                    alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                                                    src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.77a8e0c9.png&w=48&q=75"
                                                />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.login} secondary={`${user.name} ${user.surname}`} />
                                    </ListItemButton>
                                )
                            }
                        </List>
                    )
            }
        </div>
    );
};

export default Search;
