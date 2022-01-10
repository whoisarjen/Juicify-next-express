import Link from "next/link";
import { FunctionComponent } from "react";
import styles from '../../styles/blog.module.css'

const Blog: FunctionComponent = () => {
    return (
        <div className={styles.blog}>
            <h1>Latest news</h1>
            <div className={styles.grid}>
                {/* {
                    [...Array(9)].map((x, index) =>
                        <Link href={`/blog/${index}`}>
                            <a>
                                <article>
                                    <img src="https://static.cdprojektred.com/cms.cdprojektred.com/16x9_big/7601a16f992ecc4bd95a2668d1a369320dd0f86b-1280x720.jpg" />
                                    <h3>Secretlab The Witcher Edition chair</h3>
                                </article>
                            </a>
                        </Link>
                    )
                } */}
            </div>
        </div >
    );
}

export default Blog;
