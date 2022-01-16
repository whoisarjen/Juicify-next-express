import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { FunctionComponent } from "react";
import styles from '../../styles/nutrition-diary.module.css'

interface MoreOptionsProps {
    isDisabled: boolean
}

const MoreOptions: FunctionComponent<MoreOptionsProps> = ({ isDisabled }) => {
    console.log(isDisabled)
    return (
        <div className={styles.moreOptions}>
            <IconButton aria-label="More" color="primary">
                <MoreVertIcon fontSize="small" />
            </IconButton>
        </div>
    );
}

export default MoreOptions;