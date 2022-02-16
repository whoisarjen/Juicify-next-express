import Image from "next/image";
import styled from 'styled-components'
import { usePostProps } from "./usePost";

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

const PostGrid = styled.article`
    display: grid;
    grid-template-columns: auto 60%;
    margin: 20px auto;
    gap: 0px 80px;
    ${this} h1{
        font-size: 62px;
        line-height: 1.2;
        display: flex;
        align-items: center;
        margin: 0px;
    }
    @media(max-width: 1200px){
        display: block;
        ${this} .content{
            width: 100%;
            max-width: 688px;
            margin: auto;
        }
        ${this} h1{
            margin-bottom: 20px;
        }
    }
`

const Content = styled.div`
    max-width: calc(75% + 15px);
    margin-top: 150px;
    grid-column-start: 2;
    grid-column-end: 3;
    font-size: 20px;
    line-height: 1.5;
`

const Post = ({ post: { title, content, img_url } }: usePostProps) => {
    return (
        <Box>
            <PostGrid>
                <h1>{title}</h1>
                <Image src={img_url} alt="Juicify" width="970" height="545" />
                <Content>{content}</Content>
            </PostGrid>
        </Box>
    )
};

export default Post;