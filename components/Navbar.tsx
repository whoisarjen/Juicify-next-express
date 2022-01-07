import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { forwardRef } from "react";
import { useAppSelector } from "../hooks/useRedux";
import LoginIcon from "@mui/icons-material/Login";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
import Box from '@mui/material/Box';

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
                <li className="notMobileOnly">
                    <Tabs
                        aria-label="Top menu"
                        value={0}
                        TabIndicatorProps={{ style: { display: "none" } }}
                    >
                        <Tab
                            onClick={toggleDarkMode}
                            icon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            wrapped
                            label={`${theme.palette.mode} mode`}
                        />
                        <Link passHref href="/blog">
                            <a>
                                <Tab
                                    icon={<AutoStoriesIcon />}
                                    wrapped
                                    label={t("Blog")}
                                />
                            </a>
                        </Link>
                        {token.login ? (
                            <Link passHref href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
                                <a>
                                    <Tab
                                        className="notMobileOnly"
                                        icon={<BookIcon />}
                                        wrapped
                                        label={t("Diary")}
                                    />
                                </a>
                            </Link>
                        ) : (
                            <Link passHref href="/login">
                                <a>
                                    <Tab
                                        className="notMobileOnly"
                                        icon={<BookIcon />}
                                        wrapped
                                        label={t("Diary")}
                                    />
                                </a>
                            </Link>
                        )}
                        {token.login ? (
                            <Link passHref href="/settings">
                                <a>
                                    <Tab
                                        icon={<Settings />}
                                        wrapped
                                        label={t("Settings")}
                                    />
                                </a>
                            </Link>
                        ) : (
                            <Link passHref href="/login">
                                <a>
                                    <Tab
                                        icon={<LoginIcon />}
                                        wrapped
                                        label={t("Sign in")}
                                    />
                                </a>
                            </Link>
                        )}
                    </Tabs>
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
