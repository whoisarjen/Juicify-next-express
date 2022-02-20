import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";

const useSearch = () => {
    const { post } = useAxios()
    const [data, setData] = useState({ items: [] })
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        (async () => {
            if (router?.query?.find) {
                try {
                    setIsLoading(true)
                    const res = await post({ url: '/find/users', object: { find: router.query.find } })
                    setData(res.data || { items: [] });
                } catch (error: any) {
                    console.log(error)
                    setData({ items: [] })
                } finally {
                    setIsLoading(false)
                }
            }
        })()
    }, [router.query])

    return { data, isLoading, router }
}

export type useSearchProps = ReturnType<typeof useSearch>

export default useSearch;