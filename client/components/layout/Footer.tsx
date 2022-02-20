import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import { getShortDate } from "../../utils/date.utils";
import Avatar from "../common/avatar";
import styled from 'styled-components'
import BetterLink from "../common/better-link";

const Box = styled.footer`
    width: 100%;
    min-height: 43px;
    line-height: 43px;
    text-align: center;
`

const Menu = styled.nav`
    height: 44px;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
    width: 100%;
    position: fixed;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    z-index: 2;
    background: var(--theme-background);
`

const Copyright = styled.p`
    margin: 0;
`

const Footer = ({ token }: { token: any }) => {
    return (
        <Box>
            {
                token
                    ?
                    <Menu>
                        <BetterLink style={{ margin: 'auto', display: 'grid' }} href="/coach/">
                            <EmojiEventsIcon color="primary" />
                        </BetterLink>
                        <BetterLink style={{ margin: 'auto', display: 'grid' }} href={`/${token.login}/workout`}>
                            <FitnessCenterIcon color="primary" />
                        </BetterLink>
                        <BetterLink style={{ margin: 'auto', display: 'grid' }} href="/barcode">
                            <PhotoCameraIcon color="primary" />
                        </BetterLink>
                        <BetterLink style={{ margin: 'auto', display: 'grid' }} href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
                            <BookIcon color="primary" />
                        </BetterLink>
                        <BetterLink style={{ margin: 'auto', display: 'grid' }} href={`/${token.login}`}>
                            <Avatar user={token} size="28px" />
                        </BetterLink>
                    </Menu>
                    :
                    <Copyright>©2022 Juicify.app</Copyright>
            }
        </Box>
    );
};

export default Footer;
