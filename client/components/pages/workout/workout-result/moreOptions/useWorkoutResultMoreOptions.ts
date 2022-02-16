import { useState } from "react";
import { WorkoutResultMoreOptionsProps } from ".";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const useWorkoutResultMoreOptions = ({ exercises, setExercises }: WorkoutResultMoreOptionsProps) => {
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

    return { exercises, setExercises, isAddDialog, setIsAddDialog, handleClose, handleOpen, actions, open }
}

export type useWorkoutResultMoreOptionsProps = ReturnType<typeof useWorkoutResultMoreOptions>

export default useWorkoutResultMoreOptions;