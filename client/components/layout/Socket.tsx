import { setIsOnline } from '../../redux/features/online.slice'
import io from "socket.io-client";
import { useEffect, FunctionComponent } from 'react'
import { setToken } from "../../redux/features/token.slice";
import { deleteIndexedDB, getIndexedDBbyID, addIndexedDB } from '../../utils/indexedDB.utils'
import { setLastUpdated } from '../../utils/db.utils'
import { store } from '../../redux/store'
import { getCookie, refreshToken } from '../../utils/auth.utils'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const Socket: FunctionComponent<{ children: any }> = ({ children }) => {
    const dispatch = useAppDispatch()
    const token: any = useAppSelector(state => state.token.value)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(setToken(localStorage.getItem('token')))
        }
        window.addEventListener('offline', () => dispatch(setIsOnline(false)))
    }, [])

    useEffect(() => {
        if (token) {
            const socket = io(process.env.NEXT_PUBLIC_SERVER as any, {
                withCredentials: true,
            })

            socket.on('compareDatabases', async (object) => {
                try {
                    localStorage.setItem('socket_ID', object.socket_ID)
                    dispatch(setIsOnline(true))

                    if (store.getState().online.isOnline && object.lastUpdated.settings > (localStorage.getItem('lastUpdated') || 0) || await getIndexedDBbyID('whatToUpdate', 'settings')) {
                        const newToken = await refreshToken()
                        dispatch(setToken(newToken));
                        setLastUpdated();
                    }

                    new Worker(new URL("../../workers/product.worker.ts", import.meta.url))
                        .postMessage({
                            isNewValueInDB: object.lastUpdated.product > (localStorage.getItem('lastUpdated') || 0),
                            name: 1
                        });

                    // if (store.getState().online.isOnline && object.lastUpdated.exercise > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'exercise')) {
                    //     await synchronizationAfterOffline(object.lastUpdated.exercise > lastUpdated, "exercise", 'workout_result', 'results', '_id', 'workout_plan', 'exercises', '_id');
                    //     await cleanCache('checked_exercise')
                    //     if (!store.getState().online.isOnline) await addIndexedDB("whatToUpdate", [{ "_id": 'exercise' }]);
                    // }

                    // if (store.getState().online.isOnline && object.lastUpdated.workout_plan > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'workout_plan')) {
                    //     await synchronizationAfterOffline(object.lastUpdated.workout_plan > lastUpdated, "workout_plan", "workout_result", "workout_plan_ID", false, false, false, false);
                    //     // await cleanCache('workout_result')
                    //     if (!store.getState().online.isOnline) await addIndexedDB("whatToUpdate", [{ "_id": "workout_plan" }]);
                    // }

                    // if (store.getState().online.isOnline && object.lastUpdated.daily_measurement > lastUpdated || await getIndexedDBbyID('whatToUpdate', 'daily_measurement')) {
                    //     await synchronizationAfterOffline(object.lastUpdated.daily_measurement > lastUpdated, 'daily_measurement', false, false, false, false, false, false);
                    //     if (!store.getState().online.isOnline) await addIndexedDB('whatToUpdate', [{ '_id': 'daily_measurement' }]);
                    // }
                } catch (error: any) {
                    console.log('synchronization ended with error', error)
                    dispatch(setIsOnline(false))
                }
            })

            socket.on('synchronizationMessege', async (messege) => {
                if (messege.socket_ID != await getCookie('socket_ID')) {
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
                    setLastUpdated()
                }
            })

            socket.on('disconnect', () => dispatch(setIsOnline(false))) // Closed socket => user has to be offline
        }
    }, [token])

    return children
}

export default Socket;