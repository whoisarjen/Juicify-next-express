const useShare = () => {

    const handleShare = () => {
        navigator.share({
            url: location.href,
            title: 'Juicify.app'
        })
    }

    return { handleShare }
}

export type useShareProps = ReturnType<typeof useShare>

export default useShare;