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
    const [daily, setDaily] = useState({})
    const theOldestSupportedDate = useSelector(state => state.config.theOldestSupportedDate())

    useEffect(async () => {
        const _id = router.query.id
        const whenAdded = router.query.date
        if (_id && whenAdded) {
            const token = readToken(cookies.token)
            if (token.login == router.query.login) {
                setUser(token)
                if (theOldestSupportedDate <= router.query.date) {
                    let daily = await getIndexedDBbyID('daily_measurement', whenAdded)
                    let data = false
                    if (!daily) {
                        daily = {
                            _id: 'XD' + new Date().getTime(),
                            whenAdded: whenAdded,
                            user_ID: token._id,
                            nutrition_diary: [],
                            workout_result: []
                        }
                        setDaily(daily)
                    } else {
                        if (!daily.workout_result) {
                            daily.workout_result = []
                        } else {
                            if (daily.workout_result.filter(workout => workout._id === router.query.id) > 0) {
                                data = daily.workout_result.filter(workout => workout._id === router.query.id)[0]
                            }
                        }
                        setDaily(daily)
                    }
                    if (data) {
                        if (await getIndexedDBbyID('workout_result', router.query.id)) {
                            data = await getIndexedDBbyID('workout_result', router.query.id)
                        }
                    } else {
                        if (await getIndexedDBbyID('workout_result', router.query.id)) {
                            data = await getIndexedDBbyID('workout_result', router.query.id)
                        }
                    }
                    setData(data)
                    if (!daily || !data) {
                        router.push(`/${router.query.login}/workout-results`)
                    }
                } else {
                    if (await is_id(router.query.id)) {
                        // DB
                    } else {
                        router.push(`/${router.query.login}/workout-results`)
                    }
                }
            } else {
                if (await is_id(router.query.id)) {
                    // DB guest
                } else {
                    router.push(`/${router.query.login}/workout-results`)
                }
            }
        }
    }, [reload])

    return [{ data, user, daily }, () => setReload(reload + 1)]
}

export default useWorkoutResult;