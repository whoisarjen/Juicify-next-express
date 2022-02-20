import { useState } from "react";
import { ButtonMoreOptionsWorkoutResultProps } from ".";

const useButtonMoreOptionsWorkoutResult = ({ exercises, setExercises }: ButtonMoreOptionsWorkoutResultProps) => {
    const [open, setOpen] = useState(false);

    return { exercises, setExercises, open, setOpen }
}

export type useButtonMoreOptionsWorkoutResultProps = ReturnType<typeof useButtonMoreOptionsWorkoutResult>

export default useButtonMoreOptionsWorkoutResult;