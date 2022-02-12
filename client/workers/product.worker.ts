import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { cleanCache, synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { socketUpdated, updated } }) => {
    try {
        console.log(`Product synchronization is starting...`)
        if (navigator.onLine && socketUpdated > updated || await getIndexedDBbyID('whatToUpdate', 'product')) {
            await synchronizationController({
                isNewValueInDB: socketUpdated > updated,
                where: 'product',
                updateDailyKey: 'nutrition_diary',
                updateDailyKeyLevel2: 'product_ID',
                updateDailyKeyLevel3: '',
                whatToUpdate: 'favourite_product',
                whatToUpdateKey: '_id',
                whatToUpdateKeyLevel2: '',
            });
            await cleanCache('checked_product')
        }
        postMessage(true)
        console.log(`Product synchronization is done!`)
    } catch (error: any) {
        console.log(`Product synchronization ended with error! ${error}`)
    }
};

export { }