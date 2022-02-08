import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from 'styled-components'
import { addDaysToDate, reverseDateDotes } from "../../utils/date.utils";

const FastDateChanger = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 47.5px 47.5px auto 47.5px 47.5px;
    grid-gap: 12px;
    margin: 12px 0;
    text-align: center;
    ${this} a {
        width: 100%;
        margin: auto;
    }
    ${this} div{
        width: calc( 100% - 16px );
        background: #f0f1f6;
        margin: auto;
        text-align: center;
        border-radius: 4px;
        padding: 11.75px 8px;
    }
    ${this} div:nth-child(3) {
        background: #333;
        color: #fff;
        padding: 20px 8px;
    }
`

export default () => {
    const router: any = useRouter()
    const [today, setToday] = useState(new Date())

    useEffect(() => setToday(router.query.date), [router.query.date])

    return (
        <FastDateChanger>
            <Link href={`/${router.query.login}/nutrition-diary/${addDaysToDate(today, -2)}`}><a><div>{addDaysToDate(today, -2).slice(8, 10)}</div></a></Link>
            <Link href={`/${router.query.login}/nutrition-diary/${addDaysToDate(today, -1)}`}><a><div>{addDaysToDate(today, -1).slice(8, 10)}</div></a></Link>
            <div>{reverseDateDotes(today)}</div>
            <Link href={`/${router.query.login}/nutrition-diary/${addDaysToDate(today, 1)}`}><a><div>{addDaysToDate(today, 1).slice(8, 10)}</div></a></Link>
            <Link href={`/${router.query.login}/nutrition-diary/${addDaysToDate(today, 2)}`}><a><div>{addDaysToDate(today, 2).slice(8, 10)}</div></a></Link>
        </FastDateChanger>
    )
}