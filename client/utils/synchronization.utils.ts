import axios from "axios";
import { setIsOnline } from "../redux/features/online.slice";
import { store } from "../redux/store";
import { is_id } from "./db.utils";
import { getAllIndexedDB } from "./indexedDB.utils";

export const synchronizationController = async (isNewValueInDB: boolean = false, where: string, updateDailyKey: any, updateDailyKey2: any, updateDailyKey3: any, whatToUpdate: any, whatToUpdate2: any = '_id', whatToUpdate3: any) => {
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                let deleted = []
                let changed = []
                let inserted = []
                let whereArray = await getAllIndexedDB(where)
                if (whereArray.length) {
                    for (let i = 0; i < whereArray.length; i++) {
                        if (!whereArray[i].notSAVED) {
                            if (!(await is_id(whereArray[i]._id))) {
                                inserted.push(whereArray[i])
                            } else if (whereArray[i].deleted) {
                                deleted.push(whereArray[i])
                            } else if (whereArray[i].changed) {
                                changed.push(whereArray[i])
                            }
                        }
                    }
                }
                console.log(`Is ${where} going to download new values?`, isNewValueInDB)
                if (isNewValueInDB) {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER}/synchronization`,
                        { where },
                        { withCredentials: true }
                    );
                    console.log(`${where} has downloaded new values`, res.data)
                    //     setLastUpdated();
                    //     if (res.data && res.data.length) {
                    //         for (let i = 0; i < res.data.length; i++) {
                    //             if (where == 'daily_measurement') {
                    //                 if (res.data[i].workout_result && res.data[i].workout_result.length) {
                    //                     for (let a = 0; a < res.data[i].workout_result.length; a++) {
                    //                         await deleteIndexedDB("workout_result", res.data[i].workout_result[a]._id)
                    //                     }
                    //                 }
                    //             }
                    //             await deleteIndexedDB(where, res.data[i][where == 'daily_measurement' ? 'whenAdded' : '_id'])
                    //         }
                    //         await addIndexedDB(where, res.data)
                    //         if (where == 'daily_measurement' && changed.length) {
                    //             for (let a: number = changed.length - 1; a >= 0; a--) {
                    //                 changed[a] = await createOneFromTwo(changed[a])
                    //             }
                    //         }
                    //     }
                }
                // if (inserted.length) await insertThoseIDStoDB(where, inserted, updateDailyKey, updateDailyKey2, updateDailyKey3, whatToUpdate, whatToUpdate2, whatToUpdate3)
                // if (changed.length) await overwriteThoseIDSinDB(where, changed)
                // if (deleted.length) await deleteThoseIDSfromDB(where, deleted, isNewValueInDB)
                // await deleteIndexedDB("whatToUpdate", where)
                resolve(true);
            } catch (error: any) {
                console.log('synchronization call failed', error)
                store.dispatch(setIsOnline(false))
                reject(error)
            }
        })();
    })
}