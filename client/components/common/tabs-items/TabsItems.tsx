import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTabsItemsProps } from './useTabsItems';

const BaseTabsItems = ({ changedTab, checkedLength, t, tab }: useTabsItemsProps) => {
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

export default BaseTabsItems;