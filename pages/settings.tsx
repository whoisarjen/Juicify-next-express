import { FunctionComponent, useState } from "react";
import { expectLoggedIN } from "../utils/checkAuth";
import Tab1 from "../components/settings/Tab1";
import Tab2 from "../components/settings/Tab2";
import Tab3 from "../components/settings/Tab3";
import Tab4 from "../components/settings/Tab4";
import { logout } from '../utils/checkAuth'
import Button from '@mui/material/Button';
import BottomFlyingButton from "../components/common/BottomFlyingButton";
import useSettings from "../hooks/useSettings";

const Settings: FunctionComponent = () => {
    expectLoggedIN();
    const [key, setKey] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [changedObject, setChangedObject] = useState({})
    const [changeSettings] = useSettings()
    const [tab1Val, setTab1Val] = useState({})
    const [tab2Val, setTab2Val] = useState({})
    const [tab3Val, setTab3Val] = useState({})
    const [tab4Val, setTab4Val] = useState({})

    const handleSubmit = async () => {
        setIsLoading(true)
        if (Object.keys(changedObject).length) {
            await changeSettings(changedObject)
                .then(() => setKey(state => state + 1))
        }
        setIsLoading(false)
    }

    const changeObject = (object, where) => {
        let holder: any = {}
        if (where === 'Tab1') {
            setTab1Val(object)
        } else {
            holder = { ...holder, ...tab1Val }
        }
        if (where === 'Tab2') {
            setTab2Val(object)
        } else {
            holder = { ...holder, ...tab2Val }
        }
        if (where === 'Tab3') {
            setTab3Val(object)
        } else {
            holder = { ...holder, ...tab3Val }
        }
        if (where === 'Tab4') {
            setTab4Val(object)
        } else {
            holder = { ...holder, ...tab4Val }
        }
        setChangedObject({ ...holder, ...object })
    }

    return (
        <div className="settings" key={key}>
            <div className="tabTitle">Preferencje</div>
            <Tab1 changeObject={(object) => changeObject(object, 'Tab1')} />
            <div className="tabTitle">Dziennik</div>
            <Tab2 changeObject={(object) => changeObject(object, 'Tab2')} />
            <div className="tabTitle">Profil</div>
            <Tab3 changeObject={(object) => changeObject(object, 'Tab3')} />
            <div className="tabTitle">Hasło</div>
            <Tab4 changeObject={(object) => changeObject(object, 'Tab4')} />
            <div className="tabTitle">Logout</div>
            <Button color="error" onClick={async () => await logout()}>
                Logout
            </Button>
            {
                Object.keys(changedObject) &&
                Object.keys(changedObject).length > 0 &&
                <BottomFlyingButton clicked={handleSubmit} isLoading={isLoading} showNumberValue={Object.keys(changedObject).filter(x => x != 'current').length} />
            }
        </div>
    );
};

export default Settings;
