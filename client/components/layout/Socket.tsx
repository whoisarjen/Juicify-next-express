import { setIsOnline } from '../../redux/features/online.slice'
import io from "socket.io-client";
import { useEffect } from 'react'
import { setToken } from "../../redux/features/token.slice";
import { deleteIndexedDB, getIndexedDBbyID, addIndexedDB } from '../../utils/indexedDB.utils'
import { getCookie, setCookie } from '../../utils/auth.utils'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { refreshKey } from '../../redux/features/key.slice';
import { workersController } from '../../utils/worker.utils';
import { getOnline } from '../../utils/db.utils';
import useToken from '../../hooks/useToken';

const Socket = ({ children }: { children: any }) => {
    const dispatch = useAppDispatch()
    const { refreshToken } = useToken()
    const token: any = useAppSelector(state => state.token.value)

    useEffect(() => {
        if (localStorage.getItem('token')) dispatch(setToken(localStorage.getItem('token')))
        window.addEventListener('offline', () => dispatch(setIsOnline(false)))
    }, [])

    useEffect(() => {
        if (token) {
            const socket = io(process.env.NEXT_PUBLIC_SERVER as any, { withCredentials: true })

            socket.on('compareDatabases', async ({ lastUpdated }) => {
                try {
                    dispatch(setIsOnline(true))

                    workersController(lastUpdated)

                    if (getOnline() && lastUpdated.settings > await getCookie('settings') || await getIndexedDBbyID('whatToUpdate', 'settings')) {
                        await refreshToken()
                    }

                } catch (error: any) {
                    console.log(error)
                    dispatch(setIsOnline(false))
                }
            })

            socket.on('synchronizationMessege', async (message) => {
                if (message.socket_ID != await getCookie('socket_ID')) {
                    if (message.where == 'settings') {
                        await refreshToken()
                    } else {
                        for (let i = 0; i < message.array.length; i++) {
                            await deleteIndexedDB(message.where, message.array[i][message.where == 'daily_measurement' ? 'whenAdded' : '_id'])
                        }
                        if (message.whatToDo == 'change') {
                            await addIndexedDB(message.where, message.array)
                        }
                    }
                    dispatch(refreshKey(message.where)) // it can NOT be outsite. The call is reaching before indexedDB settle value
                }
                setCookie(message.where, new Date().getTime().toString(), 365)
            })

            socket.on('disconnect', () => dispatch(setIsOnline(false))) // Closed socket => user has to be offline
        }
    }, [token._id])

    return children
}

export default Socket;