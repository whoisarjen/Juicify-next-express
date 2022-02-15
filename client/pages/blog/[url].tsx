import usePost from "../../components/pages/blog/usePost";
import Post from '../../components/pages/blog/post'

const PostPage = () => {
    const props = usePost()

    return <Post {...props} />
};

export default PostPage;