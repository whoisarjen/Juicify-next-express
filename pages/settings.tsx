import { FunctionComponent, useState, useEffect } from "react";
import { expectLoggedIN } from "../utils/checkAuth";
import Tab1 from "../components/settings/Tab1";
import Tab2 from "../components/settings/Tab2";
import Tab3 from "../components/settings/Tab3";
import { logout } from '../utils/checkAuth'
import BottomFlyingButton from "../components/common/BottomFlyingButton";
import useSettings from "../hooks/useSettings";

const Settings: FunctionComponent = () => {
    expectLoggedIN();
    const [isLoading, setIsLoading] = useState(false)
    const [changedObject, setChangedObject] = useState({})
    const [changeSettings] = useSettings()
    const [tab1Val, setTab1Val] = useState({})
    const [tab2Val, setTab2Val] = useState({})
    const [tab3Val, setTab3Val] = useState({})

    const handleSubmit = async () => {
        setIsLoading(true)
        if (Object.keys(changedObject).length) {
            await changeSettings(changedObject)
        }
        setIsLoading(false)
    }

    const changeObject = (object, where) => {
        if (where === 'Tab1') {
            setTab1Val(object)
        }
        if (where === 'Tab2') {
            setTab2Val(object)
        }
        if (where === 'Tab3') {
            setTab3Val(object)
        }
    }

    useEffect(() => {
        setChangedObject({
            ...tab1Val,
            ...tab2Val,
            ...tab3Val
        })
    }, [tab1Val, tab2Val, tab3Val])

    return (
        <div className="settings">
            <div className="tabTitle">Preferencje</div>
            <Tab1 changeObject={(object) => changeObject(object, 'Tab1')} />
            <div className="tabTitle">Dziennik</div>
            <Tab2 changeObject={(object) => changeObject(object, 'Tab2')} />
            <div className="tabTitle">Profil</div>
            <Tab3 changeObject={(object) => changeObject(object, 'Tab3')} />
            {
                Object.keys(changedObject).length > 0 &&
                <BottomFlyingButton clicked={handleSubmit} isLoading={isLoading} showNumberValue={Object.keys(changedObject).length} />
            }
        </div>
    );
};

export default Settings;
