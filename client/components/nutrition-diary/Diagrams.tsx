import { FunctionComponent, useState, SyntheticEvent, useEffect } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from '../../styles/nutrition-diary.module.css'
import CircularWithLabel from "./CircularWithLabel";
import CircularWithLabelReverse from "./CircularWithLabelReverse";
import useMacro from "../../hooks/useMacro";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import NutritionDiaryProps from "../../interfaces/nutritionDiary.interface";

interface DiagramsProps {
    array: Array<Array<NutritionDiaryProps>>,
    user: any
}

const Diagrams: FunctionComponent<DiagramsProps> = ({ array, user }) => {
    const [value, setValue] = useState<string>('1');
    const [{ getDay }] = useMacro()
    const router = useRouter()
    const [object, setObject] = useState<any>({})
    const { t } = useTranslation('nutrition-diary')

    useEffect(() => {
        if (user) {
            const macro = getDay(router.query.date, user)
            let o = {
                'Proteins': { 'value': 0, 'macro': macro.proteins },
                'Carbs': { 'value': 0, 'macro': macro.carbs },
                'Sugar': { 'value': 0, 'macro': (user.sugar_percent || 0) * macro.carbs / 100 },
                'Fats': { 'value': 0, 'macro': macro.fats },
                'Fiber': { 'value': 0, 'macro': (user.fiber || 0) * (macro.proteins * 4 + macro.carbs * 4 + macro.fats * 9) / 1000 }
            }

            array.forEach(meal => {
                if (meal.length) {
                    meal.forEach((product: NutritionDiaryProps) => {
                        if (product && product.how_many) {
                            if (product.p) o['Proteins']['value'] += product.p * product.how_many
                            if (product.c) o['Carbs']['value'] += product.c * product.how_many
                            if (product.s) o['Sugar']['value'] += product.s * product.how_many
                            if (product.f) o['Fats']['value'] += product.f * product.how_many
                            if (product.fi) o['Fiber']['value'] += product.fi * product.how_many
                        }
                    })
                }
            })

            setObject(o)
        }
    }, [user, array])

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    return (
        <div className={styles.diagrams}>
            <Box sx={{ width: '100%' }} className={styles.diagramsOptions}>
                <TabContext value={value}>
                    <Box>
                        <TabList
                            onChange={handleChange}
                            value={value}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth"
                            sx={{ marginBottom: '24px' }}
                        >
                            <Tab label={t('consumed')} value="1" key={1} />
                            <Tab label={t('remaining')} value="2" key={2} />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className={styles.diagramsGrid}>
                        <div>
                            <CircularWithLabel array={array} user={user} />
                        </div>
                        <div />
                        <table className={styles.diagramsTable}>
                            <tbody>
                                {
                                    Object.keys(object).map(x =>
                                        <tr key={x}>
                                            <th>{t(x)}:</th>
                                            <td>{Math.round(object[x].value * 10) / 10}g</td>
                                            <td>{Math.round(object[x].macro * 10) / 10}g</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel value="2" className={styles.diagramsGrid}>
                        <div>
                            <CircularWithLabelReverse array={array} user={user} />
                        </div>
                        <div />
                        <table className={styles.diagramsTable}>
                            <tbody>
                                {
                                    Object.keys(object).map(x =>
                                        <tr key={x}>
                                            <th>{t(x)}:</th>
                                            <td>{Math.round((object[x].macro - object[x].value) * 10) / 10}g</td>
                                            <td>{Math.round(object[x].macro * 10) / 10}g</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default Diagrams;