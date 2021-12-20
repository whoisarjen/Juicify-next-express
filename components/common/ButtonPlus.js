import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const ButtonPlus = ({ click }) => {
    return (
        <div className="buttonPlus" onClick={click}>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    );
}

export default ButtonPlus;