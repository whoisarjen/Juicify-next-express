import useTabs from './useTabsProfile';
import BaseTabsProfile from './TabsProfile';

export interface TabsProfileProps {
    tab: number
}

const TabsProfile = ({ tab }: TabsProfileProps) => {
    const props = useTabs({ tab })

    return <BaseTabsProfile {...props} />
}

export default TabsProfile;