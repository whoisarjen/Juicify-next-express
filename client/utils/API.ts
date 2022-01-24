import { getIndexedDBbyID, addIndexedDB, deleteIndexedDB, putIndexedDB, getAllIndexedDB, putInformationAboutNeededUpdate } from "./indexedDB"
import { store } from '../redux/store'
import axios from "axios"
import { setIsOnline } from "../redux/features/onlineSlice"

const API = async (url: string, body: any): Promise<any> => {
    let response = {}
    let isSuccess = false
    console.log(url, body)
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER}${url}`,
            { ...body },
            { withCredentials: true }
        );
        response = res.data
        isSuccess = true
    } catch (error: any) {
        console.log(error)
    }
    return { response, isSuccess }
}

const loadValueByLogin = async (where: string, find: any, login: string = find) => {
    const { response, isSuccess } = await API(`/guest/${where}`, {
        find,
        login
    })
    if (!response.data) response.data = {}
    if (isSuccess) {
        console.log(`loadOneValueByLogin: ${response}`)
        return response
    } else {
        console.log('loadOneValueByLogin: server error')
        return response
    }
}

const insertThoseIDStoDB = async (where: string, sentArray: Array<any>, updateDailyKey: any = false, updateDailyKey2: any = false, updateDailyKey3: any = false, whatToUpdate: any = false, whatToUpdate2: any = false, whatToUpdate3: any = false): Promise<Array<any>> => {
    return new Promise(async resolve => {
        let array = JSON.parse(JSON.stringify(sentArray))
        const copyArray = JSON.parse(JSON.stringify(array));
        const isOnline = store.getState().online.isOnline;
        console.log(`insertThoseIDStoDB is online: ${isOnline}`)
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
                if (isOnline) {
                    array[i] = await prepareDailyToSend(array[i], true)
                }
            }
        }
        if (isOnline) {
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
                if (updateDailyKey && updateDailyKeyArray.length > 0) {
                    for (let i = 0; i < array.length; i++) {
                        for (let a = 0; a < updateDailyKeyArray.length; a++) {
                            let checker = 0
                            for (let b = 0; b < updateDailyKeyArray[a][updateDailyKey].length; b++) {
                                if (!updateDailyKey3) {
                                    if (updateDailyKeyArray[a][updateDailyKey][b][updateDailyKey2] == arrayIDSbeforeInsert[i]) {
                                        updateDailyKeyArray[a][updateDailyKey][b][updateDailyKey2] = array[i]._id
                                        checker++
                                    }
                                } else {
                                    // 
                                    if (updateDailyKeyArray[a][updateDailyKey][b][updateDailyKey2] && updateDailyKeyArray[a][updateDailyKey][b][updateDailyKey2].length) {
                                        for (let c = 0; c < updateDailyKeyArray[a][updateDailyKey][b][updateDailyKey2].length; c++) {
                                            if (updateDailyKeyArray[a][updateDailyKey][b][updateDailyKey2][c][updateDailyKey3] == arrayIDSbeforeInsert[i]) {
                                                updateDailyKeyArray[a][updateDailyKey][b][updateDailyKey2][c][updateDailyKey3] = array[i]._id
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
                if (whatToUpdate && whatToUpdateArray.length > 0) {
                    let count = 0;
                    console.log('whatToUpdate', whatToUpdateArray)
                    for (let i = 0; i < array.length; i++) {
                        for (let a = 0; a < whatToUpdateArray.length; a++) {
                            if (!whatToUpdate3) {
                                if (whatToUpdateArray[a][whatToUpdate2] == arrayIDSbeforeInsert[i]) {
                                    await putIndexedDB(whatToUpdate, whatToUpdateArray[a][whatToUpdate2], whatToUpdate2, array[i]._id)
                                }
                            } else {
                                // 
                                if (whatToUpdateArray[a][whatToUpdate2] && whatToUpdateArray[a][whatToUpdate2].length) {
                                    for (let b = 0; b < whatToUpdateArray[a][whatToUpdate2].length; b++) {
                                        if (whatToUpdateArray[a][whatToUpdate2][b][whatToUpdate3] == arrayIDSbeforeInsert[i]) {
                                            whatToUpdateArray[a][whatToUpdate2][b][whatToUpdate3] = array[i]._id
                                            count++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    console.log('whatToUpdateAfter', whatToUpdateArray)
                    if (count) {
                        for (let a = 0; a < whatToUpdateArray.length; a++) {
                            await deleteIndexedDB(whatToUpdate, whatToUpdateArray[a]._id)
                        }
                        await addIndexedDB(whatToUpdate, whatToUpdateArray)
                    }
                }
            } catch (error: any) {
                console.log(error)
                store.dispatch(setIsOnline(false))
                await putInformationAboutNeededUpdate(where);
                return resolve(await insertThoseIDStoDB(where, copyArray, updateDailyKey, updateDailyKey2, updateDailyKey3, whatToUpdate, whatToUpdate2, whatToUpdate3))
            }
        } else {
            for (let i = 0; i < array.length; i++) {
                array[i]._id = "XD" + new Date().getTime() + i
            }
        }
        await addIndexedDB(where, array)
        return resolve(array)
    })
}

const overwriteThoseIDSinDB = async (where: string, sentArray: Array<any>): Promise<Array<any>> => {
    let array = JSON.parse(JSON.stringify(sentArray))
    const isOnline = store.getState().online.isOnline
    console.log(`overwriteThoseIDSinDB is online: ${isOnline}`)
    return new Promise(resolve => {
        (async () => {
            let originalArray = JSON.parse(JSON.stringify(array.map((x: any) => {
                x.changed = true
                return x
            })));
            for (let i = 0; i < array.length; i++) {
                await deleteIndexedDB(where, array[i][where == 'daily_measurement' ? 'whenAdded' : '_id'])
                if (where == 'daily_measurement') {
                    array[i].whenAdded = new Date(array[i].whenAdded).toISOString()
                    if (isOnline) {
                        console.log('before prepare', sentArray[i])
                        array[i] = await prepareDailyToSend(array[i], true)
                        console.log('After prepare', array[i])
                    }
                }
            }
            if (isOnline) {
                try {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER}/update/${where}`,
                        { array },
                        { withCredentials: true }
                    );
                    let originalSentArray = JSON.parse(JSON.stringify(array));
                    array = JSON.parse(JSON.stringify(res.data));
                    console.log('overwriteThoseIDSinDB originalSentArray', originalSentArray)
                    console.log('overwriteThoseIDSinDB array', array)
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
                    console.log(error)
                    store.dispatch(setIsOnline(false))
                    await putInformationAboutNeededUpdate(where);
                    return await overwriteThoseIDSinDB(where, originalArray)
                }
            }
            await addIndexedDB(where, array)
            resolve(array);
        })();
    })
}

const deleteThoseIDSfromDB = async (where: string, array: Array<any>, isNewValueInDB: boolean = false) => {
    const isOnline = store.getState().online.isOnline
    if (isNewValueInDB) { // if there is new value in DB, check if still need to request delete
        for (let i = 0; i < array.length; i++) {
            if (!await getIndexedDBbyID(where, array[i]._id)) array.splice(i, 1)
        }
    }
    return new Promise(resolve => {
        (async () => {
            if (array.length > 0) {
                const originalArray = JSON.parse(JSON.stringify(array));
                for (let i = 0; i < array.length; i++) {
                    array[i].deleted = true
                    await deleteIndexedDB(where, array[i]._id)
                    if (where == 'daily_measurement' && isOnline) array[i] = await prepareDailyToSend(array[i], true)
                }
                if (isOnline) {
                    if (await is_id(array[0]._id)) {
                        try {
                            await axios.post(
                                `${process.env.NEXT_PUBLIC_SERVER}/delete`,
                                {
                                    where,
                                    array
                                },
                                { withCredentials: true }
                            );
                        } catch (error: any) {
                            console.log(error)
                            store.dispatch(setIsOnline(false))
                            await putInformationAboutNeededUpdate(where);
                            return await deleteThoseIDSfromDB(where, originalArray, isNewValueInDB)
                        }
                    }
                } else {
                    for (let i = array.length - 1; i >= 0; i--) {
                        if (!await is_id(array[i]._id)) {
                            await deleteIndexedDB(where, array[i]._id)
                            array.splice(i, 1)
                        }
                    }
                    if (array.length > 0) await addIndexedDB(where, array)
                }
            }
            resolve(true);
        })();
    })
}

const prepareDailyToSend = async (daily_measurement: any, removeDeleted: boolean = false) => {
    const object = JSON.parse(JSON.stringify(daily_measurement))
    return new Promise(resolve => {
        (async () => {
            if (object._id && !await is_id(object._id)) {
                delete object._id
            }
            if (object.nutrition_diary && object.nutrition_diary.length > 0) {
                for (let i = object.nutrition_diary.length - 1; i >= 0; i--) {
                    if (removeDeleted && object.nutrition_diary[i].deleted) {
                        object.nutrition_diary.splice(i, 1)
                    } else if (object.nutrition_diary[i]._id && !await is_id(object.nutrition_diary[i]._id)) {
                        delete object.nutrition_diary[i]._id
                    }
                }
            }
            if (object.workout_result && object.workout_result.length > 0) {
                for (let i = object.workout_result.length - 1; i >= 0; i--) {
                    if (removeDeleted && object.workout_result[i].deleted) {
                        object.workout_result.splice(i, 1)
                    } else if (object.workout_result[i]._id && !await is_id(object.workout_result[i]._id)) {
                        delete object.workout_result[i]._id
                    }
                }
            }
            if (object.nutrition_diary && object.nutrition_diary.length == 0) {
                delete object.nutrition_diary
            }
            if (object.workout_result && object.workout_result.length == 0) {
                delete object.workout_result
            }

            // DB think no value = 0, so we don't need values == 0 (can be string too!)
            const keys = Object.keys(object)
            keys.forEach(x => {
                if (object[x] == 0) {
                    delete object[x]
                }
            })
            resolve(object);
        })();
    });
}

const is_id = async (_id: string) => {
    return new Promise(resolve => {
        (_id).substring(0, 2) != "XD" ? resolve(true) : resolve(false)
    })
}

const setLastUpdated = () => {
    localStorage.setItem('lastUpdated', new Date().getTime().toString())
}

export {
    API,
    insertThoseIDStoDB,
    is_id,
    overwriteThoseIDSinDB,
    loadValueByLogin,
    setLastUpdated,
    deleteThoseIDSfromDB
}