import { expectLoggedIN } from "../hooks/useAuth";

const Settings = () => {
    expectLoggedIN()
    return (
        <div className="settings">
            Settings
        </div>
    );
}
 
export default Settings;