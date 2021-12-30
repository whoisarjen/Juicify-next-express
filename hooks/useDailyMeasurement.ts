import { useRouter } from "next/router";
import { useAppSelector } from "./useRedux";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { readToken } from "../utils/checkAuth";
import { getIndexedDBbyID } from "../utils/indexedDB";
import { loadValueByLogin } from "../utils/API";
import schema from "../schema/dailyMeasurement";

const useDailyMeasurement = (when: string): [any, () => void] => {
    const router: any = useRouter();
    const [cookies] = useCookies();
    const [user, setUser] = useState();
    const [reload, setReload] = useState(0);
    const [data, setDataObject] = useState<Object>();
    const theOldestSupportedDate = useAppSelector((state) =>
        state.config.theOldestSupportedDate()
    );

    useEffect(() => {
        if (when) {
            (async () => {
                const token = readToken(cookies.token);
                if (
                    token.login == router.query.login &&
                    theOldestSupportedDate <= when
                ) {
                    let data = await getIndexedDBbyID(
                        "daily_measurement",
                        new Date(when).toISOString()
                    );
                    if (!data) {
                        data = schema(false, "XD" + new Date().getTime(), when, token._id)
                    } else {
                        data = schema(data, "XD" + new Date().getTime(), when, token._id)
                    }
                    setUser(token);
                    setDataObject(data);
                } else {
                    let res = await loadValueByLogin(
                        "daily_measurement",
                        when,
                        router.query.login
                    );
                    setUser(res.user);
                    setDataObject(schema(res.data, "XD" + new Date().getTime(), when, res.user._id));
                }
            })();
        }
    }, [when, reload, router.query]);

    return [{ data, user }, () => setReload(reload + 1)];
};

export { useDailyMeasurement };
