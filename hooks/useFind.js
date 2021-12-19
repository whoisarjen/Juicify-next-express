import { API } from '../utils/API'
import { useState, useEffect } from "react";
import { addIndexedDB, getAllIndexedDB, getIndexedDBbyID } from '../utils/indexedDB'

const prepareItems = (data, skipThoseIDS) => {
    return new Promise(resolve => {
        console.log('prepare', data, skipThoseIDS)
        if (skipThoseIDS && skipThoseIDS.length > 0 && data.length > 0) {
            for (let i = 0; i < skipThoseIDS.length; i++) {
                for (let a = 0; a < data.length; a++) {
                    if (skipThoseIDS[i]._id == data[a]._id) {
                        data.splice(a, 1)
                        console.log("SKIP")
                        break;
                    }
                }
            }
        }
        resolve(data)
    })
}

const useFind = (value, where, tab, skipThoseIDS) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchCache, setSearchCache] = useState([])
    const [searchTimer, setSearchTimer] = useState(null)

    useEffect(async () => {
        clearTimeout(searchTimer)
        if (value && value.length > 2) {
            setLoading(true)
            if (tab == 1) {
                console.log(`${where} loaded from favourite`)
                let fav = await prepareItems(await getAllIndexedDB(`favourite_${where}`) || [], skipThoseIDS)
                setItems(fav.filter(item => item.name.toLowerCase().includes(value)).sort((a, b) => a.name.length - b.name.length).splice(0, 10))
                setLoading(false)
            } else if (tab == 2) {
                console.log(`${where} loaded from checked`)
                let checked = await prepareItems(await getAllIndexedDB(`checked_${where}`) || [], skipThoseIDS)
                setItems(checked.splice(0, 10))
                setLoading(false)
            } else {
                const cache = await getIndexedDBbyID(`cache_${where}`, value)
                if (cache && cache.items.length > 0) {
                    console.log(`${where} loaded from cache`)
                    setItems(await prepareItems(cache.items || [], skipThoseIDS))
                    setLoading(false)
                } else {
                    const searchFunction = (find) => setTimeout(async () => {
                        console.log(`${where} loaded from API`)
                        setLoading(true);
                        const { response, isSuccess } = await API(`/find/${where}`, {
                            find: find
                        });
                        if (isSuccess) {
                            const receivedProducts = response.items.sort((a, b) => a.name.length - b.name.length)
                            setItems(await prepareItems(receivedProducts || [], skipThoseIDS))
                            await addIndexedDB(`cache_${where}`, [{ _id: find, whenAdded: new Date(), items: receivedProducts }])
                            setSearchCache([...searchCache, find])
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
    }, [value, where, tab])

    useEffect(async () => setSearchCache((await getAllIndexedDB(`cache_${where}`)).map(item => item._id)), [])

    return { items, loading, searchCache }
}

export default useFind