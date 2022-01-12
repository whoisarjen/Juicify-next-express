const schema = (object: any, _id: string, when: any, user_ID: string) => {
    if (!object) { // object can be undefinded, so we avoid issues like this
        object = false;
    }
    return {
        _id: object._id || _id,
        weight: object.weight || 0,
        whenAdded: object.whenAdded || new Date(when).toISOString(),
        user_ID: object.user_ID || user_ID,
        nutrition_diary: object.nutrition_diary || [],
        workout_result: object.workout_result || []
    };
}

export default schema;