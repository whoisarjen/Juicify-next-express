import ButtonPlus from '../../common/ButtonPlus'
import { useState, useEffect } from 'react'
import ValueBox from './ValueBox'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ResultSchemaProps, ValueSchemaProps } from '../../../schema/workoutResult.schema'
import styled from 'styled-components';

interface AddResultValuesProps {
    isOwner: boolean,
    result: ResultSchemaProps,
    setNewValues: (arg0: Array<ValueSchemaProps>) => void
    openDeleteExercise: () => void
}

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

const AddResultValues = ({ result, setNewValues, isOwner, openDeleteExercise }: AddResultValuesProps) => {
    const [values, setValues] = useState<Array<ValueSchemaProps>>(result.values)

    const changeResult = (object: ValueSchemaProps, index: number) => {
        let array = values
        array[index] = { ...object, open: false }
        setValues(array)
        setNewValues(array)
    }

    const deleteResult = (index: number) => {
        const array = values.filter((x, i) => i != index)
        setValues(array)
        setNewValues(array)
    }

    const openNewResult = () => {
        if (values?.length) {
            const previousValues = values.map(
                (value: ValueSchemaProps) => {
                    value.open = false;
                    return value
                }
            )
            setNewValues(previousValues)
            setValues(
                [
                    ...previousValues,
                    {
                        reps: values[values.length - 1].reps,
                        weight: values[values.length - 1].weight,
                        open: true
                    }
                ]
            )
        } else {
            setValues(
                [
                    {
                        reps: 0,
                        weight: 0,
                        open: true
                    }
                ]
            )
        }
    }

    useEffect(() => setValues(result.values), [result])

    return (
        <div>
            <Name>
                <div>
                    {
                        isOwner &&
                        <IconButton color="primary" component="span" onClick={openDeleteExercise}>
                            <DeleteIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    }
                </div>
                <div>{result.name}</div>
                <div />
            </Name>
            {
                values?.map((value: ValueSchemaProps, index: number) =>
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

export default AddResultValues;