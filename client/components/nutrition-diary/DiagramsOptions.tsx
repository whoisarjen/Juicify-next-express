import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import PieChartIcon from '@mui/icons-material/PieChart';
import styles from '../../styles/nutrition-diary.module.css'
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const DiagramsOptions: FunctionComponent = () => {
    const router = useRouter()
    const { t } = useTranslation('nutrition-diary')

    return (
        <div className={styles.diagramsOptions}>
            <div className={styles.diagramsOptionsExtrButtons}>
                <div />
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
                <div />
                <Button
                    onClick={() => router.push('/macronutrients')}
                    color="error"
                    variant="outlined"
                    aria-label="Burnt calories"
                    component="span"
                    startIcon={<LocalFireDepartmentIcon />}
                    sx={{ margin: 'auto' }}
                >
                    {t('Burnt calories')}
                </Button>
                <div />
                {/* <Button
                    onClick={() => router.push('/macronutrients')}
                    color="primary"
                    variant="outlined"
                    aria-label="macronutrients"
                    component="span"
                    startIcon={<PieChartIcon />}
                    sx={{ margin: 'auto' }}
                >
                    {t('Macronutrients')}
                </Button> */}
            </div>
        </div>
    )
}

export default DiagramsOptions;