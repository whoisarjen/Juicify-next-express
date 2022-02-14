import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const useSearch = (find: string | number, where: string) => {
    const [data, setData] = useState({ items: [] })
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        (async () => {
            if (find) {
                try {
                    setIsLoading(true)
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER}/find/${where}`,
                        {
                            find
                        },
                        { withCredentials: true }
                    );
                    setData(res.data || { items: [] });
                } catch (error: any) {
                    console.log(error)
                    setData({ items: [] })
                } finally {
                    setIsLoading(false)
                }
            }
        })()
    }, [find, router.query])

    return { data, isLoading }
}

export default useSearch;