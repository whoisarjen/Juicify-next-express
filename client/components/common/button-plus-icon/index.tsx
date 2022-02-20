import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components'

interface ButtonPlusIconProps {
    click?: () => void,
    size?: any
}

const Button = styled.div`
    width: 100%;
    display: grid;
    margin-top: 10px;
    ${this} button {
        margin: auto;
    }
`

const ButtonPlusIcon = ({ click, size = 'normal' }: ButtonPlusIconProps) => {
    return (
        <Button onClick={click}>
            <Fab size={size} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Button>
    );
}

export default ButtonPlusIcon;