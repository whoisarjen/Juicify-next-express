import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { API } from "../utils/db.utils";

const useSearch = (find: string | number, where: string) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

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
    }, [find, router.query])

    return [{ data, isLoading }]
}

export default useSearch;