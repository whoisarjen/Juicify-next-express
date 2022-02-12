import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import { useState, useEffect, FunctionComponent } from 'react'
import ButtonPlus from '../../common/ButtonPlus'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import { addIndexedDB } from '../../../utils/indexedDB.utils'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import useWorkoutPlans from '../../../hooks/useWorkoutPlans'
import DialogContentText from '@mui/material/DialogContentText'
import DatePicker from '../../common/MobileDatePicker'
import Link from 'next/link'
import { getShortDate } from '../../../utils/date.utils'
import { ExerciseSchemaProps } from '../../../schema/exercise.schema'
import { WorkoutPlanSchemaProps } from '../../../schema/workoutPlan.schema'
import { WorkoutResultSchemaProps } from '../../../schema/workoutResult.schema'

const DialogCreateResult: FunctionComponent = () => {
    const router = useRouter()
    const { data } = useWorkoutPlans()
    const [open, setOpen] = useState(false)
    const [whenAdded, setWhenAdded] = useState(new Date(getShortDate()))
    const [workoutPlanID, setWorkoutPlanID] = useState('')

    const createWorkoutResult = async () => {
        const workoutPlan = data.filter((workout: WorkoutResultSchemaProps) => workout._id === workoutPlanID)
        const createdID = 'XD' + new Date().getTime()
        let whenAddedChanged = new Date(whenAdded).toJSON().slice(0, 10)
        await addIndexedDB(
            'workout_result',
            [{
                ...(({ exercises, ...o }) => o)(workoutPlan[0]),
                ...{
                    description: '',
                    whenAdded: whenAddedChanged,
                    workout_plan_ID: workoutPlan[0]._id,
                    _id: createdID,
                    results: [
                        ...workoutPlan[0].exercises.map((exercise: ExerciseSchemaProps) => {
                            return {
                                ...exercise,
                                values: []
                            }
                        })
                    ]
                }
            }]
        )
        router.push(`/${router.query.login}/workout-results/${whenAddedChanged}/${createdID}`)
    }

    useEffect(() => {
        if (data && data.length > 0) {
            setWorkoutPlanID(data[0]._id)
        }
    }, [data])

    return (
        <div>
            {
                data &&
                (
                    data.length
                        ?
                        <ButtonPlus click={() => setOpen(true)} />
                        :
                        <Link href={`/${router.query.login}/workout-plans`}>
                            <a>
                                <div style={{ color: 'red', textDecoration: 'underline', textAlign: 'center', margin: '15px auto' }}>
                                    You need to create workout plan first
                                </div>
                            </a>
                        </Link>
                )
            }
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create result</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose workout plan for which you want to create result.
                    </DialogContentText>
                    <DatePicker change={(value) => setWhenAdded(value)} defaultDate={new Date(getShortDate())} />
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
                                data && data.map((plan: WorkoutPlanSchemaProps) =>
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