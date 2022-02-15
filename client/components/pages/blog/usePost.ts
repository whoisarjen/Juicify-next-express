const usePost = () => {
    const post = {
        title: 'The Witcher: Ronin has arrived on Kickstarter!',
        content: `The Witcher: Ronin is an original comic, created and published by CD PROJEKT RED, which translates the dark fantasy world of The Witcher into a feudal Japanese setting. The story focuses on monster slayer Geralt, who must venture across Yokai - infested lands while attempting to track down the mysterious Lady of Snow Yuki Onna.`,
        img_url: '/images/logo_big.png'
    }

    return { post };
}

export type usePostProps = ReturnType<typeof usePost>

export default usePost;