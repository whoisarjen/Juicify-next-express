import { setIsOnline } from '../../redux/features/online.slice'
import io from "socket.io-client";
import { useEffect, FunctionComponent } from 'react'
import { setToken } from "../../redux/features/token.slice";
import { deleteIndexedDB, getIndexedDBbyID, addIndexedDB } from '../../utils/indexedDB.utils'
import { store } from '../../redux/store'
import { getCookie, refreshToken, setCookie } from '../../utils/auth.utils'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { refreshKey } from '../../redux/features/key.slice';

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
            const socket = io(process.env.NEXT_PUBLIC_SERVER as any, { withCredentials: true })

            socket.on('compareDatabases', async (object) => {
                try {
                    dispatch(setIsOnline(true))

                    new Worker(new URL("../../workers/product.worker.ts", import.meta.url), {
                        name: 'product', // SOMEHOW IT WON'T COMPILATE WITHOUT NAME AND TYPE
                        type: 'module'
                    })
                        .postMessage({
                            updated: await getCookie('product'),
                            socketUpdated: object.lastUpdated.product,
                        })

                    new Worker(new URL("../../workers/exercise.worker.ts", import.meta.url), {
                        name: 'exercise',
                        type: 'module'
                    })
                        .postMessage({
                            updated: await getCookie('exercise'),
                            socketUpdated: object.lastUpdated.exercise,
                        })

                    new Worker(new URL("../../workers/workoutPlan.worker.ts", import.meta.url), {
                        name: 'workoutPlan',
                        type: 'module'
                    })
                        .postMessage({
                            updated: await getCookie('workout_plan'),
                            socketUpdated: object.lastUpdated.workout_plan,
                        })

                    new Worker(new URL("../../workers/dailyMeasurement.worker.ts", import.meta.url), {
                        name: 'dailyMeasurement',
                        type: 'module'
                    })
                        .postMessage({
                            updated: await getCookie('daily_measurement'),
                            socketUpdated: object.lastUpdated.daily_measurement,
                        })

                    if (store.getState().online.isOnline && object.lastUpdated.settings > await getCookie('settings') || await getIndexedDBbyID('whatToUpdate', 'settings')) {
                        dispatch(setToken(await refreshToken()));
                    }

                } catch (error: any) {
                    console.log('synchronization ended with error', error)
                    dispatch(setIsOnline(false))
                }
            })

            socket.on('synchronizationMessege', async (message) => {
                console.log('synchronizationMessege', message)
                if (message.socket_ID != await getCookie('socket_ID')) {
                    console.log('synchronizationMessege passed')
                    if (message.where == 'settings') {
                        dispatch(setToken(await refreshToken()));
                    } else {
                        for (let i = 0; i < message.array.length; i++) {
                            await deleteIndexedDB(message.where, message.array[i][message.where == 'daily_measurement' ? 'whenAdded' : '_id'])
                        }
                        if (message.whatToDo == 'change') {
                            await addIndexedDB(message.where, message.array)
                        }
                    }
                    dispatch(refreshKey(message.where))
                }
                setCookie(message.where, new Date().getTime().toString(), 365)
            })

            socket.on('disconnect', () => dispatch(setIsOnline(false))) // Closed socket => user has to be offline
        }
    }, [token])

    return children
}

export default Socket;