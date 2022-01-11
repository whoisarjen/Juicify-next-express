import { FunctionComponent, useState } from "react";
import styles from '../../styles/coach.module.css'
import Button from '@mui/material/Button';
import useTranslation from "next-translate/useTranslation";

interface ChooseCaloriesSourcetProps {
    prepareAnalize: (arg0: boolean) => void
}

const ChooseCaloriesSource: FunctionComponent<ChooseCaloriesSourcetProps> = ({ prepareAnalize }) => {
    const { t } = useTranslation('coach')

    return (
        <div className={styles.chooseCaloriesSource}>
            <div className={styles.AddWeightMainTitle}><div>{t('CHOOSE_CALORIES_SOURCE_TITLE')}</div></div>
            <div>
                <div className={styles.chooseCaloriesSourceBold}>{t('CHOOSE_CALORIES_SOURCE_BUTTON')}</div>
                <div>{t('CHOOSE_CALORIES_SOURCE_DESCRIPTION')}</div>
            </div>
            <div>
                <div className={styles.chooseCaloriesSourceBold}>{t('CHOOSE_CALORIES_SOURCE_BUTTON_2')}</div>
                <div>{t('CHOOSE_CALORIES_SOURCE_DESCRIPTION_2')}</div>
            </div>
            <Button variant="contained" onClick={() => prepareAnalize(true)}>{t('CHOOSE_CALORIES_SOURCE_BUTTON')}</Button>
            <Button variant="contained" onClick={() => prepareAnalize(false)}>{t('CHOOSE_CALORIES_SOURCE_BUTTON_2')}</Button>
        </div>
    );
};

export default ChooseCaloriesSource;