import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const ButtonPlus = ({ click }) => {
    return (
        <div className="buttonPlus">
            <Fab onClick={click} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    );
}

export default ButtonPlus;