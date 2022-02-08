import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { FunctionComponent, useState } from 'react'
import AddExercises from './AddExercises'
import ExerciseProps from '../../interfaces/workout/exercise.interface';

interface AddResultMoreOptionsProps {
    exercises: Array<ExerciseProps>,
    setExercises: (arg0: Array<ExerciseProps>) => void
}

const AddResultMoreOptions: FunctionComponent<AddResultMoreOptionsProps> = ({ exercises, setExercises }) => {
    const [open, setOpen] = useState(false);
    const [isAddDialog, setIsAddDialog] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const actions = [
        {
            icon: <FitnessCenterIcon />,
            name: 'Exercise',
            click: () => setIsAddDialog(true)
        },
    ];

    return (
        <SpeedDial
            ariaLabel="Manage result"
            sx={{ position: 'fixed', bottom: 60, left: 16, }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipPlacement="right"
                    tooltipOpen
                    onClick={action.click}
                />
            ))}
            <AddExercises
                isAddDialog={isAddDialog}
                skipThoseIDS={exercises}
                closeDialog={() => setIsAddDialog(false)}
                addThoseExercises={setExercises}
            />
        </SpeedDial>
    );
}

export default AddResultMoreOptions;