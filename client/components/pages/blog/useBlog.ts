import useTranslation from "next-translate/useTranslation";

interface PostProps {
    url: string,
    title: string
}

const useBlog = () => {
    const { t } = useTranslation('blog')

    const posts: PostProps[] = []

    return { t, posts }
}

export type useBlogProps = ReturnType<typeof useBlog>

export default useBlog;