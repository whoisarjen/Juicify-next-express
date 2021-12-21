import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import { useState, useEffect } from 'react'
import ButtonPlus from '../common/ButtonPlus'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import { addIndexedDB } from '../../utils/indexedDB'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import useWorkoutPlans from '../../hooks/useWorkoutPlans'
import DialogContentText from '@mui/material/DialogContentText'
import DatePicker from '../common/MobileDatePicker'

const DialogCreateResult = () => {
    const router = useRouter()
    const data = useWorkoutPlans()
    const [open, setOpen] = useState(false)
    const [whenAdded, setWhenAdded] = useState('')
    const [workoutPlanID, setWorkoutPlanID] = useState('')

    const createWorkoutResult = async () => {
        const workoutPlan = data.filter(workout => workout._id === workoutPlanID)
        const createdID = 'XD' + new Date().getTime()
        await addIndexedDB(
            'workout_result',
            [{
                ...workoutPlan[0],
                ...{
                    whenAdded: whenAdded,
                    workout_plan_ID: workoutPlan[0]._id,
                    _id: createdID,
                    results: [
                        ...workoutPlan[0].exercises.map(exercise => {
                            return {
                                ...exercise,
                                ...{
                                    values: []
                                }
                            }
                        })
                    ]
                }
            }]
        )
        router.push(`/${router.query.login}/workout-results/${whenAdded}/${createdID}`)
    }

    useEffect(() => {
        if (data) {
            setWorkoutPlanID(data[0]._id)
        }
    }, [data])

    return (
        <div>
            <ButtonPlus click={() => setOpen(true)} />
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create result</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose workout plan for which you want to create result.
                    </DialogContentText>
                    <DatePicker change={(value) => setWhenAdded(value)} />
                    <FormControl fullWidth sx={{ marginTop: '12px' }}>
                        <InputLabel id="demo-simple-select-label">Workout plan</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={workoutPlanID}
                            label="Workout plan"
                            onChange={(event) => setWorkoutPlanID(event.target.value)}
                        >
                            {
                                data && data.map(plan =>
                                    <MenuItem value={plan._id} key={plan._id}>{plan.title}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Deny</Button>
                    <Button onClick={createWorkoutResult}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogCreateResult