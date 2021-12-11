import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

const MoreOptions = () => {
    return (
        <div className="moreOptions">
            <IconButton aria-label="More" color="primary">
                <MoreVertIcon fontSize="small" />
            </IconButton>
        </div>
    );
}
 
export default MoreOptions;