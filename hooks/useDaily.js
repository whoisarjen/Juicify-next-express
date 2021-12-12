import { getIndexedDBbyID } from "../hooks/useIndexedDB";

const useDaily = async (when = (new Date()).toJSON().slice(0, 10)) => {
    console.log(when)
    const daily = await getIndexedDBbyID('daily_measurement', when)
    console.log(daily)

    return ''
}
 
export default useDaily;