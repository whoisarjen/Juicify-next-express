import { FunctionComponent } from "react";
import { expectLoggedIN } from "../utils/checkAuth";

const Statistics: FunctionComponent = () => {
    expectLoggedIN();
    return (
        <div>
            Statistics
        </div>
    )
}

export default Statistics;