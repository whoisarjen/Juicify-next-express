import axios from "axios";
import DailyMeasurementProps from "../interfaces/dailyMeasurement.interface";
import { createOneFromTwo } from "./dailyMeasurement.utils";
import { deleteThoseIDSfromDB, insertThoseIDStoDB, is_id, overwriteThoseIDSinDB } from "./db.utils";
import { addIndexedDB, deleteIndexedDB, getAllIndexedDB, putIndexedDB } from "./indexedDB.utils";

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
                }
                if (whereArray[i].deleted) {
                    deleted.push(whereArray[i])
                }
                if (whereArray[i].changed) {
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

        // 1. compaore changed daily before everything
        if (where == 'daily_measurement' && data && data.length) {
            for (let i = 0; i < data.length; i++) {
                if (changed.length) {
                    for (let a: number = changed.length - 1; a >= 0; a--) {
                        if (data[i].whenAdded == changed[a].whenAdded) {
                            changed[a] = await createOneFromTwo(changed[a], data[i])
                            break;
                        }
                    }
                }
            }
        }
    }

    // 2. insert etc.
    console.log(`${where} starting Promise all with: ${inserted.length} | ${changed.length} | ${deleted.length}`)
    await Promise.all([
        inserted.length && await insertThoseIDStoDB(where, inserted, updateDailyKey, updateDailyKeyLevel2, updateDailyKeyLevel3, whatToUpdate, whatToUpdateKey, whatToUpdateKeyLevel2),
        changed.length && await overwriteThoseIDSinDB(where, changed),
        deleted.length && await deleteThoseIDSfromDB(where, deleted),
    ])
        .then(async (promiseResponse: any) => {
            console.log(`${where} ended promise with arrays: ${promiseResponse[0]} | ${promiseResponse[1]} | ${promiseResponse[2]}`)
            inserted = [...(promiseResponse[0] ? [promiseResponse[0]] : [])]
            changed = [...(promiseResponse[1] ? [promiseResponse[1]] : [])]
            deleted = [...(promiseResponse[2] ? [promiseResponse[2]] : [])]
            // 3. add loaded db but except the one who got already changed (inserted can NOT be skipped)
            if (isNewValueInDB) {
                if (inserted.length) {
                    for (let i = 0; i < inserted.length; i++) {
                        for (let a = data.length - 1; a >= 0; a++) {
                            if (inserted[i]._id == data[a]._id) {
                                data.splice(a, 1)
                                break;
                            }
                        }
                    }
                }
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
                        await deleteIndexedDB(where, data[a][where == 'daily_measurement' ? 'whenAdded' : '_id'])
                    }
                    await addIndexedDB(where, data)
                }
            }
        })
        .catch((error: any) => {
            console.log(error)
            throw error;
        })
        .finally(() => true)
}

export const cleanCache = async (where: string) => {
    const cache = await getAllIndexedDB(where)
    if (cache && cache.length) {
        for (let i = 0; i < cache.length; i++) {
            await deleteIndexedDB(where, cache[i]._id)
        }
    }
    return true;
}

export const handleUpdateDailyKey = async ({ updateDailyKey, updateDailyKeyLevel2, updateDailyKeyLevel3, arrayIDSbeforeInsert, array }:
    { updateDailyKey?: string, updateDailyKeyLevel2?: string, updateDailyKeyLevel3?: string, arrayIDSbeforeInsert: Array<string>, array: Array<any> }) => {
    if (updateDailyKey) {
        const dailyArray = await getAllIndexedDB('daily_measurement')
        if (dailyArray && dailyArray.length && updateDailyKeyLevel2) {
            for (let i = 0; i < array.length; i++) {
                for (let a = 0; a < dailyArray.length; a++) {
                    let checker = false
                    for (let b = 0; b < dailyArray[a][updateDailyKey].length; b++) {
                        if (!updateDailyKeyLevel3) {
                            if (dailyArray[a][updateDailyKey][b][updateDailyKeyLevel2] == arrayIDSbeforeInsert[i]) {
                                dailyArray[a][updateDailyKey][b][updateDailyKeyLevel2] = array[i]._id
                                checker = true;
                            }
                        } else {
                            if (dailyArray[a][updateDailyKey][b][updateDailyKeyLevel2] && dailyArray[a][updateDailyKey][b][updateDailyKeyLevel2].length) {
                                for (let c = 0; c < dailyArray[a][updateDailyKey][b][updateDailyKeyLevel2].length; c++) {
                                    if (dailyArray[a][updateDailyKey][b][updateDailyKeyLevel2][c][updateDailyKeyLevel3] == arrayIDSbeforeInsert[i]) {
                                        dailyArray[a][updateDailyKey][b][updateDailyKeyLevel2][c][updateDailyKeyLevel3] = array[i]._id
                                        checker = true;
                                    }
                                }
                            }
                        }
                    }
                    if (checker) {
                        await deleteIndexedDB('daily_measurement', dailyArray[a].whenAdded)
                        await addIndexedDB('daily_measurement', [dailyArray[a]])
                    }
                }
            }
        }
    }
    return true;
}

export const handleUpdateKey = async ({ whatToUpdate, whatToUpdateKey, whatToUpdateKeyLevel2, arrayIDSbeforeInsert, array }:
    { whatToUpdate?: string, whatToUpdateKey?: string, whatToUpdateKeyLevel2?: string, arrayIDSbeforeInsert: Array<string>, array: Array<any> }) => {
    if (whatToUpdate) {
        const cache = await getAllIndexedDB(whatToUpdate)
        if (cache.length && whatToUpdateKey) {
            for (let i = 0; i < array.length; i++) {
                for (let a = 0; a < cache.length; a++) {
                    let count = false;
                    if (!whatToUpdateKeyLevel2) {
                        if (cache[a][whatToUpdateKey] == arrayIDSbeforeInsert[i]) {
                            await putIndexedDB(whatToUpdate, cache[a]._id, whatToUpdateKey, array[i]._id)
                        }
                    } else {
                        if (cache[a][whatToUpdateKey] && cache[a][whatToUpdateKey].length) {
                            for (let b = 0; b < cache[a][whatToUpdateKey].length; b++) {
                                if (cache[a][whatToUpdateKey][b][whatToUpdateKeyLevel2] == arrayIDSbeforeInsert[i]) {
                                    cache[a][whatToUpdateKey][b][whatToUpdateKeyLevel2] = array[i]._id
                                    count = true;
                                }
                            }
                        }
                    }
                    if (count) {
                        await deleteIndexedDB(whatToUpdate, cache[a]._id)
                        await addIndexedDB(whatToUpdate, [cache[a]])
                    }
                }
            }
        }
    }
    return true;
}