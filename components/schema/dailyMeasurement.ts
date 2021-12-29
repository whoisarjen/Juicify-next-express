const dailyMeasurement = (_id, when: any, user_ID: string) => {
    return {
        _id: _id,
        whenAdded: new Date(when).toISOString(),
        user_ID: user_ID,
        nutrition_diary: [],
        workout_result: [],
    };
}

export default dailyMeasurement;