import ExerciseProps from '../../interfaces/workout/exercise'

export default class Exercise implements ExerciseProps {
    _id: string = 'XD' + Math.random();
    name: string = '';
    l: number = 0;
    user_ID?: string;

    constructor(value: ExerciseProps) {
        const self: any = this;
        const valueObject: any = value;
        Object.keys(value).forEach((key: string) => {
            self[key] = valueObject[key]
        })
    }
}