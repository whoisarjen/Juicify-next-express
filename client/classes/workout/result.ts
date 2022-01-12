import ResultProps from "../../interfaces/workout/result";
import ValueProps from "../../interfaces/workout/value";

export default class Result implements ResultProps {
    constructor(
        public _id: string,
        public name: string,
        public values: Array<ValueProps>
    ) { }
}