import BaseButtonOnlyWithNumber from "./ButtonOnlyWithNumber";
import useButtonOnlyWithNumber from "./useButtonOnlyWithNumber";

export interface ButtonOnlyWithNumberProps {
    clicked: () => void,
    showNumber?: number,
    text?: string
}

const ButtonOnlyWithNumber = ({ clicked, text, showNumber = 0 }: ButtonOnlyWithNumberProps) => {
    const props = useButtonOnlyWithNumber({ clicked, text, showNumber })
    
    return <BaseButtonOnlyWithNumber {...props} />
}

export default ButtonOnlyWithNumber;