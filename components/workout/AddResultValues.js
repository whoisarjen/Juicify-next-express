import styles from '../../styles/workout.module.css'
import ButtonPlus from '../../components/common/ButtonPlus'
import { useState, useEffect } from 'react'
import AddResultValuesBox from '../../components/workout/AddResultValuesBox'

const AddResultValues = ({ result, setNewValues, isOwner }) => {
    const [values, setValues] = useState([])

    const changeResult = (object, index) => {
        let array = values
        array[index] = { ...object, open: false }
        setValues(array)
        setNewValues(array)
    }

    const deleteResult = (_id) => {
        let array = values
        array = array.filter(x => x._id != _id)
        setValues(array)
        setNewValues(array)
    }

    const openNewResult = () => {
        let newValues = values
        newValues.map(value => {
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
                values && values.map((value, index) =>
                    <AddResultValuesBox
                        key={value._id}
                        value={value}
                        index={index}
                        deleteResult={() => deleteResult(value._id)}
                        changeResult={(object) => changeResult(object, index)}
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