import { FunctionComponent } from "react";
import styles from '../../styles/nutrition-diary.module.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Share from "../common/Share";
import DateChanger from "../common/DateChanger";


const Navbar: FunctionComponent = () => {

    return (
        <div className={styles.navbar}>
            <div className="title">Diary</div>
            <Share />
            <IconButton>
                <ContentCopyIcon />
            </IconButton>
            <DateChanger />
        </div>
    )
}

export default Navbar;