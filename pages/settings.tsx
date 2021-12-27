import { FunctionComponent, useState, SyntheticEvent, ReactNode } from "react";
import { expectLoggedIN } from "../utils/checkAuth";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab1 from "../components/settings/Tab1";
import Tab2 from "../components/settings/Tab2";
import Tab3 from "../components/settings/Tab3";
import Tab4 from "../components/settings/Tab4";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            style={{ width: '100%' }}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Settings: FunctionComponent = () => {
    expectLoggedIN();
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => setValue(newValue);

    return <div className="settings">
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%'}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', overflow: 'visible'  }}
            >
                <Tab label="Account" />
                <Tab label="Diary" />
                <Tab label="Preference" />
                <Tab label="Security" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Tab1 />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Tab2 />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Tab3 />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Tab4 />
            </TabPanel>
        </Box>
    </div>;
};

export default Settings;
