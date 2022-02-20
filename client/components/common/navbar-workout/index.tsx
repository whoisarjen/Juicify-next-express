import useWorkoutNavbar from "./useWorkoutNavbar";
import BaseWorkoutNavbar from "./WorkoutNavbar";

export interface WorkoutNavbarProp {
    title: string,
    where: string,
    isLoading: boolean,
    saveWorkout: () => void,
    deleteWorkout: () => void
}

const Navbar = ({ title, where, isLoading, saveWorkout, deleteWorkout }: WorkoutNavbarProp) => {
    const props = useWorkoutNavbar({ title, where, isLoading, saveWorkout, deleteWorkout })

    return <BaseWorkoutNavbar {...props} />
}

export default Navbar;