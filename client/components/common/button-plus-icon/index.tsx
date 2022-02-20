import BaseButtonPlusIcon from "./ButtonPlusIcon";
import useButtonPlusIcon from "./useButtonPlusIcon";

export interface ButtonPlusIconProps {
    click?: () => void,
    size?: any
}

const ButtonPlusIcon = ({ click, size }: ButtonPlusIconProps) => {
    const props = useButtonPlusIcon({ click, size })

    return <BaseButtonPlusIcon {...props} />
}

export default ButtonPlusIcon;