import OwnMacro from "./ownMacro";
import useOwnMacro from "./useOwnMacro";

const OwnMacroComponent = ({ isOwnMacro, close }: { isOwnMacro: boolean, close: () => void }) => {
    const props = useOwnMacro({ isOwnMacro, close })

    return <OwnMacro {...props} />
}

export default OwnMacroComponent;