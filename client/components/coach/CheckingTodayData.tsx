import { useState } from "react";
import Button from '@mui/material/Button';
import { useDailyMeasurement } from "../../hooks/useDailyMeasurement";
import { getAge, getShortDate } from "../../utils/date.utils";
import Weights from '../common/Weights'
import { useAppSelector } from "../../hooks/useRedux";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

interface ChooseDietProps {
    setStep: (arg0: string) => void
}

const Grid = styled.div`
    width: 100%;
    height: calc(100vh - var(--BothNavHeightAndPadding));
    display: grid;
    grid-template-rows: 1fr 2fr 1fr auto auto;
    row-gap: 5px;
    text-align: center;
    ${this} table {
        table-layout: fixed;
        width: 100%;
    }
`

const Title = styled.div`
    font-size: 1.75rem;
    font-weight: bold;
    display: grid;
    padding: 20px 0;
    ${this} div {
        margin: auto;
    }
`

const CheckingTodayData = ({ setStep }: ChooseDietProps) => {
    const { t } = useTranslation('coach')
    const token: any = useAppSelector(state => state.token.value)
    const { data, reload } = useDailyMeasurement(getShortDate(), token.login)
    const [isWeights, setIsWeights] = useState(false)

    return (
        <Grid>
            <Title><div>{t('CHECKING_TODAY_TITLE')}</div></Title>
            {
                (
                    data?.weight
                        ?
                        <>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>{t('HEIGHT')}:</th>
                                        <td>{token.height}cm</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th>{t('WEIGHT')}:</th>
                                        <td>{data?.weight}kg</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th>{t('AGE')}:</th>
                                        <td>{getAge(token.birth)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>{t('CHECKING_TODAY_DESCRIPTION')}</div>

                            <Button variant="contained" onClick={() => setIsWeights(true)}>{t('CHANGE_WEIGHT')}</Button>
                        </>
                        :
                        <>
                            <div />
                            <div>{t('CHECKING_TODAY_DESCRIPTION_ALTERNATIVE')}</div>
                            <Button variant="contained" color="error" onClick={() => setIsWeights(true)}>{t('ADD_WEIGHT')}</Button>
                        </>
                )
            }
            <Button variant="contained" onClick={() => setStep('ChooseDiet')} disabled={!data || data.weight == 0}>{t('CHECKING_TODAY_BUTTON')}</Button>
            <Weights
                isWeights={isWeights}
                closeWeights={() => {
                    reload()
                    setIsWeights(false)
                }}
            />
        </Grid>
    )
}

export default CheckingTodayData;