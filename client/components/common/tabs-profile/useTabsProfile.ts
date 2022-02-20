import { useRouter } from "next/router";
import { TabsProfileProps } from ".";

const useTabsProfile = ({ tab }: TabsProfileProps) => {
    const router = useRouter()

    return { tab, router }
}

export type useTabsProfileProps = ReturnType<typeof useTabsProfile>

export default useTabsProfile;