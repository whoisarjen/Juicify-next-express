import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import styled from "styled-components";

interface Tutorial_1Props {
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

const Tutorial_1: FunctionComponent<Tutorial_1Props> = ({ setStep, handlePreviousStep }) => {
    const { t } = useTranslation('coach')

    return (
        <Box>
            <ArrowBack>
                <IconButton aria-label="back" onClick={handlePreviousStep}>
                    <KeyboardBackspaceIcon />
                    <div />
                </IconButton>
            </ArrowBack>
            <Title><div>{t('HOW_DOES_IT_WORK')}</div></Title>
            <div>{t('TUTORIAL_1')}</div>
            <Button variant="contained" onClick={() => setStep('Tutorial_2')}>{t('NEXT_STEP')}</Button>
        </Box>
    )
}

export default Tutorial_1;