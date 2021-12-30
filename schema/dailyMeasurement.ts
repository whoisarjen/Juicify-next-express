const schema = (object, _id, when: any, user_ID: string) => {
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