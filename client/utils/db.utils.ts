import { getIndexedDBbyID, addIndexedDB, deleteIndexedDB, putIndexedDB, getAllIndexedDB, putInformationAboutNeededUpdate } from "./indexedDB.utils"
import { store } from '../redux/store'
import axios from "axios"
import { setIsOnline } from "../redux/features/online.slice"
import { prepareToSend } from "./dailyMeasurement.utils"
import { refreshKey } from "../redux/features/key.slice"

export const loadValueByLogin = async (where: string, find: any, login: string = find) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER}/guest/${where}`,
            {
                find,
                login
            },
            { withCredentials: true }
        );
        return res.data;
    } catch (error: any) {
        const errorCode = error.toJSON().status;
        if (errorCode === 403) {
            window.location.replace(`${window.location.origin}/403`)
        }
        if (errorCode === 404) {
            window.location.replace(`${window.location.origin}/404`)
        }
    }
}

const insertThoseIDStoDBOFFLINE = async (array: Array<any>) => {
    for (let i = 0; i < array.length; i++) {
        array[i]._id = "XD" + new Date().getTime() + i
    }
}

export const insertThoseIDStoDB = async (where: string, sentArray: Array<any>, updateDailyKey?: string, updateDailyKeyLevel2?: string, updateDailyKeyLevel3?: string, whatToUpdate?: string, whatToUpdateKey?: string, whatToUpdateKeyLevel2?: string): Promise<any> => {
    let array = JSON.parse(JSON.stringify(sentArray))
    const copyArray = JSON.parse(JSON.stringify(array));
    const arrayIDSbeforeInsert = []
    let updateDailyKeyArray: any = false
    let whatToUpdateArray: any = false
    for (let i = 0; i < array.length; i++) {
        if (array[i]._id) {
            await deleteIndexedDB(where, array[i][where == 'daily_measurement' ? 'whenAdded' : '_id'])
            arrayIDSbeforeInsert.push(array[i]._id)
            if (!await is_id(array[i]._id)) {
                delete array[i]._id
            }
        }
        if (where == 'daily_measurement') {
            array[i].whenAdded = new Date(array[i].whenAdded).toISOString()
            if (store.getState().online.isOnline || await isWorker()) {
                array[i] = await prepareToSend(array[i], true)
            }
        }
    }
    if (store.getState().online.isOnline || await isWorker()) {
        if (updateDailyKey) {
            updateDailyKeyArray = await getAllIndexedDB('daily_measurement')
        }
        if (whatToUpdate) {
            whatToUpdateArray = await getAllIndexedDB(whatToUpdate)
        }
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/insert/${where}`,
                { array },
                { withCredentials: true }
            );
            array = JSON.parse(JSON.stringify(res.data));
            if (where == 'daily_measurement') {
                for (let i = 0; i < array.length; i++) {
                    if (await getIndexedDBbyID(where, array[i].whenAdded)) {
                        await deleteIndexedDB(where, array[i].whenAdded) // Server can return existing date
                    }
                }
            }
            if (updateDailyKey && updateDailyKeyArray.length && updateDailyKeyLevel2) {
                for (let i = 0; i < array.length; i++) {
                    for (let a = 0; a < updateDailyKeyArray.length; a++) {
                        let checker = 0
                        for (let b = 0; b < updateDailyKeyArray[a][updateDailyKey].length; b++) {
                            if (!updateDailyKeyLevel3) {
                                if (updateDailyKeyArray[a][updateDailyKey][b][updateDailyKeyLevel2] == arrayIDSbeforeInsert[i]) {
                                    updateDailyKeyArray[a][updateDailyKey][b][updateDailyKeyLevel2] = array[i]._id
                                    checker++
                                }
                            } else {
                                // 
                                if (updateDailyKeyArray[a][updateDailyKey][b][updateDailyKeyLevel2] && updateDailyKeyArray[a][updateDailyKey][b][updateDailyKeyLevel2].length) {
                                    for (let c = 0; c < updateDailyKeyArray[a][updateDailyKey][b][updateDailyKeyLevel2].length; c++) {
                                        if (updateDailyKeyArray[a][updateDailyKey][b][updateDailyKeyLevel2][c][updateDailyKeyLevel3] == arrayIDSbeforeInsert[i]) {
                                            updateDailyKeyArray[a][updateDailyKey][b][updateDailyKeyLevel2][c][updateDailyKeyLevel3] = array[i]._id
                                            checker++
                                        }
                                    }
                                }
                            }
                        }
                        if (checker > 0) {
                            await deleteIndexedDB('daily_measurement', updateDailyKeyArray[a].whenAdded)
                            await addIndexedDB('daily_measurement', [updateDailyKeyArray[a]])
                        }
                    }
                }
            }
            if (whatToUpdate && whatToUpdateArray.length && whatToUpdateKey) {
                let count = 0;
                for (let i = 0; i < array.length; i++) {
                    for (let a = 0; a < whatToUpdateArray.length; a++) {
                        if (!whatToUpdateKeyLevel2) {
                            if (whatToUpdateArray[a][whatToUpdateKey] == arrayIDSbeforeInsert[i]) {
                                await putIndexedDB(whatToUpdate, whatToUpdateArray[a][whatToUpdateKey]._id, whatToUpdateKey, array[i]._id)
                            }
                        } else {
                            if (whatToUpdateArray[a][whatToUpdateKey] && whatToUpdateArray[a][whatToUpdateKey].length) {
                                for (let b = 0; b < whatToUpdateArray[a][whatToUpdateKey].length; b++) {
                                    if (whatToUpdateArray[a][whatToUpdateKey][b][whatToUpdateKeyLevel2] == arrayIDSbeforeInsert[i]) {
                                        whatToUpdateArray[a][whatToUpdateKey][b][whatToUpdateKeyLevel2] = array[i]._id
                                        count++;
                                    }
                                }
                            }
                        }
                    }
                }
                if (count) {
                    for (let a = 0; a < whatToUpdateArray.length; a++) {
                        await deleteIndexedDB(whatToUpdate, whatToUpdateArray[a]._id)
                    }
                    await addIndexedDB(whatToUpdate, whatToUpdateArray)
                }
            }
        } catch (error: any) {
            if (await isWorker()) {
                array = await insertThoseIDStoDBOFFLINE(array)
            } else {
                console.log(error)
                store.dispatch(setIsOnline(false))
                await putInformationAboutNeededUpdate(where);
                return await insertThoseIDStoDB(where, copyArray, updateDailyKey, updateDailyKeyLevel2, updateDailyKeyLevel3, whatToUpdate, whatToUpdateKey, whatToUpdateKeyLevel2)
            }
        }
    } else {
        array = await insertThoseIDStoDBOFFLINE(array)
    }
    await addIndexedDB(where, array)
    if (!await isWorker()) store.dispatch(refreshKey(where))
    return array
}

export const overwriteThoseIDSinDB = async (where: string, sentArray: Array<any>): Promise<Array<any>> => {
    let array = JSON.parse(JSON.stringify(sentArray))
    const isOnline = store.getState().online.isOnline
    let originalArray = JSON.parse(JSON.stringify(array.map((x: any) => {
        x.changed = true
        return x
    })));
    for (let i = 0; i < array.length; i++) {
        await deleteIndexedDB(where, array[i][where == 'daily_measurement' ? 'whenAdded' : '_id'])
        if (where == 'daily_measurement') {
            array[i].whenAdded = new Date(array[i].whenAdded).toISOString()
            if (isOnline || await isWorker()) {
                array[i] = await prepareToSend(array[i], true)
            }
        }
    }
    if (isOnline || await isWorker()) {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/update/${where}`,
                { array },
                { withCredentials: true }
            );
            let originalSentArray = JSON.parse(JSON.stringify(array));
            array = JSON.parse(JSON.stringify(res.data));
            if (where == 'daily_measurement') {
                for (let i = 0; i < originalSentArray.length; i++) {
                    if (originalSentArray[i].nutrition_diary && originalSentArray[i].nutrition_diary.length > 0) {
                        for (let a = 0; a < originalSentArray[i].nutrition_diary.length; a++) {
                            originalSentArray[i].nutrition_diary[a]._id = array[i].nutrition_diary[a]._id
                            array[i].nutrition_diary[a] = originalSentArray[i].nutrition_diary[a]
                        }
                    }
                }
            }
        } catch (error: any) {
            if (!await isWorker()) {
                console.log(error)
                store.dispatch(setIsOnline(false))
                await putInformationAboutNeededUpdate(where);
                return await overwriteThoseIDSinDB(where, originalArray)
            }
        }
    }
    await addIndexedDB(where, array)
    if (!await isWorker()) store.dispatch(refreshKey(where))
    return array;
}

export const deleteThoseIDSfromDB = async (where: string, array: Array<any>) => {
    try {
        if (!store.getState().online.isOnline && !await isWorker()) {
            throw 'User is offline. Skip to catch method';
        }
        for (let i = 0; i < array.length; i++) {
            array[i].deleted = true;
            if (!await is_id(array[i]._id)) {
                await deleteIndexedDB(where, array[i]._id)
                array.splice(i, 1)
            } else if (where == 'daily_measurement') {
                array[i] = await prepareToSend(array[i], true)
            }
        }
        if (!array.length) return true;
        await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER}/delete/${where}`,
            { array },
            { withCredentials: true }
        );
        for (let i = 0; i < array.length; i++) {
            await deleteIndexedDB(where, array[i]._id)
        }
    } catch (error: any) {
        console.log(error)
        await addIndexedDB(where, array)
        if (!await isWorker()) {
            store.dispatch(setIsOnline(false))
            await putInformationAboutNeededUpdate(where);
        }
    } finally {
        if (!await isWorker()) store.dispatch(refreshKey(where))
        return array;
    }
}

export const is_id = async (_id: string) => (_id).substring(0, 2) != "XD" ? true : false;

export const isWorker = async () => {
    try {
        if (window) {
            return false;
        }
    } catch {
        return true;
    }
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.")
}
