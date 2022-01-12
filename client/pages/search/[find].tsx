import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import SearchBox from "../../components/common/SearchBox";
import Spinner from "../../components/common/Spinner";
import useSearch from '../../hooks/useSearch'
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '../../components/common/Avatar';
import ListItemButton from '@mui/material/ListItemButton';

const Search: FunctionComponent = () => {
    const router: any = useRouter()
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
                                data.map((user: any) =>
                                    <ListItemButton onClick={() => router.push(`/${user.login}`)} key={user._id}>
                                        <ListItemAvatar>
                                            <Avatar user={user} size="40px" />
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
