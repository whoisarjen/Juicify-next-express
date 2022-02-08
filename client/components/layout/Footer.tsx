import { useAppSelector } from "../../hooks/useRedux";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import { getShortDate } from "../../utils/date.utils";
import Link from "next/link";
import Avatar from "../common/Avatar";

const Footer = () => {
  const token: any = useAppSelector(state => state.token.value);

  return (
    <footer className="footer">
      {
        token &&
          token.login
          ?
          (
            <>
              <div />
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
                    <Avatar user={token} size="28px" />
                  </a>
                </Link>
              </nav>
            </>
          )
          :
          (
            <div>©2022 Juicify.app</div>
          )
      }
    </footer>
  );
};

export default Footer;
