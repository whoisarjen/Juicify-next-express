import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import styles from '../../styles/nutrition-diary.module.css'

const MoreOptions = () => {
    return (
        <div className={styles.moreOptions}>
            <IconButton aria-label="More" color="primary">
                <MoreVertIcon fontSize="small" />
            </IconButton>
        </div>
    );
}
 
export default MoreOptions;