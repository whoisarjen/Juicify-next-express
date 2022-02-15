import Settings from "../components/settings";
import useSettings from "../components/settings/useSettings";

const SettingsPage = () => {
    const props = useSettings()

    return <Settings {...props} />
};

export default SettingsPage;