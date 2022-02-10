import { store } from "../redux/store";
import { addIndexedDB, getIndexedDBbyID } from "../utils/indexedDB.utils";
import { synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async (message) => {
    const object = message.data
    console.log(`Socket Worker is starting the job in ${navigator.onLine} with this object`, object)
    if (navigator.onLine && object.lastUpdated.product > object.lastSynchronization || await getIndexedDBbyID('whatToUpdate', 'product')) {
        console.log('starting synchro of products...')
        await synchronizationController(object.lastUpdated.product > object.lastSynchronization, "product", 'nutrition_diary', 'product_ID', false, 'favourite_product', '_id', false);
        // await cleanCache('checked_product')
        console.log('done!')
        if (!store.getState().online.isOnline) await addIndexedDB("whatToUpdate", [{ "_id": "product" }]);
    }
};

export {}