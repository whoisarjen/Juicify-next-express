import { useContext } from 'react'
import { useCookies } from 'react-cookie'
import { SocketContext } from '../context/socket';

const useSynchronization = () => {
    const socket = useContext(SocketContext)
    const [cookies] = useCookies()

    const sendSynchronizationMessege = (where, whatToDo, array) => {
        console.log("Sent messege")
        socket.emit('sendSynchronizationMessege', {
            where: where,
            whatToDo: whatToDo,
            array: array,
            time: new Date().getTime(),
            token: cookies.token
        })
    }

    return sendSynchronizationMessege;
}

export { useSynchronization };