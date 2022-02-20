import useTabsItems from './useTabsItems';
import BaseTabsItems from './TabsItems';

export interface TabsItemsProps {
    changeTab: (arg0: number) => void,
    checkedLength: number
}

const TabsItems = ({ changeTab, checkedLength = 0 }: TabsItemsProps) => {
    const props = useTabsItems({ changeTab, checkedLength })

    return <BaseTabsItems {...props} />
}

export default TabsItems;