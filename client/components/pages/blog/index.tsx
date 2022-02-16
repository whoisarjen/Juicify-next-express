import Blog from "./blog";
import useBlog from "./useBlog";

const BlogComponent = () => {
    const props = useBlog()

    return <Blog {...props} />
}

export default BlogComponent;