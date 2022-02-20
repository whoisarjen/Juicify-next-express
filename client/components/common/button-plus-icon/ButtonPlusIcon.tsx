import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components'
import { useButtonPlusIconProps } from './useButtonPlusIcon';

const Button = styled.div`
    width: 100%;
    display: grid;
    margin-top: 10px;
    ${this} button {
        margin: auto;
    }
`

const BaseButtonPlusIcon = ({ click, size = 'normal' }: useButtonPlusIconProps) => {
    return (
        <Button onClick={click} data-testid="BaseButtonPlusIcon">
            <Fab size={size} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Button>
    );
}

export default BaseButtonPlusIcon;