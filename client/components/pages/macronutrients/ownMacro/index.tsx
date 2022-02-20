import BaseOwnMacro from "./OwnMacro";
import useOwnMacro from "./useOwnMacro";

const OwnMacro = ({ isOwnMacro, close }: { isOwnMacro: boolean, close: () => void }) => {
    const props = useOwnMacro({ isOwnMacro, close })

    return <BaseOwnMacro {...props} />
}

export default OwnMacro;