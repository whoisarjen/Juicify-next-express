import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import { useState, useEffect } from 'react'
import ButtonPlus from '../../../../common/ButtonPlus'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DatePicker from '../../../../common/MobileDatePicker'
import { getShortDate } from '../../../../../utils/date.utils'
import { WorkoutPlanSchemaProps } from '../../../../../schema/workoutPlan.schema'
import { useCreateWorkoutResultprops } from './useCreateWorkoutResult'

const BaseCreateWorkoutResult = ({ open, setOpen, data, setWhenAdded, workoutPlanID, setWorkoutPlanID, createWorkoutResult }: useCreateWorkoutResultprops) => {

    if (!data || data.length == 0) {
        return <></>
    }

    return (
        <div>
            <ButtonPlus click={() => setOpen(true)} />
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
                                data?.length > 0 && data.map((plan: WorkoutPlanSchemaProps) =>
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

export default BaseCreateWorkoutResult;