import ResultProps from "../../interfaces/workout/result";
import ValueProps from "../../interfaces/workout/value";

export default class Result implements ResultProps {
    _id: string = 'XD' + Math.random();
    name: string = '';
    values: ValueProps[] = [];

    constructor(value: ResultProps) {
        const self: any = this;
        const valueObject: any = value;
        Object.keys(value).forEach((key: string) => {
            self[key] = valueObject[key]
        })
    }
}