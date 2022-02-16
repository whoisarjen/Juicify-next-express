import Post from "./post";
import usePost from "./usePost";

const PostComponent = () => {
    const props = usePost()

    return <Post {...props} />
};

export default PostComponent;