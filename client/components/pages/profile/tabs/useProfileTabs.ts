import { useRouter } from "next/router";
import { ProfileTabsProps } from ".";

const useProfileTabs = ({ tab }: ProfileTabsProps) => {
    const router = useRouter()

    return { tab, router }
}

export type useProfileTabsProps = ReturnType<typeof useProfileTabs>

export default useProfileTabs;