import axios from "axios";
import { deleteThoseIDSfromDB, insertThoseIDStoDB, is_id, overwriteThoseIDSinDB } from "./db.utils";
import { addIndexedDB, deleteIndexedDB, getAllIndexedDB } from "./indexedDB.utils";

export const synchronizationController = async (
    { isNewValueInDB, where, updateDailyKey, updateDailyKeyLevel2, updateDailyKeyLevel3, whatToUpdate, whatToUpdateKey, whatToUpdateKeyLevel2 }:
        { isNewValueInDB: boolean, where: string, updateDailyKey: string, updateDailyKeyLevel2: string, updateDailyKeyLevel3: string, whatToUpdate: string, whatToUpdateKey: string, whatToUpdateKeyLevel2: string }) => {
    let deleted = []
    let changed = []
    let inserted = []
    let whereArray = await getAllIndexedDB(where)
    if (whereArray.length) {
        for (let i = 0; i < whereArray.length; i++) {
            if (!whereArray[i].notSAVED) {
                if (!(await is_id(whereArray[i]._id))) {
                    inserted.push(whereArray[i])
                } else if (whereArray[i].deleted) {
                    deleted.push(whereArray[i])
                } else if (whereArray[i].changed) {
                    changed.push(whereArray[i])
                }
            }
        }
    }
    console.log(`Is ${where} going to download new values?`, isNewValueInDB)
    let data: any = []
    if (isNewValueInDB) {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER}/synchronization`,
            { where },
            { withCredentials: true }
        );
        data = [...response.data]
        console.log(`${where} has downloaded new values`, data)


        // 1. compaore daily before everything


        //     if (data && data.length) {
        //         for (let i = 0; i < data.length; i++) {
        //             if (where == 'daily_measurement') {
        //                 if (data[i].workout_result && data[i].workout_result.length) {
        //                     for (let a = 0; a < data[i].workout_result.length; a++) {
        //                         await deleteIndexedDB("workout_result", data[i].workout_result[a]._id)
        //                     }
        //                 }
        //             }
        //             await deleteIndexedDB(where, data[i][where == 'daily_measurement' ? 'whenAdded' : '_id'])
        //         }
        //         await addIndexedDB(where, data)
        //         if (where == 'daily_measurement' && changed.length) {
        //             for (let a: number = changed.length - 1; a >= 0; a--) {
        //                 changed[a] = await createOneFromTwo(changed[a])
        //             }
        //         }
        //     }
    }

    // 2. insert etc.
    if (inserted.length) inserted = await insertThoseIDStoDB(where, inserted, updateDailyKey, updateDailyKeyLevel2, updateDailyKeyLevel3, whatToUpdate, whatToUpdateKey, whatToUpdateKeyLevel2)
    if (changed.length) changed = await overwriteThoseIDSinDB(where, changed)
    if (deleted.length) await deleteThoseIDSfromDB(where, deleted, isNewValueInDB)

    // 3. add loaded db but except the one who got already changed (inserted can be skipped)
    if (isNewValueInDB) {
        if (changed.length) {
            for (let i = 0; i < changed.length; i++) {
                for (let a = data.length - 1; a >= 0; a++) {
                    if (changed[i]._id == data[a]._id) {
                        data.splice(a, 1)
                        break;
                    }
                }
            }
        }
        if (deleted.length) {
            for (let i = 0; i < deleted.length; i++) {
                for (let a = data.length - 1; a >= 0; a++) {
                    if (deleted[i]._id == data[a]._id) {
                        data.splice(a, 1)
                        break;
                    }
                }
            }
        }
        if (data.length) {
            for (let a = 0; a < data.length; a++) {
                await deleteIndexedDB(where, data[a]._id)
            }
            await addIndexedDB(where, data)
        }
    }
    return true;
}

export const cleanCache = async (where: string) => {
    return new Promise(async resolve => {
        const cache = await getAllIndexedDB(where)
        if (cache && cache.length) {
            for (let i = 0; i < cache.length; i++) {
                await deleteIndexedDB(where, cache[i]._id)
            }
        }
        resolve(true)
    })
}

export const setSocketUpdated = async (where: string) => {
    await deleteIndexedDB('socketUpdated', where)
    await addIndexedDB('socketUpdated', [{
        where,
        time: new Date().getTime()
    }])
}