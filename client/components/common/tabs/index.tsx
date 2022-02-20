import useAddItemsTabs from './useAddItemsTabs';
import BaseAddItemsTabs from './AddItemsTabs';

export interface AddItemsTabsProps {
    changeTab: (arg0: number) => void,
    checkedLength: number
}

const AddItemsTabs = ({ changeTab, checkedLength = 0 }: AddItemsTabsProps) => {
    const props = useAddItemsTabs({ changeTab, checkedLength })

    return <BaseAddItemsTabs {...props} />
}

export default AddItemsTabs;