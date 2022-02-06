import { setIsOnline } from '../../redux/features/onlineSlice'
import io from "socket.io-client";
import { useState, useEffect, FunctionComponent } from 'react'
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/features/tokenSlice";
import { is_id } from '../../utils/API'
import { getAllIndexedDB, deleteIndexedDB, getIndexedDBbyID, addIndexedDB } from '../../utils/indexedDB'
import { overwriteThoseIDSinDB, insertThoseIDStoDB, deleteThoseIDSfromDB, setLastUpdated } from '../../utils/API'
import { store } from '../../redux/store'
import { getCookie, parseBoolean, refreshToken } from '../../utils/checkAuth'
import axios from 'axios';

const synchronizationAfterOffline = async (isNewValueInDB: boolean = false, where: string, updateDailyKey: any, updateDailyKey2: any, updateDailyKey3: any, whatToUpdate: any, whatToUpdate2: any = '_id', whatToUpdate3: any) => {
    return new Promise((resolve, reject) => {
        (async () => {
            let deleted = []
            let changed = []
            let inserted = []
            let whereArray = await getAllIndexedDB(where)
            try {
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
                if (isNewValueInDB) {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER}/synchronization`,
                        { where },
                        { withCredentials: true }
                    );
                    console.log('Success new value downloaded', res.data)
                    if (res.data && res.data.length) {
                        for (let i = 0; i < res.data.length; i++) {
                            if (where == 'daily_measurement') {
                                if (res.data[i].workout_result && res.data[i].workout_result.length) {
                                    for (let a = 0; a < res.data[i].workout_result.length; a++) {
                                        await deleteIndexedDB("workout_result", res.data[i].workout_result[a]._id)
                                    }
                                }
                            }
                            await deleteIndexedDB(where, res.data[i][where == 'daily_measurement' ? 'whenAdded' : '_id'])
                        }
                        await addIndexedDB(where, res.data)
                        if (where == 'daily_measurement' && changed.length) {
                            for (let a: number = changed.length - 1; a >= 0; a--) {
                                changed[a] = await connectExistingDailyMeasurements(changed[a])
                            }
                        }
                    }
                }
                if (inserted.length) await insertThoseIDStoDB(where, inserted, updateDailyKey, updateDailyKey2, updateDailyKey3, whatToUpdate, whatToUpdate2, whatToUpdate3)
                if (changed.length) await overwriteThoseIDSinDB(where, changed)
                if (deleted.length) await deleteThoseIDSfromDB(where, deleted, isNewValueInDB)
                await deleteIndexedDB("whatToUpdate", where)
                resolve(true);
            } catch (error: any) {
                console.log('synchronization call failed', error)
                store.dispatch(setIsOnline(false))
                reject(error)
            }
        })();
    })
}

const cleanCache = async (where: string) => {
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

const Socket: FunctionComponent<{ children: any }> = ({ children }) => {
    const [key, setKey] = useState(0)
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies()

    useEffect(() => window.addEventListener('offline', () => dispatch(setIsOnline(false))), [])

    useEffect(() => {
        if (cookies.token) {
            dispatch(setToken(cookies.token));
        }
        if (cookies.refresh_token) {
            const socket = io(process.env.NEXT_PUBLIC_SERVER as any, {
                withCredentials: true,
            })

            socket.on('compareDatabases', async (object) => {
                try {
                    console.log('compareDatabases', object)
                    setCookie('socket_ID', object.socket_ID, {
                        maxAge: 1000 * 60 * 60 * 24 * 365,
                        httpOnly: parseBoolean(process.env.NEXT_PUBLIC_COOKIE_HTTPONLY as string),
                        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN as string,
                        path: '/',
                        sameSite: 'strict',
                        secure: parseBoolean(process.env.NEXT_PUBLIC_COOKIE_SECURE as string)
                    })
                    let newTimeOfUpdate = 0
                    dispatch(setIsOnline(true))
                    const isOnline = store.getState().online.isOnline;
                    const lastUpdated: any = localStorage.getItem('lastUpdated')

                    if (isOnline && object.lastUpdated.settings > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'settings')) {
                        newTimeOfUpdate = object.lastUpdated.settings
                        const newToken = await refreshToken()
                        dispatch(setToken(newToken));
                    }

                    if (isOnline && object.lastUpdated.product > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'product')) {
                        newTimeOfUpdate = object.lastUpdated.product
                        await synchronizationAfterOffline(object.lastUpdated.product > lastUpdated, "product", 'nutrition_diary', 'product_ID', false, 'favourite_product', '_id', false);
                        await cleanCache('checked_product')
                        if (!isOnline) await addIndexedDB("whatToUpdate", [{ "_id": "product" }]);
                    }

                    if (isOnline && object.lastUpdated.exercise > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'exercise')) {
                        newTimeOfUpdate = object.lastUpdated.exercise
                        await synchronizationAfterOffline(object.lastUpdated.exercise > lastUpdated, "exercise", 'workout_result', 'results', '_id', 'workout_plan', 'exercises', '_id');
                        await cleanCache('checked_exercise')
                        if (!isOnline) await addIndexedDB("whatToUpdate", [{ "_id": 'exercise' }]);
                    }

                    if (isOnline && object.lastUpdated.workout_plan > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'workout_plan')) {
                        newTimeOfUpdate = object.lastUpdated.workout_plan
                        await synchronizationAfterOffline(object.lastUpdated.workout_plan > lastUpdated, "workout_plan", "workout_result", "workout_plan_ID", false, false, false, false);
                        // await cleanCache('workout_result')
                        if (!isOnline) await addIndexedDB("whatToUpdate", [{ "_id": "workout_plan" }]);
                    }


                    if (isOnline && object.lastUpdated.daily_measurement > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'daily_measurement')) {
                        newTimeOfUpdate = object.lastUpdated.daily_measurement
                        await synchronizationAfterOffline(object.lastUpdated.daily_measurement > lastUpdated, 'daily_measurement', false, false, false, false, false, false);
                        if (!isOnline) await addIndexedDB('whatToUpdate', [{ '_id': 'daily_measurement' }]);
                    }

                    if (newTimeOfUpdate) {
                        localStorage.setItem('lastUpdated', newTimeOfUpdate.toString())
                        setKey(new Date().getTime())
                    }
                } catch (error: any) {
                    console.log('synchronization ended with error', error)
                    dispatch(setIsOnline(false))
                }
            })

            socket.on('synchronizationMessege', async (messege) => {
                console.log('synchronizationMessege', (messege.socket_ID != await getCookie('socket_ID')), await getCookie('socket_ID'), messege)
                if (messege.socket_ID != await getCookie('socket_ID')) {
                    console.log('Thats the messege, which reached synchronization process', messege)
                    if (messege.where == 'settings') {
                        const newToken = await refreshToken()
                        dispatch(setToken(newToken));
                    } else {
                        for (let i = 0; i < messege.array.length; i++) {
                            await deleteIndexedDB(messege.where, messege.array[i][messege.where == 'daily_measurement' ? 'whenAdded' : '_id'])
                        }
                        if (messege.whatToDo == 'change') {
                            await addIndexedDB(messege.where, messege.array)
                        }
                    }
                    setKey(new Date().getTime())
                    setLastUpdated()
                } else {
                    console.log('Normally would try synchro, but protection works!')
                }
            })

            socket.on('disconnect', () => dispatch(setIsOnline(false))) // Closed socket => user has to be offline
        }
    }, [cookies.token])

    return (
        <div className='socket' key={key}>
            {children}
        </div>
    )
}

export default Socket


async function connectExistingDailyMeasurements(object: any) {
    return new Promise(async resolve => {
        let changed = JSON.parse(JSON.stringify(object))
        let doesDateIsAlreadyInDB = await getIndexedDBbyID("daily_measurement", changed.whenAdded)
        if (doesDateIsAlreadyInDB) {
            if (doesDateIsAlreadyInDB.weight && !changed.weight) {
                changed.weight = doesDateIsAlreadyInDB.weight
            }
            if (doesDateIsAlreadyInDB.weight_description && !changed.weight_description) {
                changed.weight_description = doesDateIsAlreadyInDB.weight_description
            }
            if (doesDateIsAlreadyInDB.neck && !changed.neck) {
                changed.neck = doesDateIsAlreadyInDB.neck
            }
            if (doesDateIsAlreadyInDB.shoulders && !changed.shoulders) {
                changed.shoulders = doesDateIsAlreadyInDB.shoulders
            }
            if (doesDateIsAlreadyInDB.chest && !changed.chest) {
                changed.chest = doesDateIsAlreadyInDB.chest
            }
            if (doesDateIsAlreadyInDB.biceps && !changed.biceps) {
                changed.biceps = doesDateIsAlreadyInDB.biceps
            }
            if (doesDateIsAlreadyInDB.waist && !changed.waist) {
                changed.waist = doesDateIsAlreadyInDB.waist
            }
            if (doesDateIsAlreadyInDB.hips && !changed.hips) {
                changed.hips = doesDateIsAlreadyInDB.hips
            }
            if (doesDateIsAlreadyInDB.thigh && !changed.thigh) {
                changed.thigh = doesDateIsAlreadyInDB.thigh
            }
            if (doesDateIsAlreadyInDB.calf && !changed.calf) {
                changed.calf = doesDateIsAlreadyInDB.calf
            }
            if (doesDateIsAlreadyInDB.water && !changed.water) {
                changed.water = doesDateIsAlreadyInDB.water
            }

            if (doesDateIsAlreadyInDB.nutrition_diary && !changed.nutrition_diary) {
                changed.nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary
            } else if (doesDateIsAlreadyInDB.nutrition_diary && changed.nutrition_diary) {
                if (changed.nutrition_diary.length) {
                    for (let a = 0; a < changed.nutrition_diary.length; a++) {
                        if (changed.nutrition_diary[a].deleted) {
                            doesDateIsAlreadyInDB.nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary.filter((x: any) => x._id != changed.nutrition_diary[a]._id)
                        } else if (!await is_id(changed.nutrition_diary[a]._id)) {
                            doesDateIsAlreadyInDB.nutrition_diary.push(changed.nutrition_diary[a])
                        } else if (changed.nutrition_diary[a].changed) {
                            const indexNumber = doesDateIsAlreadyInDB.nutrition_diary.findIndex((x: any) => x._id == changed.nutrition_diary[a]._id)
                            if (parseInt(indexNumber) >= 0) {
                                doesDateIsAlreadyInDB.nutrition_diary[indexNumber] = changed.nutrition_diary[a]
                            }
                        }
                    }
                }
                changed.nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary
            }

            if (doesDateIsAlreadyInDB.workout_result && !changed.workout_result) {
                changed.workout_result = doesDateIsAlreadyInDB.workout_result
            } else if (doesDateIsAlreadyInDB.workout_result && changed.workout_result) {
                if (changed.workout_result.length.length) {
                    for (let a = 0; a < changed.workout_result.length; a++) {
                        if (changed.workout_result[a].deleted) {
                            doesDateIsAlreadyInDB.workout_result = doesDateIsAlreadyInDB.workout_result.filter((x: any) => x._id != changed.workout_result[a]._id)
                        } else if (!await is_id(changed.workout_result[a]._id)) {
                            doesDateIsAlreadyInDB.workout_result.push(changed.workout_result[a])
                        } else if (changed.workout_result[a].changed) {
                            const indexNumber = doesDateIsAlreadyInDB.workout_result.findIndex((x: any) => x._id == changed.workout_result[a]._id)
                            if (parseInt(indexNumber) >= 0) {
                                doesDateIsAlreadyInDB.workout_result[indexNumber] = changed.workout_result[a]
                            }
                        }
                    }
                }
                changed.workout_result = doesDateIsAlreadyInDB.workout_result
            }
        }
        resolve(changed)
    })
} 