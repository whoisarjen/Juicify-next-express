import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import styled from 'styled-components'

const Box = styled.div`
    position: relative;
    max-width: 1640px;
    margin-left: auto;
    margin-right: auto;
    padding: 0px 20px;
    ${this} img{
        margin: auto;
        display: block;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
        object-fit: cover;
        width: 100%;
    }
`

const Grid = styled.div`
    justify-content: center;
    flex-direction: column;
    min-height: 400px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    position: relative;
    line-height: normal;
    animation-name: fadeIn_2oHSq;
    animation-fill-mode: forwards;
    animation-duration: 1s;
    animation-timing-function: ease-in;
    margin: 20px auto;
    gap: 0px 40px;
    ${this} a{
        margin: auto;
    }
    ${this} h1{
        font-size: 50px;
        text-align: center;
        line-height: 1.2;
        margin: 20px 0px 50px;
    }
    
    ${this} article{
        margin-bottom: 50px;
    }
    @media(max-width: 1200px){
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media(max-width: 800px){
        grid-template-columns: repeat(1, 1fr);
    }
`

const Blog: FunctionComponent = () => {
    const { t } = useTranslation('blog')

    return (
        <Box>
            <h1>{t('LATEST_NEWS')}</h1>
            <Grid>
                {t('POSTS_COMMING_SOON')}
                {/* {
                    [...Array(9)].map((x, index) =>
                        <Link href={`/blog/${index}`} key={index}>
                            <a>
                                <article>
                                    <Image src="/images/logo_big.png" width="515" height="290" alt="Juicify" />
                                    <h3>Secretlab The Witcher Edition chair</h3>
                                </article>
                            </a>
                        </Link>
                    )
                } */}
            </Grid>
        </Box>
    );
}

export default Blog;
