import { FunctionComponent } from "react";

interface countCaloriesProps {
    p: any,
    c: any, 
    f: any,
    ethanol: any,
    how_many: any,
    calories: any
}

const countCalories: FunctionComponent<countCaloriesProps> = ({ p = 0, c = 0, f = 0, ethanol = 0, how_many = 1, calories = 0}): any => {
    if (calories) {
        return parseInt(calories)
    } else {
        let response: any = p * how_many * 4 + c * how_many * 4 + f * how_many * 9 + ethanol * how_many * 7
        return parseInt(response)
    }
}

export default countCalories;