import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import PieChartIcon from '@mui/icons-material/PieChart';
import styles from '../../styles/nutrition-diary.module.css'
import { useRouter } from "next/router";

const DiagramsOptions: FunctionComponent = () => {
    const router = useRouter()

    return (
        <div className={styles.diagramsOptions}>
            <Button
                onClick={() => router.push('/macronutrients')}
                color="primary"
                aria-label="macronutrients"
                component="span"
                startIcon={<PieChartIcon />}
                sx={{ margin: 'auto' }}
            >
                Macronutrients
            </Button>
        </div>
    )
}

export default DiagramsOptions;