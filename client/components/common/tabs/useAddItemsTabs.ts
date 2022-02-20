import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { AddItemsTabsProps } from ".";

const useAddItemsTabs = ({ changeTab, checkedLength = 0 }: AddItemsTabsProps) => {
    const [tab, setTab] = useState(0)
    const { t } = useTranslation('home');

    const changedTab = (value: number) => {
        console.log(value)
        setTab(value)
        changeTab(value)
    }

    return { changedTab, checkedLength, t, tab }
}

export type useAddItemsTabsProps = ReturnType<typeof useAddItemsTabs>

export default useAddItemsTabs;