import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAddItemsTabsProps } from './useAddItemsTabs';

const BaseAddItemsTabs = ({ changedTab, checkedLength, t, tab }: useAddItemsTabsProps) => {
    return (
        <Tabs
            data-testid="tabs"
            value={tab}
            onChange={(e, value) => changedTab(value)}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            sx={{ marginBottom: '10px' }}
        >
            <Tab wrapped label={t('All')} />
            <Tab wrapped label={t('Favourite')} />
            <Tab wrapped label={`${t('Selected')} (${checkedLength})`} />
        </Tabs>
    )
}

export default BaseAddItemsTabs;