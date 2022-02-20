import BaseDiagramsSectionButtons from "./diagramsSectionButtons";
import useDiagramsSectionButtons from "./useDiagramsSectionButtons";


export interface DiagramsOptionsProps {
    data: any
}

const DiagramsSectionButtonsComponent = ({ data }: DiagramsOptionsProps) => {
    const props = useDiagramsSectionButtons({ data })

    return <BaseDiagramsSectionButtons {...props} />
}

export default DiagramsSectionButtonsComponent;