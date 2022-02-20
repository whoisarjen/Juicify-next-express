import BaseButtonSubmitItems from "./ButtonSubmitItems";
import useButtonSubmitItems from "./useButtonSubmitItems";

export interface ButtonSubmitItemsProps {
    clicked: () => void,
    showNumber?: number,
    text?: string
}

const ButtonSubmitItems = ({ clicked, text, showNumber = 0 }: ButtonSubmitItemsProps) => {
    const props = useButtonSubmitItems({ clicked, text, showNumber })
    
    return <BaseButtonSubmitItems {...props} />
}

export default ButtonSubmitItems;