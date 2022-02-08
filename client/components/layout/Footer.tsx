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

const Box = styled.div`
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

const Link__a = styled.a`
    margin: auto;
    display: grid;
    cursor: pointer;
`

const Footer: FunctionComponent<FooterProps> = ({ token }) => {
    return (
        <footer>
            <Box>
                {
                    token
                        ?
                        <>
                            <div />
                            <Menu>
                                <Link passHref href="/coach/">
                                    <Link__a>
                                        <EmojiEventsIcon color="primary" />
                                    </Link__a>
                                </Link>
                                <Link passHref href="/workout">
                                    <Link__a>
                                        <FitnessCenterIcon color="primary" />
                                    </Link__a>
                                </Link>
                                <Link passHref href="/barcode">
                                    <Link__a>
                                        <PhotoCameraIcon color="primary" />
                                    </Link__a>
                                </Link>
                                <Link passHref href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
                                    <Link__a>
                                        <BookIcon color="primary" />
                                    </Link__a>
                                </Link>
                                <Link passHref href={`/${token.login}`}>
                                    <Link__a>
                                        <Avatar user={token} size="28px" />
                                    </Link__a>
                                </Link>
                            </Menu>
                        </>
                        :
                        <small>©2022 Juicify.app</small>
                }
            </Box>
        </footer>
    );
};

export default Footer;
