import { useAppSelector } from "../../hooks/useRedux";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getShortDate } from "../../utils/manageDate";
import Avatar from '@mui/material/Avatar';
import Link from "next/link";

const Footer = () => {
  const token: any = useAppSelector(state => state.token.value);

  return (
    <footer className="footer">
      <div>©2022 Juicify.app</div>
      {token.login && (
        <nav className="footerMenu">
          <Link passHref href="/coach/">
            <a className="footerMenuElement">
              <EmojiEventsIcon color="primary" />
            </a>
          </Link>
          <Link passHref href="/workout">
            <div className="footerMenuElement">
              <FitnessCenterIcon color="primary" />
            </div>
          </Link>
          <Link passHref href="/barcode">
            <div className="footerMenuElement">
              <PhotoCameraIcon color="primary" />
            </div>
          </Link>
          <Link passHref href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
            <a className="footerMenuElement">
              <BookIcon color="primary" />
            </a>
          </Link>
          <Link passHref href={`/${token.login}`}>
            <a className="footerMenuElement">
              <Avatar
                sx={{ width: '28px', height: '28px' }}
                alt={`${token.login} ${token.name} ${token.surname} on Juicify`}
                src={`https://juicify.app:4000/server/avatar/${token._id}.jpg`}
              >
                <AccountCircleIcon color="primary" />
              </Avatar>
            </a>
          </Link>
        </nav>
      )}
    </footer>
  );
};

export default Footer;
