import {API} from '../utils/API'
import { useState, useEffect } from "react";
import { addIndexedDB, getAllIndexedDB, getIndexedDBbyID } from '../utils/indexedDB'

const useFind = (value, where, tab) => {
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
                let fav = await getAllIndexedDB(`favourite_${where}`) || []
                setItems(fav.filter(product => product.name.toLowerCase().includes(value)).sort((a, b) => a.name.length - b.name.length).splice(0, 10))
                setLoading(false)
            } else if (tab == 2) {
                console.log(`${where} loaded from checked`)
                let checked = await getAllIndexedDB(`checked_${where}`) || []
                setItems(checked.splice(0, 10))
                setLoading(false)
            } else {
                const cache = await getIndexedDBbyID(`cache_${where}`, value)
                if (cache && cache.items.length > 0) {
                    console.log(`${where} loaded from cache`)
                    setItems(cache.items)
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
                            setItems(receivedProducts)
                            await addIndexedDB(`cache_${where}`, [{ _id: find, whenAdded: new Date(), items: receivedProducts }])
                            setSearchCache([...searchCache, find])
                        }
                        setLoading(false)
                    }, 1500)
                    setSearchTimer(searchFunction(value))
                }
            }
        } else {
            setLoading(false)
        }
    }, [value, where, tab])

    useEffect(async () => setSearchCache((await getAllIndexedDB(`cache_${where}`)).map(product => product._id)), [])

    return { items, loading, searchCache }
}

export default useFind