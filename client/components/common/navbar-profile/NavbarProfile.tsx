import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkIcon from '@mui/icons-material/Link';
import TabsMenu from '../tabs-profile'
import Avatar from '../avatar';
import Share from "../button-share";
import styled from 'styled-components'
import { useNavbarProfileProps } from './useNavbarProfile';

const Box = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 130px auto;
`

const AvatarBox = styled.div`
    width: 120px;
    height: 120px;
    margin: auto;
    border: 1px solid #e4e4e4;
    border-radius: 50%;
    display: grid;
`

const Content = styled.div`
    width: calc( 100% - 20px );
    padding: 10px;
    display: grid;
    grid-template-rows: auto auto auto auto;
    ${this} div:nth-child(1){
        display: grid;
        grid-template-columns: auto 40px 40px;
        width: 100%;
        margin: auto;
    }
    ${this} div:nth-child(2){
        font-weight: bold;
    }
`

const BaseNavbarProfile = ({ user, tab, token, router }: useNavbarProfileProps) => {
    return (
        <>
            {
                user?.login &&
                <>
                    <Box>
                        <AvatarBox>
                            <Avatar user={user} />
                        </AvatarBox>
                        <Content>
                            <div>
                                <h2>{user.login}</h2>
                                {
                                    user.login == token.login ?
                                        <>
                                            <Share />
                                            <IconButton onClick={() => router.push('/settings')} sx={{ margin: 'auto' }} aria-label="settings" color="primary">
                                                <SettingsIcon />
                                            </IconButton>
                                        </>
                                        :
                                        <>
                                            <div />
                                            <Share />
                                        </>
                                }
                            </div>
                            <div>{user.name} {user.surname}</div>
                            <div>{user.description}</div>
                            <div>
                                {
                                    user.facebook &&
                                    <IconButton onClick={() => window.open(`https://facebook.com/${user.facebook}`, '_blank')} data-testid="facebook" color="primary">
                                        <FacebookIcon />
                                    </IconButton>
                                }
                                {
                                    user.instagram &&
                                    <IconButton onClick={() => window.open(`https://instagram.com/${user.instagram}`, '_blank')} data-testid="instagram" color="primary">
                                        <InstagramIcon />
                                    </IconButton>
                                }
                                {
                                    user.twitter &&
                                    <IconButton onClick={() => window.open(`https://twitter.com/${user.twitter}`, '_blank')} data-testid="twitter" color="primary">
                                        <TwitterIcon />
                                    </IconButton>
                                }
                                {
                                    user.website &&
                                    <IconButton onClick={() => window.open(`${user.website}`, '_blank')} data-testid="website" color="primary">
                                        <LinkIcon />
                                    </IconButton>
                                }
                            </div>
                        </Content>
                    </Box>
                    <TabsMenu tab={tab} />
                </>
            }
        </>
    )
}

export default BaseNavbarProfile;