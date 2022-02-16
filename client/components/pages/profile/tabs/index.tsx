import useTabs from './useTabs';
import BaseTabs from './Tabs';

export interface TabsProps {
    tab: number
}

const Tabs = ({ tab }: TabsProps) => {
    const props = useTabs({ tab })

    return <BaseTabs {...props} />
}

export default Tabs;