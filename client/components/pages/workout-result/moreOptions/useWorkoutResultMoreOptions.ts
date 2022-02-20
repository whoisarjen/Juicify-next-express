import { useState } from "react";
import { WorkoutResultMoreOptionsProps } from ".";

const useWorkoutResultMoreOptions = ({ exercises, setExercises }: WorkoutResultMoreOptionsProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return { exercises, setExercises, handleClose, handleOpen, open }
}

export type useWorkoutResultMoreOptionsProps = ReturnType<typeof useWorkoutResultMoreOptions>

export default useWorkoutResultMoreOptions;