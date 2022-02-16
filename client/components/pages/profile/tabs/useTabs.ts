import { useRouter } from "next/router";
import { TabsProps } from ".";

const useTabs = ({ tab }: TabsProps) => {
    const router = useRouter()

    return { tab, router }
}

export type useTabsProps = ReturnType<typeof useTabs>

export default useTabs;