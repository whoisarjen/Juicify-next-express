import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { SectionDiaryManagingProps } from "."

const useSectionDiaryManaging = ({ data }: SectionDiaryManagingProps) => {
    const router: any = useRouter()
    const { t } = useTranslation('nutrition-diary')

    return { router, t, data }
}

export type useSectionDiaryManagingProps = ReturnType<typeof useSectionDiaryManaging>

export default useSectionDiaryManaging;