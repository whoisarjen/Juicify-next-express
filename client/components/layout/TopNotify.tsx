import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { getAllIndexedDB } from "../../utils/indexedDB";

const TopNotify: FunctionComponent = () => {
    const [notSaved, setNotSaved]: any = useState([])
    const token: any = useAppSelector(state => state.token.value)
    const router: any = useRouter()
    const { t } = useTranslation('home')

    useEffect(() => {
        (async () => {
            document.documentElement.style.setProperty('--BothNavHeightAndPaddingDefault', '141px')
            const workoutResults = await getAllIndexedDB('workout_result')
            if (!router.pathname.includes('workout-results') && workoutResults.length) {
                document.documentElement.style.setProperty('--BothNavHeightAndPaddingDefault', '183px')
            } else {
                document.documentElement.style.setProperty('--BothNavHeightAndPaddingDefault', '141px')
            }
            setNotSaved(workoutResults)
        })()
    }, [router.pathname])
    return (
        <>
            {
                notSaved &&
                notSaved.length > 0 &&
                !router.pathname.includes('workout-results') &&
                <Link href={`/${token.login}/workout-results/${notSaved[0].whenAdded}/${notSaved[0]._id}`}>
                    <a>
                        <div className="TopNotify">
                            {t('Comeback to not saved workout')}
                        </div>
                    </a>
                </Link>
            }
        </>
    )
}

export default TopNotify;