import { useState, useEffect } from "react";
import { API } from "../utils/API";

const useSearch = (find, where) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            if (find) {
                const { response, isSuccess } = await API(`/find/${where}`, {
                    find
                })
                if (!response.items) response.items = []
                if (isSuccess) {
                    console.log(response.items)
                    setData(response.items)
                }
            }
            setIsLoading(false)
        })()
    }, [find])

    return [{ data, isLoading }]
}

export default useSearch;