import ExerciseProps from '../../interfaces/workout/exercise'

export default class Exercise implements ExerciseProps{
    constructor(
        public _id: string,
        public name: string,
        public l: number,
        public user_ID?: string
    ){}
}