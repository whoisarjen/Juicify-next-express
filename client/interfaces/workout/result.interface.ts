import ValueProps from "./value.interface";

export default interface ResultProps {
    _id?: string,
    name?: string,
    values: Array<ValueProps>
}