import { useRouter } from "next/router";
import { useAppSelector } from "./useRedux";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { readToken } from "../utils/checkAuth";
import { getIndexedDBbyID } from "../utils/indexedDB";
import { loadValueByLogin } from "../utils/API";
import dailyMeasurement from "../components/schema/dailyMeasurement";

const useDailyMeasurement = (when: string): [any, () => void] => {
  const router: any = useRouter();
  const [cookies] = useCookies();
  const [user, setUser] = useState();
  const [reload, setReload] = useState(0);
  const [data, setDataObject] = useState();
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
            data = dailyMeasurement("XD" + new Date().getTime(), when, token._id)
          } else {
            if (!data.nutrition_diary) data.nutrition_diary = [];
            if (!data.workout_result) data.workout_result = [];
          }
          setUser(token);
          setDataObject(data);
        } else {
          let res = await loadValueByLogin(
            "daily_measurement",
            when,
            router.query.login
          );
          if (!res.data.nutrition_diary) res.data.nutrition_diary = [];
          if (!res.data.workout_result) res.data.workout_result = [];
          setUser(res.user);
          setDataObject(res.data);
        }
      })();
    }
  }, [when, reload]);

  return [{ data, user }, () => setReload(reload + 1)];
};

export { useDailyMeasurement };
