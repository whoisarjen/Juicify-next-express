import { setIsOnline } from '../../redux/features/onlineSlice'
import io from "socket.io-client";
import { useState, useEffect, FunctionComponent } from 'react'
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/features/tokenSlice";
import { is_id, API } from '../../utils/API'
import { getAllIndexedDB, deleteIndexedDB, getIndexedDBbyID, addIndexedDB } from '../../utils/indexedDB'
import { overwriteThoseIDSinDB, insertThoseIDStoDB, deleteThoseIDSfromDB, setLastUpdated } from '../../utils/API'
import { store } from '../../redux/store'

// CACHE - those functions need to be loaded to allow user's expierence in offline mode for now didn't find better way :(
import * as cache from '../../utils/API'
import * as cache2 from '../../utils/indexedDB'

const synchronizationAfterOfflineDailyMeasurement = async (isNewValueInDB: boolean = false) => {
    const theOldestSupportedDate = store.getState().config.theOldestSupportedDate();
    return new Promise(resolve => {
        (async () => {
            let logout = false
            let daily_measurement = await getAllIndexedDB('daily_measurement')
            let inserted: any = []
            let changed: any = []
            if (daily_measurement.length > 0) {
                for (let i = 0; i < daily_measurement.length; i++) {
                    if (daily_measurement[i].whenAdded >= theOldestSupportedDate) {
                        if (!(await is_id(daily_measurement[i]._id))) {
                            inserted.push(daily_measurement[i])
                        } else if (daily_measurement[i].changed) {
                            console.log("GOT CHANGED")
                            changed.push(daily_measurement[i])
                        }
                    }
                }
            }
            if (isNewValueInDB) {
                const { response, isSuccess } = await API('/find/daily_measurements', {
                    overDatePlusTheDate: theOldestSupportedDate
                })
                if (isSuccess) {
                    console.log('Success new daily', response, inserted, changed)
                    if (response && response.length > 0) {
                        for (let i = 0; i < response.length; i++) {
                            await deleteIndexedDB('daily_measurement', response[i].whenAdded)
                            if (response[i].workout_result && response[i].workout_result.length > 0) {
                                for (let a = 0; a < response[i].workout_result.length; a++) {
                                    await deleteIndexedDB("workout_result", response[i].workout_result[a]._id)
                                }
                            }
                        }
                        await addIndexedDB('daily_measurement', response)
                    }
                    if (inserted.length > 0) {
                        for (let i = inserted.length - 1; i >= 0; i--) {
                            const doesDateIsAlreadyInDB = await getIndexedDBbyID('daily_measurement', inserted[i].whenAdded) // Checking if there is the date already
                            if (doesDateIsAlreadyInDB) { // If user already had the date, the new date get some values and change from inserted => changed
                                inserted[i]._id = doesDateIsAlreadyInDB._id

                                if (doesDateIsAlreadyInDB.weight && !inserted[i].weight) {
                                    inserted[i].weight = doesDateIsAlreadyInDB.weight
                                }
                                if (doesDateIsAlreadyInDB.weight_description && !inserted[i].weight_description) {
                                    inserted[i].weight_description = doesDateIsAlreadyInDB.weight_description
                                }
                                if (doesDateIsAlreadyInDB.neck && !inserted[i].neck) {
                                    inserted[i].neck = doesDateIsAlreadyInDB.neck
                                }
                                if (doesDateIsAlreadyInDB.shoulders && !inserted[i].shoulders) {
                                    inserted[i].shoulders = doesDateIsAlreadyInDB.shoulders
                                }
                                if (doesDateIsAlreadyInDB.chest && !inserted[i].chest) {
                                    inserted[i].chest = doesDateIsAlreadyInDB.chest
                                }
                                if (doesDateIsAlreadyInDB.biceps && !inserted[i].biceps) {
                                    inserted[i].biceps = doesDateIsAlreadyInDB.biceps
                                }
                                if (doesDateIsAlreadyInDB.waist && !inserted[i].waist) {
                                    inserted[i].waist = doesDateIsAlreadyInDB.waist
                                }
                                if (doesDateIsAlreadyInDB.hips && !inserted[i].hips) {
                                    inserted[i].hips = doesDateIsAlreadyInDB.hips
                                }
                                if (doesDateIsAlreadyInDB.thigh && !inserted[i].thigh) {
                                    inserted[i].thigh = doesDateIsAlreadyInDB.thigh
                                }
                                if (doesDateIsAlreadyInDB.calf && !inserted[i].calf) {
                                    inserted[i].calf = doesDateIsAlreadyInDB.calf
                                }
                                if (doesDateIsAlreadyInDB.water && !inserted[i].water) {
                                    inserted[i].water = doesDateIsAlreadyInDB.water
                                }

                                if (doesDateIsAlreadyInDB.nutrition_diary && !inserted[i].nutrition_diary) {
                                    inserted[i].nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary
                                } else if (doesDateIsAlreadyInDB.nutrition_diary && inserted[i].nutrition_diary) {
                                    inserted[i].nutrition_diary = inserted[i].nutrition_diary.concat(doesDateIsAlreadyInDB.nutrition_diary)
                                }

                                if (doesDateIsAlreadyInDB.workout_result && !inserted[i].workout_result) {
                                    inserted[i].workout_result = doesDateIsAlreadyInDB.workout_result
                                } else if (doesDateIsAlreadyInDB.workout_result && inserted[i].workout_result) {
                                    inserted[i].workout_result = inserted[i].workout_result.concat(doesDateIsAlreadyInDB.workout_result)
                                }

                                changed.push(inserted[i])
                                inserted.splice(i, 1)
                            }
                        }
                    }
                } else {
                    logout = true // if problem with get new value => logout
                }
            }
            // if (inserted.length > 0) await insertThoseIDStoDB('daily_measurement', inserted, '', '', 'whenAdded') THIS WAS BEFORE
            console.log('inserted.length', inserted.length)
            console.log('changed.length', changed.length)
            if (inserted.length > 0) {
                await insertThoseIDStoDB('daily_measurement', inserted)
            }
            if (changed.length > 0) {
                if (isNewValueInDB) {
                    for (let i = 0; i < changed.length; i++) {
                        let doesDateIsAlreadyInDB = await getIndexedDBbyID("daily_measurement", changed[i].whenAdded)
                        if (doesDateIsAlreadyInDB) {
                            if (doesDateIsAlreadyInDB.weight && !changed[i].weight) {
                                changed[i].weight = doesDateIsAlreadyInDB.weight
                            }
                            if (doesDateIsAlreadyInDB.weight_description && !changed[i].weight_description) {
                                changed[i].weight_description = doesDateIsAlreadyInDB.weight_description
                            }
                            if (doesDateIsAlreadyInDB.neck && !changed[i].neck) {
                                changed[i].neck = doesDateIsAlreadyInDB.neck
                            }
                            if (doesDateIsAlreadyInDB.shoulders && !changed[i].shoulders) {
                                changed[i].shoulders = doesDateIsAlreadyInDB.shoulders
                            }
                            if (doesDateIsAlreadyInDB.chest && !changed[i].chest) {
                                changed[i].chest = doesDateIsAlreadyInDB.chest
                            }
                            if (doesDateIsAlreadyInDB.biceps && !changed[i].biceps) {
                                changed[i].biceps = doesDateIsAlreadyInDB.biceps
                            }
                            if (doesDateIsAlreadyInDB.waist && !changed[i].waist) {
                                changed[i].waist = doesDateIsAlreadyInDB.waist
                            }
                            if (doesDateIsAlreadyInDB.hips && !changed[i].hips) {
                                changed[i].hips = doesDateIsAlreadyInDB.hips
                            }
                            if (doesDateIsAlreadyInDB.thigh && !changed[i].thigh) {
                                changed[i].thigh = doesDateIsAlreadyInDB.thigh
                            }
                            if (doesDateIsAlreadyInDB.calf && !changed[i].calf) {
                                changed[i].calf = doesDateIsAlreadyInDB.calf
                            }
                            if (doesDateIsAlreadyInDB.water && !changed[i].water) {
                                changed[i].water = doesDateIsAlreadyInDB.water
                            }

                            if (doesDateIsAlreadyInDB.nutrition_diary && !changed[i].nutrition_diary) {
                                changed[i].nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary
                            } else if (doesDateIsAlreadyInDB.nutrition_diary && changed[i].nutrition_diary) {
                                if (changed[i].nutrition_diary.length > 0) {
                                    for (let a = 0; a < changed[i].nutrition_diary.length; a++) {
                                        if (changed[i].nutrition_diary[a].deleted) {
                                            doesDateIsAlreadyInDB.nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary.filter((x: any) => x._id != changed[i].nutrition_diary[a]._id)
                                        } else if (!await is_id(changed[i].nutrition_diary[a]._id)) {
                                            doesDateIsAlreadyInDB.nutrition_diary.push(changed[i].nutrition_diary[a])
                                        } else if (changed[i].nutrition_diary[a].changed) {
                                            const indexNumber = doesDateIsAlreadyInDB.nutrition_diary.findIndex((x: any) => x._id == changed[i].nutrition_diary[a]._id)
                                            if (parseInt(indexNumber) >= 0) {
                                                doesDateIsAlreadyInDB.nutrition_diary[indexNumber] = changed[i].nutrition_diary[a]
                                            }
                                        }
                                    }
                                }
                                changed[i].nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary
                            }

                            if (doesDateIsAlreadyInDB.workout_result && !changed[i].workout_result) {
                                changed[i].workout_result = doesDateIsAlreadyInDB.workout_result
                            } else if (doesDateIsAlreadyInDB.workout_result && changed[i].workout_result) {
                                if (changed[i].workout_result.length.length > 0) {
                                    for (let a = 0; a < changed[i].workout_result.length; a++) {
                                        if (changed[i].workout_result[a].deleted) {
                                            doesDateIsAlreadyInDB.workout_result = doesDateIsAlreadyInDB.workout_result.filter((x: any) => x._id != changed[i].workout_result[a]._id)
                                        } else if (!await is_id(changed[i].workout_result[a]._id)) {
                                            doesDateIsAlreadyInDB.workout_result.push(changed[i].workout_result[a])
                                        } else if (changed[i].workout_result[a].changed) {
                                            const indexNumber = doesDateIsAlreadyInDB.workout_result.findIndex((x: any) => x._id == changed[i].workout_result[a]._id)
                                            if (parseInt(indexNumber) >= 0) {
                                                doesDateIsAlreadyInDB.workout_result[indexNumber] = changed[i].workout_result[a]
                                            }
                                        }
                                    }
                                }
                                changed[i].workout_result = doesDateIsAlreadyInDB.workout_result
                            }
                        }
                    }
                }
                await overwriteThoseIDSinDB("daily_measurement", changed)
            }
            // That's important to don't allow it delete the flag, when user went again into offline mode
            if (store.getState().online.isOnline) {
                await deleteIndexedDB("whatToUpdate", 'daily_measurement')
            }
            if (logout) {


                // LOGOUT THIS !!!!!!!!!!!!!


            }
            resolve(true);
        })();
    });
}

const synchronizationAfterOffline = async (isNewValueInDB: boolean = false, where: string, whatToUpdate: string = '', value: string = '', whatToUpdate2: string = '', value2: string = '') => {
    const theOldestSupportedDate = store.getState().config.theOldestSupportedDate();
    return new Promise(resolve => {
        (async () => {
            let deleted = []
            let changed = []
            let inserted = []
            let whereArray = await getAllIndexedDB(where)
            if (isNewValueInDB) {
                const { response, isSuccess } = await API(`/find/${where}s`, {
                    overDatePlusTheDate: theOldestSupportedDate
                })
                if (isSuccess) {
                    console.log('Success new value downloaded', response)
                    if (response && response.length > 0) {
                        for (let i = 0; i < response.length; i++) {
                            await deleteIndexedDB('daily_measurement', response[i].whenAdded)
                            if (response[i].workout_result && response[i].workout_result.length > 0) {
                                for (let a = 0; a < response[i].workout_result.length; a++) {
                                    await deleteIndexedDB("workout_result", response[i].workout_result[a]._id)
                                }
                            }
                        }
                        await addIndexedDB('daily_measurement', response)
                    }
                }
            }
            if (whereArray.length > 0) {
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
            if (inserted.length > 0) await insertThoseIDStoDB(where, inserted, whatToUpdate, value, whatToUpdate2, value2)
            if (changed.length > 0) await overwriteThoseIDSinDB(where, changed)
            if (deleted.length > 0) await deleteThoseIDSfromDB(where, deleted, isNewValueInDB)
            await deleteIndexedDB("whatToUpdate", where)
            resolve(true);
        })();
    })
}

const cleanCache = async (where: string) => {
    return new Promise(async resolve => {
        const cache = await getAllIndexedDB(where)
        if (cache && cache.length > 0) {
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
    const [cookies] = useCookies()

    useEffect(() => window.addEventListener('offline', () => dispatch(setIsOnline(false))), [])

    useEffect(() => {
        if (cookies.token) {
            dispatch(setToken(cookies.token));
        }
        if (cookies.refresh_token) {
            const socketQuery: any = {
                query: `refresh_token=${cookies.refresh_token}`
            }
            const socket = io("http://localhost:4000", socketQuery)

            socket.on('compareDatabases', async (object) => {
                console.log('compareDatabases', object)
                let newTimeOfUpdate = 0
                dispatch(setIsOnline(true))
                const isOnline = store.getState().online.isOnline;
                localStorage.setItem("socket_ID", object.socket_ID);
                const lastUpdated: any = localStorage.getItem('lastUpdated')


                if (isOnline && object.lastUpdated.product > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'product')) {
                    newTimeOfUpdate = object.lastUpdated.product
                    await synchronizationAfterOffline(object.lastUpdated.product > lastUpdated, "product", 'nutrition_diary', 'product_ID', 'favourite_product', '_id');
                    await cleanCache('checked_product')
                    if (!isOnline) await addIndexedDB("whatToUpdate", [{ "_id": "product" }]);
                }

                // if(isOnline && object.lastUpdated.exercise > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'exercise')){
                //     newTimeOfUpdate = object.lastUpdated.exercise
                //     await synchronizationAfterOffline(object.lastUpdated.exercise > lastUpdated, "exercise", 'workout_result', HERE NEED TO FIND WAY TO GET RESULTS[EXERCISE[]]);
                //     await cleanCache('checked_exercise')
                //     if(!isOnline) await addIndexedDB("whatToUpdate", [{"_id": 'exercise'}]);
                // }

                if (isOnline && object.lastUpdated.workout_plan > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'workout_plan')) {
                    newTimeOfUpdate = object.lastUpdated.workout_plan
                    await synchronizationAfterOffline(object.lastUpdated.workout_plan > lastUpdated, "workout_plan", "workout_result", "workout_plan_ID");
                    await cleanCache('workout_result')
                    if (!isOnline) await addIndexedDB("whatToUpdate", [{ "_id": "workout_plan" }]);
                }


                if (isOnline && object.lastUpdated.daily_measurement > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'daily_measurement')) {
                    console.log('Synchronization daily_measurement')
                    newTimeOfUpdate = object.lastUpdated.daily_measurement
                    await synchronizationAfterOfflineDailyMeasurement(object.lastUpdated.daily_measurement > lastUpdated);
                    if (!isOnline) await addIndexedDB('whatToUpdate', [{ '_id': 'daily_measurement' }]);
                }


                //                 if(isOnline && object.lastUpdated.settings > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'settings')){
                //                     newTimeOfUpdate = object.lastUpdated.settings
                //                     this.synchroMessage = true;
                //                     await refreshToken();
                //                 }

                //                 if(isOnline){
                //                     localStorage.removeItem('last_offline_created_daily_measurement_date')
                //                     if(localStorage.getItem('version') < object.versionOFapplication){
                //                         if('serviceWorker' in navigator){
                //                             try{
                //                                 await navigator.serviceWorker.register('./service-worker.js').then(async registration => {
                //                                     await registration.unregister().then(function(){
                //                                         localStorage.setItem('version', object.versionOFapplication)
                //                                         localStorage.removeItem('componentsLoaded')
                //                                     });
                //                                 });
                //                             }catch(err){
                //                                 console.log(err)
                //                             }
                //                         }
                //                     }
                //                     if(object.lastUpdated.logout > lastUpdated) await logout();
                //                     if(newTimeOfUpdate > 0) localStorage.setItem('lastUpdated', newTimeOfUpdate)
                //                     if(object.lastUpdated.refresh > lastUpdated){
                //                         localStorage.setItem('lastUpdated', object.lastUpdated.refresh)
                //                         window.location.reload(true);
                //                     }
                //                     store.state.number_of_messages = object.lastUpdated.message.number_of_messages
                //                     store.state.last_message_time = object.lastUpdated.message.last_message_time
                //                 }

                //                 this.synchroMessage = false
                //             })

                if (newTimeOfUpdate) {
                    setKey(new Date().getTime())
                }
            })

            socket.on('synchronizationMessege', async (messege) => {
                console.log('synchronizationMessege', messege)
                if (messege.socket_ID != localStorage.getItem('socket_ID')) {
                    console.log('synchronizationMessege', messege)
                    if (messege.where == 'settings') {
                        dispatch(setToken(messege.array.token));
                    } else {
                        let keyIndexedDB = '_id'
                        if (messege.where == 'daily_measurement') {
                            keyIndexedDB = 'whenAdded'
                        }
                        for (let i = 0; i < messege.array.length; i++) {
                            await deleteIndexedDB(messege.where, messege.array[i][keyIndexedDB])
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
