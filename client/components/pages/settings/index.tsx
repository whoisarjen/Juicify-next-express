import BaseSettings from "./Settings";
import useSettings from "./useSettings";

const Settings = () => {
    const props = useSettings()

    return <BaseSettings {...props} />
};

export default Settings;