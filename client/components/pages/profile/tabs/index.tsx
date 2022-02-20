import useTabs from './useProfileTabs';
import BaseProfileTabs from './ProfileTabs';

export interface ProfileTabsProps {
    tab: number
}

const ProfileTabs = ({ tab }: ProfileTabsProps) => {
    const props = useTabs({ tab })

    return <BaseProfileTabs {...props} />
}

export default ProfileTabs;