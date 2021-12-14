import EditIcon from "@mui/icons-material/Edit";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import IconButton from "@mui/material/IconButton";
import { useState } from 'react'
import ConfirmDialog from '../common/ConfirmDialog'

const EditProduct = ({ isOwner, product, deleteProduct }) => {
    const [isDialog, setIsDialog] = useState(false)

    return (
        <div className="editProduct">
            {isOwner ? (
                <>
                    <IconButton onClick={() => setIsDialog(true)} aria-label="edit">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <ConfirmDialog
                        isDialog={isDialog}
                        closeDialog={() => setIsDialog(false)}
                        confirm={() => {
                            deleteProduct(product)
                            setIsDialog(false)
                        }}
                    />
                </>
            ) : (
                <IconButton aria-label="edit">
                    <FastfoodIcon fontSize="small" />
                </IconButton>
            )}
        </div>
    );
}

export default EditProduct;