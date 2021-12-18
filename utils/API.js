import { getIndexedDBbyID, addIndexedDB, deleteIndexedDB, putIndexedDB } from "./indexedDB"
import { store } from '../redux/store'

const API = async (url, body) => {
    let response = {}
    let isSuccess = false
    console.log(url, body)
    const token = document.cookie.substring(
        document.cookie.indexOf(" token=") + 7, 
        document.cookie.lastIndexOf("; ")
    )
    // console.log('token', token)
    const refresh_token = document.cookie.substring(
        document.cookie.indexOf(" refresh_token=") + 15, 
        document.cookie.lastIndexOf("")
    )
    const socket_ID = localStorage.getItem('socket_ID')
    // console.log('refresh_token', refresh_token)
    await fetch(`http://localhost:4000${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...body, token, refresh_token, socket_ID}),
    })
        .then((response) => response.json())
        .then((res) => {
            setLastUpdated()
            // Verify token diff here and mb refresh?
            if (res.error) throw res
            response = res
            isSuccess = true
        })
        .catch((err) => console.log(err))
    return { response, isSuccess }
}

const loadOneDailyMeasurementByLogin = async (when, login) => {
    const { response, isSuccess } = await API(`/guest/daily_measurement`, {
        when: when,
        login: login
    })
    if(!response.dataObject) response.dataObject = {}
    if (isSuccess) {
        console.log(`loadOneDailyMeasurementByLogin: ${response}`)
        return response
    } else {
        console.log('loadOneDailyMeasurementByLogin: server error')
        return response
    }
}

const insertThoseIDStoDB = async (where, array, test, whatToUpdate, value, whatToUpdate2) => {
    console.log("----------- TEST -----------------", test)
    const isOnline = store.getState().online.isOnline;
    console.log('insertThoseIDStoDB isOnline:', isOnline)
    let uniquePARAM = '_id'
    if (where == 'daily_measurement') uniquePARAM = "whenAdded"
    return new Promise(async resolve => {
        const copyArray = JSON.parse(JSON.stringify(array));
        const arrayIDSbeforeInsert = []
        console.log(copyArray)
        for (let i = 0; i < array.length; i++) {
            if (array[i]._id) {
                await deleteIndexedDB(isOnline, where, array[i][uniquePARAM])
                arrayIDSbeforeInsert.push(array[i]._id)
                delete array[i]._id
            }
            if (where == 'daily_measurement' && isOnline) array[i] = await prepareDailyToSend(array[i], true)
        }
        console.log('after', array)
        if (isOnline) {
            const { response, isSuccess } = await API(`/insert/${where}`, {
                array
            })
            if (isSuccess) {
                // await gotNewToken(response.tokenGenerated, response.tokenRefreshGenerated)
                array = JSON.parse(JSON.stringify(response.data));
                if (where == 'daily_measurement') {
                    for (let i = 0; i < array.length; i++) {
                        if (await getIndexedDBbyID(where, array[i].whenAdded)) {
                            await deleteIndexedDB(isOnline, where, array[i].whenAdded) // Server can return existing date
                        }
                    }
                }
                if (whatToUpdate && whatToUpdateARRAY.length > 0) {
                    for (let i = 0; i < array.length; i++) {
                        for (let a = 0; a < whatToUpdateARRAY.length; a++) {
                            let checker = 0
                            for (let b = 0; b < whatToUpdateARRAY[a][whatToUpdate].length; b++) {
                                if (whatToUpdateARRAY[a][whatToUpdate][b][value] == arrayIDSbeforeInsert[i]) {
                                    whatToUpdateARRAY[a][whatToUpdate][b][value] = array[i]._id
                                    checker++
                                }
                            }
                            if (checker > 0) {
                                await deleteIndexedDB(isOnline, 'daily_measurement', new Date(whatToUpdateARRAY[a].whenAdded).toISOString())
                                await addIndexedDB(isOnline, 'daily_measurement', [whatToUpdateARRAY[a]])
                            }
                        }
                    }
                }
                if (whatToUpdate2 && whatToUpdateARRAY2.length > 0) {
                    for (let i = 0; i < array.length; i++) {
                        for (let a = 0; a < whatToUpdateARRAY2.length; a++) {
                            if (whatToUpdateARRAY2[a][value] == arrayIDSbeforeInsert[i]) {
                                await putIndexedDB(isOnline, whatToUpdate2, whatToUpdateARRAY2[a]._id, value, array[i]._id)
                            }
                        }
                    }
                }
            } else {
                return await insertThoseIDStoDB(where, copyArray, whatToUpdate, value, whatToUpdate2, isOnline)
            }
        } else {
            for (let i = 0; i < array.length; i++) {
                array[i]._id = "XD" + new Date().getTime() + i
            }
        }
        await addIndexedDB(isOnline, where, array)
        return resolve(array)
    })
}

const overwriteThoseIDSinDB = async (where, array, test) => {
    console.log("----------- TEST -----------------", test)
    const isOnline = store.getState().online.isOnline;
    console.log('overwriteThoseIDSinDB isOnline:', isOnline)
    let uniquePARAM = '_id'
    if (where == 'daily_measurement') uniquePARAM = "whenAdded"
    return new Promise(resolve => {
        (async () => {
            let originalArray = JSON.parse(JSON.stringify(array.map((x) => {
                x.changed = true
                return x
            })));
            for (let i = 0; i < array.length; i++) {
                await deleteIndexedDB(isOnline, where, array[i][uniquePARAM])
                if (where == 'daily_measurement' && isOnline) array[i] = await prepareDailyToSend(array[i], true)
            }
            if (isOnline) {
                const { response, isSuccess } = await API(`/update/${where}`, {
                    array
                })
                if (isSuccess) {
                    // await gotNewToken(response.tokenGenerated, response.tokenRefreshGenerated)
                    let originalSentArray = JSON.parse(JSON.stringify(array));
                    array = JSON.parse(JSON.stringify(response.data));
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
                } else {
                    return await overwriteThoseIDSinDB(where, originalArray, false)
                }
            }
            await addIndexedDB(isOnline, where, array)
            resolve(array);
        })();
    })
}

const prepareDailyToSend = async (daily_measurement, removeDeleted) => {
    return new Promise(resolve => {
        (async () => {
            if (daily_measurement._id && !await is_id(daily_measurement._id)) delete daily_measurement._id
            if (daily_measurement.nutrition_diary && daily_measurement.nutrition_diary.length > 0) {
                for (let i = 0; i < daily_measurement.nutrition_diary.length; i++) {
                    if (removeDeleted && daily_measurement.nutrition_diary[i].deleted) {
                        daily_measurement.nutrition_diary.splice(i, 1)
                    } else if (daily_measurement.nutrition_diary[i]._id && !await is_id(daily_measurement.nutrition_diary[i]._id)) {
                        delete daily_measurement.nutrition_diary[i]._id
                    }
                }
            }
            if (daily_measurement.workout_result && daily_measurement.workout_result.length > 0) {
                for (let i = 0; i < daily_measurement.workout_result.length; i++) {
                    if (removeDeleted && daily_measurement.workout_result[i].deleted) {
                        daily_measurement.workout_result.splice(i, 1)
                    } else if (daily_measurement.workout_result[i]._id && !await is_id(daily_measurement.workout_result[i]._id)) {
                        delete daily_measurement.workout_result[i]._id
                    }
                }
            }
            if (daily_measurement.nutrition_diary && daily_measurement.nutrition_diary.length == 0) {
                delete daily_measurement.nutrition_diary
            }
            if (daily_measurement.workout_result && daily_measurement.workout_result.length == 0) {
                delete daily_measurement.workout_result
            }
            resolve(daily_measurement);
        })();
    });
}

const is_id = async (_id) => {
    return new Promise(resolve => {
        (_id).substring(0, 2) != "XD" ? resolve(true) : resolve(false)
    })
}

const setLastUpdated = () => {
    localStorage.setItem('lastUpdated', new Date().getTime())
}

export { API, insertThoseIDStoDB, is_id, overwriteThoseIDSinDB, loadOneDailyMeasurementByLogin, setLastUpdated }