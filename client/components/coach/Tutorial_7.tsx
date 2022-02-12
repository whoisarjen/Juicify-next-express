import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import styled from "styled-components";

interface Tutorial_7Props {
    setStep: (arg0: string) => void,
    handlePreviousStep: () => void
}

const Box = styled.div`
    width: 100%;
    height: calc(100vh - var(--BothNavHeightAndPadding));
    display: grid;
    grid-template-rows: 44px auto auto 44px;
    grid-gap: 5px;
    text-align: center;
    ${this} div {
        margin: auto;
    }
`

const ArrowBack = styled.div`
    margin: auto 0;
    width: 100%;
    display: grid;
    grid-template-columns: 40px 1fr;
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

const Tutorial_7: FunctionComponent<Tutorial_7Props> = ({ setStep, handlePreviousStep }) => {
    const { t } = useTranslation('coach')

    return (
        <Box>
            <ArrowBack>
                <IconButton aria-label="back" onClick={() => setStep('Tutorial_6')}>
                    <KeyboardBackspaceIcon />
                    <div />
                </IconButton>
            </ArrowBack>
            <Title><div>{t('THATS_ALL')}</div></Title>
            <div>{t('TUTORIAL_7')}</div>
            <Button variant="contained" onClick={handlePreviousStep}>{t('I_AM_READY')}</Button>
        </Box>
    )
}

export default Tutorial_7;