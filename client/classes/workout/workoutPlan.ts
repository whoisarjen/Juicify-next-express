import ExerciseProps from "../../interfaces/workout/exercise";
import WorkoutPlanProps from "../../interfaces/workout/workoutPlan";
import { addIndexedDB, deleteIndexedDB } from "../../utils/indexedDB";

export default class WorkoutPlan implements WorkoutPlanProps {
    constructor(
        public _id: string,
        public user_ID: string,
        public title?: string,
        public description?: string,
        public burnt?: number,
        public exercises?: Array<ExerciseProps>
    ) { }

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

    getSchema() {
        return {
            _id: this._id, 
            title: this.title || '', 
            description: this.description || '', 
            user_ID: this.user_ID,
            burnt: this.burnt || 0, 
            exercises: this.exercises || []
        }
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