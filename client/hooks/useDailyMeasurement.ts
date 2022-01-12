import { useRouter } from "next/router";
import { useAppSelector } from "./useRedux";
import { useState, useEffect } from "react";
import { getCookie, readToken } from "../utils/checkAuth";
import { getIndexedDBbyID } from "../utils/indexedDB";
import { loadValueByLogin } from "../utils/API";
import DailyMeasurement from "../classes/dailyMeasurement";

const useDailyMeasurement = (when: string, login: string): [any, () => void] => {
    const router: any = useRouter();
    const [user, setUser] = useState();
    const [reload, setReload] = useState(0);
    const [data, setDataObject] = useState<Object>();
    const theOldestSupportedDate = useAppSelector(state => state.config.theOldestSupportedDate());

    useEffect(() => {
        if (when) {
            (async () => {
                const token = readToken(await getCookie('token') || '')
                if (
                    token.login == (login || token.login) && // Sometimes need to use only in token's user case and this block errors
                    theOldestSupportedDate <= when
                ) {
                    setUser(token);
                    setDataObject(
                        new DailyMeasurement(
                            {
                                ...{ _id: "XD" + new Date().getTime(), user_ID: token._id, whenAdded: when },
                                ...await getIndexedDBbyID
                                    (
                                        "daily_measurement",
                                        new Date(when).toISOString()
                                    )
                            }
                        )
                    );
                } else {
                    let res = await loadValueByLogin(
                        "daily_measurement",
                        when,
                        login
                    );
                    setUser(res.user);
                    setDataObject(
                        new DailyMeasurement(
                            {
                                ...{ _id: "XD" + new Date().getTime(), user_ID: res._id, whenAdded: when },
                                ...res.data
                            }
                        )
                    );
                }
            })();
        }
    }, [when, login, reload, router.query]);

    return [{ data, user }, () => setReload(reload + 1)];
};

export { useDailyMeasurement };
