const useNavigator = () => {

    const shareLocation = () => {
        navigator.share({
            url: location.href,
            title: 'Juicify.app'
        })
    }

    return { shareLocation }
}

export type useNavigatorProps = ReturnType<typeof useNavigator>

export default useNavigator;