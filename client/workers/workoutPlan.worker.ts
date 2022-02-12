import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, updated } }) => {
    try {
        console.log(`Workout synchronization is starting...`)
        if (navigator.onLine && socketUpdated > updated || await getIndexedDBbyID('whatToUpdate', 'workout_plan')) {
            await synchronizationController({
                isNewValueInDB: socketUpdated > updated,
                where: 'workout_plan',
                updateDailyKey: 'workout_result',
                updateDailyKeyLevel2: '_id',
                updateDailyKeyLevel3: '',
                whatToUpdate: 'workout_result',
                whatToUpdateKey: 'workout_plan_ID',
                whatToUpdateKeyLevel2: '',
            });
        }
        postMessage(true)
        console.log(`Workout synchronization is done!`)
    } catch (error: any) {
        console.log(`Workout synchronization ended with error! ${error}`)
    }
};

export { }