import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, updated } }) => {
    try {
        console.log(`DailyMeasurement_worker is starting...`)
        if (navigator.onLine && socketUpdated > updated || await getIndexedDBbyID('whatToUpdate', 'daily_measurement')) {
            await synchronizationController({
                isNewValueInDB: socketUpdated > updated,
                where: 'daily_measurement',
                updateDailyKey: '',
                updateDailyKeyLevel2: '',
                updateDailyKeyLevel3: '',
                whatToUpdate: '',
                whatToUpdateKey: '',
                whatToUpdateKeyLevel2: '',
            });
        }
        postMessage(true)
        console.log(`DailyMeasurement_worker is done!`)
    } catch (error: any) {
        console.log(`DailyMeasurement_worker ended with error! ${error}`)
    }
};

export { }