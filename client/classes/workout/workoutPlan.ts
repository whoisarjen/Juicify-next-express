import ExerciseProps from "../../interfaces/workout/exercise";
import WorkoutPlanProps from "../../interfaces/workout/workoutPlan";
import { addIndexedDB, deleteIndexedDB } from "../../utils/indexedDB";

export default class WorkoutPlan implements WorkoutPlanProps {
    _id: string = 'XD' + Math.random();
    user_ID: string = '';
    title?: string = '';
    description?: string = '';
    burnt?: number = 0;
    exercises?: ExerciseProps[] = [];

    constructor(value: WorkoutPlanProps) {
        const self: any = this;
        const valueObject: any = value;
        Object.keys(value).forEach((key: string) => {
            self[key] = valueObject[key]
        })
    }

    autoSave() {
        (async () => {
            await deleteIndexedDB('workout_plan', this._id)
            await addIndexedDB('workout_plan', [{
                _id: this._id,
                title: this.title,
                description: this.description,
                user_ID: this.user_ID,
                burnt: this.burnt,
                exercises: this.exercises,
                notSaved: true
            }])
        })()
    }

    prepareForDB() {
        let object = {
            _id: this._id,
            title: this.title,
            description: this.description,
            user_ID: this.user_ID,
            burnt: this.burnt,
            exercises: this.exercises
        }

        if (!object.description) {
            delete object.description
        }

        if (!object.burnt) {
            delete object.burnt
        }

        return object
    }
}