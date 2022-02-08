import { useRouter } from "next/router";
import { useAppSelector } from "./useRedux";
import { useState, useEffect } from "react";
import { getIndexedDBbyID } from "../utils/indexedDB.utils";
import { loadValueByLogin } from "../utils/db.utils";

const useDailyMeasurement = (when: string, login: string): [any, () => void] => {
    const router: any = useRouter();
    const [user, setUser] = useState();
    const [reload, setReload] = useState(0);
    const [data, setDataObject] = useState<Object>();
    const theOldestSupportedDate = useAppSelector(state => state.config.theOldestSupportedDate());
    const token: any = useAppSelector(state => state.token.value)
    const reloadKey = useAppSelector(state => state.key.daily_measurement)

    useEffect(() => {
        if (when) {
            (async () => {
                if (
                    token.login == (login || token.login) && // Sometimes need to use only in token's user case and this block errors
                    theOldestSupportedDate <= when
                ) {
                    setUser(token);
                    setDataObject(
                        {
                            ...{ _id: "XD" + new Date().getTime(), user_ID: token._id, whenAdded: when },
                            ...await getIndexedDBbyID
                                (
                                    "daily_measurement",
                                    new Date(when).toISOString()
                                )
                        }
                    );
                } else {
                    let res = await loadValueByLogin(
                        "daily_measurement",
                        when,
                        login
                    );
                    setUser(res.user);
                    setDataObject(
                        {
                            ...{ _id: "XD" + new Date().getTime(), user_ID: res._id, whenAdded: when },
                            ...res.data
                        }
                    );
                }
            })();
        }
    }, [when, login, reload, router.query, reloadKey]);

    return [{ data, user }, () => setReload(reload + 1)];
};

export { useDailyMeasurement };
