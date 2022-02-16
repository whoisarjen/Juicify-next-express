import BaseDiagramsSectionButtons from "./diagramsSectionButtons";
import useDiagramsSectionButtons from "./useDiagramsSectionButtons";


export interface DiagramsOptionsProps {
    data: any,
    reloadDailyMeasurement: () => void
}

const DiagramsSectionButtonsComponent = ({ data, reloadDailyMeasurement }: DiagramsOptionsProps) => {
    const props = useDiagramsSectionButtons({ data, reloadDailyMeasurement })

    return <BaseDiagramsSectionButtons {...props} />
}

export default DiagramsSectionButtonsComponent;