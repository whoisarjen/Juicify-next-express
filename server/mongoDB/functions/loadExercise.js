const cache = {};

module.exports = async function loadExercise(object) {
  return new Promise((resolve) => {
    object = JSON.parse(JSON.stringify(object));
    if (cache[object._id]) {
      object.name = cache[object._id].name;
      return resolve(object);
    }
    const Model = require("../models/exercise");
    Model.findOne({ _id: object._id }).then(function (exercise) {
      exercise = JSON.parse(JSON.stringify(exercise));
      if (exercise) {
        object.name = exercise.name;
        cache[object._id] = {
          _id: exercise._id,
          name: exercise.name,
        };
      }
      resolve(object);
    });
  });
};
