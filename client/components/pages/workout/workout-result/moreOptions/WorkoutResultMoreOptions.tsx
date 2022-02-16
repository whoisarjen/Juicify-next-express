import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddExercises from '../../addExercise'
import { useWorkoutResultMoreOptionsProps } from './useWorkoutResultMoreOptions';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const BaseWorkoutResultMoreOptions = ({ exercises, setExercises, isAddDialog, setIsAddDialog, handleClose, handleOpen, open }: useWorkoutResultMoreOptionsProps) => {

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

export default BaseWorkoutResultMoreOptions;