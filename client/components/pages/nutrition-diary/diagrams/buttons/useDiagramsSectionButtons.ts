import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { DiagramsOptionsProps } from "."

const useDiagramsSectionButtons = ({ data }: DiagramsOptionsProps) => {
    const router: any = useRouter()
    const { t } = useTranslation('nutrition-diary')

    return { router, t, data }
}

export type useDiagramsSectionButtonsProps = ReturnType<typeof useDiagramsSectionButtons>

export default useDiagramsSectionButtons;