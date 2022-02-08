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
import ValueProps from '../../interfaces/workout/value.interface';

interface AddResultValuesBox {
    value: ValueProps,
    index: number,
    changeResult: (arg0: ValueProps) => void,
    deleteResult: () => void
}

const AddResultValuesBox: FunctionComponent<AddResultValuesBox> = ({ value, index, changeResult, deleteResult }) => {
    const [reps, setReps] = useState('0')
    const [weight, setWeight] = useState('0')
    const [open, setOpen] = useState(false)
    const [repsOptions, setRepsOptions] = useState(['0'])
    const [weightOptions, setWeightOptions] = useState(['0'])
    const [isDialog, setIsDialog] = useState(false)

    const loadWeight = (choosenWeight: string) => {
        const choosenWeightLocally = parseFloat(choosenWeight)
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
        setWeight(choosenWeight.toString())
        setWeightOptions(weight)
        // changeResult(new Value({ reps: parseInt(reps), weight: parseFloat(choosenWeight.toString()), open }))
    }

    const handleDelete = () => {
        deleteResult()
        setIsDialog(false)
    }

    useEffect(() => {
        if (value) {
            setOpen(value.open || false)
            setReps(value.reps.toString())
            setWeight(value.weight.toString())
            loadWeight(value.weight.toString())
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
                                changeResult({ reps: parseInt(reps), weight: parseFloat(weight), open })
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
                            onChange={(e, value) => changeResult({ reps: parseInt(reps), weight: parseFloat((value || 0).toString()), open })}
                            onInputChange={(e, valueLocally) => loadWeight(valueLocally)}
                            getOptionLabel={(option) => option ? option.toString() : ""}
                            renderInput={(params) => <TextField {...params} label="Weight" />}
                        />
                        <Autocomplete
                            sx={{ marginTop: '8px' }}
                            disablePortal
                            value={reps}
                            id="combo-box-demo"
                            options={repsOptions}
                            onChange={(e, value) => changeResult({ reps: parseInt((value || 0).toString()), weight: parseFloat(weight), open })}
                            onInputChange={(e, valueLocally) => setReps(valueLocally)}
                            getOptionLabel={(option) => option ? option.toString() : ""}
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
                            confirm={handleDelete}
                            closeDialog={() => setIsDialog(false)}
                        />
                    </>
            }
        </>
    );
}

export default AddResultValuesBox;