import { refreshKey } from "../redux/features/key.slice";
import { store } from "../redux/store";
import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, updated } }) => {
    try {
        console.log(`DailyMeasurement_worker is starting the job with updated ${updated}`)
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
            store.dispatch(refreshKey('daily_measurement'))
        }
        console.log(`DailyMeasurement_worker is done!`)
    } catch (error: any) {
        console.log(`DailyMeasurement_worker ended with error! ${error}`)
    } finally {
        close()
    }
};

export { }