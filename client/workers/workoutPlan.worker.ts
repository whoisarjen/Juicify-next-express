import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { setSocketUpdated, synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, name } }) => {
    try {
        console.log(`Worker ${name} is starting the job in ${navigator.onLine}`)
        if (navigator.onLine && socketUpdated > (await getIndexedDBbyID('socketUpdated', 'workout_plan')).time || await getIndexedDBbyID('whatToUpdate', 'workout_plan')) {
            await synchronizationController({
                isNewValueInDB: socketUpdated > (await getIndexedDBbyID('socketUpdated', 'workout_plan')).time,
                where: 'workout_plan',
                updateDailyKey: 'workout_result',
                updateDailyKeyLevel2: '_id',
                updateDailyKeyLevel3: '',
                whatToUpdate: 'workout_result',
                whatToUpdateKey: 'workout_plan_ID',
                whatToUpdateKeyLevel2: '',
            });
            await setSocketUpdated('workout_plan')
        }
        console.log(`${name} is done!`)
    } catch (error: any) {
        console.log(`${name} ended with error! ${error}`)
    } finally {
        close()
    }
};

export { }