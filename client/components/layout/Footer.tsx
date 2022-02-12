import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import { getShortDate } from "../../utils/date.utils";
import Link from "next/link";
import Avatar from "../common/Avatar";
import styled from 'styled-components'
import { FunctionComponent } from "react";

interface FooterProps {
    token: any
}

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

const A = styled.a`
    margin: auto;
    display: grid;
    cursor: pointer;
`

const Copyright = styled.p`
    margin: 0;
`

const Footer: FunctionComponent<FooterProps> = ({ token }) => {
    return (
        <Box>
            {
                token
                    ?
                    <Menu>
                        <Link passHref href="/coach/">
                            <A>
                                <EmojiEventsIcon color="primary" />
                            </A>
                        </Link>
                        <Link passHref href="/workout">
                            <A>
                                <FitnessCenterIcon color="primary" />
                            </A>
                        </Link>
                        <Link passHref href="/barcode">
                            <A>
                                <PhotoCameraIcon color="primary" />
                            </A>
                        </Link>
                        <Link passHref href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
                            <A>
                                <BookIcon color="primary" />
                            </A>
                        </Link>
                        <Link passHref href={`/${token.login}`}>
                            <A>
                                <Avatar user={token} size="28px" />
                            </A>
                        </Link>
                    </Menu>
                    :
                    <Copyright>©2022 Juicify.app</Copyright>
            }
        </Box>
    );
};

export default Footer;
