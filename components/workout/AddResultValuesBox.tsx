import styles from '../../styles/workout.module.css'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useState, useEffect, useMemo, FunctionComponent } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ConfirmDialog from '../common/ConfirmDialog';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

interface AddResultValuesBox {
    value: any,
    index: number,
    changeResult: (arg0: any) => void,
    deleteResult: () => void
}

const AddResultValuesBox: FunctionComponent<AddResultValuesBox> = ({ value, index, changeResult, deleteResult }) => {
    const [reps, setReps] = useState(value.reps)
    const [weight, setWeight] = useState(value.weight)
    const [open, setOpen] = useState(false)
    const [repsOptions, setRepsOptions] = useState([])
    const [weightOptions, setWeightOptions] = useState([])
    const [isDialog, setIsDialog] = useState(false)

    const loadWeight = (choosenWeight: any) => {
        const choosenWeightLocally = parseInt(choosenWeight)
        let weight: any = ['0']
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
        let reps: any = []
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
                            <div className={styles.AddResultValuesBoxConnectGrid}><div>Click to save</div></div>
                            <div><div>#{index + 1}</div></div>
                            <div>
                                <IconButton aria-label="arrow">
                                    <ArrowRightAltOutlinedIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton aria-label="save">
                                    <CircleOutlinedIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </div>
                        </div>
                        <Autocomplete
                            sx={{ marginTop: '8px' }}
                            disablePortal
                            value={weight}
                            id="combo-box-demo"
                            options={weightOptions}
                            onInputChange={(e, value) => loadWeight(value)}
                            getOptionLabel={(option) => option ? option : ""}
                            renderInput={(params) => <TextField {...params} label="Weight" />}
                        />
                        <Autocomplete
                            sx={{ marginTop: '8px' }}
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
                    <>
                        <div className={styles.AddResultValuesBox}>
                            <div onClick={() => setIsDialog(true)} >
                                <IconButton aria-label="delete">
                                    <DeleteIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </div>
                            <div onClick={() => setOpen(true)}><div>{weight}kg</div></div>
                            <div onClick={() => setOpen(true)}><div>#{index + 1}</div></div>
                            <div onClick={() => setOpen(true)}><div>{reps}r.</div></div>
                            <div onClick={() => setOpen(true)}>
                                <IconButton aria-label="save">
                                    <CheckCircleOutlinedIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </div>
                        </div>
                        <ConfirmDialog
                            isDialog={isDialog}
                            confirm={deleteResult}
                            closeDialog={() => setIsDialog(false)}
                        />
                    </>
            }
        </>
    );
}

export default AddResultValuesBox;