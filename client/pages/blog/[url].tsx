import Post from "../../components/pages/blog/usePost";
import usePost from "../../components/pages/blog/usePost";

const PostPage = () => {
    const props = usePost()

    return <Post {...props} />
};

export default PostPage;