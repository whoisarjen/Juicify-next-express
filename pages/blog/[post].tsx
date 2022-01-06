import { FunctionComponent } from "react";
import styles from '../../styles/blog.module.css'

const Post: FunctionComponent = () => {
    return (
        <div className={styles.blog}>
            <article className={styles.postGrid}>
                <h1>The Witcher: Ronin has arrived on Kickstarter!</h1>
                <img src="https://static.cdprojektred.com/cms.cdprojektred.com/16x9_big/7601a16f992ecc4bd95a2668d1a369320dd0f86b-1280x720.jpg" />
                <div className={styles.content}>
                    {
                        [...Array(10)].map(x =>
                            <p>
                                The Witcher: Ronin is an original comic, created and published by CD PROJEKT RED,
                                which translates the dark fantasy world of The Witcher into a feudal Japanese setting.
                                The story focuses on monster slayer Geralt, who must venture across Yokai-infested lands while attempting to track down the mysterious
                                Lady of Snow Yuki Onna.
                            </p>
                        )
                    }
                </div>
            </article>
        </div >
    )
}


export default Post;