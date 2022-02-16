import BasePost from "./Post";
import usePost from "./usePost";

const Post = () => {
    const props = usePost()

    return <BasePost {...props} />
};

export default Post;