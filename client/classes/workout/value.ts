import ValueProps from "../../interfaces/workout/value";

export default class Value implements ValueProps {
    constructor(
        public reps: number,
        public weight: number,
        public open?: boolean
    ) { }
}