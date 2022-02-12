import Button from '@mui/material/Button';
import { useAppSelector } from "../../hooks/useRedux";
import useTranslation from "next-translate/useTranslation";
import styled from 'styled-components';

const Box = styled.div`
    width: 100%;
    height: calc(100vh - var(--BothNavHeightAndPadding));
    display: grid;
    grid-template-rows: 2fr 1fr 3fr auto auto;
    grid-gap: 5px;
    text-align: center;
    ${this} table {
        width: 50%;
        min-width: 300px;
        margin: auto;
        text-align: center;
    }
    ${this} table tr:nth-child(1) {
        font-weight: bold;
    }
    ${this} table tr:nth-child(2) {
        font-size: 0.785rem;
        text-transform: uppercase;
    }
    ${this} div {
        margin: auto;
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

const Result = ({ setStep }: { setStep: (arg0: string) => void }) => {
    const { t } = useTranslation('coach')
    const token: any = useAppSelector(state => state.token.value)
    console.log(token)

    return (
        <Box>
            <Title><div>{t('RESULT_TITLE')}</div></Title>
            <table>
                {
                    token &&
                    token.macronutrients &&
                    token.macronutrients.length > 0 &&
                    (
                        <tr>
                            <td>
                                {token.macronutrients[0].proteins}g
                            </td>
                            <td>
                                {token.macronutrients[0].carbs}g
                            </td>
                            <td>
                                {token.macronutrients[0].fats}g
                            </td>
                        </tr>
                    )
                }
                <tr>
                    <td>
                        {t('PROTEINS')}
                    </td>
                    <td>
                        {t('CARBS')}
                    </td>
                    <td>
                        {t('FATS')}
                    </td>
                </tr>
            </table>
            <div>{t('RESULT_TITLE_DESCIPRION')}</div>
            <Button variant="contained" onClick={() => setStep('Standard')}>{t('GOT_IT')}</Button>
            <Button variant="contained" color="error" onClick={() => setStep('Tutorial_1')}>{t('DONT_GET_IT')}</Button>
        </Box>
    )
}

export default Result;