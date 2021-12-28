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
import { useAppSelector } from "../../hooks/useRedux";
import { useRouter } from "next/router";
import countCalories from "./utils/countCalories";

interface DiagramsProps {
    array: Array<any>
}

const Diagrams: FunctionComponent<DiagramsProps> = ({ array }) => {
    const [value, setValue] = useState<string>('1');
    const [getDay] = useMacro()
    const router = useRouter()
    const token: any = useAppSelector(state => state.token.value)
    const [object, setObject] = useState({})

    useEffect(() => {
        if (token) {
            let macro = getDay(router.query.date, token)
            let o = {
                'Proteins': { 'value': 0, 'macro': macro.proteins },
                'Carbs': { 'value': 0, 'macro': macro.carbs },
                'Sugar': { 'value': 0, 'macro': 0 },
                'Fats': { 'value': 0, 'macro': macro.fats },
                'Fiber': { 'value': 0, 'macro': 0 }
            }

            let calories = 0
            array.forEach(meal => {
                if (meal.length > 0) {
                    meal.forEach(product => {
                        if (product.p) o['Proteins']['value'] += product.p * product.how_many
                        if (product.c) o['Carbs']['value'] += product.c * product.how_many
                        if (product.s) o['Sugar']['value'] += product.s * product.how_many
                        if (product.f) o['Fats']['value'] += product.f * product.how_many
                        if (product.fi) o['Fiber']['value'] += product.fi * product.how_many
                        calories += parseInt(countCalories(product).toString())
                    })
                }
            })
            
            o['Sugar']['macro'] = token.sugar_percent * o['Carbs']['value']
            o['Fiber']['macro'] = token.fiber * (calories / 1000)

            setObject(o)
        }
    }, [token])

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    return (
        <div className={styles.diagrams}>
            <Box sx={{ width: '100%', marginBottom: '24px' }}>
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
                            <Tab label="Consumed" value="1" />
                            <Tab label="Remaining" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className={styles.diagramsGrid}>
                        <div>
                            <CircularWithLabel array={array} />
                        </div>
                        <div />
                        <table className={styles.diagramsTable}>
                            {
                                Object.keys(object).map(x =>
                                    <tr>
                                        <th>{x}:</th>
                                        <td>{Math.round(object[x].value * 10) / 10}g</td>
                                        <td>/ {Math.round(object[x].macro * 10) / 10}g</td>
                                    </tr>
                                )
                            }
                        </table>
                    </TabPanel>
                    <TabPanel value="2" className={styles.diagramsGrid}>
                        <div>
                            <CircularWithLabelReverse array={array} />
                        </div>
                        <div />
                        <table className={styles.diagramsTable}>
                            {
                                Object.keys(object).map(x =>
                                    <tr>
                                        <th>{x}:</th>
                                        <td>{Math.round((object[x].macro - object[x].value) * 10) / 10}g</td>
                                        <td>/ {Math.round(object[x].macro * 10) / 10}g</td>
                                    </tr>
                                )
                            }
                        </table>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default Diagrams;