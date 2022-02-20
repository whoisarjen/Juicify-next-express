import useBoxWorkout from './useBoxWorkout';
import BaseBoxWorkout from './BoxWorkout';

export interface BoxWorkoutProps {
    title?: string,
    description?: string,
    route: string,
    type: number,
    isNotSaved?: boolean,
    whenAdded?: string
}

const BoxWorkout = ({ title = '', description = '', route, type, isNotSaved, whenAdded }: BoxWorkoutProps) => {
    const props = useBoxWorkout({ title, description, route, type, isNotSaved, whenAdded })
    
    return <BaseBoxWorkout {...props} />
}

export default BoxWorkout;