import styles from '../../styles/workout.module.css'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddResultValuesBox = ({ value, index, changeResult, deleteResult }) => {
    const [reps, setReps] = useState(value.reps)
    const [weight, setWeight] = useState(value.weight)
    const [open, setOpen] = useState(false)
    const weightOptions = [], repsOptions = []

    useEffect(() => {
        if (value) {
            setOpen(value.open)
            setReps(value.reps)
            setWeight(value.weight)
        }
    }, [value, value.open])

    return (
        <>
            {
                open
                    ?
                    <div>
                        <div
                            className={styles.AddResultValuesBox}
                            onClick={() => {
                                setOpen(false)
                                changeResult({ reps, weight, _id: value._id })
                            }}
                        >
                            <div>open</div>
                            <div>asd</div>
                            <div>asd</div>
                            <div>asd</div>
                            <div>asd</div>
                        </div>
                        {/* <Autocomplete
                            disablePortal
                            value={weight}
                            id="combo-box-demo"
                            options={weightOptions}
                            onInputChange={(e, value) => {
                                setWeight(value)
                                // send up
                            }}
                            renderInput={(params) => <TextField {...params} label="Weight" />}
                        />
                        <Autocomplete
                            disablePortal
                            value={reps}
                            id="combo-box-demo"
                            options={repsOptions}
                            onInputChange={(e, value) => {
                                setReps(value)
                                // send up
                            }}
                            renderInput={(params) => <TextField {...params} label="Reps" />}
                        /> */}
                    </div>
                    :
                    <div className={styles.AddResultValuesBox} onClick={() => setOpen(true)}>
                        <IconButton aria-label="delete" onClick={deleteResult}>
                            <DeleteIcon />
                        </IconButton>
                        <div>{weight}kg</div>
                        <div>#{index + 1}</div>
                        <div>{reps}r.</div>
                        <IconButton aria-label="save">
                            <CheckCircleOutlinedIcon />
                        </IconButton>
                    </div>
            }
        </>
    );
}

export default AddResultValuesBox;