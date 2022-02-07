import Image from "next/image";
import { FunctionComponent } from "react";
import styles from '../../styles/blog.module.css'

const Post: FunctionComponent = () => {
    return (
        <div className={styles.blog}>
            <article className={styles.postGrid}>
                <h1>The Witcher: Ronin has arrived on Kickstarter!</h1>
                <Image src="/images/logo_big.png" alt="Juicify" width="970" height="545" />
                <div className={styles.content}>
                    {
                        [...Array(10)].map((x, index) =>
                            <p key={index}>
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