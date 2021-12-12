import useAPI from './useAPI'
import { useState, useEffect } from "react";
import { addIndexedDB, getAllIndexedDB, getIndexedDBbyID } from '../functions/indexedDB'

const useFind = (value = '', where, tab) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchCache, setSearchCache] = useState([])
    const [searchTimer, setSearchTimer] = useState(null)

    useEffect(async () => {
        clearTimeout(searchTimer)
        if (value.length > 2) {
            setLoading(true)
            if (tab === 1) {
                console.log("Products loaded from favourite")
                let fav = await getAllIndexedDB(`favourite_${where}`) || []
                setProducts(fav.filter(product => product.name.toLowerCase().includes(value)).sort((a, b) => a.name.length - b.name.length).splice(0, 10))
                setLoading(false)
            } else if (tab === 2) {
                console.log("Products loaded from checked")
                let checked = await getAllIndexedDB(`checked_${where}`) || []
                setProducts(checked.splice(0, 10))
                setLoading(false)
            } else {
                const cache = await getIndexedDBbyID(`cache_${where}`, value)
                if (cache && cache.products.length > 0) {
                    console.log("Products loaded from cache")
                    setProducts(cache.products)
                    setLoading(false)
                } else {
                    const searchFunction = (find) => setTimeout(async () => {
                        console.log("Products loaded from API")
                        setLoading(true);
                        const { response, isSuccess } = await useAPI(`/find/${where}`, {
                            find: find
                        });
                        if (isSuccess) {
                            const receivedProducts = response.products.sort((a, b) => a.name.length - b.name.length)
                            setProducts(receivedProducts)
                            await addIndexedDB(`cache_${where}`, [{ _id: find, whenAdded: new Date(), products: receivedProducts }])
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

    return { products, loading, searchCache }
}

export default useFind