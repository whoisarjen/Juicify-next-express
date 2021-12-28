import { FunctionComponent } from "react";
import { expectLoggedIN } from "../utils/checkAuth";

const Macronutrients: FunctionComponent = () => {
    expectLoggedIN()

    return (
        <div>
            Macronutrients
        </div>
    )
}

export default Macronutrients;