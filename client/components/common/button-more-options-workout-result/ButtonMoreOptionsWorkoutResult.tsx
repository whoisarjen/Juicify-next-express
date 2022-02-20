import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddExercises from '../dialog-add-exercise'
import { useButtonMoreOptionsWorkoutResultProps } from './useButtonMoreOptionsWorkoutResult';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const BaseButtonMoreOptionsWorkoutResult = ({ exercises, setExercises, open, setOpen }: useButtonMoreOptionsWorkoutResultProps) => {

    const actions = [
        {
            icon: <AddExercises skipThoseIDS={exercises} addThoseExercises={setExercises}><FitnessCenterIcon /></AddExercises>,
            name: 'Exercise',
            click: () => console.log()
        },
    ];

    return (
        <SpeedDial
            data-testid="BaseButtonMoreOptionsWorkoutResult"
            ariaLabel="Manage result"
            sx={{ position: 'fixed', bottom: 60, left: 16, }}
            icon={<SpeedDialIcon />}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
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
        </SpeedDial>
    );
}

export default BaseButtonMoreOptionsWorkoutResult;