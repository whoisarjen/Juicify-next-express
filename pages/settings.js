import { expectLoggedIN } from "../utils/checkAuth";

const Settings = () => {
  expectLoggedIN();
  return <div className="settings">Settings</div>;
};

export default Settings;
