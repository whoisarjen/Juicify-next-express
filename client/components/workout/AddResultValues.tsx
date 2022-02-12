import styles from '../../styles/workout.module.css'
import ButtonPlus from '../common/ButtonPlus'
import { useState, useEffect, FunctionComponent } from 'react'
import AddResultValuesBox from './AddResultValuesBox'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ResultSchemaProps, ValueSchemaProps } from '../../schema/workoutResult.schema'

interface AddResultValuesProps {
    isOwner: boolean,
    result: ResultSchemaProps,
    setNewValues: (arg0: Array<ValueSchemaProps>) => void
    openDeleteExercise: () => void
}

const AddResultValues: FunctionComponent<AddResultValuesProps> = ({ result, setNewValues, isOwner, openDeleteExercise }) => {
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
        if (values && values.length) {
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
        <div className={styles.addResultValues}>
            <div className={styles.addResultValuesName}>
                <div>
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={openDeleteExercise}>
                        <DeleteIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </div>
                <div>{result.name}</div>
                <div />
            </div>
            {
                values &&
                values.length > 0 &&
                values.map((value: ValueSchemaProps, index: number) =>
                    <AddResultValuesBox
                        key={index + ' ' + value.open}
                        value={value}
                        index={index}
                        deleteResult={() => deleteResult(index)}
                        changeResult={(object: ValueSchemaProps) => changeResult(object, index)}
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