import { FunctionComponent } from "react";
import { expectLoggedIN } from "../utils/checkAuth";

const Coach: FunctionComponent = () => {
  expectLoggedIN()

  return <div className="coach">Coach</div>;
};

export default Coach;
