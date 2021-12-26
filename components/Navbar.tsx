import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import useTranslation from "next-translate/useTranslation";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { forwardRef, useState } from "react";
import { useAppSelector } from "../hooks/useRedux";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BookIcon from "@mui/icons-material/Book";
import { getShortDate } from "../utils/manageDate";
import Image from 'next/image'
import logo from '../public/images/logo.png'
import { logout } from '../utils/checkAuth'

const Navbar = () => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState(null);
  const token: any = useAppSelector((state) => state.token.value);
  const open = Boolean(anchorEl);

  const handleCloseExtraMenu = () => setAnchorEl(null)
  const handleOpenExtraMenu = (event: any) => setAnchorEl(event.currentTarget)

  const MyLogo = forwardRef<any, any>(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <Image width={40} height={40} alt="juicify.app" src={logo} />
      </a>
    )
  })
  MyLogo.displayName = "MyLogo Navbar";

  return (
    <nav className="navbar">
      <ul>
        <li className="paddingMenu">
          <Link passHref href="/">
            <MyLogo />
          </Link>
        </li>
        <li className="notMobileOnly paddingMenu">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 350,
              boxShadow: 0,
              border: 1,
              borderColor: "#e4e4e4",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={t("Search Something Awesome")}
              inputProps={{ "aria-label": t("Search Something Awesome") }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </li>
        <li className="paddingMenu">
          <Tabs
            aria-label="Top menu"
            value={0}
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            <Link passHref href="/">
              <a>
                <Tab icon={<HomeIcon />} wrapped label={t("Home")} />
              </a>
            </Link>
            <Link passHref href="/blog">
              <a>
                <Tab icon={<AutoStoriesIcon />} wrapped label={t("Blog")} />
              </a>
            </Link>
            {token.login ? (
              <Link passHref href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
                <a>
                  <Tab className="notMobileOnly" icon={<BookIcon />} wrapped label={t("Diary")} />
                </a>
              </Link>
            ) : (
              <Link passHref href="/login">
                <a>
                  <Tab className="notMobileOnly" icon={<BookIcon />} wrapped label={t("Diary")} />
                </a>
              </Link>
            )}
            {token.login ? (
              <Tab
                icon={<AccountCircleIcon />}
                wrapped
                label={t("Account")}
                onClick={handleOpenExtraMenu}
              />
            ) : (
              <Link passHref href="/login">
                <a>
                  <Tab icon={<LoginIcon />} wrapped label={t("Sign in")} />
                </a>
              </Link>
            )}
          </Tabs>
        </li>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseExtraMenu}
          onClick={handleCloseExtraMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link passHref href={`/${token.login}`}>
            <a>
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
            </a>
          </Link>
          <Link passHref href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Diary
              </MenuItem>
            </a>
          </Link>
          <Link passHref href={`/${token.login}/workout-plans`}>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Plans
              </MenuItem>
            </a>
          </Link>
          <Link passHref href={`/${token.login}/workout-results`}>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Results
              </MenuItem>
            </a>
          </Link>
          <Divider />
          <Link passHref href="/settings">
            <a>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
            </a>
          </Link>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </ul>
    </nav>
  );
};

export default Navbar;
