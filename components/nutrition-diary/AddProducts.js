import { forwardRef } from 'react'
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddProducts = () => {
    const handleDialogClose = () => console.log()
    return (
        <div className="addProductToNutrionDiary">
            <Dialog
                fullScreen
                scroll='body'
                open={true}
                onClose={handleDialogClose}
                TransitionComponent={Transition}
            >
                Dodawanie produktu
            </Dialog>
        </div>
    );
}

export default AddProducts;