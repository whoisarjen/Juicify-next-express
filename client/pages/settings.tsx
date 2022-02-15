import Settings from "../components/pages/settings";
import useSettings from "../components/pages/settings/useSettings";

const SettingsPage = () => {
    const props = useSettings()

    return <Settings {...props} />
};

export default SettingsPage;