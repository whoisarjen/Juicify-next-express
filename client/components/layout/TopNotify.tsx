import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { getAllIndexedDB } from "../../utils/indexedDB";

const TopNotify: FunctionComponent = () => {
    const [notSaved, setNotSaved]: any = useState([])
    const [allowed, setAllowed] = useState(false)
    const [timer, setTimer]: any = useState()
    const token: any = useAppSelector(state => state.token.value)
    const isOnline: boolean = useAppSelector(state => state.online.isOnline)
    const router: any = useRouter()
    const { t } = useTranslation('home')

    useEffect(() => {
        (async () => {
            clearTimeout(timer)
            setAllowed(false)
            if (token && token.login) {
                document.documentElement.style.setProperty('--BothNavHeightAndPaddingDefault', '141px')
                const workoutResults = await getAllIndexedDB('workout_result')
                if (!router.pathname.includes('workout-results') && workoutResults.length) {
                    document.documentElement.style.setProperty('--BothNavHeightAndPaddingDefault', '183px')
                } else {
                    document.documentElement.style.setProperty('--BothNavHeightAndPaddingDefault', '141px')
                }
                setNotSaved(workoutResults)
            }
            setTimer(setTimeout(() => setAllowed(true), 1500))
        })()
    }, [router.pathname, token])
    return (
        <>
            {
                allowed &&
                (
                    notSaved.length > 0 &&
                        !router.pathname.includes('workout-results')
                        ?
                        (
                            <Link href={`/${token.login}/workout-results/${notSaved[0].whenAdded}/${notSaved[0]._id}`}>
                                <a>
                                    <div className="TopNotify">
                                        {t('Comeback to not saved workout')}
                                    </div>
                                </a>
                            </Link>
                        )
                        :
                        !isOnline && token && token._id
                            ?
                            (
                                <div className="TopNotify">
                                    {t('YOU_ARE_WORKING_IN_OFFLINE_MODE')}
                                </div>
                            )
                            :
                            <></>
                )
            }
        </>
    )
}

export default TopNotify;