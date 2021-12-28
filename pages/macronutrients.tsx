import { FunctionComponent } from "react";
import { expectLoggedIN } from "../utils/checkAuth";

const Macronutrients: FunctionComponent = () => {
    expectLoggedIN()

    return (
        <div>
            <div className="title">Macronutrients</div>
        </div>
    )
}

export default Macronutrients;