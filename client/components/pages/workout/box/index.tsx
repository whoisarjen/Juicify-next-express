import useWorkoutBox from './useWorkoutBox';
import BaseWorkoutBox from './WorkoutBox';

export interface WorkoutBoxProps {
    title?: string,
    description?: string,
    route: string,
    type: number,
    isNotSaved?: boolean,
    whenAdded?: string
}

const WorkoutBox = ({ title = '', description = '', route, type, isNotSaved, whenAdded }: WorkoutBoxProps) => {
    const props = useWorkoutBox({ title, description, route, type, isNotSaved, whenAdded })
    
    return <BaseWorkoutBox {...props} />
}

export default WorkoutBox;