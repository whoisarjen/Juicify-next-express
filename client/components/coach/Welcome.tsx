import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

interface WelcomeProps {
    setStep: (arg0: string) => void
}

const Box = styled.div`
width: 100%;
height: calc(100vh - var(--BothNavHeightAndPadding));
display: grid;
text-align: center;
grid-template-rows: 1fr 1fr auto;
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

const Welcome: FunctionComponent<WelcomeProps> = ({ setStep }) => {
    const { t } = useTranslation('coach')

    return (
        <Box>
            <Title><div>{t('WELCOME_TITLE')}</div></Title>
            <div className="description">{t('WELCOME_DESCRIPTION')}</div>
            <Button variant="contained" onClick={() => setStep('CheckingTodayData')}>{t('WELCOME_BUTTON')}</Button>
        </Box>
    )
}

export default Welcome;