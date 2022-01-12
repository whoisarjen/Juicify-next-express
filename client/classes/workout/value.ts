import ValueProps from "../../interfaces/workout/value";

export default class Value implements ValueProps {
    open?: boolean = false;
    reps: number = 0;
    weight: number = 0;

    constructor(value: ValueProps) {
        const self: any = this;
        const valueObject: any = value;
        Object.keys(value).forEach((key: string) => {
            self[key] = valueObject[key]
        })
    }
}