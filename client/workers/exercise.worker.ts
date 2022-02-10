import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { cleanCache, setSocketUpdated, synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, name } }) => {
    try {
        console.log(`Worker ${name} is starting the job in ${navigator.onLine}`)
        if (navigator.onLine && socketUpdated > (await getIndexedDBbyID('socketUpdated', 'exercise')).time || await getIndexedDBbyID('whatToUpdate', 'exercise')) {
            await synchronizationController({
                isNewValueInDB: socketUpdated > (await getIndexedDBbyID('socketUpdated', 'exercise')).time,
                where: 'exercise',
                updateDailyKey: 'workout_result',
                updateDailyKeyLevel2: 'results',
                updateDailyKeyLevel3: '_id',
                whatToUpdate: 'workout_plan',
                whatToUpdateKey: 'exercises',
                whatToUpdateKeyLevel2: '_id',
            });
            await cleanCache('checked_exercise')
            await setSocketUpdated('exercise')
        }
        console.log(`Worker ${name} is done!`)
    } catch (error: any) {
        console.log(`Worker ${name} ended with error! ${error}`)
    } finally {
        close()
    }
};

export { }