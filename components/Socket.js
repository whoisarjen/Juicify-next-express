import { setIsOnline } from '../redux/features/onlineSlice'
import io from "socket.io-client";
import { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/features/tokenSlice";
import { is_id, API } from '../utils/API'
import { getAllIndexedDB, deleteIndexedDB, getIndexedDBbyID, addIndexedDB } from '../utils/indexedDB'
import { overwriteThoseIDSinDB } from '../utils/API'

//         if(cookies.get("token")){
//             socket.on('needToUpdateAfterOffline', async (object) => {
//                 let newTimeOfUpdate = 0
//                 isOnline = true
//                 socket.connected = true
//                 socket.disconnected = false
//                 this.synchroPercent = 0
//                 this.showSynchroNeedMoreTime = false
//                 setTimeout(() => this.showSynchroNeedMoreTime = true, 3500)
//                 const lastUpdated = localStorage.getItem('lastUpdated')

//                 this.synchroPercent++
//                 if(isOnline && object.lastUpdated.product > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'product')){
//                     newTimeOfUpdate = object.lastUpdated.product
//                     this.synchroMessage = true;
//                     await synchronizationAfterOffline(object.lastUpdated.product > lastUpdated, "product");
//                     if(!isOnline) await addIndexedDB("whatToUpdate", [{"_id": "product"}]);
//                 }
//                 this.synchroPercent++
//                 if(isOnline && object.lastUpdated.favourite_product > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'favourite_product')){
//                     newTimeOfUpdate = object.lastUpdated.favourite_product
//                     this.synchroMessage = true;
//                     await synchronizationAfterOffline(object.lastUpdated.favourite_product > lastUpdated, "favourite_product");
//                     if(!isOnline) await addIndexedDB("whatToUpdate", [{"_id": "favourite_product"}]);
//                 }
//                 this.synchroPercent++
//                 if(isOnline && object.lastUpdated.exercise > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'exercise')){
//                     newTimeOfUpdate = object.lastUpdated.exercise
//                     this.synchroMessage = true;
//                     await synchronizationAfterOffline(object.lastUpdated.exercise > lastUpdated, "exercise");
//                     if(!isOnline) await addIndexedDB("whatToUpdate", [{"_id": 'exercise'}]);
//                 }
//                 this.synchroPercent++
//                 if(isOnline && object.lastUpdated.workout_plan > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'workout_plan')){
//                     newTimeOfUpdate = object.lastUpdated.workout_plan
//                     this.synchroMessage = true;
//                     await synchronizationAfterOffline(object.lastUpdated.workout_plan > lastUpdated, "workout_plan", "workout_result", "workout_plan_ID");
//                     if(!isOnline) await addIndexedDB("whatToUpdate", [{"_id": "workout_plan"}]);
//                 }

//                 this.synchroPercent++
//                 if(isOnline && object.lastUpdated.daily_measurement > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'daily_measurement')){
//                     newTimeOfUpdate = object.lastUpdated.daily_measurement
//                     this.synchroMessage = true;
//                     await daily_measurementAfterOffline(object.lastUpdated.daily_measurement > lastUpdated);
//                     if(!isOnline) await addIndexedDB("whatToUpdate", [{"_id": "daily_measurement"}]);
//                 }

//                 this.synchroPercent++
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
//                 this.synchroPercent++
//                 this.synchroMessage = false
//             })

//             socket.on('disconnect', () => {
//                 isOnline = false;
//                 this.synchroMessage = false;
//                 socket.connected = false;
//                 socket.disconnected = true;
//             })


//             synchronizationAfterOffline = async (isisNewValueInDB, where, whatToUpdate, value, whatToUpdate2) => {
//                 return new Promise(resolve => {
//                     (async () => {
//                         let deleted = []
//                         let changed = []
//                         let inserted = []
//                         let whereArray = await getAllIndexedDB(where)
//                         if(isisNewValueInDB) await selectFROM(true, where, null, null, null, null, true) // Donwload new value from DB
//                         if(whereArray.length>0){
//                             for(let i=0;i<whereArray.length;i++){
//                                 if(!whereArray[i].notSAVED){
//                                     if(!(await is_id(whereArray[i]._id))) inserted.push(whereArray[i]) // Seperating new value
//                                     else if(whereArray[i].deleted) deleted.push(whereArray[i]) // Seperating deleted value
//                                     else if(whereArray[i].changed) changed.push(whereArray[i]) // Seperating changed value
//                                 }
//                             }
//                         }
//                         if(inserted.length>0) await insertThoseIDStoDB(where, inserted, whatToUpdate, value, "_id", whatToUpdate2)
//                         if(changed.length>0) await overwriteThoseIDSinDB(where, changed)
//                         if(deleted.length>0) await deleteThoseIDSfromDB(where, deleted, isisNewValueInDB)
//                         await deleteIndexedDB("whatToUpdate", where) // Deleting from need to update indexedDB holder
//                         store.state[where+"FLAG"] = await currentTime() // Refreshing flag for changed value to refresh components
//                         resolve();
//                     })();
//                 });
//             }

const daily_measurementAfterOffline = async (isNewValueInDB, theOldestSupportedDate, isOnline) => {
    return new Promise(resolve => {
        (async () => {
            let logout = false
            let daily_measurement = await getAllIndexedDB('daily_measurement')
            let inserted = []
            let changed = []
            if (daily_measurement.length > 0) {
                for (let i = 0; i < daily_measurement.length; i++) {
                    if (daily_measurement[i].whenAdded >= theOldestSupportedDate) { // Check if date is bigger than limit
                        if (!(await is_id(daily_measurement[i]._id))) inserted.push(daily_measurement[i])
                        else if (daily_measurement[i].changed) changed.push(daily_measurement[i])
                    }
                }
            }
            if (isNewValueInDB) {
                const { response, isSuccess } = await API('/find/daily_measurements', {
                    overDatePlusTheDate: theOldestSupportedDate
                })
                console.log('New daily', response)
                if (isSuccess) {
                    if (response && response.length > 0) {
                        for (let i = 0; i < response.length; i++) {
                            await deleteIndexedDB(isOnline, 'daily_measurement', response[i].whenAdded)
                            if (response[i].workout_result && response[i].workout_result.length > 0) {
                                for (let a = 0; a < response[i].workout_result.length; a++) {
                                    await deleteIndexedDB("workout_result", response[i].workout_result[a]._id)
                                }
                            }
                        }
                        await addIndexedDB(isOnline, 'daily_measurement', response)
                    }
                    if (inserted.length > 0) {
                        for (let i = 0; i < inserted.length; i++) {
                            const doesDateIsAlreadyInDB = await getIndexedDBbyID('daily_measurement', inserted[i].whenAdded) // Checking if there is the date already
                            if (doesDateIsAlreadyInDB) { // If user already had the date, the new date get some values and change from inserted => changed
                                inserted[i]._id = doesDateIsAlreadyInDB._id

                                if (doesDateIsAlreadyInDB.weight && !inserted[i].weight) inserted[i].weight = doesDateIsAlreadyInDB.weight
                                if (doesDateIsAlreadyInDB.weight_description && !inserted[i].weight_description) inserted[i].weight_description = doesDateIsAlreadyInDB.weight_description
                                if (doesDateIsAlreadyInDB.neck && !inserted[i].neck) inserted[i].neck = doesDateIsAlreadyInDB.neck
                                if (doesDateIsAlreadyInDB.shoulders && !inserted[i].shoulders) inserted[i].shoulders = doesDateIsAlreadyInDB.shoulders
                                if (doesDateIsAlreadyInDB.chest && !inserted[i].chest) inserted[i].chest = doesDateIsAlreadyInDB.chest
                                if (doesDateIsAlreadyInDB.biceps && !inserted[i].biceps) inserted[i].biceps = doesDateIsAlreadyInDB.biceps
                                if (doesDateIsAlreadyInDB.waist && !inserted[i].waist) inserted[i].waist = doesDateIsAlreadyInDB.waist
                                if (doesDateIsAlreadyInDB.hips && !inserted[i].hips) inserted[i].hips = doesDateIsAlreadyInDB.hips
                                if (doesDateIsAlreadyInDB.thigh && !inserted[i].thigh) inserted[i].thigh = doesDateIsAlreadyInDB.thigh
                                if (doesDateIsAlreadyInDB.calf && !inserted[i].calf) inserted[i].calf = doesDateIsAlreadyInDB.calf
                                if (doesDateIsAlreadyInDB.water && !inserted[i].water) inserted[i].water = doesDateIsAlreadyInDB.water

                                if (doesDateIsAlreadyInDB.nutrition_diary && !inserted[i].nutrition_diary) inserted[i].nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary
                                else if (doesDateIsAlreadyInDB.nutrition_diary && inserted[i].nutrition_diary) inserted[i].nutrition_diary = inserted[i].nutrition_diary.concat(doesDateIsAlreadyInDB.nutrition_diary)

                                if (doesDateIsAlreadyInDB.workout_result && !inserted[i].workout_result) inserted[i].workout_result = doesDateIsAlreadyInDB.workout_result
                                else if (doesDateIsAlreadyInDB.workout_result && inserted[i].workout_result) inserted[i].workout_result = inserted[i].workout_result.concat(doesDateIsAlreadyInDB.workout_result)

                                changed.push(inserted[i])
                                inserted.splice(i, 1)
                            }
                        }
                    }
                } else {
                    logout = true // if problem with get new value => logout
                }
            }
            if (inserted.length > 0) await insertThoseIDStoDB('daily_measurement', inserted, isOnline, '', '', 'whenAdded')
            if (changed.length > 0) {
                if (isNewValueInDB) {
                    for (let i = 0; i < changed.length; i++) {
                        let doesDateIsAlreadyInDB = await getIndexedDBbyID("daily_measurement", changed[i].whenAdded)
                        if (doesDateIsAlreadyInDB) {
                            if (doesDateIsAlreadyInDB.weight && !changed[i].weight) changed[i].weight = doesDateIsAlreadyInDB.weight
                            if (doesDateIsAlreadyInDB.weight_description && !changed[i].weight_description) changed[i].weight_description = doesDateIsAlreadyInDB.weight_description
                            if (doesDateIsAlreadyInDB.neck && !changed[i].neck) changed[i].neck = doesDateIsAlreadyInDB.neck
                            if (doesDateIsAlreadyInDB.shoulders && !changed[i].shoulders) changed[i].shoulders = doesDateIsAlreadyInDB.shoulders
                            if (doesDateIsAlreadyInDB.chest && !changed[i].chest) changed[i].chest = doesDateIsAlreadyInDB.chest
                            if (doesDateIsAlreadyInDB.biceps && !changed[i].biceps) changed[i].biceps = doesDateIsAlreadyInDB.biceps
                            if (doesDateIsAlreadyInDB.waist && !changed[i].waist) changed[i].waist = doesDateIsAlreadyInDB.waist
                            if (doesDateIsAlreadyInDB.hips && !changed[i].hips) changed[i].hips = doesDateIsAlreadyInDB.hips
                            if (doesDateIsAlreadyInDB.thigh && !changed[i].thigh) changed[i].thigh = doesDateIsAlreadyInDB.thigh
                            if (doesDateIsAlreadyInDB.calf && !changed[i].calf) changed[i].calf = doesDateIsAlreadyInDB.calf
                            if (doesDateIsAlreadyInDB.water && !changed[i].water) changed[i].water = doesDateIsAlreadyInDB.water

                            if (doesDateIsAlreadyInDB.nutrition_diary && !changed[i].nutrition_diary) changed[i].nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary
                            else if (doesDateIsAlreadyInDB.nutrition_diary && changed[i].nutrition_diary) {
                                if (changed[i].nutrition_diary.length > 0) {
                                    for (let a = 0; a < changed[i].nutrition_diary.length; a++) {
                                        if (changed[i].nutrition_diary[a].deleted) doesDateIsAlreadyInDB.nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary.filter(x => x._id != changed[i].nutrition_diary[a]._id)
                                        else if (!await is_id(changed[i].nutrition_diary[a]._id)) doesDateIsAlreadyInDB.nutrition_diary.push(changed[i].nutrition_diary[a])
                                        else if (changed[i].nutrition_diary[a].changed) {
                                            const indexNumber = doesDateIsAlreadyInDB.nutrition_diary.findIndex(x => x._id == changed[i].nutrition_diary[a]._id)
                                            if (parseInt(indexNumber) >= 0) doesDateIsAlreadyInDB.nutrition_diary[indexNumber] = changed[i].nutrition_diary[a]
                                        }
                                    }
                                }
                                changed[i].nutrition_diary = doesDateIsAlreadyInDB.nutrition_diary
                            }

                            if (doesDateIsAlreadyInDB.workout_result && !changed[i].workout_result) changed[i].workout_result = doesDateIsAlreadyInDB.workout_result
                            else if (doesDateIsAlreadyInDB.workout_result && changed[i].workout_result) {
                                if (changed[i].workout_result.length.length > 0) {
                                    for (let a = 0; a < changed[i].workout_result.length; a++) {
                                        if (changed[i].workout_result[a].deleted) doesDateIsAlreadyInDB.workout_result = doesDateIsAlreadyInDB.workout_result.filter(x => x._id != changed[i].workout_result[a]._id)
                                        else if (!await is_id(changed[i].workout_result[a]._id)) doesDateIsAlreadyInDB.workout_result.push(changed[i].workout_result[a])
                                        else if (changed[i].workout_result[a].changed) {
                                            const indexNumber = doesDateIsAlreadyInDB.workout_result.findIndex(x => x._id == changed[i].workout_result[a]._id)
                                            if (parseInt(indexNumber) >= 0) doesDateIsAlreadyInDB.workout_result[indexNumber] = changed[i].workout_result[a]
                                        }
                                    }
                                }
                                changed[i].workout_result = doesDateIsAlreadyInDB.workout_result
                            }
                        }
                    }
                }
                await overwriteThoseIDSinDB("daily_measurement", changed, isOnline, false, 'whenAdded')
            }
            await deleteIndexedDB(isOnline, "whatToUpdate", 'daily_measurement')
            if (logout) {


                // LOGOUT THIS !!!!!!!!!!!!!


            }
            resolve();
        })();
    });
}

const Socket = ({ children }) => {
    const [key, setKey] = useState(0)
    const dispatch = useDispatch()
    const [cookies] = useCookies()
    const isOnline = useSelector(state => state.online.isOnline)
    const theOldestSupportedDate = useSelector(state => state.config.theOldestSupportedDate())

    useEffect(() => {
        dispatch(setIsOnline(navigator.onLine))
        window.addEventListener('online', () => dispatch(setIsOnline(true)))
        window.addEventListener('offline', () => dispatch(setIsOnline(false)))
    }, [])

    useEffect(() => {
        console.log('token')
        if (cookies.token) {
            dispatch(setToken(cookies.token));
        }
        if (cookies.refresh_token) {
            const socket = io("http://localhost:4000", {
                query: `token=${cookies.refresh_token}`,
            })

            socket.on('compareDatabases', async (object) => {
                let newTimeOfUpdate = 0
                const lastUpdated = localStorage.getItem('lastUpdated')
                console.log(`halo from socket`, object)
                await daily_measurementAfterOffline(object.lastUpdated.daily_measurement > lastUpdated, theOldestSupportedDate, isOnline);
                if (isOnline && object.lastUpdated.daily_measurement > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'daily_measurement')) {
                    console.log('Synchronization daily_measurement')
                    newTimeOfUpdate = object.lastUpdated.daily_measurement
                    await daily_measurementAfterOffline(object.lastUpdated.daily_measurement > lastUpdated, theOldestSupportedDate, isOnline);
                    if (!isOnline) await addIndexedDB(isOnline, 'whatToUpdate', [{ '_id': 'daily_measurement' }]);
                }
            })

            socket.on('synchronizationMessege', async (messege) => {
                console.log('synchronizationMessege', messege)
                // if (messege.where == 'refresh') window.location.reload(true);
                // else if (messege.where == "message") store.state.number_of_messages = messege.number_of_messages
                // else if (messege.where == "logout") await logout()
                // else if (messege.where == "settings") {
                //     cookies.set("token", messege.array, "200y")
                //     store.state.userToken = decodeToken(messege.array)
                // } else if (messege.where == "daily_measurement") {
                    for (let i = 0; i < messege.array.length; i++) {
                        await deleteIndexedDB(isOnline, messege.where, messege.array[i].whenAdded)
                    }
                    await addIndexedDB(isOnline, messege.where, messege.array)
                    setKey(new Date().getTime())
                // } else {
                //     for (let i = 0; i < messege.array.length; i++) {
                //         await deleteIndexedDB(messege.where, messege.array[i]._id)
                //     }
                //     if (messege.WhatToDo == "add" || messege.WhatToDo == "change") await addIndexedDB(messege.where, messege.array)
                // }
                // store.state[messege.where + "FLAG"] = await currentTime() // Refreshing component where changed messege
                // localStorage.setItem('lastUpdated', messege.time)
            })
        }
    }, [cookies])

    return (
        <div className='socket' key={key}>
            {children}
        </div>
    )
}

export default Socket
