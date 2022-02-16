import useTabs from './useTabs';
import TabsMenu from './tabs';

export interface TabsProps {
    tab: number
}

const TabsComponent = ({ tab }: TabsProps) => {
    const props = useTabs({ tab })

    return <TabsMenu {...props} />
}

export default TabsComponent;