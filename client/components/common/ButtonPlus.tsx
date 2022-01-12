import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { FunctionComponent } from 'react';

interface ButtonPlus {
    click: () => void,
    size?: any
}

const ButtonPlus: FunctionComponent<ButtonPlus> = ({ click, size = 'normal' }) => {
    return (
        <div className="buttonPlus" onClick={click}>
            <Fab size={size} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    );
}

export default ButtonPlus;