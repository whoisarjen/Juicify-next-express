import styles from '../../styles/workout.module.css'
import ButtonPlus from '../common/ButtonPlus'
import { useState, useEffect, FunctionComponent } from 'react'
import AddResultValuesBox from './AddResultValuesBox'

interface AddResultValuesProps {
    result: any,
    setNewValues: any,
    isOwner: boolean
}

const AddResultValues: FunctionComponent<AddResultValuesProps> = ({ result, setNewValues, isOwner }) => {
    const [values, setValues] = useState<any>([])

    const changeResult = (object: any, index: number) => {
        let array = values
        let newObject = object
        if (!newObject.reps) {
            newObject.reps = '0'
        }
        if (!newObject.weight) {
            newObject.weight = '0'
        }
        array[index] = { ...newObject, open: false }
        setValues(array)
        setNewValues(array)
    }

    const deleteResult = (_id: string) => {
        let array = values
        array = array.filter((x: any) => x._id != _id)
        setValues(array)
        setNewValues(array)
    }

    const openNewResult = () => {
        let newValues = values
        newValues.map((value: any) => {
            value.open = false;
            return value
        })
        setNewValues(newValues)

        if (values.length > 0) {
            setValues([
                ...newValues,
                {
                    reps: values[values.length - 1].reps,
                    weight: values[values.length - 1].weight,
                    _id: 'XD' + new Date().getTime(),
                    open: true
                }
            ])
        } else {
            setValues([
                ...newValues,
                {
                    reps: '0',
                    weight: '0',
                    _id: 'XD' + new Date().getTime(),
                    open: true
                }
            ])
        }
    }

    useEffect(() => setValues(result.values), [result])

    return (
        <div className={styles.addResultValues}>
            <div className={styles.addResultValuesName}>{result.name}</div>
            {
                values && values.map((value: any, index: number) =>
                    <AddResultValuesBox
                        key={index + result._id}
                        value={value}
                        index={index}
                        deleteResult={() => deleteResult(value._id)}
                        changeResult={(object: any) => changeResult(object, index)}
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