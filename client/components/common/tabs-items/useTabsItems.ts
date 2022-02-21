import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { TabsItemsProps } from ".";

const useTabsItems = ({ changeTab, checkedLength = 0 }: TabsItemsProps) => {
    const [tab, setTab] = useState(0)
    const { t } = useTranslation('home');

    const changedTab = (value: number) => {
        setTab(value)
        changeTab(value)
    }

    return { changedTab, checkedLength, t, tab }
}

export type useTabsItemsProps = ReturnType<typeof useTabsItems>

export default useTabsItems;