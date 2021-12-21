import { is_id } from '../utils/API'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import { readToken } from '../utils/checkAuth'
import { loadOneValueByLogin } from '../utils/API'
import { getIndexedDBbyID } from '../utils/indexedDB'
import { useSelector } from 'react-redux'

const useWorkoutResult = () => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [user, setUser] = useState({})
    const [reload, setReload] = useState(0)
    const [data, setData] = useState(false)
    const theOldestSupportedDate = useSelector(state => state.config.theOldestSupportedDate())

    useEffect(async () => {
        const _id = router.query.id
        const whenAdded = router.query.date
        if (_id && whenAdded) {
            const token = readToken(cookies.token)
            if (token.login == router.query.login) {
                setUser(token)
                if (await is_id(_id)) {
                    if (theOldestSupportedDate <= router.query.date) {
                        let res = await getIndexedDBbyID('workout_result', _id)
                        if (res) {
                            setData(res)
                        } else {
                            res = await getIndexedDBbyID('daily_measurement', whenAdded)
                            if (res && res.workout_results && res.workout_results.length > 0) {
                                res = res.filter(result => result._id === _id)
                                if (res.length > 0) {
                                    setData(res[0])
                                } else {
                                    // out
                                }
                            }
                        }
                        setData()
                    } else {
                        // DB
                    }
                } else {
                    let res = await getIndexedDBbyID('workout_result', _id)
                    if (res) {
                        setData(res)
                    } else {
                        // out
                    }
                }
            } else {
                // DB
            }
        }
    }, [reload])

    return [{ data, user }, () => setReload(reload + 1)]
}

export default useWorkoutResult;