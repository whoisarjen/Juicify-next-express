import { FunctionComponent } from "react";
import styles from '../../styles/macronutrients.module.css'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useMacro from "../../hooks/useMacro";
import useTranslation from "next-translate/useTranslation";

interface BarProps {
    object: {
        proteins: number,
        carbs: number,
        fats: number,
        day: number,
        locked: boolean,
        choosen?: boolean
    },
    click?: (arg0: object) => void,
    toggleLock?: (arg0: object) => void
}

const Bar: FunctionComponent<BarProps> = ({ object, click, toggleLock }) => {
    const [{ getShortDayName }] = useMacro()
    const { t } = useTranslation('macronutrients')

    return (
        <div className={styles.barBox}>
            <div className={styles.barBoxDay}>
                <div>{t(getShortDayName(object.day).toUpperCase())}</div>
            </div>
            <div className={object.choosen ? styles.macroChoosen : styles.macro} onClick={click}>
                <div className={styles.barBoxProteins}>
                    <div className="marginAuto">
                        {object.proteins} {t('P')}
                    </div>
                </div>
                <div className={styles.barBoxCarbs}>
                    <div className="marginAuto">
                        {object.carbs} {t('C')}
                    </div>
                </div>
                <div className={styles.barBoxFats}>
                    <div className="marginAuto">
                        {object.fats} {t('F')}
                    </div>
                </div>
                <div className={styles.barBoxCalories}>
                    <div className="marginAuto">
                        {object.proteins * 4 + object.carbs * 4 + object.fats * 9}
                    </div>
                </div>
            </div>
            <div className={styles.barBoxDay}>
                {
                    object.locked ?
                        (
                            <IconButton
                                onClick={toggleLock}
                                color="secondary"
                                className="marginAuto"
                            >
                                <LockOutlinedIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={toggleLock}
                                color="primary"
                                className="marginAuto"
                            >
                                <LockOpenIcon />
                            </IconButton>
                        )
                }
            </div>
        </div>
    )
}

export default Bar;