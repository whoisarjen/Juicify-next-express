import styles from '../../styles/workout.module.css'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useState, useEffect, useMemo } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddResultValuesBox = ({ value, index, changeResult, deleteResult }) => {
    const [reps, setReps] = useState(value.reps)
    const [weight, setWeight] = useState(value.weight)
    const [open, setOpen] = useState(false)
    const [repsOptions, setRepsOptions] = useState([])
    const [weightOptions, setWeightOptions] = useState([])

    const loadWeight = (choosenWeight) => {
        const choosenWeightLocally = parseInt(choosenWeight)
        let weight = ['0']
        if (choosenWeightLocally) {
            if (choosenWeight != '0') {
                weight.push(choosenWeight)
            }
            for (let i = 1; i <= 4; i++) {
                weight.push((choosenWeightLocally + (i / 4)).toString())
            }
        } else {
            for (let i = 1; i <= 40; i++) {
                weight.push((i / 4).toString())
            }
        }
        setWeight(choosenWeight)
        setWeightOptions(weight)
    }

    useEffect(() => {
        if (value) {
            setOpen(value.open)
            setReps(value.reps)
            setWeight(value.weight)
            loadWeight(value.weight)
        }
    }, [value, value.open])

    useMemo(() => {
        let reps = []
        for (let i = 0; i <= 100; i++) {
            reps.push(i.toString())
        }
        setRepsOptions(reps)
    }, [])

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
                        <Autocomplete
                            disablePortal
                            value={weight}
                            id="combo-box-demo"
                            options={weightOptions}
                            onInputChange={(e, value) => loadWeight(value)}
                            getOptionLabel={(option) => option ? option : ""}
                            renderInput={(params) => <TextField {...params} label="Weight" />}
                        />
                        <Autocomplete
                            disablePortal
                            value={reps}
                            id="combo-box-demo"
                            options={repsOptions}
                            onInputChange={(e, value) => setReps(value)}
                            getOptionLabel={(option) => option ? option : ""}
                            renderInput={(params) => <TextField {...params} label="Reps" />}
                        />
                    </div>
                    :
                    <div className={styles.AddResultValuesBox} onClick={() => setOpen(true)}>
                        <IconButton aria-label="delete" onClick={deleteResult}>
                            <DeleteIcon />
                        </IconButton>
                        <div><div>{weight}kg</div></div>
                        <div><div>#{index + 1}</div></div>
                        <div><div>{reps}r.</div></div>
                        <IconButton aria-label="save">
                            <CheckCircleOutlinedIcon />
                        </IconButton>
                    </div>
            }
        </>
    );
}

export default AddResultValuesBox;