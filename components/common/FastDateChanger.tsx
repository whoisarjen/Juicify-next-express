import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import styles from '../../styles/fastDateChanger.module.css'
import { addDaysToDate, reverseDateDotes } from "../../utils/manageDate";

const FastDateChanger: FunctionComponent = () => {
    const router: any = useRouter()
    const [today, setToday] = useState(new Date())

    useEffect(() => setToday(router.query.date), [router.query.date])

    return (
        <div className={styles.fastDateChanger}>
            <Link href={`/${router.query.login}/nutrition-diary/${addDaysToDate(today, -2)}`}><a><div>{addDaysToDate(today, -2).slice(8, 10)}</div></a></Link>
            <Link href={`/${router.query.login}/nutrition-diary/${addDaysToDate(today, -1)}`}><a><div>{addDaysToDate(today, -1).slice(8, 10)}</div></a></Link>
            <div>{reverseDateDotes(today)}</div>
            <Link href={`/${router.query.login}/nutrition-diary/${addDaysToDate(today, 1)}`}><a><div>{addDaysToDate(today, 1).slice(8, 10)}</div></a></Link>
            <Link href={`/${router.query.login}/nutrition-diary/${addDaysToDate(today, 2)}`}><a><div>{addDaysToDate(today, 2).slice(8, 10)}</div></a></Link>
        </div>
    )
}

export default FastDateChanger;