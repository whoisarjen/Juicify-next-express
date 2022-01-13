import styles from '../../styles/workout.module.css'
import ButtonPlus from '../common/ButtonPlus'
import { useState, useEffect, FunctionComponent } from 'react'
import AddResultValuesBox from './AddResultValuesBox'
import ResultProps from '../../interfaces/workout/result'
import ValueProps from '../../interfaces/workout/value'
import Value from '../../classes/workout/value'

interface AddResultValuesProps {
    isOwner: boolean,
    result: ResultProps,
    setNewValues: (arg0: Array<ValueProps>) => void
}

const AddResultValues: FunctionComponent<AddResultValuesProps> = ({ result, setNewValues, isOwner }) => {
    const [values, setValues] = useState<Array<ValueProps>>(result.values)

    const changeResult = (object: ValueProps, index: number) => {
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
                (value: ValueProps) => {
                    value.open = false;
                    return value
                }
            )
            setNewValues(previousValues)
            setValues(
                [
                    ...previousValues,
                    new Value(
                        {
                            reps: values[values.length - 1].reps,
                            weight: values[values.length - 1].weight,
                            open: true
                        }
                    )
                ]
            )
        } else {
            setValues(
                [
                    new Value(
                        {
                            reps: 0,
                            weight: 0,
                            open: true
                        }
                    )
                ]
            )
        }
    }

    useEffect(() => setValues(result.values), [result])

    return (
        <div className={styles.addResultValues}>
            <div className={styles.addResultValuesName}>{result.name}</div>
            {
                values &&
                values.length &&
                values.map((value: ValueProps, index: number) =>
                    <AddResultValuesBox
                        key={index + ' ' + value.open}
                        value={value}
                        index={index}
                        deleteResult={() => deleteResult(index)}
                        changeResult={(object: ValueProps) => changeResult(object, index)}
                    />
                )
            }
            {
                isOwner &&
                <ButtonPlus size="small" click={openNewResult} />
            }
        </div>
    );
}

export default AddResultValues;