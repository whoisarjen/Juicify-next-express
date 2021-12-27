import { FunctionComponent, useState, SyntheticEvent } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from '../../styles/nutrition-diary.module.css'
import CircularWithLabel from "../common/CircularWithLabel";

interface DiagramsProps {
    array: Array<any>
}

const Diagrams: FunctionComponent<DiagramsProps> = ({ array }) => {
    const [value, setValue] = useState<string>('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    return (
        <div className={styles.diagrams}>
            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <Box>
                        <TabList
                            onChange={handleChange}
                            value={value}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth"
                            sx={{ marginBottom: '10px' }}
                        >
                            <Tab label="Consumed" value="1" />
                            <Tab label="Remaining" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className={styles.diagramsGrid}>
                        <div>
                            <CircularWithLabel />
                        </div>
                        <div>1</div>
                        <div>1</div>
                    </TabPanel>
                    <TabPanel value="2" className={styles.diagramsGrid}>
                        <div>2</div>
                        <div>2</div>
                        <div>2</div>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default Diagrams;