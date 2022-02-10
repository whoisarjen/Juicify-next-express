import { store } from "../redux/store";
import { cleanCache } from "../utils/db.utils";
import { addIndexedDB, getIndexedDBbyID } from "../utils/indexedDB.utils";
import { synchronizationController } from "../utils/synchronization.utils";

self.onmessage = async ({ data: { isNewValueInDB, name } }) => {
    console.log(`Worker ${name} is starting the job in ${navigator.onLine}`)
    if (navigator.onLine && isNewValueInDB || await getIndexedDBbyID('whatToUpdate', 'product')) {
        await synchronizationController(isNewValueInDB, "product", 'nutrition_diary', 'product_ID', false, 'favourite_product', '_id', false);
        await cleanCache('checked_product')
        if (!store.getState().online.isOnline) await addIndexedDB("whatToUpdate", [{ "_id": "product" }]);
    }
    console.log(`Worker ${name} is done!`)
};

export { }