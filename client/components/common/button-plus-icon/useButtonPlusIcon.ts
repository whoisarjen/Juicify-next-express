import { ButtonPlusIconProps } from ".";

const useButtonPlusIcon = ({ click, size }: ButtonPlusIconProps) => {
    return { click, size }
}

export type useButtonPlusIconProps = ReturnType<typeof useButtonPlusIcon>

export default useButtonPlusIcon;