import { FunctionComponent } from "react";
import { expectLoggedIN } from "../utils/checkAuth";

const Settings: FunctionComponent = () => {
    expectLoggedIN();
    return <div className="settings">Settings</div>;
};

export default Settings;
