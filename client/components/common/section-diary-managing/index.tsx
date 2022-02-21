import BaseSectionDiaryManaging from "./SectionDiaryManaging";
import useSectionDiaryManaging from "./useSectionDiaryManaging";


export interface SectionDiaryManagingProps {
    data: any
}

const SectionDiaryManaging = ({ data }: SectionDiaryManagingProps) => {
    const props = useSectionDiaryManaging({ data })

    return <BaseSectionDiaryManaging {...props} />
}

export default SectionDiaryManaging;