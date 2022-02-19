import ButtonPlus from '../../../../common/ButtonPlus'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ValueSchemaProps } from '../../../../../schema/workoutResult.schema'
import styled from 'styled-components';
import { useResultBoxProps } from './useResultBox';
import ValueBox from '../valueBox';
import ConfirmDialog from '../../../../common/confirmDialog';

const Name = styled.div`
    min-height: 36px;
    width: calc(100% - 30px);
    padding: 7px 15px;
    background: #333;
    color: #fff;
    margin-top: 12px;
    text-align: center;
    border-radius: 4px;
    display: grid;
    grid-template-columns: 44px auto 44px;
    ${this} div {
        margin: auto;
        display: grid;
    }
    ${this} div button {
        margin: auto;
    }
    ${this} div div {
        margin: auto;
    }
`

const BaseResultBox = ({ result, isOwner, deleteExerciseWithIndex, deleteResult, changeResult, openNewResult, values }: useResultBoxProps) => {
    return (
        <div>
            <Name>
                <div>
                    {
                        isOwner &&
                        <ConfirmDialog confirmed={deleteExerciseWithIndex}>
                            <IconButton color="primary" component="span">
                                <DeleteIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                        </ConfirmDialog>
                    }
                </div>
                <div>{result.name}</div>
                <div />
            </Name>
            {
                values.map((value: ValueSchemaProps, index: number) =>
                    <ValueBox
                        key={index + ' ' + value.open}
                        value={value}
                        index={index}
                        deleteResult={() => deleteResult(index)}
                        changeResult={(object: ValueSchemaProps) => changeResult(object, index)}
                        isOwner={isOwner}
                    />
                )
            }
            {
                isOwner &&
                <ButtonPlus size="small" click={() => openNewResult()} />
            }
        </div>
    );
}

export default BaseResultBox;