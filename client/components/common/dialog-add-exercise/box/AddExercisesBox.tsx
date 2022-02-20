import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import { useAddExercisesBoxProps } from './useAddExerciseBox';

const Box = styled.div`
    display: grid;
    grid-template-columns: 1fr 44px 44px;
    margin-bottom: 10px;
    border: 1px solid #e4e4e4;
    border-left: 5px solid #e4e4e4;
    border-radius: 8px;
    padding: 10px 5px 10px 15px;
    width: calc(100% - 26px);
    font-size: 0.875rem;
    ${this} div {
        margin: auto;
    }
`

const Name = styled.div`
    margin-left: 0 !important;
    font-weight: bold;
`

const BaseAddExercisesBox = ({ exercise, checked, handleCheck, getTheme }: useAddExercisesBoxProps) => {
    return (
        <Box>
            <Name style={{ color: getTheme('PRIMARY') }}>
                {exercise.name}
            </Name>
            <div />
            <div onChange={handleCheck}>
                <Checkbox
                    data-testid="checkBox"
                    checked={checked}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </Box>
    );
}

export default BaseAddExercisesBox;