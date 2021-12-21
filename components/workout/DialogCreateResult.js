import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react'
import ButtonPlus from '../common/ButtonPlus'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useWorkoutPlans from '../../hooks/useWorkoutPlans'

const DialogCreateResult = () => {
    const [open, setOpen] = useState(false);
    const [workoutPlanID, setWorkoutPlanID] = useState('');
    const data = useWorkoutPlans()

    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const handleChange = (event) => setWorkoutPlanID(event.target.value)

    const handleCreate = async () => {

    }

    useEffect(() => {
        if (data) {
            setWorkoutPlanID(data[0]._id)
        }
    }, [data])

    return (
        <div>
            <ButtonPlus click={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create result</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose workout plan for which you want to create result.
                    </DialogContentText>
                    <FormControl fullWidth sx={{ marginTop: '12px' }}>
                        <InputLabel id="demo-simple-select-label">Workout plan</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={workoutPlanID}
                            label="Workout plan"
                            onChange={handleChange}
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
                    <Button onClick={handleClose}>Deny</Button>
                    <Button onClick={handleCreate}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogCreateResult;