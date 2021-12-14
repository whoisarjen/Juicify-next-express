import { expectLoggedIN } from "../utils/checkAuth";

const Workout = () => {
  expectLoggedIN();

  return <div className="workout">Workout</div>;
};

export default Workout;
