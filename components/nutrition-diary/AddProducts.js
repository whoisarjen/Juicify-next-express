import { forwardRef, useState } from 'react'
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddProducts = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const handleDialogClose = () => setIsDialogOpen(false)

    return (
        <div className="addProductToNutrionDiary">
            <IconButton aria-label="Add" color="primary" onClick={() => setIsDialogOpen(true)}>
                <AddIcon fontSize="small"/>
            </IconButton>
            <Dialog
                fullScreen
                scroll='body'
                open={isDialogOpen}
                onClose={handleDialogClose}
                TransitionComponent={Transition}
            >
                <button onClick={handleDialogClose}>Close</button>
                Dodawanie produktu
            </Dialog>
        </div>
    );
}

export default AddProducts;