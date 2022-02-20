import { useState } from "react";
import { ButtonMoreOptionsWorkoutResultProps } from ".";

const useButtonMoreOptionsWorkoutResult = ({ exercises, setExercises }: ButtonMoreOptionsWorkoutResultProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return { exercises, setExercises, handleClose, handleOpen, open }
}

export type useButtonMoreOptionsWorkoutResultProps = ReturnType<typeof useButtonMoreOptionsWorkoutResult>

export default useButtonMoreOptionsWorkoutResult;