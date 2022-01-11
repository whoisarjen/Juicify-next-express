import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import PieChartIcon from '@mui/icons-material/PieChart';
import styles from '../../styles/nutrition-diary.module.css'
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const DiagramsOptions: FunctionComponent = () => {
    const router = useRouter()
    const { t } = useTranslation('nutrition-diary')

    return (
        <div className={styles.diagramsOptions}>
            <Button
                onClick={() => router.push('/macronutrients')}
                color="primary"
                variant="outlined"
                aria-label="macronutrients"
                component="span"
                startIcon={<PieChartIcon />}
                sx={{ margin: 'auto' }}
            >
                {t('Macronutrients')}
            </Button>
        </div>
    )
}

export default DiagramsOptions;