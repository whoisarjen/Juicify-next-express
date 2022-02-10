import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { cleanCache, synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, updated } }) => {
    try {
        console.log(`Exercise_worker is starting the job with updated ${updated}`)
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
        console.log(`Exercise_worker is done!`)
    } catch (error: any) {
        console.log(`Exercise_worker ended with error! ${error}`)
    } finally {
        close()
    }
};

export { }