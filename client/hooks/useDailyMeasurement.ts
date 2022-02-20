import { useRouter } from "next/router";
import { useAppSelector } from "./useRedux";
import { useState, useEffect } from "react";
import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import useOtherUser from "./useOtherUser";
import { loadMissingDataForDailyMeasurement } from "../utils/dailyMeasurement.utils";
import { DailyMeasurementSchemaProps } from "../schema/dailyMeasurement.schema";

interface useDailyMeasurementResponseProps {
    data: DailyMeasurementSchemaProps
    user: any
    reload: () => void
}

const useDailyMeasurement = (when: string, login: string): useDailyMeasurementResponseProps => {
    const router: any = useRouter();
    const [user, setUser] = useState();
    const [reload, setReload] = useState(0);
    const token: any = useAppSelector(state => state.token.value)
    const [data, setDataObject] = useState(loadMissingDataForDailyMeasurement({ _id: "XD" + new Date().getTime(), user_ID: token._id, whenAdded: when }));
    const theOldestSupportedDate = useAppSelector(state => state.config.theOldestSupportedDate());
    const reloadKey = useAppSelector(state => state.key.daily_measurement)
    const { loadValueByLogin } = useOtherUser()

    useEffect(() => {
        if (when) {
            (async () => {
                if (
                    token.login == (login || token.login) && // Sometimes need to use only in token's user case and this block errors
                    theOldestSupportedDate <= when
                ) {
                    setUser(token);
                    setDataObject(
                        loadMissingDataForDailyMeasurement({
                            ...{ _id: "XD" + new Date().getTime(), user_ID: token._id, whenAdded: when },
                            object: await getIndexedDBbyID("daily_measurement", new Date(when).toISOString())
                        })
                    );
                } else {
                    let res = await loadValueByLogin(
                        "daily_measurement",
                        when,
                        login
                    );
                    setUser(res.user);
                    setDataObject(
                        loadMissingDataForDailyMeasurement({
                            ...{ _id: "XD" + new Date().getTime(), user_ID: res._id, whenAdded: when },
                            object: res.data
                        })
                    );
                }
            })();
        }
    }, [when, login, reload, router.query, reloadKey]);

    return { data, user, reload: () => setReload(reload + 1) };
};

export { useDailyMeasurement };
