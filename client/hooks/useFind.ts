import { API } from '../utils/API'
import { store } from '../redux/store'
import { useState, useEffect } from "react";
import { addIndexedDB, getAllIndexedDB, getIndexedDBbyID } from '../utils/indexedDB'

const prepareItems = async (
    data: Array<any>,
    skipThoseIDS: Array<any>,
    where: string,
    value: string
): Promise<Array<any>> => {
    return new Promise(async resolve => {
        let my: Array<any> = await getAllIndexedDB(where) || []
        let newData: Array<any> = data.concat(my)
        if (my.length > 0) {
            newData = newData.filter((item: any) => item.name.toLowerCase().includes(value)).map((x: any) => {
                if (!x.user_ID) x.user_ID = '0'
                return x
            }).sort((a: any, b: any) => b.user_ID.localeCompare(a.user_ID) || a.name.length - b.name.length || a.name.localeCompare(b.name));

            if (newData.length > 10) {
                newData = newData.splice(0, 10)
            }
        }
        if (skipThoseIDS && skipThoseIDS.length > 0 && newData.length > 0) {
            for (let i = 0; i < skipThoseIDS.length; i++) {
                for (let a = 0; a < newData.length; a++) {
                    if (skipThoseIDS[i]._id == newData[a]._id) {
                        newData.splice(a, 1)
                        break;
                    }
                }
            }
        }
        resolve(newData)
    })
}

const useFind = (value: any, where: string, tab: number, skipThoseIDS: Array<any> = [], reload: number = 0) => {
    const [items, setItems] = useState<Array<any>>([])
    const [loading, setLoading] = useState(false)
    const isOnline = store.getState().online.isOnline
    const [searchCache, setSearchCache] = useState<Array<any>>([])
    const [searchTimer, setSearchTimer] = useState<any>(null)

    useEffect(() => {
        (async () => {
            clearTimeout(searchTimer)
            if (value && value.length > 2) {
                setLoading(true)
                if (tab == 1) {
                    let fav = await prepareItems(await getAllIndexedDB(`favourite_${where}`) || [], skipThoseIDS, where, value)
                    setItems(fav.filter(item => item.name.toLowerCase().includes(value)).sort((a, b) => a.name.length - b.name.length).splice(0, 10))
                    setLoading(false)
                } else if (tab == 2) {
                    let checked = await prepareItems(await getAllIndexedDB(`checked_${where}`) || [], skipThoseIDS, where, value)
                    setItems(checked.splice(0, 10))
                    setLoading(false)
                } else {
                    const cache = await getIndexedDBbyID(`cache_${where}`, value)
                    if (cache && cache.items.length > 0) {
                        setItems(await prepareItems(cache.items || [], skipThoseIDS, where, value))
                        setLoading(false)
                    } else {
                        const searchFunction = (find: string) => setTimeout(async () => {
                            setLoading(true);
                            if (isOnline && find.length > 2) {
                                const { response, isSuccess } = await API(`/find/${where}s`, {
                                    find
                                });
                                if (isSuccess) {
                                    const receivedProducts = response.items.sort((a: any, b: any) => a.name.length - b.name.length)
                                    setItems(await prepareItems(receivedProducts || [], skipThoseIDS, where, value))
                                    await addIndexedDB(`cache_${where}`, [{ _id: find, whenAdded: new Date(), items: receivedProducts }])
                                    setSearchCache([...searchCache, find])
                                } else {
                                    setItems(await prepareItems([], skipThoseIDS, where, value))
                                }
                            } else {
                                setItems(await prepareItems([], skipThoseIDS, where, value))
                            }
                            setLoading(false)
                        }, 1500)
                        setSearchTimer(searchFunction(value))
                    }
                }
            } else {
                setItems([])
                setLoading(false)
            }
        })()
    }, [value, where, tab, reload])

    useEffect(() => {
        (async () => {
            setSearchCache((await getAllIndexedDB(`cache_${where}`)).map((item: any) => item._id))
        })()
    }, [])

    return { items, loading, searchCache }
}

export default useFind