import BaseBlog from "./Blog";
import useBlog from "./useBlog";

const Blog = () => {
    const props = useBlog()

    return <BaseBlog {...props} />
}

export default Blog;