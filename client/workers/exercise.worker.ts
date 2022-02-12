import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { cleanCache, synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, updated } }) => {
    try {
        console.log(`Exercise synchronization is starting...`)
        if (navigator.onLine && socketUpdated > updated || await getIndexedDBbyID('whatToUpdate', 'exercise')) {
            await synchronizationController({
                isNewValueInDB: socketUpdated > updated,
                where: 'exercise',
                updateDailyKey: 'workout_result',
                updateDailyKeyLevel2: 'results',
                updateDailyKeyLevel3: '_id',
                whatToUpdate: 'workout_plan',
                whatToUpdateKey: 'exercises',
                whatToUpdateKeyLevel2: '_id',
            });
            await cleanCache('checked_exercise')
        }
        postMessage(true)
        console.log(`Exercise synchronization is done!`)
    } catch (error: any) {
        console.log(`Exercise synchronization ended with error! ${error}`)
    }
};

export { }