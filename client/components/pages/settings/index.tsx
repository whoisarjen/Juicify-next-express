import Settings from "./settings";
import useSettings from "./useSettings";

const SettingsComponent = () => {
    const props = useSettings()

    return <Settings {...props} />
};

export default SettingsComponent;