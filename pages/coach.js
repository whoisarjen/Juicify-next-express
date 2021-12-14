import { expectLoggedIN } from "../utils/checkAuth";

const Coach = () => {
  expectLoggedIN();

  return <div className="coach">Coach</div>;
};

export default Coach;
