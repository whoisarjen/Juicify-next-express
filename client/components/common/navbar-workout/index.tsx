import useNavbarWorkout from "./useNavbarWorkout";
import BaseNavbarWorkout from "./NavbarWorkout";

export interface NavbarWorkoutProp {
    title: string,
    where: string,
    isLoading: boolean,
    saveWorkout: () => void,
    deleteWorkout: () => void
}

const NavbarWorkout = ({ title, where, isLoading, saveWorkout, deleteWorkout }: NavbarWorkoutProp) => {
    const props = useNavbarWorkout({ title, where, isLoading, saveWorkout, deleteWorkout })

    return <BaseNavbarWorkout {...props} />
}

export default NavbarWorkout;