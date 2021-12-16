import { socketContent } from '../context/socket';

const useSynchronization = () => {
    const socket = useContext(socketContent)
    return () => console.log('asd');
}
 
export default useSynchronization;