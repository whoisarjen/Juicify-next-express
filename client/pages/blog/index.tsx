import Blog from "../../components/pages/blog";
import useBlog from "../../components/pages/blog/useBlog";

const BlogPage = () => {
    const props = useBlog()

    return <Blog {...props} />
}

export default BlogPage;
