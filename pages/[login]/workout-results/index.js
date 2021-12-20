import ButtonPlus from "../../../components/common/ButtonPlus";

const WorkoutResults = () => {
  return (
    <div className="workoutResults">
    <div className="title">Workout results</div>
      <ButtonPlus click={console.log('asd')}/> // click, not onClick!
    </div>)
    ;
};

export default WorkoutResults;
