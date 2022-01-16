import exerciseModel from '../models/exercise'

// const cache = {}

export default async (object: any) => {
    return new Promise(resolve => {
        // object = JSON.parse(JSON.stringify(object));
        // if(cache[object._id]){
        //     object.name = cache[object._id].name
        //     return resolve(object);
        // }
        exerciseModel.findOne({ _id: object._id })
            .then((exercise: any) => {
                // exercise = JSON.parse(JSON.stringify(exercise));
                // if(exercise){
                //     object.name = exercise.name
                //     cache[object._id] = {
                //         "_id": exercise._id,
                //         "name": exercise.name
                //     }
                // }
                console.log('loadExercise', { ...object, name: exercise.name })
                resolve({ ...object, name: exercise.name })
            })
    });
}