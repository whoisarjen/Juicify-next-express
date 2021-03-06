import Button from '@mui/material/Button';
import { useDailyMeasurement } from "../../../hooks/useDailyMeasurement";
import { getAge, getShortDate } from "../../../utils/date.utils";
import { useAppSelector } from "../../../hooks/useRedux";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";
import AddWeight from "../../common/dialog-add-weight";
import NavbarOnlyTitle from "../../common/navbar-only-title";

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

const CheckingTodayData = ({ setStep }: { setStep: (arg0: string) => void }) => {
    const { t } = useTranslation('coach')
    const token: any = useAppSelector(state => state.token.value)
    const { data } = useDailyMeasurement(getShortDate(), token.login)

    return (
        <Grid>
            <NavbarOnlyTitle title="coach:CHECKING_TODAY_TITLE" />
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

                            <AddWeight>
                                <Button sx={{ margin: 'auto 0', width: '100%' }} variant="contained">{t('CHANGE_WEIGHT')}</Button>
                            </AddWeight>
                        </>
                        :
                        <>
                            <div />
                            <div>{t('CHECKING_TODAY_DESCRIPTION_ALTERNATIVE')}</div>
                            <AddWeight>
                                <Button sx={{ width: '100%' }} variant="contained" color="error">{t('ADD_WEIGHT')}</Button>
                            </AddWeight>
                        </>
                )
            }
            <Button variant="contained" onClick={() => setStep('ChooseDiet')} disabled={!data || data.weight == 0}>{t('CHECKING_TODAY_BUTTON')}</Button>
        </Grid>
    )
}

export default CheckingTodayData;