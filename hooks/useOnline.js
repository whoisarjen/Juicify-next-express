import { useEffect } from "react";
import { useSelector } from 'react-redux'

const useOnline = () => {
    const [value, setValue] = false
    const isOnline = useSelector(state => state.online.isOnline)

    useEffect(() => {
        setValue(isOnline)
    }, [isOnline])

    return value
}
 
export default useOnline;