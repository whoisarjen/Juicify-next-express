export default interface DailyMeasurementProps {
    _id: string,
    user_ID: string,
    whenAdded: Date,
    nutrition_diary?: Array<any>,
    workout_result?: Array<any>,
    weight?: number,
    neck?: number,
    shoulders?: number,
    chest?: number,
    biceps?: number,
    waist?: number,
    hips?: number,
    thigh?: number,
    calf?: number,
    water?: number,
    weight_description?: string
}