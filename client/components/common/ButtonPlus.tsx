import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components'

interface ButtonPlusProps {
    click: () => void,
    size?: any
}

const ButtonPlus = styled.div`
    width: 100%;
    display: grid;
    margin-top: 10px;
    ${this} button {
        margin: auto;
    }
`

export default ({ click, size = 'normal' }: ButtonPlusProps) => {
    return (
        <ButtonPlus onClick={click}>
            <Fab size={size} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </ButtonPlus>
    );
}