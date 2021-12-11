import EditIcon from "@mui/icons-material/Edit";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import IconButton from "@mui/material/IconButton";

const EditProduct = ({ isOwner }) => {
    return (
        <div className="editProduct">
            {isOwner ? (
                <IconButton aria-label="edit">
                    <EditIcon fontSize="small" />
                </IconButton>
            ) : (
                <IconButton aria-label="edit">
                    <FastfoodIcon fontSize="small" />
                </IconButton>
            )}
        </div>
    );
}

export default EditProduct;