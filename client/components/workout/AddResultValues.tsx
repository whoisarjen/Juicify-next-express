import styles from '../../styles/workout.module.css'
import ButtonPlus from '../common/ButtonPlus'
import { useState, useEffect, FunctionComponent } from 'react'
import AddResultValuesBox from './AddResultValuesBox'
import ResultProps from '../../interfaces/workout/result'
import ValueProps from '../../interfaces/workout/value'
import Value from '../../classes/workout/value'

interface AddResultValuesProps {
    result: ResultProps,
    setNewValues: (arg0: Array<ValueProps>) => void,
    isOwner: boolean
}

const AddResultValues: FunctionComponent<AddResultValuesProps> = ({ result, setNewValues, isOwner }) => {
    const [values, setValues] = useState<Array<ValueProps>>([])

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
        const newValues = values.map((value: ValueProps) => {
            value.open = false;
            return value
        })
        setNewValues(newValues)
        if (newValues.length > 0) {
            setValues([
                ...newValues,
                new Value({ reps: newValues[newValues.length - 1].reps, weight: newValues[newValues.length - 1].weight, open: true })
            ])
        } else {
            setValues([
                ...newValues,
                new Value({ reps: 0, weight: 0, open: true })
            ])
        }
    }

    useEffect(() => setValues(result.values), [result])

    return (
        <div className={styles.addResultValues}>
            <div className={styles.addResultValuesName}>{result.name}</div>
            {
                values && values.map((value: ValueProps, index: number) =>
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