import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { forwardRef } from "react";
import { useAppSelector } from "../hooks/useRedux";
import LoginIcon from "@mui/icons-material/Login";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BookIcon from "@mui/icons-material/Book";
import { getShortDate } from "../utils/manageDate";
import Image from 'next/image'
import logo from '../public/images/logo.png'
import SearchBox from './common/SearchBox'
import Settings from "@mui/icons-material/Settings";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDarkMode } from '../hooks/useDarkMode'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter } from "next/router";

const MyLogo = forwardRef<any, any>(({ onClick, href }, ref) => {
    return (
        <a href={href} onClick={onClick} ref={ref}>
            <Image width={40} height={40} alt="juicify.app" src={logo} />
        </a>
    )
})
MyLogo.displayName = "MyLogo Navbar";

const Navbar = () => {
    const { t } = useTranslation("home");
    const router = useRouter()
    const token: any = useAppSelector((state) => state.token.value);
    const [toggleDarkMode, theme]: any = useDarkMode()

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link passHref href="/">
                        <MyLogo />
                    </Link>
                </li>
                <li className="notMobileOnly">
                    <SearchBox />
                </li>
                <li className="notMobileOnly" style={{ padding: '16px 0' }}>
                    <Link passHref href={`${router.asPath}`}>
                        <a onClick={toggleDarkMode}>
                            {
                                theme.palette.mode === 'dark'
                                    ?
                                    <IconButton color="primary" aria-label="Dark / light mode">
                                        <Brightness7Icon />
                                    </IconButton>
                                    :
                                    <IconButton color="primary" aria-label="Dark / light mode">
                                        <Brightness4Icon />
                                    </IconButton>
                            }
                        </a>
                    </Link>
                    <Link passHref href="/blog">
                        <a>
                            <IconButton color="primary" aria-label="blog">
                                <AutoStoriesIcon />
                            </IconButton>
                        </a>
                    </Link>
                    {
                        token.login ? (
                            <>
                                <Link passHref href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
                                    <a>
                                        <IconButton color="primary" aria-label="Diary">
                                            <BookIcon />
                                        </IconButton>
                                    </a>
                                </Link>
                                <Link passHref href="/settings">
                                    <a>
                                        <IconButton color="primary" aria-label="Settings">
                                            <Settings />
                                        </IconButton>
                                    </a>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link passHref href="/login">
                                    <a>
                                        <IconButton color="primary" aria-label="Diary">
                                            <BookIcon />
                                        </IconButton>
                                    </a>
                                </Link>
                                <Link passHref href="/login">
                                    <a>
                                        <IconButton color="primary" aria-label="Login">
                                            <LoginIcon />
                                        </IconButton>
                                    </a>
                                </Link>
                            </>
                        )
                    }
                </li>
                <li className="mobileOnly">
                    <Link passHref href="/search">
                        <a>
                            <IconButton color="primary" aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                        </a>
                    </Link>
                    <Link passHref href="/blog">
                        <a>
                            <IconButton color="primary" aria-label="blog">
                                <AutoStoriesIcon />
                            </IconButton>
                        </a>
                    </Link>
                    {token.login ? (
                        <Link passHref href="/settings">
                            <a>
                                <IconButton color="primary" aria-label="settings">
                                    <Settings />
                                </IconButton>
                            </a>
                        </Link>
                    ) : (
                        <Link passHref href="/login">
                            <a>
                                <IconButton color="primary" aria-label="login">
                                    <LoginIcon />
                                </IconButton>
                            </a>
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
