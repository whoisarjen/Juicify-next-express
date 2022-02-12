import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, updated } }) => {
    try {
        console.log(`Daily synchronization is starting...`)
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
        console.log(`Daily synchronization is done!`)
    } catch (error: any) {
        console.log(`Daily synchronization ended with error! ${error}`)
    }
};

export { }