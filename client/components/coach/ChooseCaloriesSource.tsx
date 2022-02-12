import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

interface ChooseCaloriesSourcetProps {
    prepareAnalize: (arg0: boolean) => void
}

const Grid = styled.div`
    width: 100%;
    height: calc(100vh - var(--BothNavHeightAndPadding));
    display: grid;
    grid-template-rows: 1fr 1fr 1fr auto auto;
    grid-gap: 5px;
    text-align: center;
`

const Bold = styled.div`
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9rem;
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

const ChooseCaloriesSource: FunctionComponent<ChooseCaloriesSourcetProps> = ({ prepareAnalize }) => {
    const { t } = useTranslation('coach')

    return (
        <Grid>
            <Title><div>{t('CHOOSE_CALORIES_SOURCE_TITLE')}</div></Title>
            <div>
                <Bold>{t('CHOOSE_CALORIES_SOURCE_BUTTON')}</Bold>
                <div>{t('CHOOSE_CALORIES_SOURCE_DESCRIPTION')}</div>
            </div>
            <div>
                <Bold>{t('CHOOSE_CALORIES_SOURCE_BUTTON_2')}</Bold>
                <div>{t('CHOOSE_CALORIES_SOURCE_DESCRIPTION_2')}</div>
            </div>
            <Button variant="contained" onClick={() => prepareAnalize(true)}>{t('CHOOSE_CALORIES_SOURCE_BUTTON')}</Button>
            <Button variant="contained" onClick={() => prepareAnalize(false)}>{t('CHOOSE_CALORIES_SOURCE_BUTTON_2')}</Button>
        </Grid>
    );
};

export default ChooseCaloriesSource;