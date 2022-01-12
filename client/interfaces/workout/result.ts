import ValueProps from "./value";

export default interface ResultProps {
    _id: string,
    name: string,
    values: Array<ValueProps>
}