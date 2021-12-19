import useWorkoutPlan from "../../../hooks/useWorkoutPlan";
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const WorkoutPlansID = () => {
    const data = useWorkoutPlan()

    const handleDelete = async () =>{
        
    }

    return (
        <div className="workoutPlansID">
            Workout plans ID
            <TextField
                id="outlined-basic"
                label="Name of plan"
                variant="outlined"
                sx={{ width: '100%', marginTop: '10px' }}
            />
            <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                sx={{ width: '100%', marginTop: '10px' }}
            />
            <TextField
                id="outlined-basic"
                label="Burnt calories"
                variant="outlined"
                sx={{ width: '100%', marginTop: '10px' }}
            />

            Sort change on button click?

            <Stack direction="column" spacing={1}>
                <Chip
                    label="Custom delete icon"
                    onDelete={handleDelete}
                    avatar={<SwapVertIcon/>}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        padding: '0 5px',
                        height: '44px',
                        marginTop: '10px'
                    }}
                />
                <Chip
                    label="Custom delete icon"
                    onDelete={handleDelete}
                    avatar={<SwapVertIcon/>}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        padding: '0 5px',
                        height: '44px',
                        marginTop: '10px'
                    }}
                />
                <Chip
                    label="Custom delete icon"
                    onDelete={handleDelete}
                    avatar={<SwapVertIcon/>}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        padding: '0 5px',
                        height: '44px',
                        marginTop: '10px'
                    }}
                />
                <Chip
                    label="Custom delete icon"
                    onDelete={handleDelete}
                    avatar={<SwapVertIcon/>}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        padding: '0 5px',
                        height: '44px',
                        marginTop: '10px'
                    }}
                />
                <Chip
                    label="Custom delete icon"
                    onDelete={handleDelete}
                    avatar={<SwapVertIcon/>}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        padding: '0 5px',
                        height: '44px',
                        marginTop: '10px'
                    }}
                />
                <Chip
                    label="Custom delete icon"
                    onDelete={handleDelete}
                    avatar={<SwapVertIcon/>}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        padding: '0 5px',
                        height: '44px',
                        marginTop: '10px'
                    }}
                />
                <Chip
                    label="Custom delete icon"
                    onDelete={handleDelete}
                    avatar={<SwapVertIcon/>}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        padding: '0 5px',
                        height: '44px',
                        marginTop: '10px'
                    }}
                />
            </Stack>
        </div>
    );
}

export default WorkoutPlansID;