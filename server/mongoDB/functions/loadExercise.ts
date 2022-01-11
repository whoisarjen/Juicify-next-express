const loadExercise = async (object: any) => {
    return new Promise(resolve => {
        let cache: any = {}
        object = JSON.parse(JSON.stringify(object));
        if(cache[object._id]){
            object.name = cache[object._id].name
            return resolve(object);
        }
        const Model = require('../models/exercise')
        Model.findOne({_id: object._id})
        .then(function(exercise: any){
            exercise = JSON.parse(JSON.stringify(exercise));
            if(exercise){
                object.name = exercise.name
                cache[object._id] = {
                    "_id": exercise._id,
                    "name": exercise.name
                }
            }
            resolve(object)
        })
    });
}

export default loadExercise;