import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { setSocketUpdated, synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, name } }) => {
    try {
        console.log(`Worker ${name} is starting the job in ${navigator.onLine}`)
        if (navigator.onLine && socketUpdated > (await getIndexedDBbyID('socketUpdated', 'daily_measurement')).time || await getIndexedDBbyID('whatToUpdate', 'daily_measurement')) {
            await synchronizationController({
                isNewValueInDB: socketUpdated > (await getIndexedDBbyID('socketUpdated', 'daily_measurement')).time,
                where: 'daily_measurement',
                updateDailyKey: '',
                updateDailyKeyLevel2: '',
                updateDailyKeyLevel3: '',
                whatToUpdate: '',
                whatToUpdateKey: '',
                whatToUpdateKeyLevel2: '',
            });
            await setSocketUpdated('daily_measurement')
        }
        console.log(`Worker ${name} is done!`)
    } catch (error: any) {
        console.log(`Worker ${name} ended with error! ${error}`)
    } finally {
        close()
    }
};

export { }