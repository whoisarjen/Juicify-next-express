import BaseButtonSubmitItems from "./ButtonSubmitItems";
import useButtonSubmitItems from "./useButtonSubmitItems";

export interface ButtonSubmitItemsProps {
    clicked: () => void,
    showNumberValue?: number
}

const ButtonSubmitItems = ({ clicked, showNumberValue = 0 }: ButtonSubmitItemsProps) => {
    const props = useButtonSubmitItems({ clicked, showNumberValue })
    
    return <BaseButtonSubmitItems {...props} />
}

export default ButtonSubmitItems;