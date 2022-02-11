import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, updated } }) => {
    try {
        console.log(`WorkoutPlan_worker is starting...`)
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
        console.log(`WorkoutPlan_worker is done!`)
    } catch (error: any) {
        console.log(`WorkoutPlan_worker ended with error! ${error}`)
    }
};

export { }